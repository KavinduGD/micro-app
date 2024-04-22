import axios from "axios";
import buildClient from "../api/build-client";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server, requests should be made with full domain
    const baseURL = "http://www.kavindugihan.site/";
    const headers = req ? req.headers : {}; // Ensure req exists before accessing headers

    return axios.create({
      baseURL,
      headers,
    });
  } else {
    // We are in the browser, requests can be made with a relative URL
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
