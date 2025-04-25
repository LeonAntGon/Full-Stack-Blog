import "@/styles/globals.css";
import Head from 'next/head';
import Header from "@/components/Header";
import Aos from "@/components/Aos";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <Aos>
          <Component {...pageProps} />
        </Aos>
      </main>
    </>
  );
}
