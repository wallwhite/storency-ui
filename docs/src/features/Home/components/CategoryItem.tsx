import React from 'react';
import Link from 'next/link';
import { generateCustomPlaceholderURL } from 'react-placeholder-image';
import { Text, ArrowRightIcon } from '@/lib/components';
import styles from '@/features/Home/styles/CategoryItem.module.scss';

interface CategoryItemProps {
    path: string;
    title: string;
    description?: string;
    picture?: string;
}

const IMAGE_SIZE = 170;

const CategoryItem: React.FC<CategoryItemProps> = ({ path, title, description, picture }) => {
    const imageSrc =
        picture ||
        generateCustomPlaceholderURL(IMAGE_SIZE, IMAGE_SIZE, {
            text: 'Category',
        });

    return (
        <Link href={path} passHref>
            <a className={styles.categoryItem}>
                <img src={imageSrc} alt={title} className={styles.image} />
                <span className={styles.content}>
                    <Text className={styles.title} size="l">
                        {title}
                        <span className={styles.titleArrow}>
                            <ArrowRightIcon />
                        </span>
                    </Text>
                    {!!description && <Text className={styles.description}>{description}</Text>}
                </span>
            </a>
        </Link>
    );
};

export default CategoryItem;
