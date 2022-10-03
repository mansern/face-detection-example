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
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
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
