/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/*
  CONTENT CATEGORIES GENERATOR
*/

import fs from 'fs';
import * as fsPromises from 'fs/promises';
import type { Dirent } from 'fs';
import parseMD from 'parse-md';

enum FileType {
    File = 1,
    Directory = 2,
}

interface IConfig {
    contentDir: string;
    ignoreRoots: string[];
    customRoots: string[];
}

interface INormalizedFile {
    name: string;
    type: FileType;
    path: string;
}

interface IMatchedDirectory extends INormalizedFile {
    file: INormalizedFile;
    children?: IContentMetadata[];
}

interface IContentMetadata {
    id: string;
    title: string;
    path: string;
    description?: string;
    priority?: string;
    icon?: string;
    picture?: string;
    type?: string;
    color?: 'blue' | 'brightBlue' | 'red' | 'green' | 'yellow' | 'orange' | 'purple';
    category?: string;
    sort?: boolean;
    children?: IContentMetadata[];
}

const ROOT_DIR = './';
const CONTENT_DIR_NAME = 'content';
const DEFAULT_CONFIG: IConfig = {
    contentDir: CONTENT_DIR_NAME,
    ignoreRoots: ['docs'],
    customRoots: ['docs/components', 'docs/hooks', 'docs/utils'],
};
const CONTENT_DIR_PATH = `${ROOT_DIR}${DEFAULT_CONFIG.contentDir}`;
const OUTPUT_FILE_PATH = './configs/content-categories-config.json';
const DOCS_USAGE_FILE_NAME = 'usage.mdx';

const asyncFilter = async (arr: any[], predicate: (value: any, index: number, array: any[]) => any): Promise<any[]> =>
    Promise.all(arr.map(predicate)).then((results) => arr.filter((_v, index) => results[index]));

const getFileTypeValue = (file: Dirent): FileType => {
    const [fileTypeSymbol] = Object.getOwnPropertySymbols(file);
    // @ts-ignore
    return file[fileTypeSymbol[Symbol.toPrimitive]('string')] as unknown as FileType;
};

const getContentByPath = async (path: string): Promise<Dirent[]> => {
    const content = await fsPromises.readdir(path, { withFileTypes: true });

    return content;
};

const getNormalizedDirContent = (content: Dirent[], path: string): INormalizedFile[] =>
    content.map((file) => ({ name: file.name, path, type: getFileTypeValue(file) }));

const getNormalizedContentByPath = async (path: string): Promise<INormalizedFile[]> => {
    const content = await getContentByPath(path);

    const normalizedContent = getNormalizedDirContent(content, path);

    return normalizedContent;
};

const getContentByType = (content: INormalizedFile[], type: FileType): INormalizedFile[] =>
    content.filter(({ type: contentType }) => type === contentType);

const getMatchedFileDirPaths = (content: INormalizedFile[], ignore: string[] = []): IMatchedDirectory[] => {
    const directories = getContentByType(content, FileType.Directory);
    const files = getContentByType(content, FileType.File);

    const matchedFiles = directories.reduce<IMatchedDirectory[]>(
        (acc: IMatchedDirectory[], directory: INormalizedFile): IMatchedDirectory[] => {
            const isIgnoredPath = ignore?.includes(directory.name);
            const dirMetaFile = isIgnoredPath ? null : files.find(({ name }) => name.includes(directory.name));

            if (dirMetaFile) {
                return [
                    ...acc,
                    {
                        ...directory,
                        file: dirMetaFile,
                    },
                ];
            }

            return acc;
        },
        [],
    );

    return matchedFiles;
};

const getRootMatchedContent = async (): Promise<IMatchedDirectory[]> => {
    const { ignoreRoots } = DEFAULT_CONFIG;
    const rootContent = await getNormalizedContentByPath(CONTENT_DIR_PATH);
    const marchedRootContent = getMatchedFileDirPaths(rootContent, ignoreRoots);

    return marchedRootContent;
};

const getCustomRootsMatchedContent = async (): Promise<IMatchedDirectory[]> => {
    const { customRoots } = DEFAULT_CONFIG;

    const customRootRootDirectories = customRoots.reduce((acc: { [key: string]: string[] }, path) => {
        const [dirName, entityName] = path.trim().split('/');

        return {
            ...acc,
            [dirName]: acc[dirName] ? [...(acc[dirName] as string[]), entityName] : [entityName],
        };
    }, {});

    const customRootsContentPromises = Object.entries(customRootRootDirectories).map(([key]) => {
        const currentContentPath = `${CONTENT_DIR_PATH}/${key}`;

        return getNormalizedContentByPath(currentContentPath);
    });
    const customRootsContent = await Promise.all(customRootsContentPromises);
    const matchedCustomRootsContent = customRootsContent
        .map((contentItem) => getMatchedFileDirPaths(contentItem))
        .reduce((acc, item) => [...acc, ...item], []);

    return matchedCustomRootsContent;
};

