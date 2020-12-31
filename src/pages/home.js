import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useQuery } from '@apollo/client';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import  { GET_NOTES } from '../gql/query';


const Home = () => {
	//query hook
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
	if (loading) return <p>Incoming...</p>;

	if (error) return <p>Error!</p>;
		return (
			// add a React.Fragment element to provide a parent element
			<React.Fragment>
				<NoteFeed notes={data.noteFeed.notes}/>
		{/* only display the load more button if there is more hasNextPage is true*/}
				{data.noteFeed.hasNextPage && (
					<Button
						onClick={() =>
							fetchMore({
								variables: {
									cursor: data.noteFeed.cursor
								},
								updateQuery: (previousResult, {
									fetchMoreResult }) => {
									return {
										noteFeed: {
											cursor: fetchMoreResult.noteFeed.cursor,
											hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
											// combine the new and old
											notes: [
											...previousResult.noteFeed.notes,
											...fetchMoreResult.noteFeed.notes
											],
											__typename: 'noteFeed'
										}
									};
								}
							})
						}
					>
						Load more
					</Button>
				)}
			</React.Fragment>
		);
};

export default Home;
