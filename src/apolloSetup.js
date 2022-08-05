import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloClient, InMemoryCache, split, HttpLink,
} from '@apollo/client';

const wsLink = new WebSocketLink({
  uri: 'ws://react-assessment.herokuapp.com/graphql',
  option: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'https://react-assessment.herokuapp.com/graphql',
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
            && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
