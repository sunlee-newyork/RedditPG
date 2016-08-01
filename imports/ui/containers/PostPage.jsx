import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { buttonStyles, buttonLabelStyles } from '../../utils/AppTheme';
import PostsCollection from '../../api/PostsCollection';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FormsyForm from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import PostPageContent from '../components/posts/PostPageContent';
import PostVotes from '../components/posts/PostVotes';
import CommentsList from '../components/comments/CommentsList';

class PostPageImpl extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
            canSubmit: false,
            formInvalid: false,
            snackbarMessage: ""
		}

		this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
		this.submit = this.submit.bind(this);
		this.renderPostPageContent = this.renderPostPageContent.bind(this);
	}

	enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

	submit() {
		const {post} = this.props;
		const {text} = this.refs;
		const comment = {
			text: text.state._value,
			dateCreated: new Date()
		};

		Meteor.call('posts.addComment', {post: post, comment: comment}, (err) => {
			if (err) {
				console.error("PostPage - Error occurred while trying to add comment: ", err);
			} else {
				text.state._value = "";
			}
		});
	}

	renderPostPageContent() {
		const {post} = this.props;
		const commentsCount = post.comments ? post.comments.length : 0;

		return (
			<div className="col-xs-12 col-md-10 col-md-offset-1">
				<div className="row">
					{post.image 
						? <div className="col-xs-12 col-md-5 center-xs">
							<img src={post.image} style={{maxWidth: "100%", maxHeight: 400}} />
						</div>
						: null
					}
					<div className={post.image ? "col-xs-10 col-md-4" : "col-xs-10 col-md-9"}>
						<PostPageContent 
							post={post}
						/>
					</div>
					<div className="col-xs-2 col-md-2">
						<PostVotes 
							id={post._id}
							votesCount={post.votesCount}
						/>
					</div>
				</div>
				<div className="row" style={{marginTop: 50}}>
					<div className="col-xs-12 col-md-10 col-md-offset-1">
						<div className="row">
							<div className="col-xs-2" style={{fontSize: 25, lineHeight: 3}}>
								{commentsCount} comment{commentsCount == 1 ? "" : "s"}
							</div>
						</div>
					</div>

					<CommentsList comments={post.comments || []}/>

					{Meteor.user()
						? <div className="col-xs-12 col-md-10 col-md-offset-1" style={{marginTop: 50}}>
							<Formsy.Form
		                        ref="form"
		                        onValid={this.enableButton}
		                        onInvalid={this.disableButton}
		                        className="row"
		                    >
		                        <div className="col-xs-12 col-md-9">
		                            <FormsyText
										ref="text"
		                                name="text"
										hintText="Add comment"
										required
										multiLine={true}
										rows={1}
										rowsMax={4}
		                                style={{width: "100%"}}
									/>
		                        </div>

		                        <div className="col-xs-12 center-xs col-md-3">
		                            <RaisedButton
		                                label="Submit"
		                                className="end-xs"
		                                style={buttonStyles.large}
		                                labelStyle={buttonLabelStyles.large}
		                                disabled={!this.state.canSubmit}
		                                onTouchTap={this.submit}
		                            />
		                        </div>
		                    </Formsy.Form>
		                </div>
		                : null
					}
				</div>
			</div>
		);
	}

	render() {
		const {post} = this.props;

		return (
			<div className="row" style={{marginTop: 50}}>
				{post ? this.renderPostPageContent() : <div className="col-xs-12 center-xs"><CircularProgress size={2} /></div>}
			</div>
		);	
	}
}

export default createContainer((props) => {
	Meteor.subscribe('posts');
	const post = PostsCollection.findOne({_id: props.id});

	return {
		post
	};
}, PostPageImpl);