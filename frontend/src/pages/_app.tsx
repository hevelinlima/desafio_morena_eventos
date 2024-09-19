import Layout from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { GlobalStyle } from "@/styles/global";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
