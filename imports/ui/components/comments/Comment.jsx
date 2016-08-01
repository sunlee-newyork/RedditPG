import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { buttonStyles, buttonLabelStyles } from '../../../utils/AppTheme';

import FlatButton from 'material-ui/FlatButton';
import FormsyForm from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

class Comment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false
		};

		this.deleteComment = this.deleteComment.bind(this);
		this.saveComment = this.saveComment.bind(this);
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.renderEditModifyButtons = this.renderEditModifyButtons.bind(this);
		this.renderOriginalModifyButtons = this.renderOriginalModifyButtons.bind(this);
		this.renderModifyButtons = this.renderModifyButtons.bind(this);
		this.renderEditView = this.renderEditView.bind(this);
		this.renderOriginalView = this.renderOriginalView.bind(this);
	}

	deleteComment() {
		const {comment} = this.props;

		Meteor.call('posts.deleteComment', comment, (err) => {
			if (err) {
				console.error("Comment - posts.deleteComment error: ", err);
			}
		});
	}

	saveComment() {
		const {text} = this.refs;
		const {comment} = this.props;

		const updateComment = Object.assign(comment, {
			text: text.state._value
		});

		Meteor.call('posts.updateComment', updateComment, (err) => {
			if (err) {
				console.error("Comment - posts.updateComment error: ", err);
			} else {
				this.toggleEditMode();
			}
		});
	}

	toggleEditMode() {
		this.setState({editMode: !this.state.editMode});
	}

	renderEditModifyButtons() {
		return (
			<div className="row center-xs">
				<FlatButton 
					label="Save"
	                style={buttonStyles.small}
	                labelStyle={buttonLabelStyles.small}
					onTouchTap={this.saveComment}
				/>
				<FlatButton 
					label="Cancel"
					style={buttonStyles.small}
					labelStyle={buttonLabelStyles.small}
					onTouchTap={this.toggleEditMode}
				/>
			</div>
		);
	}

	renderOriginalModifyButtons() {
		return (
			<div className="row center-xs">
				<FlatButton 
					label="Edit"
	                style={buttonStyles.small}
	                labelStyle={buttonLabelStyles.small}
					onTouchTap={this.toggleEditMode}
				/>
				<FlatButton 
					label="Delete"
					style={buttonStyles.small}
					labelStyle={buttonLabelStyles.small}
					onTouchTap={this.deleteComment}
				/>
			</div>
		);
	}

	renderModifyButtons() {
		return (
			<div className="col-xs-2">
				{this.state.editMode ? this.renderEditModifyButtons() : this.renderOriginalModifyButtons()}
			</div>
		);
	}

	renderEditView() {
		const {comment} = this.props;

		return (
			<div className="col-xs-10">
				<Formsy.Form ref="form">
		            <div className="row">
		                <FormsyText 
		                	ref="text" 
		                	name="text" 
		                	value={comment.text} 
		                	required
		                	multiLine={true}
							rows={1}
							rowsMax={4}
		                	errorText="Text is required!" 
		                	style={{width: "100%"}} 
		                />
		            </div>
		        </Formsy.Form>
	        </div>
		);
	}

	renderOriginalView() {
		const {comment} = this.props;
		
		return (
			<div className="col-xs-10">
				<span style={{fontSize: 14}}>{comment.username} replied on {comment.dateCreated.toDateString()}</span>
				<p style={{fontSize: 18, margin: "5px 0 10px"}}>{comment.text}</p>
			</div>
		);
	}

	render() {
		const {comment} = this.props;
		const user = Meteor.user();
		const userAllowed = user && (user.profile.name == comment.username || Roles.userIsInRole(user._id, ['mod', 'admin']));

		return (
			<div className="row">
				{this.state.editMode ? this.renderEditView() : this.renderOriginalView()}

				{userAllowed ? this.renderModifyButtons() : null}
			</div>
		);
	}
}

export default Comment;