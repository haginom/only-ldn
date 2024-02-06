import * as React from "react";
import { useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { graphql } from "gatsby";
import VideoLayout from "../components/VideoLayout";
import { useContext } from "react";
import { FirstLoadContext } from "../context/firstLoadContext";

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

const IndexPage: React.FC<PageProps<QueryData>> = ({ data, location }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { firstLoad, setFirstLoad, animationComplete } =
    useContext(FirstLoadContext) || {};
  const Categories = data.Categories.edges;
  const PortfolioItems = data.PortfolioItems.edges.map((edge) => edge.node);

  React.useEffect(() => {
    const pageSeen = sessionStorage.getItem("page--seen");
    if (!pageSeen && firstLoad) {
      sessionStorage.setItem("page--seen", "1");
    }
    if (pageSeen) {
      setFirstLoad(false);
    }
  }, []);

  return (
    <Layout
      isOpen={isOpen}
      setOpen={setOpen}
      location={location}
      selectedCategory={
        (location.state as { selectedCategory: string })?.selectedCategory
          ? (location.state as { selectedCategory: string }).selectedCategory
          : selectedCategory
      }
      setSelectedCategory={setSelectedCategory}
      Categories={Categories}
    >
      <VideoLayout
        selectedCategory={
          (location.state as { selectedCategory: string })?.selectedCategory
            ? (location.state as { selectedCategory: string }).selectedCategory
            : selectedCategory
        }
        PortfolioItems={PortfolioItems}
      />
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
