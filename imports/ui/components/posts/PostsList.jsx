import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import PostPreview from './PostPreview';

const PostsList = ({posts, user}) => {
	return (
		<div style={{padding: 30}}>
			{posts.map(post => 
				<PostPreview
					key={post._id}
					post={post}
				/>
			)}
		</div>
	);
}

export default PostsList;