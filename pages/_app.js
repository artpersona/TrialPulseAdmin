import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../layouts/Layout";
import AuthProvider from "../shared/contexts/AuthContext";
import SponsorProvider from "../shared/contexts/SponsorsContext";
import ProtocolProvider from "../shared/contexts/ProtocolContext";
import { ProtectedRoute } from "../components";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthProvider>
      <ProtocolProvider>
        <SponsorProvider>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
              integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
              crossOrigin="anonymous"
            />
          </Head>

          {router.pathname !== "/login" ? (
            <ProtectedRoute>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ProtectedRoute>
          ) : (
            <Component {...pageProps} />
          )}
        </SponsorProvider>
      </ProtocolProvider>
    </AuthProvider>
  );
}

export default MyApp;
