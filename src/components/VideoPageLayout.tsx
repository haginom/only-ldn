import React from "react";
import useWindowDimensions from "../hooks/useWindowSize";
import { RxCross1 } from "react-icons/rx";
import { navigate } from "gatsby";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
  data: any;
}

const StyledP = styled.p`
  color: white;
  text-align: left;
  font-family: Helvetica, sans-serif;
  text-transform: uppercase;
  font-size: 1.5rem;
  line-height: 1.2;
  padding-right: 1rem;
  padding-top: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding-top: 0;
  }
`;

const StyledCredits = styled.p`
  color: white;
  text-align: left;
  font-family: "Playfair Display Variable", sans-serif;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  max-width: 40rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StyledArticle = styled.article`
  height: ${(props: any) => props.height}px;
  min-height: 667px;
  max-height: ${(props: any) =>
    props.height === Infinity
      ? "760px"
      : props.height === 0
      ? "100vh"
      : "initial"};
  overflow: hidden;

  @media (min-width: 768px) {
    height: 100vh;
  }

  @media (min-width: 1290px) {
    height: fit-content;
  }
`;

const VideoLayout: React.FC<LayoutProps> = ({ children, data }) => {
  const { height } = useWindowDimensions();
  return (
    <StyledArticle height={height} className="video-embed__container">
      <button className="video-back" onClick={() => navigate(-1)}>
        <RxCross1 size={26} />
      </button>
      <div className="video-page--wrapper">
        {children}
        <div>
          <div className="project-titles">
            <StyledP>{data.projectTitle}</StyledP>
            <StyledCredits>{data.client}</StyledCredits>
          </div>
          <StyledCredits>{data.projectBlurb}</StyledCredits>
          <StyledCredits>{data.clientDetails}</StyledCredits>
        </div>
      </div>
    </StyledArticle>
  );
};

export default VideoLayout;
