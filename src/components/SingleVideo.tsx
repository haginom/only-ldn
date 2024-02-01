import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface SingleVideoProps {
  item: any;
  single: boolean;
}

interface Credit {
  job: string;
  name: string;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ item, single }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const handleMouseEnter: React.TouchEventHandler<HTMLDivElement> &
    React.MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
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

  const variants = {
    show: {
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
    hide: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 1,
      },
    },
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      ref={ref}
    >
      <a href={`/videos/${item?.slug?.current}`}>
        <motion.div
          key={item?.projectTitle}
          variants={variants}
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
              single ? { width: "100vw", height: "100%" } : { height: "100%" }
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
            >
              <source src={item.featuredVideo?.asset?.url} type="video/mp4" />
              <track default kind="description" srcLang="en" />
            </video>
          </div>
        )}

        <motion.div
          key={item.id}
          variants={variants}
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
    </article>
  );
};
export default SingleVideo;
