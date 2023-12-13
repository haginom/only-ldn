import * as React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";

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
          <div className="mov-file">
            <video
              id="background-video"
              muted
              loop
              autoPlay
              className="video_grid___video"
            >
              <track default kind="description" srcLang="en" />
              <source src={item.featuredVideo?.asset?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
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
      </a>
    </StyledVideoComponent>
  );
};
export default SingleVideo;
