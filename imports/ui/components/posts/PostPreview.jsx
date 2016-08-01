import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { buttonStyles, buttonLabelStyles } from '../../../utils/AppTheme';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import FormsyForm from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import PostPreviewContent from './PostPreviewContent';
import PostVotes from './PostVotes';

const style = {
	minHeight: 300,
	width: "100%",
	margin: "20px 0",
	padding: 20,
	display: 'block',
};

class PostPreview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false
		};

		this.deletePost = this.deletePost.bind(this);
		this.savePost = this.savePost.bind(this);
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.renderEditModifyButtons = this.renderEditModifyButtons.bind(this);
		this.renderOriginalModifyButtons = this.renderOriginalModifyButtons.bind(this);
		this.renderModifyButtons = this.renderModifyButtons.bind(this);
		this.renderEditView = this.renderEditView.bind(this);
		this.renderOriginalView = this.renderOriginalView.bind(this);
	}

	deletePost() {
		const {post} = this.props;

		Meteor.call('posts.delete', post, (err) => {
			if (err) {
				console.error("PostPreview - posts.delete error: ", err);
			}
		});
	}

	savePost() {
		const {title, url, description} = this.refs;
		const postId = this.props.post._id;
		const userId = this.props.post.userId;

		const updatePost = {
			_id: postId,
			title: title.state._value,
			url: url.state._value,
			description: description.state._value,
			userId: userId
		};

		Meteor.call('posts.update', updatePost, (err) => {
			if (err) {
				console.error("PostPreview - posts.update error: ", err);
			}

			this.toggleEditMode();
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
					onTouchTap={this.savePost}
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
					onTouchTap={this.deletePost}
				/>
			</div>
		);
	}

	renderModifyButtons() {
		return (
			<div style={{marginTop: 30}}>
				{this.state.editMode ? this.renderEditModifyButtons() : this.renderOriginalModifyButtons()}
			</div>
		);
	}

	renderEditView() {
		const {post} = this.props;

		return (
			<Formsy.Form ref="form">
	            <div className="row">
	                <FormsyText ref="title" name="title" value={post.title} required errorText="Title is required!" style={{width: "100%"}} />
	            </div>
	            
	            <div className="row">
	                <FormsyText ref="url" name="url" value={post.url} required errorText="URL is required!" style={{width: "100%"}} />
	            </div>

	            <div className="row">
					<FormsyText ref="description" name="description" value={post.description} multiLine={true} rows={1} rowsMax={2} style={{width: "100%"}} />
				</div>
	        </Formsy.Form>
		);
	}

	renderOriginalView() {
		const {post} = this.props;

		return (
			<PostPreviewContent
				post={post}
			/>
		);
	}

	render() {
		const {post} = this.props;
		const userId = Meteor.userId();
		const userAllowed = userId == post.userId || Roles.userIsInRole(userId, ['mod', 'admin']);

		return (
			<Paper style={style} zDepth={1}>
				<div className="row">
					{post.image 
						? <div className="col-xs-12 col-md-4 center-xs">
							<img src={post.image} style={{maxWidth: "100%", maxHeight: 260}} />
						</div>
						: null
					}
					<div className={post.image ? "col-xs-10 col-md-6" : "col-xs-10 col-md-10"}>
						{this.state.editMode ? this.renderEditView() : this.renderOriginalView()}
					</div>

					<div className="col-xs-2">
						<div className="row center-xs">
							<PostVotes id={post._id} votesCount={post.votesCount} />
						</div>
						{userAllowed ? this.renderModifyButtons() : null}
					</div>
				</div>
			</Paper>
		);
	}
}

export default PostPreview;