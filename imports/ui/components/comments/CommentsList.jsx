import React from 'react';
import Comment from './Comment';

class CommentsList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {comments} = this.props;

		return (
			<div className="col-xs-12 col-md-10 col-md-offset-1">
				{comments.map(comment => 
					<Comment
						key={comment.dateCreated}
						comment={comment}
					/>
				)}
			</div>
		);
	}
}

export default CommentsList;