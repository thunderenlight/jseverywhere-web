
import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';
import { SIGNUP_USER  } from '../gql/mutation';
import styled from 'styled-components';

import Button from '../components/Button';

const SIGNIN_USER = gql`
	mutation signIn($email: String, $password: String!) {
		signIn(email: $email, password: $password)
	}
	
`;
const Wrapper = styled.div`
	border: 1px solid #f5f4f0;
	max-width: 500px;
	padding: 1em;
	margin: 0 auto;
`;


const Form = styled.form`
	label,
	input {
		display: block;
		line-height: 2em;
	}

	input {
		width: 100%;
		margin-bottom: 1em;
	}
`;

// include the props passed to the component for later use
const SignUp = props => {
	// setting the default state of the form
	const [values, setValues] = useState();
	const onChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};
	useEffect(() => {
		//update the document title
		document.title = 'Sign Up - Notedly';
	});

const client = useApolloClient();
const [signUp, { loading, error }]= useMutation(SIGNIN_USER, {
		onCompleted: data => {
			localStorage.setItem('token', data.signUp);
			console.log(data.signUp);
			client.writeData({ data: { isLoggedIn: true } });
			props.history.push('/');

		}
	});

	return (
		<Wrapper>
			<h2>Sign Up</h2>
			<Form
				onSubmit={event => {
					event.preventDefault();
					console.log(values);
					signUp({
						variables: {
							...values
						}
					});
				}}
			>
				<label htmlFor="username">Username:</label>
				<input
					required
					type="text"
					id="username"
					name="username"
					placeholder="username"
					onChange={onChange}
				/>
				<label htmlFor="email">Email:</label>
				<input
					required
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					onChange={onChange}
				/>
				<label htmlFor="password">Password:</label>
				<input
					required
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={onChange}
				/>
				<button type="submit">Submit</button>
			</Form>
		</Wrapper>
	);
};

export default SignUp;