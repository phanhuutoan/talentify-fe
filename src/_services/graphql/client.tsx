"use client";
// ^ this file needs the "use client" pragma

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient as ApolloClientCSR,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

// export function makeServerClient() {
//   const httpLink = new HttpLink({
//     uri: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API,
//     fetchOptions: { cache: "no-store" },
//   });

//   return new ApolloClientSSR({
//     cache: new InMemoryCache(),
//     link: httpLink,
//   });
// }

// have a function to create a client for you
function makeClient() {
  console.log("first", process.env.SANITY_GRAPHQL_API);
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_SANITY_GRAPHQL_API,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClientCSR({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