const getMDXMetadata = (path: string, slug: string, fileName: string, metaType?: string): IContentMetadata | null => {
    const fileContent = fs.readFileSync(`${path}/${fileName}`, 'utf8');
    const { metadata = {} } = parseMD(fileContent);
    const currentPath = `${path.replace(CONTENT_DIR_PATH, '')}${slug ? `/${slug}` : ''}`;

    if (!Object.keys(metadata as { [key: string]: string }).length) return null;

    return {
        ...(metadata as IContentMetadata),
        path: currentPath,
        type: metaType,
    };
};

const getDirectoryMetadata = async (file: INormalizedFile): Promise<(IContentMetadata | null)[]> => {
    const { name: dirName, path: dirPath } = file;
    const currentDirPath = `${dirPath}/${dirName}`;
    const dirContent = await getNormalizedContentByPath(currentDirPath);
    const isAllFiles = dirContent.every(({ type }) => type === FileType.File);
    const isUsageExists = Boolean(dirContent.find(({ name }) => name === DOCS_USAGE_FILE_NAME));
    const isDocsPartContent = isAllFiles && isUsageExists;

    const currentDirContent = isDocsPartContent
        ? dirContent.filter(({ name }) => name === DOCS_USAGE_FILE_NAME)
        : dirContent;

    const contentMetadata = currentDirContent
        .map(({ name, path: filePath }) => {
            const slug = isDocsPartContent ? '' : name.replace('.mdx', '');
            const metadata = getMDXMetadata(filePath, slug, name, 'element');

            return metadata;
        })
        .filter(Boolean);

    return contentMetadata;
};

const generateChildren = async (path: string): Promise<IContentMetadata[]> => {
    const content = await getNormalizedContentByPath(path);

    const files = getContentByType(content, FileType.File);
    const directories = getContentByType(content, FileType.Directory);

    const filesMetadata = files
        .map(({ name, path: filePath }) => {
            const slug = name.replace('.mdx', '');
            const metadata = getMDXMetadata(filePath, slug, name, 'element');

            return metadata;
        })
        .filter(Boolean);

    const directoriesMetadataPromises = directories.map((dir) => getDirectoryMetadata(dir));

    const directoriesMetadata = (await Promise.all(directoriesMetadataPromises)).reduce(
        (acc, item) => [...acc, ...item],
        [],
    );

    const childrenList = [...filesMetadata, ...directoriesMetadata].filter(Boolean) as IContentMetadata[];
    const categories = [
        ...new Set(childrenList.map(({ category }: IContentMetadata) => category).filter(Boolean) ?? []),
    ];

    const categorizedList = categories.map((category) => {
        const categoryChildren = childrenList.filter(({ category: childrenCategory }) => category === childrenCategory);

        return {
            id: `${category?.toLowerCase()}-${Date.now()}`,
            title: category ?? '',
            type: 'subCategory',
            sort: true,
            children: categoryChildren,
        };
    });

    const childrenWithoutCategory = childrenList.filter(({ category }) => !category);

    return [...childrenWithoutCategory, ...categorizedList] as IContentMetadata[];
};

const generate = async (): Promise<void> => {
    try {
        const rootMatchedContent = await getRootMatchedContent();
        const customRootMatchedContent = await getCustomRootsMatchedContent();

        const content = [...rootMatchedContent, ...customRootMatchedContent];

        const filteredContent: IMatchedDirectory[] = await asyncFilter(content, async (item: IMatchedDirectory) => {
            const currentItemPath = `${item.path}/${item.name}`;
            const itemPathContent = await getNormalizedContentByPath(currentItemPath);

            return itemPathContent.length;
        });

        const contentWithChildrenPromises = filteredContent.map(async (item) => {
            const currentItemPath = `${item.path}/${item.name}`;
            const children = await generateChildren(currentItemPath);

            return {
                ...item,
                children,
            };
        }, {});

        const contentWithChildren = (await Promise.all(contentWithChildrenPromises)) as IMatchedDirectory[];

        const parsedFilesData = contentWithChildren
            .map(({ name: slug, path, file, children }: IMatchedDirectory) => {
                const metadata = getMDXMetadata(path, slug, file.name, 'category');

                return { ...metadata, children } as IContentMetadata;
            })
            .filter(Boolean)
            .sort((a: IContentMetadata, b: IContentMetadata) => ((a?.priority ?? 999) > (b?.priority ?? 999) ? 1 : -1));

        await fsPromises.rm(OUTPUT_FILE_PATH);

        const data = JSON.stringify({ items: parsedFilesData });

        fs.writeFileSync(OUTPUT_FILE_PATH, data);
    } catch (err) {
        console.log('Error: error occurred while reading file system.');
        console.dir(err);
    }
};

const startGeneration = async (): Promise<void> => {
    try {
        console.log('✨  Info: Generation content categories config...');
        await generate();
        console.log('✨  Info: Content categories config successfully generated.');
    } catch (err) {
        console.log('🛑  Error: error occurred while generating content categories config.', err);
    }
};

startGeneration();
