import React from 'react';
import  { useQuery, gql } from '@apollo/client';
import  { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const IS_LOGGED_IN = gql`
	{
		isLoggedIn @client
	}
`;

const Pages = () => {
	return (
		<Router>
			<Layout>
				<Route exact path="/" component={Home} />
				<PrivateRoute path="/mynotes" component={MyNotes} />
				<PrivateRoute path="/favorites" component={Favorites} />
				<PrivateRoute path="/new" component={NewNote} />
				<PrivateRoute path="/edit/:id" component={EditNote} />
				<Route path="/note/:id" component={Note} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signin" component={SignIn} />
			</Layout>
		</Router>
	);
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { loading, error, data } = useQuery(IS_LOGGED_IN);
	// if loading display loading message
	if (loading) return <p>Incoming...</p>;
	// if there is an error fetching the data display
	if (error) return <p>Error! Miss Sushi</p>;
	// if the user logged route them to requested component else re direct to sign in
	return (
		<Route 
			{...rest}
			render={props =>
				data.isLoggedIn === true ? (
					<Component {...props} />
				) : (
					<Redirect 
						to={{
							pathname: '/signin',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);

};
export default Pages;