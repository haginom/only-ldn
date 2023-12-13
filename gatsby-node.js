const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve(`./src/templates/video-page.tsx`);

  // Use async/await to wait for the result of the GraphQL query
  const result = await graphql(`
    query {
      allSanityPortfolio {
        edges {
          node {
            id
            category {
              category
            }
            vimeoUrl
            projectTitle
            projectDescription

            orderRank
            credits {
              job
              name
            }
            slug {
              source
              current
            }
            featuredImage {
              asset {
                url
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  // Iterate over the edges and create pages
  result.data.allSanityPortfolio.edges.forEach(({ node }) => {
    const slug = node.slug?.current;
    const id = node.id;
    createPage({
      path: `/videos/${slug}`, // Use slug instead of id
      component: pageTemplate,
      context: {
        id: id,
        ownerNodeId: id,
      },
    });
  });
};
