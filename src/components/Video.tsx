import React from "react";
import styled from "styled-components";

interface VideoProps {
  videoSrcURL: string;
}

const Video: React.FC<VideoProps> = ({ videoSrcURL }) => (
  <div className="video-page--div">
    <img
      className="ratio"
      src="https://placehold.co/1600x900/000000/FFFFFF/png"
    />
    <iframe
      src={`${videoSrcURL}?autoplay=1&loop=1&autopause=0`}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    />
  </div>
);

export default Video;
