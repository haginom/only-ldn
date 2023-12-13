import React from "react";
import { graphql } from "gatsby";
import Video from "../components/Video";

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

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data }) => {
  return (
    <div>
      <article className="video-embed__container">
        <Video videoSrcURL={data.sanityPortfolio.vimeoUrl} />
      </article>
    </div>
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
    }
  }
`;
