import React from "react";
import Clarifai from "clarifai";

import ImageSearchForm from "./components/ImageSearchForm/ImageSearchForm";
import FaceDetect from "./components/FaceDetect/FaceDetect";
import { clarifaiAPIKey } from "./constants";
import "./App.css";

const app = new Clarifai.App({
  apiKey: clarifaiAPIKey,
});

export default function App() {
  const [input, setInput] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [box, setBox] = React.useState({});

  const calculateFaceLocation = (data) => {
    let result = [];
    if (Array.isArray(data.outputs[0].data.regions)) {
      data.outputs[0].data.regions.forEach((item) => {
        result.push(item.region_info.bounding_box);
      })
    }

    let box = [];
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    result.forEach((item) => {
      box.push({
        leftCol: item.left_col * width,
        topRow: item.top_row * height,
        rightCol: width - item.right_col * width,
        bottomRow: height - item.bottom_row * height,
      });
    });
    return box;
  };
  const displayFaceBox = (box) => {
    setBox(box)
  };

  const onInputChange = (event) => {
    setInput({ input: event.target.value })
  };

  const onSubmit = () => {
    setImageUrl({ imageUrl: input.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input.input)
      .then((response) =>
        displayFaceBox(calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <ImageSearchForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
      <FaceDetect box={box} imageUrl={imageUrl.imageUrl} />
    </div>
  );
}
