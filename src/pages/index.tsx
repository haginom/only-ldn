import * as React from "react";
import { useState, useRef } from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import VideoLayout from "../components/VideoLayout";

export interface CategoryNode {
  node: {
    category: string;
    id: string;
    released: boolean;
  };
}

interface Category {
  category: string;
}
export interface PortfolioNode {
  node: {
    category: Category | null;
    id: string;
    vimeoUrl: string;
    projectTitle: string;
    projectDescription: string;
    orderRank: number;
    credits: {
      job: string;
      name: string;
    };
    slug: {
      source: string;
      current: string;
    };
    featuredImage: {
      asset: {
        url: string;
      };
    };
    featuredVideo: {
      asset: {
        url: string;
      };
    };
    shortVideo: {
      _rawAsset: {
        _ref: string;
      };
    };
    awards: {
      awardLogo: {
        asset: {
          url: string;
        };
      };
      award: string;
    };
  };
}

interface QueryData {
  Categories: {
    edges: CategoryNode[];
  };
  PortfolioItems: {
    edges: PortfolioNode[];
  };
}

export const query = graphql`
  query {
    Categories: allSanityCategories {
      edges {
        node {
          category
          id
          released
        }
      }
    }
    PortfolioItems: allSanityPortfolio(sort: { orderRank: ASC }) {
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
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
            }
          }
          featuredVideo {
            asset {
              url
            }
          }
          shortVideo {
            _rawAsset(resolveReferences: { maxDepth: 10 })
          }
          awards {
            awardLogo {
              asset {
                gatsbyImageData(width: 50, height: 50, placeholder: BLURRED)
              }
            }
            award
          }
        }
      }
    }
  }
`;

const IndexPage: React.FC<PageProps<QueryData>> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const Categories = data.Categories.edges;
  const PortfolioItems = data.PortfolioItems.edges.map((edge) => edge.node);

  const filteredPortfolioItems = selectedCategory
    ? PortfolioItems.filter((item) => {
        return (
          item.category &&
          Object.values(item.category).some(
            (categoryObj) =>
              categoryObj && categoryObj.category === selectedCategory
          )
        );
      })
    : PortfolioItems;

  return (
    <Layout
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      Categories={Categories}
    >
      <VideoLayout PortfolioItems={filteredPortfolioItems} />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Only LDN</title>
    <meta name="description" content="Hello World" />
  </>
);
