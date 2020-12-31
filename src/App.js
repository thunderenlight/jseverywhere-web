// index.js
// This is the main entry point of our application
import React from 'react';
import ReactDOM from 'react-dom';

import  { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';

import GlobalStyle from '/components/GlobalStyle';

import Pages from '/pages';

import { setContext } from 'apollo-link-context';

//configure api uri cache and client

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem('token') || ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
	resolvers: {},
	connectToDevTools: true
});

const data = {
	isLoggedIn: !!localStorage.getItem('token')
};

cache.writeData({ data });

client.onResetStore(() => cache.writeData({ data }))
const App = () => {
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Pages />
		</ApolloProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));