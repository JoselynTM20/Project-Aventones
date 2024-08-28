import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Ajusta la URL de tu servidor GraphQL aquí
const graphqlPort = 4000; // Asegúrate de que este puerto coincida con tu configuración de backend
const serverUrl = `http://localhost:${graphqlPort}/graphql`;

// Crea un HttpLink
const httpLink = createHttpLink({
  uri: serverUrl,
});

// Usa setContext para agregar el token de autenticación a los headers
const authLink = setContext((_, { headers }) => {
  // Obtén el token de autenticación desde el almacenamiento local (o de donde lo guardes)
  const token = localStorage.getItem('token');

  // Devuelve los headers con el token si existe
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Crea el cliente de Apollo
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combina el authLink con el HttpLink
  cache: new InMemoryCache(),
});

export default client;