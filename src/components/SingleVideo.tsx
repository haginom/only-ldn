import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styled from "styled-components";

interface SingleVideoProps {
  item: any;
  single: boolean;
  lastVideo: boolean;
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
    text-align: left;
    text-transform: capitalize;
    max-width: 80%;
    top: initial;
    transform: initial;
    bottom: 3.25rem;
    position: absolute;
    height: fit-content;
    color: green;

    h2 {
      font-size: 1.2rem;
      font-weight: 700;
      line-height: 1.2;
    }
  }

  div.video-information {
    position: absolute;
    bottom: 0.6rem;
    text-align: left;
    text-transform: capitalize;
  }
  div.credits > p.credit {
    margin-bottom: 0rem;
    max-width: initial;
    font-size: 0.87rem;
  }

  div.credits {
    margin-botton: 3rem;
  }

  @media screen and (max-width: 628px) {
    h2.video-title {
      color: white;
    }
    p.credit {
      color: white;
    }
  }

  @media only screen and (min-width: 628px) and (max-width: 728px) {
    .single-video-title h2.video-title {
      font-size: 0.8rem;
    }
    div.credits > p.credit {
      font-size: 0.7rem;
    }
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

const SingleVideo: React.FC<SingleVideoProps> = ({
  item,
  single,
  lastVideo,
}) => {
  const [isInViewbox, setIsInViewbox] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("false");
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const options = {
    root: null,
    rootMargin: "-200px 0px -80px 0px",
    threshold: 1,
  };

  const callback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setIsInViewbox(true);
      } else {
        setIsInViewbox(false);
      }
    });
  };

  useEffect(() => {
    const textRefCurrent = textRef.current;
    if (!textRefCurrent) return; // Check if textRef.current is null

    const observer = new IntersectionObserver(callback, options);
    observer.observe(textRefCurrent);

    return () => {
      observer.disconnect();
    };
  }, [textRef]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.65,
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
      className="single-video"
      ref={ref}
    >
      <a href={`/videos/${item?.slug?.current}`}>
        <div className="feature-image">
          <GatsbyImage
            alt=""
            style={
              single
                ? {
                    width: "100vw",
                    height: "100%",
                    filter: isVideoLoaded ? "blur(1000px)" : "blur(0px)",
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
              className={`video_grid___video ${item.projectTitle}`}
              onLoadedData={onLoadedData}
              style={{ opacity: isVideoLoaded ? 1 : 0 }}
            >
              <source src={item.featuredVideo?.asset?.url} type="video/mp4" />
              <track default kind="description" srcLang="en" />
            </video>
          </div>
        )}
        <div
          className={`video-blurb ${isInViewbox || lastVideo ? "" : "blur"}`}
          ref={textRef}
        >
          <motion.div
            key={item?.projectTitle}
            className="single-video-title"
            animate={isHovered ? "show" : "hide"}
            initial="hide"
          >
            <h2 className="video-title">{item?.projectTitle}</h2>
          </motion.div>

          <motion.div
            key={item.id}
            className="video-information"
            animate={isHovered ? "show" : "hide"}
            initial="hide"
          >
            <div className="credits">
              {creditsArray.map(({ job, name }, index) => (
                <p
                  key={index}
                  className={`credit ${job ? "left-margin" : "no-left-margin"}`}
                >
                  {job ? (
                    <>
                      <span className="credits-job">{job}</span>
                      {" |  "}
                    </>
                  ) : null}
                  <span className="credits-name">{name}</span>
                </p>
              ))}
            </div>
          </motion.div>
          <div className="awards">
            {item.awards && item.awards.length > 0
              ? item.awards.map((award: any, index: number) => (
                  <GatsbyImage
                    style={{ maxWidth: "100%" }}
                    key={index}
                    className="lozad"
                    alt={`${String(award.award)} logo`}
                    image={award.awardLogo.asset.gatsbyImageData}
                  />
                ))
              : null}
          </div>
        </div>
      </a>
    </StyledVideoComponent>
  );
};
export default SingleVideo;
