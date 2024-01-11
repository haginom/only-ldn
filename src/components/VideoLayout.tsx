import React, { lazy, Suspense } from "react";
import VideoRow from "./VideoRow";

interface VideoLayoutProps {
  PortfolioItems: any[]; // Adjust the type based on your actual data structure
}

import SingleVideo from "./SingleVideo";
// const VideoRow = lazy(() => import("./VideoRow"));

const generateLayoutForThrees = (itemsArray: any) => {
  let layout = [];
  let layoutType = 0;

  for (let i = 0; i < itemsArray.length; i += 3) {
    if (i === 0) {
      layout.push(
        <SingleVideo
          key={i}
          single={true}
          className="full_layout"
          item={itemsArray[i]}
        />
      );
      i -= 2;
      continue;
    }

    switch (layoutType) {
      case 0:
        layout.push(
          <VideoRow i={i} rowStyle="style_a" itemsArray={itemsArray} />
        );
        break;
      case 1:
        layout.push(
          <VideoRow i={i} rowStyle="style_b" itemsArray={itemsArray} />
        );
        break;
      case 2:
        layout.push(
          <VideoRow i={i} rowStyle="style_c" itemsArray={itemsArray} />
        );
        break;
    }

    layoutType = (layoutType + 1) % 3;
  }

  return layout;
};

const generateLayoutRemainderOne = (itemsArray: any) => {
  let layout = [];
  let layoutType = 0;
  console.log(itemsArray);
  for (let i = 0; i < itemsArray.length; i += 3) {
    if (i === 0) {
      layout.push(
        <Suspense fallback={<div>Loading...</div>} key={i}>
          <SingleVideo
            single={true}
            className="full_layout"
            item={itemsArray[i]}
          />
        </Suspense>
      );
      i -= 2;
      continue;
    }

    switch (layoutType) {
      case 0:
        layout.push(
          <VideoRow i={i} rowStyle="style_a" itemsArray={itemsArray} />
        );
        break;
      case 1:
        layout.push(
          <VideoRow i={i} rowStyle="style_b" itemsArray={itemsArray} />
        );
        break;
      case 2:
        layout.push(
          <VideoRow i={i} rowStyle="style_c" itemsArray={itemsArray} />
        );
        break;
    }
    layoutType = (layoutType + 1) % 3;

    if (itemsArray.length - 1 - (layout.length - 1) * 3 === 4) {
      layout.push(
        <Suspense fallback={<div>Loading...</div>} key={i + 1}>
          <div className="row style_d">
            <SingleVideo
              single={false}
              className="layout_fourth"
              item={itemsArray[i + 3]}
            />
            <SingleVideo
              single={false}
              className="layout_fourth"
              item={itemsArray[i + 4]}
            />
            <SingleVideo
              single={false}
              className="layout_fourth"
              item={itemsArray[i + 5]}
            />
            <SingleVideo
              single={false}
              className="layout_fourth"
              item={itemsArray[i + 6]}
            />
          </div>
        </Suspense>
      );
      break;
    }
  }

  return layout;
};

const generateLayoutRemainderTwo = (itemsArray: any) => {
  let layout = [];
  let layoutType = 0;

  for (let i = 0; i < itemsArray.length; i += 3) {
    if (i === 0) {
      layout.push(
        <Suspense fallback={<div>Loading...</div>} key={i}>
          <SingleVideo
            single={true}
            className="full_layout"
            item={itemsArray[i]}
          />
        </Suspense>
      );
      i -= 2;
      continue;
    }
    if (i === 1) {
      layout.push(
        <div className="row style_d">
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i]}
          />
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 1]}
          />
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 2]}
          />
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 3]}
          />
        </div>
      );
      i += 4;
    }
    switch (layoutType) {
      case 0:
        layout.push(
          <VideoRow i={i} rowStyle="style_a" itemsArray={itemsArray} />
        );
        break;
      case 1:
        layout.push(
          <VideoRow i={i} rowStyle="style_b" itemsArray={itemsArray} />
        );
        break;
      case 2:
        layout.push(
          <VideoRow i={i} rowStyle="style_c" itemsArray={itemsArray} />
        );
        break;
    }
    layoutType = (layoutType + 1) % 3;

    if (itemsArray.length - i === 7) {
      layout.push(
        <div className="row style_d">
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 3]}
          />
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 4]}
          />
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 5]}
          />
          <SingleVideo
            single={false}
            className="layout_fourth"
            item={itemsArray[i + 6]}
          />
        </div>
      );
      break;
    }
  }

  return layout;
};

const VideoLayout: React.FC<VideoLayoutProps> = ({ PortfolioItems }) => {
  let divisibleByThree = (PortfolioItems.length - 1) % 3;
  console.log(divisibleByThree);
  return (
    <section className="playlist-content">
      {divisibleByThree === 0 && generateLayoutForThrees(PortfolioItems)}
      {divisibleByThree === 1 && generateLayoutRemainderOne(PortfolioItems)}
      {divisibleByThree === 2 && generateLayoutRemainderTwo(PortfolioItems)}
    </section>
  );
};

export default VideoLayout;
