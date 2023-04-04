import { ColorModeScript } from "@chakra-ui/color-mode"
import theme from "theme"
import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"
import { DefaultSeo } from "next-seo"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <DefaultSeo
          openGraph={{
            type: "website",
            title: "Loonify",
            description: "Lost and Found of the Future",
            locale: "uk_UA",
            url: "https://www.loonify.co",
            site_name: "Loonify",
          }}
          twitter={{
            cardType: "summary",
          }}
          additionalLinkTags={[
            { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
            { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
            { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
            { rel: "manifest", href: "/site.webmanifest" },
            { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#6b46c1" },
            { rel: "shortcut icon", href: "/apple-touch-icon.png" },
          ]}
          additionalMetaTags={[
            { name: "msapplication-TileColor", content: "#ffc40d" },
            { name: "theme-color", content: "#ffffff" },
            { name: "application-name", content: "Loonify" },
            { name: "apple-mobile-web-app-capable", content: "yes" },
            { name: "apple-mobile-web-app-status-bar-style", content: "default" },
            { name: "apple-mobile-web-app-title", content: "Loonify" },
            { name: "description", content: "Lost and Found of the Future" },
            { name: "format-detection", content: "telephone=no" },
            { name: "mobile-web-app-capable", content: "yes" },
            { name: "msapplication-config", content: "/browserconfig.xml" },
            { name: "msapplication-tap-highlight", content: "no" },
          ]}
        />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
