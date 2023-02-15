import "./App.css";
import "handsfree/build/lib/assets/handsfree.css";
import Home from "./modules/home/screen/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tutorial from "./modules/tutorial/screen/tutorial";
import Login from "./modules/login/screen/login";
import Rank from "./modules/rank/screen/rank";
import History from "./modules/history/screen/history";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Handsfree from "handsfree";

const handsfree = new Handsfree({
  // showDebug: true,
  minDetectionConfidence: 0.6,
  minTrackingConfidence: 0.6,
  hands: {
    enabled: true,
    maxNumHands: 1,
  },
  plugin: {
    palmPointers: {
      enabled: true,
      arePointersVisible: false,
      offset: {
        x: 0,
        y: 0,
      },
      speed: {
        x: 2,
        y: 2,
      },
    },
  },
});
handsfree.start();

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
