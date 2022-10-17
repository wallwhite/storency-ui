/* eslint-disable class-methods-use-this */
import React from 'react';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript, DocumentInitialProps } from 'next/document';

class Document extends NextDocument {
    static getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        return NextDocument.getInitialProps(ctx);
    }

    addFonts = (fontWeightPrefixes: string[], fontBaseName: string): JSX.Element[] =>
        fontWeightPrefixes.map((fontWeight) => (
            <React.Fragment key={fontBaseName + fontWeight}>
                <link
                    href={`/fonts/${fontBaseName}-${fontWeight}.woff2`}
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    href={`/fonts/${fontBaseName}-${fontWeight}.woff`}
                    rel="preload"
                    as="font"
                    type="font/woff"
                    crossOrigin="anonymous"
                />
            </React.Fragment>
        ));

    render(): JSX.Element {
        const interBaseName = 'Inter';
        const interFonts = ['600', '500', '800', '700', 'Regular'];
        const firaMonoBaseName = 'Fira-Mono';
        const firaMonoFonts = ['Regular', 'Medium'];
        const montserratBaseName = 'montserrat-v25-latin_cyrillic';
        const montserratFonts = ['500', '600', '700', '800', 'regular'];

        return (
            <Html lang="en">
                <Head>
                    {this.addFonts(interFonts, interBaseName)}
                    {this.addFonts(firaMonoFonts, firaMonoBaseName)}
                    {this.addFonts(montserratFonts, montserratBaseName)}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Document;
