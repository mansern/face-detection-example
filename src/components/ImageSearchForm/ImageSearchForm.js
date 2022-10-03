import React from "react";

const ImageSearchForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="ma5">
      <div className="center">
        <div className=" center pa4 br3">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-blue"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSearchForm;
