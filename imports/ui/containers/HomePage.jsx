import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PostsCollection from '../../api/PostsCollection';
import PostsList from '../components/posts/PostsList';

class HomePageImpl extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {posts} = this.props;

		return (
			<PostsList posts={posts} />
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('posts');
	const posts = PostsCollection.find({}, {sort: {votesCount: -1}}).fetch({});
	const user = Meteor.user();

	return {
		posts,
		user
	};
}, HomePageImpl);