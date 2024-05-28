import React from "react";
import "@/styles/globals.css";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';

export default function App({ Component, pageProps }) {
  // useMemo to create and memoize the instance of QueryClient
  const queryClient = React.useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
    </QueryClientProvider>
  );
}
