import React from "react";
import { graphql } from "gatsby";
import Video from "../components/Video";
import { RxCross1 } from "react-icons/rx";
import { Link } from "gatsby";
import { navigate } from "gatsby";
import styled from "styled-components";
import { useWindowSize } from "react-use";

interface BlogPostTemplateProps {
  data: {
    sanityPortfolio: {
      id: string;
      category: {
        category: string;
      };
      vimeoUrl: string;
      projectTitle: string;
      projectDescription: string;
      orderRank: number;
      credits: {
        job: string;
        name: string;
      }[];
      slug: {
        source: string;
        current: string;
      };
      featuredImage: {
        asset: {
          url: string;
        };
      };
    };
  };
}

const StyledP = styled.p`
  color: white;
  text-align: center;
  font-family: "Playfair Display Variable", sans-serif;
  font-size: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding-top: 0;
  }
`;

const StyledCredits = styled.p`
  color: white;
  text-align: center;
  font-family: "Playfair Display Variable", sans-serif;
  font-size: 1rem;

  margin-bottom: 1rem;
`;

const StyledArticle = styled.article`
  height: ${(props: any) => props.height}px;
  max-height: 100vh;
  overflow: hidden;
`;

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data }) => {
  const { height: windowHeight } = useWindowSize();
  const [height, setHeight] = React.useState(windowHeight);

  React.useEffect(() => {
    // Check if the initial height is Infinity
    if (height === Infinity) {
      // If it is Infinity, wait for the window to finish loading
      const handleResize = () => {
        setHeight(window.innerHeight);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    } else {
      // If the initial height is not Infinity, set it immediately
      setHeight(windowHeight);
    }
  }, [windowHeight]);

  return (
    <StyledArticle height={windowHeight} className="video-embed__container">
      <button className="video-back" onClick={() => navigate(-1)}>
        <RxCross1 size={26} />
      </button>
      <Video videoSrcURL={data.sanityPortfolio.vimeoUrl} />
      <div>
        <StyledP>{data.sanityPortfolio.projectTitle}</StyledP>
        {data.sanityPortfolio?.credits.map((credit, index) => (
          <div key={index}>
            <StyledCredits>Job: {credit.job}</StyledCredits>
            <StyledCredits>Name: {credit.name}</StyledCredits>
          </div>
        ))}
      </div>
    </StyledArticle>
  );
};

export default BlogPostTemplate;

export const query = graphql`
  query WorkQuery($id: String!) {
    sanityPortfolio(id: { eq: $id }) {
      id
      vimeoUrl
      projectTitle
      slug {
        source
        current
      }
      credits {
        job
        name
      }
    }
  }
`;
