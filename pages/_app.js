import "../styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../layouts/Layout";
// import AuthProvider from "../shared/contexts/AuthContext";
// import SponsorProvider from "../shared/contexts/SponsorsContext";
// import MessageProvider from "../shared/contexts/MessagesContext";
// import ProtocolProvider from "../shared/contexts/ProtocolContext";
import AppProvider from "../shared/contexts/AppContext";
// import SiteProvider from "../shared/contexts/SitesContext";
import { ProtectedRoute } from "../components";
import { lazy } from "react";

const AuthProvider = lazy(()=> import("../shared/contexts/AuthContext"))
const SponsorProvider = lazy(()=> import( "../shared/contexts/SponsorsContext"))
const MessageProvider = lazy(()=> import( "../shared/contexts/MessagesContext"))
const ProtocolProvider = lazy(()=> import( "../shared/contexts/ProtocolContext"))
// const AppProvider = lazy(()=> import( "../shared/contexts/AppContext"))
const SiteProvider = lazy(()=> import( "../shared/contexts/SitesContext"))
// const { ProtectedRoute } = lazy(()=> import( "../components"))

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<AuthProvider>
			<AppProvider>
				<ProtocolProvider>
					<SiteProvider>
						<SponsorProvider>
							<MessageProvider>
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
							</MessageProvider>
						</SponsorProvider>
					</SiteProvider>
				</ProtocolProvider>
			</AppProvider>
		</AuthProvider>
	);
}

export default MyApp;
