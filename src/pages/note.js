import React from 'react';
// import Graphql dependancies
import { useQuery } from '@apollo/client';
import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';



const NotePage = props => {
	// store the id found in url as a var
	let id = props.match.params.id;
	// query hook passing the id value as a var
	const { loading, error, data } = 
	useQuery(GET_NOTE, { variables: { id } });
	// if data is loading....
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error! Note not found</p>;
	return <Note note={data.note} />
};

export default NotePage;