import Document, {Html, Head, Main, NextScript} from 'next/document'


const criticalCss = `
html {
  background: var(--color-bg);
  color: var(--color-text);
}

html, button {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}
body, ul, li { margin: 0; padding: 0; }
li { list-style: none; }

#header {
  background-color: var(--color-header-bg);
}

a {color: var(--color-link); text-decoration: none; }
a:hover, a.is-active { color: var(--color-link-hover); }

h1 { color: var(--color-text-highlight); }

#__next > main {
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: 1168px;
  margin: auto;
}

fieldset {
  max-width: 400px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 20px 20px 0;
    border-color: var(--color-field-border);
    margin-bottom: 20px;
  }
`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/theme-dark.css"/>
          <style dangerouslySetInnerHTML={{__html: criticalCss}}/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument