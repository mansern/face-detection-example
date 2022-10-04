import React from "react";

import "./FaceDetect.css";

const FaceDetect = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="" src={imageUrl} width="auto" heigh="auto" />
        {Object.keys(box).length > 0 ? (
          box.map((item) => (
            <div
              key={item.bottomRow}
              className='bounding-box'
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
              }}
            ></div>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default FaceDetect;
