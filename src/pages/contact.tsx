import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { useState } from "react";
import type { PageProps } from "gatsby";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowSize";
import type { HeadFC } from "gatsby";

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

const StyledFullPage = styled.div`
  height: ${(props: any) => props.height}px;
  min-height: 667px;
  max-height: ${(props: any) =>
    props.height === Infinity ? "760px" : "initial"};
  overflow: hidden;
`;

const ContactPage: React.FC<PageProps<QueryData>> = ({ data, location }) => {
  const { height } = useWindowDimensions();

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
      <StyledFullPage height={height} className="contact-page">
        <div className="contact-page__info">
          <p>
            David Graham is a multi award winning London based editor with over
            15 years experience in TV, documentary, music videos, commercials,
            fashion films and branded content.
          </p>

          <a href="mailto:david@onlyldn.com">david@onlyldn.com</a>

          <a href="tel:+447793 145 760">+44 (0)7793 145 760</a>
        </div>
      </StyledFullPage>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => (
  <>
    <title>Only LDN Contact</title>
    <meta
      name="description"
      content="David Graham is a multi award winning London based editor with over 15 years experience in TV, documentary, music videos, commercials, fashion films and branded content."
    />
    <link rel="apple-touch-icon" sizes="180x180" href="/Thumbnail.png" />
    <link
      rel="apple-touch-icon-precomposed"
      href="https://gentle-bonbon-e8ae48.netlify.app/Thumbnail.png"
    />
    <meta property="og:title" content="Chorus" />
    <meta
      property="og:description"
      content="David Graham is a multi award winning London based editor with over 15 years experience in TV, documentary, music videos, commercials, fashion films and branded content."
    />
    <meta
      property="og:image"
      content={"https://gentle-bonbon-e8ae48.netlify.app/Share.png"}
    />
    <meta name="pinterest-rich-pin" content="false" />
  </>
);
