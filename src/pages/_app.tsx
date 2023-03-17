import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "../utils/api";

import "../styles/globals.css";
export { reportWebVitals } from "next-axiom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <Analytics />
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
