import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { useState } from "react";
import type { PageProps } from "gatsby";
import { motion } from "framer-motion";
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

const ContactPage: React.FC<PageProps<QueryData>> = ({ data, location }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const Categories = data.Categories.edges;
  return (
    <Layout
      isOpen={isOpen}
      setOpen={setOpen}
      selectedCategory={
        (location.state as { selectedCategory: string })?.selectedCategory
          ? (location.state as { selectedCategory: string }).selectedCategory
          : selectedCategory
      }
      setSelectedCategory={setSelectedCategory}
      Categories={Categories}
      location={location}
    >
      <div className="contact-page">
        <div className="contact-page__info">
          <p>
            David Graham is a multi award winning London based editor with over
            15 years experience in TV, documentary, music videos, commercials,
            fashion films and branded content.
          </p>
          <a className="get-in-touch" href="email">
            Get in touch for any enquiry
          </a>
          <p className="title">Email</p>
          <p>info@onlyldn.com</p>
          <p className="title">Social Media</p>
          <p>info@onlyldn.com</p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
