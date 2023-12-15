import * as React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { useEffect } from "react";

interface SingleVideoProps {
  className: string;
  item: any;
  single: boolean;
}

interface StyledVideoComponentProps {
  isHovered: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement> | undefined;
}

interface Credit {
  job: string;
  name: string;
}

const StyledVideoComponent = styled.article<StyledVideoComponentProps>`
  div.single-video-title,
  div.video-information {
    visibility: ${(props) => (props.isHovered ? "visible" : "hidden")};
    opacity: ${(props) => (props.isHovered ? "1" : "0")};
    transition: visibility 0s, opacity 0.6s linear;
  }
`;

const SingleVideo: React.FC<SingleVideoProps> = ({
  className,
  item,
  single,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  const creditsArray: Credit[] = Object.values(item?.credits || {});
  const featuredVideo = item.featuredVideo?.asset.url;

  useEffect(() => {
    const loadLozad = async () => {
      const lozad = require("lozad");
      const observer = lozad();
      observer.observe();
    };

    loadLozad();
  });

  return (
    <StyledVideoComponent
      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`single-video ${className}`}
    >
      <a href={`/videos/${item?.slug?.current}`}>
        <div className="single-video-title">
          <h2 className="video-title">{item?.projectTitle}</h2>
        </div>
        <div className="feature-image">
          <GatsbyImage
            alt=""
            style={
              single ? { width: "100vw", height: "100%" } : { height: "100%" }
            }
            imgStyle={{ objectFit: "cover", height: "100%" }}
            image={item?.featuredImage.asset.gatsbyImageData}
          />
        </div>
        {featuredVideo && (
          <div
            dangerouslySetInnerHTML={{
              __html: `<video   id="background-video"
            muted
            loop
            autoplay
            playsinline
          preload="metadata"
            className="lozad video_grid___video"> <source src=${item.featuredVideo?.asset?.url} type="video/mp4" /> 
            <track default kind="description" srcLang="en" /></video>`,
            }}
            className="mov-file"
          />
        )}
        <div className="video-information">
          <div className="credits">
            {creditsArray.map(({ job, name }, index) => (
              <p key={index} className="credit">
                <span className="credits-job">{job} </span>|{" "}
                <span className="credits-name">{name}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="awards">
          {item.awards && item.awards.length > 0
            ? item.awards.map((award: any, index: number) => (
                <div key={index}>
                  <GatsbyImage
                    alt={`${String(award.award)} logo`}
                    image={award.awardLogo.asset.gatsbyImageData}
                  />
                </div>
              ))
            : null}
        </div>
      </a>
    </StyledVideoComponent>
  );
};
export default SingleVideo;
