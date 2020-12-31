
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { NEW_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';


const NewNote =  props => {
	useEffect(() => {
		// update the doc
		document.title = 'New Note - Notedly';
	});

	const [data, { loading, error }] = useMutation(NEW_NOTE, {
		// refetch the GET_NOTES query to update the cache
		refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }]
		onCompleted: data => {
			// when complete, redirect the user to the note page
		props.history.push(`note/${data.newNote.id}`);
		}
	});

	return (
		<React.Fragment>
	{/* as the mutation is loading, display loading message */}
			{loading && <p>Incoming...</p>}
	{/* if theres an error, display error message */}
			{error && <p>Error saving the note</p>}
	{/* the NoteForm component, passing the mutation data as a prop */}
			<NoteForm action={data} />;
		</React.Fragment>
	);
};

export default NewNote;