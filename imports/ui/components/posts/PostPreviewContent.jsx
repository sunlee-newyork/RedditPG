import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

class PostPreviewContent extends React.Component {
	constructor(props) {
		super(props);

		this.goToPostPage = this.goToPostPage.bind(this);
	}

	goToPostPage() {
		const {post} = this.props;

		FlowRouter.go('/posts/' + post._id);
	}

	render() {
		const {post} = this.props;
		const commentsCount = post.comments ? post.comments.length : 0;

		return (
			<div className="post-content">
				<h2 className="title" onClick={this.goToPostPage}>{post.title}</h2>
				<a className="url" href={post.url}>{post.url}</a>
				{post.description ? <p className="description">{post.description}</p> : null}				
				<p className="submission">Submitted on {post.dateCreated.toDateString()} by <a href={FlowRouter.path('/posts/user/' + post.username)}>{post.username}</a></p>
				<p className="comments">{commentsCount} comment{commentsCount == 1 ? "" : "s"}</p>
			</div>
		);
	}
};

export default PostPreviewContent;