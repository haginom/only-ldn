import React from "react";
import styled from "styled-components";

interface VideoProps {
  videoSrcURL: string;
}

const Video: React.FC<VideoProps> = ({ videoSrcURL }) => (
  <div className="video-page--div">
    <img className="ratio" src="http://placehold.it/16x9" />
    <iframe
      src={videoSrcURL}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    />
  </div>
);

export default Video;
