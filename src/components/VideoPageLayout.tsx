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
  font-size: 1.3rem;
  line-height: 1.2;
  padding-right: 1rem;
  padding-top: 1rem;
  margin-left: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
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
  margin-left: 1rem;
`;

const StyledArticle = styled.article`
  height: ${(props: any) => props.height}px;
  min-height: 667px;
  max-height: ${(props: any) =>
    props.height === Infinity ? "760px" : "initial"};
  overflow: hidden;

  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

const VideoLayout: React.FC<LayoutProps> = ({ children, data }) => {
  const { height } = useWindowDimensions();
  console.log(data);
  return (
    <StyledArticle height={height} className="video-embed__container">
      <button className="video-back" onClick={() => navigate(-1)}>
        <RxCross1 size={26} />
      </button>
      {children}
      <div>
        <div className="project-titles">
          <StyledP>{data.projectTitle}</StyledP>
          <StyledCredits>{data.client}</StyledCredits>
        </div>
        <StyledCredits>{data.projectBlurb}</StyledCredits>
        <StyledCredits>{data.clientDetails}</StyledCredits>
      </div>
    </StyledArticle>
  );
};

export default VideoLayout;
