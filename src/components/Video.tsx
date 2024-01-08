import React from "react";

interface VideoProps {
  videoSrcURL: string;
}

const Video: React.FC<VideoProps> = ({ videoSrcURL }) => (
  <div className="video-page--div">
    <iframe
      src={videoSrcURL}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  </div>
);

export default Video;
