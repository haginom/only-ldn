import React, { useEffect, useRef } from "react";
import VideoRow from "./VideoRow";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import SingleVideo from "./SingleVideo";
import { useContext } from "react";
import { FirstLoadContext } from "../context/firstLoadContext";

interface VideoLayoutProps {
  PortfolioItems: any[];
  selectedCategory: string | null;
  firstLoad?: boolean;
  setFirstLoad?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Category {
  category: string;
}
interface PortfolioItem {
  awards: string[];
  category: Category | null;
}

const AnimatedSingleVideo = ({
  motionKey,
  singleVideoSingle,
  singleVideoItem,
  className,
  dataIntroRole,
  lastVideo,
}: {
  dataIntroRole?: boolean;
  motionKey: string;
  singleVideoSingle: any;
  singleVideoItem: any;
  className: string;
  lastVideo: boolean;
}) => {
  const { firstLoad, setFirstLoad, animationComplete, setAnimationComplete } =
    useContext(FirstLoadContext) || {};

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (animationComplete && firstLoad) {
      timer = setTimeout(() => {
        setFirstLoad(false);
      }, 1000); // Adjust the delay time as needed (in milliseconds)
    } else if (firstLoad) {
      // Start animation after 3 seconds if no touch
      timer = setTimeout(() => {
        if (!animationComplete) {
          setAnimationComplete(true);
        }
      }, 5000); // 5 seconds delay
    }

    return () => clearTimeout(timer); // Cleanup function to clear the timer
  }, [animationComplete, firstLoad]);

  const handleTouch = () => {
    if (!animationComplete) {
      setAnimationComplete(true);
    }
  };

  return (
    <>
      {dataIntroRole ? (
        <motion.div
          {...(dataIntroRole && { "data-intro-role": "intro" })}
          className={`single-video ${className} ${
            firstLoad && !animationComplete
              ? "first-load"
              : animationComplete
              ? "shrink"
              : ""
          }`}
          key={motionKey}
          initial={{ scale: 0.75, opacity: 0, filter: "blur(100px)" }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.4, delay: 0 },
          }}
          onTouchStart={handleTouch}
        >
          {firstLoad && (
            <span
              className={animationComplete ? "shrink" : ""}
              data-intro-role="title"
            ></span>
          )}
          <SingleVideo
            firstLoad={firstLoad}
            animationComplete={animationComplete}
            lastVideo={lastVideo}
            {...(dataIntroRole && { "data-intro-role": "video" })}
            single={singleVideoSingle}
            item={singleVideoItem}
          />
        </motion.div>
      ) : (
        <motion.div
          className={`single-video ${className} `}
          key={motionKey}
          initial={{ scale: 0.75, opacity: 0, filter: "blur(100px)" }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: { duration: 0.4, delay: 0 },
          }}
          onTouchStart={handleTouch}
        >
          <SingleVideo
            firstLoad={firstLoad}
            animationComplete={animationComplete}
            single={singleVideoSingle}
            item={singleVideoItem}
            lastVideo={lastVideo}
          />
        </motion.div>
      )}
    </>
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
            length={itemsArray.length}
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
            length={itemsArray.length}
            key={"B" + layout.length}
            i={i}
            rowStyle="style_b"
            itemsArray={itemsArray}
          />
        );
        break;
      case 2:
        layout.push(
          <VideoRow
            length={itemsArray.length}
            key={"C" + layout.length}
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
            lastVideo={i + 1 === itemsArray.length}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 1].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 1]}
            lastVideo={i + 2 === itemsArray.length}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 2].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 2]}
            lastVideo={i + 3 === itemsArray.length}
          />
          <AnimatedSingleVideo
            motionKey={itemsArray[i + 3].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 3]}
            lastVideo={i + 4 === itemsArray.length}
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
            length={itemsArray.length}
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
            length={itemsArray.length}
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
            length={itemsArray.length}
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
            lastVideo={i + 1 === itemsArray.length}
            motionKey={itemsArray[i].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i]}
          />
          <AnimatedSingleVideo
            lastVideo={i + 2 === itemsArray.length}
            motionKey={itemsArray[i + 1].id}
            singleVideoSingle={false}
            className="layout_fourth"
            singleVideoItem={itemsArray[i + 1]}
          />
          <AnimatedSingleVideo
            lastVideo={i + 3 === itemsArray.length}
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
            lastVideo={i + 4 === itemsArray.length}
          />
        </div>
      );
      i += 1;

      continue;
    }

    if (itemsArray.length - i !== 4) {
      switch (layoutType) {
        case 0:
          layout.push(
            <VideoRow
              length={itemsArray.length}
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
              length={itemsArray.length}
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
              length={itemsArray.length}
              key={"C" + layout.length}
              i={i}
              rowStyle="style_c"
              itemsArray={itemsArray}
            />
          );
          break;
      }
      layoutType = (layoutType + 1) % 3;
    }
  }

  return layout;
};

const VideoLayout: React.FC<VideoLayoutProps> = ({
  PortfolioItems,
  selectedCategory,
}) => {
  let layout = [];

  const filteredPortfolioItems =
    selectedCategory === null || selectedCategory === " "
      ? PortfolioItems.filter((item) => item.isOnHomePage === true)
      : PortfolioItems.filter((item: PortfolioItem) => {
          return (
            item.category &&
            Object.values(item.category).some(
              (categoryObj) =>
                categoryObj && categoryObj.category === selectedCategory
            )
          );
        });

  if (
    (filteredPortfolioItems.length > 0 && selectedCategory === " ") ||
    (filteredPortfolioItems.length > 0 && selectedCategory === null)
  ) {
    layout.push(
      <div
        className="full_layout"
        data-intro-role="intro"
        key={"D" + layout.length}
      >
        <AnimatedSingleVideo
          lastVideo={false}
          dataIntroRole={true}
          motionKey={PortfolioItems[0].id}
          className="full_layout animated-full-video"
          singleVideoSingle={true}
          singleVideoItem={PortfolioItems[0]}
        />
      </div>
    );
    filteredPortfolioItems.shift();
  }

  let divisibleByThree = filteredPortfolioItems.length % 3;

  if (divisibleByThree === 0) {
    layout = layout.concat(generateLayoutForThrees(filteredPortfolioItems));
  } else if (divisibleByThree === 1) {
    layout = layout.concat(generateLayoutRemainderOne(filteredPortfolioItems));
  } else if (divisibleByThree === 2) {
    layout = layout.concat(generateLayoutRemainderTwo(filteredPortfolioItems));
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
