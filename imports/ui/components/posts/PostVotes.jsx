import React from 'react';
import { iconStyles } from '../../../utils/AppTheme';

import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';

const PostVotes = ({id, votesCount}) => {
	function addVote() {
		Meteor.call('posts.updateVotes', {id: id, isIncrement: true}, (err) => {
			if (err) {
				console.error("PostPreview = posts.updateVotes error: ", err);
			}
		});
	}

	function subtractVote() {
		Meteor.call('posts.updateVotes', {id: id, isIncrement: false}, (err) => {
			if (err) {
				console.error("PostPreview = post.updateVotes error: ", err);
			}
		});
	}

	return (
		<div id="post-votes">
			<div className="row center-xs">
				<IconButton
					onClick={addVote}
					iconStyle={iconStyles.smallIcon}
					style={iconStyles.small}
					disableTouchRipple={true}
				>
					<ThumbUp />
				</IconButton>
			</div>
			<div className="row center-xs">
				<span style={{fontSize: 30}}>{votesCount > 0 ? "+" + votesCount : votesCount}</span>
			</div>
			<div className="row center-xs">
				<IconButton
					onClick={subtractVote}
					iconStyle={iconStyles.smallIcon}
					style={iconStyles.small}
					disableTouchRipple={true}
				>
					<ThumbDown />
				</IconButton>
			</div>
		</div>
	);
};

export default PostVotes;