import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

class PostPageContent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {post} = this.props;

		return (
			<div className="post-content">
				<h1 className="title">{post.title}</h1>
				<a className="url" href={post.url}>{post.url}</a>
				{post.description ? <p className="description">{post.description}</p> : null}				
				<p className="submission">Submitted on {post.dateCreated.toDateString()} by <a href={FlowRouter.path('/posts/user/' + post.username)}>{post.username}</a></p>
			</div>
		);
	}
};

export default PostPageContent;