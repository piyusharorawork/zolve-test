import type { AppProps /*, AppContext */ } from "next/app";
import "../styles/styles.css";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
