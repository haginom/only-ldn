import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SingleVideoProps {
  item: any;
  single: boolean;
}

interface StyledVideoComponentProps {
  isHovered: boolean;
  isActive: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement> | undefined;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement> | undefined;
}

interface Credit {
  job: string;
  name: string;
}

const StyledVideoComponent = styled.article<StyledVideoComponentProps>`
  position: relative;

  div.single-video-title {
    opacity: 1;
    margin-left: 0.25rem;
    text-align: left;
    text-transform: capitalize;
    max-width: 80%;
    top: initial;
    transform: initial;
    bottom: 3rem;
    position: absolute;
    height: fit-content;

    h2 {
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.2;
    }
  }

  div.video-information {
    position: absolute;
    bottom: 0.25rem;
    text-align: left;
    text-transform: capitalize;
  }
  div.credits > p.credit {
    margin-left: 0.25rem;
    margin-bottom: 0rem;
    max-width: initial;
    font-size: 0.87rem;
  }

  div.credits {
    margin-botton: 3rem;
  }

  @media screen and (min-width: 628px) {
    div.single-video-title {
      text-align: center;
      position: absolute;
      z-index: 10012;
      top: 50%;
      max-width: 100%;
      transform: translateY(-50%);
      text-align: center;
      width: 100%;
      color: white;
      text-transform: uppercase;
      visibility: ${(props: StyledVideoComponentProps) =>
        props.isHovered ? "visible" : "hidden"};
      opacity: ${(props: StyledVideoComponentProps) =>
        props.isHovered ? "1" : "0"};
      transition: visibility 0s, opacity 0.2s linear;

      h2 {
        font-weight: 700;
        font-size: 1.2rem;
      }
    }

    div.video-information {
      position: absolute;
      bottom: 1rem;
      visibility: ${(props: StyledVideoComponentProps) =>
        props.isHovered ? "visible" : "hidden"};
      opacity: ${(props: StyledVideoComponentProps) =>
        props.isHovered ? "1" : "0"};
      transition: visibility 0s, opacity 0.2s linear;
    }

    div.credits {
      text-align: center;
    }
  }
`;

const SingleVideo: React.FC<SingleVideoProps> = ({ item, single }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("false");
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const handleMouseEnter: React.TouchEventHandler<HTMLDivElement> &
    React.MouseEventHandler<HTMLDivElement> = (item: any) => {
    setIsHovered(true);
    setActiveItem(item.id);
  };

  const handleMouseLeave: React.TouchEventHandler<HTMLDivElement> &
    React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  const creditsArray: Credit[] = Object.values(item?.credits || {});
  const featuredVideo = item.featuredVideo?.asset?.url;

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((error: any) => {
        console.error("Error playing video:", error);
      });
    } else if (!inView && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [inView]);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  return (
    <StyledVideoComponent
      isHovered={isHovered}
      isActive={activeItem === item.id}
      onMouseEnter={() => handleMouseEnter(item)}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => handleMouseEnter(item)}
      onTouchEnd={handleMouseLeave}
      className={`single-video`}
      ref={ref}
    >
      <a href={`/videos/${item?.slug?.current}`}>
        <motion.div
          key={item?.projectTitle}
          className="single-video-title"
          animate={isHovered ? "show" : "hide"}
          initial="hide"
        >
          <h2 className="video-title">{item?.projectTitle}</h2>
        </motion.div>
        <div className="feature-image">
          <GatsbyImage
            alt=""
            style={
              single
                ? {
                    width: "100vw",
                    height: "100%",
                    opacity: isVideoLoaded ? 0 : 1,
                  }
                : { height: "100%", opacity: isVideoLoaded ? 0 : 1 }
            }
            imgStyle={{ objectFit: "cover", height: "100%" }}
            image={item?.featuredImage?.asset.gatsbyImageData}
          />
        </div>
        {featuredVideo && (
          <div className="mov-file">
            <video
              key={item?.id}
              id="background-video"
              muted
              loop
              playsInline
              ref={videoRef}
              poster={item.featuredImage?.asset?.url}
              className="video_grid___video"
              onLoadedData={onLoadedData}
              style={{ opacity: isVideoLoaded ? 1 : 0 }}
            >
              <source src={item.featuredVideo?.asset?.url} type="video/mp4" />
              <track default kind="description" srcLang="en" />
            </video>
          </div>
        )}

        <motion.div
          key={item.id}
          className="video-information"
          animate={isHovered ? "show" : "hide"}
          initial="hide"
        >
          <div className="credits">
            {creditsArray.map(({ job, name }, index) => (
              <p key={index} className="credit">
                <span className="credits-job">{job} </span>|{" "}
                <span className="credits-name">{name}</span>
              </p>
            ))}
          </div>
        </motion.div>
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
