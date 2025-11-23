'use client';
import { ApolloProvider } from '@apollo/client/react';
import { useApollo } from './apollo-client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = useApollo(null);
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}