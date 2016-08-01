import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PostsCollection from '../../api/PostsCollection';
import PostsList from '../components/posts/PostsList';

class UserPostPageImpl extends React.Component {
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

export default createContainer((props) => {
	Meteor.subscribe('posts.byUsername', props.id);

	const posts = PostsCollection.find({username: props.id}).fetch({});

	return {
		posts: posts
	};
}, UserPostPageImpl);