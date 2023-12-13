import React from "react";
import SingleVideo from "./SingleVideo"; // Make sure to import SingleVideo or update the import path

interface VideoLayoutProps {
  PortfolioItems: any[]; // Adjust the type based on your actual data structure
}

const generateLayoutForThrees = (itemsArray: any) => {
  let layout = [];
  let layoutType = 0;

  for (let i = 0; i < itemsArray.length; i += 3) {
    if (i === 0) {
      layout.push(
        <SingleVideo
          single={true}
          key={i}
          className="full_layout"
          item={itemsArray[i]}
        />
      );
      continue;
    }

    switch (layoutType) {
      case 0:
        layout.push(
          <div key={i + 1} className="row style_a">
            <SingleVideo
              single={false}
              key={i - 2}
              className="layout_half"
              item={itemsArray[i - 2]}
            />
            <div className="quarter-wrapper">
              <SingleVideo
                single={false}
                key={i - 2 + 1}
                className="layout_quarter"
                item={itemsArray[i - 2 + 1]}
              />
              <SingleVideo
                single={false}
                key={i - 2 + 2}
                className="layout_quarter"
                item={itemsArray[i - 2 + 2]}
              />
            </div>
          </div>
        );
        break;
      case 1:
        layout.push(
          <div key={i} className="row style_b">
            <div className="quarter-wrapper">
              <SingleVideo
                single={false}
                key={i - 2}
                className="layout_quarter"
                item={itemsArray[i - 2]}
              />
              <SingleVideo
                single={false}
                key={i - 2 + 1}
                className="layout_quarter"
                item={itemsArray[i - 2 + 1]}
              />
            </div>
            <SingleVideo
              single={false}
              key={i - 2 + 2}
              className="layout_half"
              item={itemsArray[i - 2 + 2]}
            />
          </div>
        );
        break;
      case 2:
        layout.push(
          <div key={i} className="row style_c">
            <SingleVideo
              single={false}
              key={i - 2}
              className="layout_third"
              item={itemsArray[i - 2]}
            />
            <SingleVideo
              single={false}
              key={i - 2 + 1}
              className="layout_third"
              item={itemsArray[i - 2 + 1]}
            />
            <SingleVideo
              single={false}
              key={i - 2 + 2}
              className="layout_third"
              item={itemsArray[i - 2 + 2]}
            />
          </div>
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
    if (i === 0) {
      layout.push(
        <SingleVideo
          single={true}
          key={i}
          className="full_layout"
          item={itemsArray[i]}
        />
      );
      continue;
    }

    switch (layoutType) {
      case 0:
        layout.push(
          <div key={i} className="row style_a">
            <SingleVideo
              single={false}
              key={i - 2}
              className="layout_half"
              item={itemsArray[i - 2]}
            />
            <div className="quarter-wrapper">
              <SingleVideo
                single={false}
                key={i - 2 + 1}
                className="layout_quarter"
                item={itemsArray[i - 2 + 1]}
              />
              <SingleVideo
                single={false}
                key={i - 2 + 2}
                className="layout_quarter"
                item={itemsArray[i - 2 + 2]}
              />
            </div>
          </div>
        );
        break;
      case 1:
        layout.push(
          <div key={i} className="row style_b">
            <div className="quarter-wrapper">
              <SingleVideo
                single={false}
                key={i - 2}
                className="layout_quarter"
                item={itemsArray[i - 2]}
              />
              <SingleVideo
                single={false}
                key={i - 2 + 1}
                className="layout_quarter"
                item={itemsArray[i - 2 + 1]}
              />
            </div>
            <SingleVideo
              single={false}
              key={i - 2 + 2}
              className="layout_half"
              item={itemsArray[i - 2 + 2]}
            />
          </div>
        );
        break;
      case 2:
        layout.push(
          <div key={i} className="row style_c">
            <SingleVideo
              single={false}
              key={i - 2}
              className="layout_third"
              item={itemsArray[i - 2]}
            />
            <SingleVideo
              single={false}
              key={i - 2 + 1}
              className="layout_third"
              item={itemsArray[i - 2 + 1]}
            />
            <SingleVideo
              single={false}
              key={i - 2 + 2}
              className="layout_third"
              item={itemsArray[i - 2 + 2]}
            />
          </div>
        );
        break;
    }
    layoutType = (layoutType + 1) % 3;

    if (itemsArray.length - 1 - (layout.length - 1) * 3 === 4) {
      layout.push(
        <div key={i + 1} className="row style_d">
          <SingleVideo
            single={false}
            key={i + 1}
            className="layout_fourth"
            item={itemsArray[i + 1]}
          />
          <SingleVideo
            single={false}
            key={i + 2}
            className="layout_fourth"
            item={itemsArray[i + 2]}
          />
          <SingleVideo
            single={false}
            key={i + 3}
            className="layout_fourth"
            item={itemsArray[i + 3]}
          />
          <SingleVideo
            single={false}
            key={i + 4}
            className="layout_fourth"
            item={itemsArray[i + 4]}
          />
        </div>
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
        <SingleVideo
          single={true}
          key={i}
          className="full_layout"
          item={itemsArray[i]}
        />
      );
      i -= 2;
      continue;
    }
    if (i === 1) {
      layout.push(
        <div key={i + 100} className="row style_d">
          <SingleVideo
            single={false}
            key={i}
            className="layout_fourth"
            item={itemsArray[i]}
          />
          <SingleVideo
            single={false}
            key={i + 1}
            className="layout_fourth"
            item={itemsArray[i + 1]}
          />
          <SingleVideo
            single={false}
            key={i + 2}
            className="layout_fourth"
            item={itemsArray[i + 2]}
          />
          <SingleVideo
            single={false}
            key={i + 3}
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
          <div key={i + 100} className="row style_a">
            <SingleVideo
              single={false}
              key={i}
              className="layout_half"
              item={itemsArray[i]}
            />
            <div className="quarter-wrapper">
              <SingleVideo
                single={false}
                key={i + 1}
                className="layout_quarter"
                item={itemsArray[i + 1]}
              />
              <SingleVideo
                single={false}
                key={i + 2}
                className="layout_quarter"
                item={itemsArray[i + 2]}
              />
            </div>
          </div>
        );
        break;
      case 1:
        layout.push(
          <div key={i + 100} className="row style_b">
            <div className="quarter-wrapper">
              <SingleVideo
                single={false}
                key={i}
                className="layout_quarter"
                item={itemsArray[i]}
              />
              <SingleVideo
                single={false}
                key={i + 1}
                className="layout_quarter"
                item={itemsArray[i + 1]}
              />
            </div>
            <SingleVideo
              single={false}
              key={i + 2}
              className="layout_half"
              item={itemsArray[i + 2]}
            />
          </div>
        );
        break;
      case 2:
        layout.push(
          <div key={i + 100} className="row style_c">
            <SingleVideo
              single={false}
              key={i}
              className="layout_third"
              item={itemsArray[i]}
            />
            <SingleVideo
              single={false}
              key={i + 1}
              className="layout_third"
              item={itemsArray[i + 1]}
            />
            <SingleVideo
              single={false}
              key={i + 2}
              className="layout_third"
              item={itemsArray[i + 2]}
            />
          </div>
        );
        break;
    }
    layoutType = (layoutType + 1) % 3;

    if (itemsArray.length - i === 7) {
      layout.push(
        <div key={i + 100} className="row style_d">
          <SingleVideo
            single={false}
            key={i + 3}
            className="layout_fourth"
            item={itemsArray[i + 3]}
          />
          <SingleVideo
            single={false}
            key={i + 4}
            className="layout_fourth"
            item={itemsArray[i + 4]}
          />
          <SingleVideo
            single={false}
            key={i + 5}
            className="layout_fourth"
            item={itemsArray[i + 5]}
          />
          <SingleVideo
            single={false}
            key={i + 6}
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

  return (
    <section className="playlist-content">
      {divisibleByThree === 0 && generateLayoutForThrees(PortfolioItems)}
      {divisibleByThree === 1 && generateLayoutRemainderOne(PortfolioItems)}
      {divisibleByThree === 2 && generateLayoutRemainderTwo(PortfolioItems)}
    </section>
  );
};

export default VideoLayout;
