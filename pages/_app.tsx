import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

interface props {
  Component: any;
  pageProps: any;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: props) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
