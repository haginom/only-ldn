import type { GatsbyConfig } from "gatsby";

process.env.VERBOSE_NODE_MANIFEST = "true";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `onlyldn`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `icbpwj7h`,
        dataset: `production`,
        graphqlTag: "default",
      },
    },
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
        },
      },
    },
    "gatsby-plugin-postcss",
    `gatsby-plugin-styled-components`,
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

export default config;
