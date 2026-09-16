import "@/styles/globals.css";
import Head from "next/head";
const pjson = require("/package.json");

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{`IC - Custom Games Equalizer v${pjson.version}`}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}