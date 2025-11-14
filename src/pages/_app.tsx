import type { AppType } from "next/app";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";

// tRPC:
import { api } from "@/trpc/api";

// Styles:
import "@/styles/globals.css";
import { Toaster } from "sonner";

// Layout:
import Header from "@/layout/header";
import Footer from "@/layout/footer";

// SEO:
import { DefaultSeo } from "next-seo";
import { nextSeoConfig } from "next-seo.config";

// Dynamic imports for performance
const Show = dynamic(() => import("@/animations/show"), { ssr: false });

const App: AppType = ({ Component, pageProps, router }) => {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      <NextNProgress
        color="#979797"
        startPosition={0.3}
        stopDelayMs={200}
        height={1}
        showOnShallow={true}
        options={{ showSpinner: false }}
      />
      <main className="font-sans">
        <Header />
        <Show routerKey={router.route}>
          <Component {...pageProps} />
        </Show>
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#161616",
              fontFamily: "Satoshi",
              fontSize: "15px",
            },
          }}
        />
        <Footer />
      </main>
    </>
  );
};

export default api.withTRPC(App);
