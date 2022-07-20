import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { useEffect, useState } from "react";
// import Login from  '../components/login';
import Login from "./login";
import { Suspense } from "react";
import '../i18next'

const clientSideEmotionCache = createEmotionCache();

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(undefined);

  useEffect(() => {
    headers;
    if (isLoading) {
      verifyAccessToken();
    }
  }, [isLoading]);

  const verifyAccessToken = async () => {
    const token = await localStorage.getItem("token");
    setAccessToken(token);
    setIsLoading(false);
  };

  if (isLoading) return <div> loading...</div>;

  return (
    <CacheProvider value={emotionCache}>
      <Suspense fallback={null}>
        <Head>
          <title>Material Kit Pro</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {!accessToken && !isLoading ? <Login /> : getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </Suspense>
    </CacheProvider>
  );
};

export default App;
