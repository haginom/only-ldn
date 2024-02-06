import React from "react";
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
}: {
  dataIntroRole?: boolean;
  motionKey: string;
  singleVideoSingle: any;
  singleVideoItem: any;
  className: string;
}) => {
  const [touched, setTouched] = React.useState(false);
  const { firstLoad, setFirstLoad } = useContext(FirstLoadContext) || {};

  React.useEffect(() => {
    if (touched && firstLoad) {
      const timer = setTimeout(() => {
        console.log("firstLoad", firstLoad);

        setFirstLoad(false);
      }, 2000); // Adjust the delay time as needed (in milliseconds)
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [touched]);

  const handleTouch = () => {
    if (!touched) {
      setTouched(true);
    }
  };

  console.log("firstLoad", firstLoad);

  return (
    <>
      {dataIntroRole ? (
        <motion.div
          {...(dataIntroRole && { "data-intro-role": "intro" })}
          className={`single-video ${className} ${
            firstLoad && !touched ? "first-load" : touched ? "shrink" : ""
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
              className={touched ? "shrink" : ""}
              data-intro-role="title"
            ></span>
          )}
          <SingleVideo
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
          <SingleVideo single={singleVideoSingle} item={singleVideoItem} />
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
  const { firstLoad, setFirstLoad } = useContext(FirstLoadContext) || {};

  const filteredPortfolioItems = selectedCategory
    ? PortfolioItems.filter((item: PortfolioItem) => {
        return (
          item.category &&
          Object.values(item.category).some(
            (categoryObj) =>
              categoryObj && categoryObj.category === selectedCategory
          )
        );
      })
    : PortfolioItems;

  if (filteredPortfolioItems.length > 0 && selectedCategory === null) {
    layout.push(
      <div
        className="full_layout"
        data-intro-role="intro"
        key={"C" + layout.length}
      >
        <AnimatedSingleVideo
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
