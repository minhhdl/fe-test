import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("zoom-vanilla.js/dist/zoom-vanilla.min.js");
  }, []);
  return <Component {...pageProps} />;
}
