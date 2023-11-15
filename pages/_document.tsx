import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />

                <meta name="description" content="schoolpay" />
            </Head>

            <body style={{ backgroundColor: '#F5F8FD' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
