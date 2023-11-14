import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import VideoDetail from "./components/video/VideoDetail";
import ActiveProducts from "./views/MyProducts/ActiveProducts";
import StatusProducts from "./views/MyProducts/StatusProducts";
import LoginPage from "./views/login";
import { Provider } from "react-redux";
import store from "./services/store";
import Support from "./views/Support";
import LatestRequest from "./views/RequestUpload/LatestRequest";
import ProcessedRequest from "./views/RequestUpload/ProcessedRequest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="my-videos">
            <Route path="*" element={<ActiveProducts />} />
            <Route path="active" element={<ActiveProducts />} />
            <Route path="status" element={<StatusProducts />} />
          </Route>
          <Route path="videos/:videoID" element={<VideoDetail />} />
          <Route path="request">
            <Route path="*" element={<LatestRequest />} />
            <Route path="latest" element={<LatestRequest />} />
            <Route path="processed" element={<ProcessedRequest />}/>
          </Route>
          <Route path="support" element={<Support />} />
          <Route path="*" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
