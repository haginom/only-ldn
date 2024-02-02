import React from "react";
import VideoRow from "./VideoRow";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import SingleVideo from "./SingleVideo";

interface VideoLayoutProps {
  PortfolioItems: any[];
  selectedCategory: string | null;
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
      initial={{ scale: 0.75, opacity: 0, filter: "blur(100px)" }}
      animate={{
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.4, delay: 0 },
      }}
    >
      <SingleVideo single={singleVideoSingle} item={singleVideoItem} />
    </motion.div>
  );
};

const generateLayoutForThrees = (itemsArray: any) => {
  let layout = [];
  let layoutType = 0;

  for (let i = 0; i < itemsArray.length; i += 3) {
    switch (layoutType) {
      case 0:
        layout.push(
          <VideoRow
            key={"A" + layout.length}
            i={i}
            rowStyle="style_a"
            itemsArray={itemsArray}
          />
        );
        break;
      case 1:
        layout.push(
          <VideoRow
            key={"A" + layout.length}
            i={i}
            rowStyle="style_b"
            itemsArray={itemsArray}
          />
        );
        break;
      case 2:
        layout.push(
          <VideoRow
            key={"A" + layout.length}
            i={i}
            rowStyle="style_c"
            itemsArray={itemsArray}
          />
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

  for (let i = 0; i < itemsArray.length; i += 3) {
    if (itemsArray.length - layout.length * 3 === 4) {
      layout.push(
        <div className="row style_d" key={"B" + layout.length}>
          <AnimatedSingleVideo
            motionKey={itemsArray[i].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i]}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 1].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 1]}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 2].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 2]}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 3].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 3]}
          />
        </div>
      );
      i += 1;
      continue;
    }

    switch (layoutType) {
      case 0:
        layout.push(
          <VideoRow
            key={"B" + layout.length}
            i={i}
            rowStyle="style_a"
            itemsArray={itemsArray}
          />
        );
        continue;
      case 1:
        layout.push(
          <VideoRow
            key={"B" + layout.length}
            i={i}
            rowStyle="style_b"
            itemsArray={itemsArray}
          />
        );
        continue;
      case 2:
        layout.push(
          <VideoRow
            key={"B" + layout.length}
            i={i}
            rowStyle="style_c"
            itemsArray={itemsArray}
          />
        );
        continue;
    }

    layoutType = (layoutType + 1) % 3;
  }

  return layout;
};

const generateLayoutRemainderTwo = (itemsArray: any) => {
  let layout = [];
  let layoutType = 0;

  for (let i = 0; i < itemsArray.length; i += 3) {
    if (i === 0 || itemsArray.length - i === 4) {
      layout.push(
        <div className="row style_d" key={"C" + layout.length}>
          <AnimatedSingleVideo
            motionKey={itemsArray[i].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i]}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 1].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 1]}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 2].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 2]}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 3].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 3]}
          />
        </div>
      );
      i += 1;
      continue;
    }
    console.log(i, "i");

    if (i !== 4) {
      switch (layoutType) {
        case 0:
          layout.push(
            <VideoRow
              key={"C" + layout.length}
              i={i}
              rowStyle="style_a"
              itemsArray={itemsArray}
            />
          );
          break;
        case 1:
          layout.push(
            <VideoRow
              key={"C" + layout.length}
              i={i}
              rowStyle="style_b"
              itemsArray={itemsArray}
            />
          );
          break;
        case 2:
          layout.push(
            <VideoRow
              key={"C" + layout.length}
              i={i}
              rowStyle="style_c"
              itemsArray={itemsArray}
            />
          );
          break;
      }
      layoutType = layoutType + (1 % 3);
    }
  }
  return layout;
};

const VideoLayout: React.FC<VideoLayoutProps> = ({
  PortfolioItems,
  selectedCategory,
}) => {
  let layout = [];

  if (PortfolioItems.length > 0 && selectedCategory === null) {
    layout.push(
      <div className="full_layout" key={"C" + layout.length}>
        <AnimatedSingleVideo
          motionKey={PortfolioItems[0].id}
          className="full_layout"
          singleVideoSingle={true}
          singleVideoItem={PortfolioItems[0]}
        />
      </div>
    );
    PortfolioItems.shift();
  }

  let divisibleByThree = PortfolioItems.length % 3;

  if (divisibleByThree === 0) {
    layout = layout.concat(generateLayoutForThrees(PortfolioItems));
  } else if (divisibleByThree === 1) {
    layout = layout.concat(generateLayoutRemainderOne(PortfolioItems));
  } else if (divisibleByThree === 2) {
    layout = layout.concat(generateLayoutRemainderTwo(PortfolioItems));
  }

  return (
    <AnimatePresence initial={false} mode={"wait"}>
      <section className="playlist-content" key="layout">
        {layout}
      </section>
    </AnimatePresence>
  );
};

export default VideoLayout;
