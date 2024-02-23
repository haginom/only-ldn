import React, { lazy, Suspense } from "react";
import SingleVideo from "./SingleVideo"; // Make sure to import SingleVideo or update the import path
import { motion } from "framer-motion";

interface VideoRowProps {
  i: number;
  rowStyle: string;
  itemsArray: any[];
}

const AnimatedSingleVideo = ({
  motionKey,
  singleVideoSingle,
  singleVideoItem,
  className,
}: {
  motionKey: any;
  singleVideoSingle: any;
  singleVideoItem: any;
  className: any;
}) => {
  return (
    <motion.div
      className={`single-video ${className}`}
      key={motionKey}
      initial={{ scale: 0.75, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, delay: 0, filter: "blur(10px)" },
      }}
    >
      <SingleVideo single={singleVideoSingle} item={singleVideoItem} />
    </motion.div>
  );
};

const VideoRow: React.FC<VideoRowProps> = ({ i, rowStyle, itemsArray }) => {
  const renderVideos = (
    startIndex: number,
    endIndex: number,
    className: string
  ) => {
    return itemsArray.slice(startIndex, endIndex).map((item, index) => {
      return (
        <AnimatedSingleVideo
          key={item.id}
          className={className}
          motionKey={item.id}
          singleVideoSingle={false}
          singleVideoItem={item}
        />
      );
    });
  };

  return (
    <div className={`row ${rowStyle}`}>
      {rowStyle === "style_a" && (
        <>
          {renderVideos(i, i + 1, "layout_half")}
          <div className="quarter-wrapper">
            {renderVideos(i + 1, i + 3, "layout_quarter")}
          </div>
        </>
      )}
      {rowStyle === "style_b" && (
        <>
          <div className="quarter-wrapper">
            {renderVideos(i, i + 2, "layout_quarter")}
          </div>
          {renderVideos(i + 2, i + 3, "layout_half")}
        </>
      )}
      {rowStyle !== "style_a" && rowStyle !== "style_b" && (
        <>{renderVideos(i, i + 3, "layout_third")}</>
      )}
    </div>
  );
};

export default VideoRow;
