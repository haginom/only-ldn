import React from "react";
import SingleVideo from "./SingleVideo"; // Make sure to import SingleVideo or update the import path

interface VideoRowProps {
  i: number;
  rowStyle: string;
  itemsArray: any[];
}

const VideoRow: React.FC<VideoRowProps> = ({ i, rowStyle, itemsArray }) => {
  const renderVideos = (
    startIndex: number,
    endIndex: number,
    className: string
  ) => {
    return itemsArray
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <SingleVideo
          single={false}
          key={i + index}
          className={className}
          item={item}
        />
      ));
  };

  return (
    <div key={i} className={`row ${rowStyle}`}>
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
