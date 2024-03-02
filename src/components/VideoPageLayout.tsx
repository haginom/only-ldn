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
  return (
    <StyledArticle height={height} className="video-embed__container">
      <button className="video-back" onClick={() => navigate(-1)}>
        <RxCross1 size={26} />
      </button>
      {children}
      <div>
        <StyledP>{data.projectTitle}</StyledP>
        {data.credits?.map((credit: any, index: number) => (
          <div key={index}>
            <StyledCredits>
              {credit.job} : {credit.name}
            </StyledCredits>
          </div>
        ))}
      </div>
    </StyledArticle>
  );
};

export default VideoLayout;
