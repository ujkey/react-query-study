import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
      if (query.state.data !== undefined) alert(`Error!!: ${error}`);
    },
    onSuccess: data => {
      console.log('Success👍', data);
    }
  })
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
