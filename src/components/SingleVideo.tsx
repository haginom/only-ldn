import * as React from "react";
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Divide } from "hamburger-react";

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
    transition: visibility 0s, opacity 0.2s linear;
  }
`;

const SingleVideo: React.FC<SingleVideoProps> = ({
  className,
  item,
  single,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  const creditsArray: Credit[] = Object.values(item?.credits || {});
  const featuredVideo = item.featuredVideo?.asset?.url;

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch((error: any) => {
        console.error("Error playing video:", error);
      });
    } else if (!inView && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [inView]);

  console.log(item.awards);
  return (
    <StyledVideoComponent
      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`single-video  ${className}`}
      ref={ref}
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
              ref={videoRef}
              poster={item.featuredImage?.asset?.url}
              className="video_grid___video"
            >
              <source src={item.featuredVideo?.asset?.url} type="video/mp4" />
              <track default kind="description" srcLang="en" />
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
        <div className="awards">
          {item.awards && item.awards.length > 0
            ? item.awards.map((award: any, index: number) => (
                <GatsbyImage
                  key={index}
                  className="lozad"
                  alt={`${String(award.award)} logo`}
                  image={award.awardLogo.asset.gatsbyImageData}
                />
              ))
            : null}
        </div>
      </a>
    </StyledVideoComponent>
  );
};
export default SingleVideo;
