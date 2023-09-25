import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/Paging.css"
import type { AppProps } from "next/app";
// import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <AuthProvider>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  // </AuthProvider>
  );
}
