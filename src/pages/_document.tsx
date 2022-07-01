import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Main, Head, NextScript, DocumentInitialProps } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet: ServerStyleSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const enhanceApp = (App: any) => (props: any) => sheet.collectStyles(<App {...props} />);

    try {
      ctx.renderPage = () => originalRenderPage({ enhanceApp });

      const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (initialProps.styles, sheet.getStyleElement()),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
