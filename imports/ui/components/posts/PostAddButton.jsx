import React from 'react';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { buttonStyles, buttonLabelStyles } from '../../../utils/AppTheme';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FormsyForm from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Snackbar from 'material-ui/Snackbar';

class PostAddButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            canSubmit: false,
            formInvalid: false,
            snackbarMessage: ""
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submit = this.submit.bind(this);
        this.handleAlertOpen = this.handleAlertOpen.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    handleOpen() {
    	this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleAlertOpen() {
        this.setState({ 
            formInvalid: true,
            snackbarMessage: "You must be logged in to post a link."
        });
    }

    handleAlertClose() {
        this.setState({ formInvalid: false });
    }

    enableButton() {
        this.setState({ canSubmit: true });
    }

    disableButton() {
        this.setState({ canSubmit: false });
    }

    showErrors() {
        const {form} = this.refs;

        form.updateInputsWithError({
            title: 'This field is required!',
            url: 'This field is required!'
        });
    }

    submit() {
        const {title, url, description} = this.refs;
        const user = Meteor.user();

        const newPost = {
            title: title.state._value,
            url: url.state._value,
            description: description.state._value || "",
            votesCount: 0,
            userId: user._id,
            username: user.profile.name,
            dateCreated: new Date()
        };

        Meteor.call('posts.add', newPost, (err) => {
            if (err) {
                console.error("PostAddButton - posts.add error: ", err);
            }

            this.handleClose();
        });
    }

    render() {
        return (
        	<div>
        		<RaisedButton 
                    label="Post"
                    style={buttonStyles.large}
                    labelStyle={buttonLabelStyles.large}
                    onTouchTap={this.handleOpen}
                />

                <Dialog
                    title="Post A Link"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width: 500}}
                >
                    <Formsy.Form 
                        ref="form"
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        onInvalidSubmit={this.showErrors}
                    >
                        <div className="row">
                            <FormsyText 
                                ref="title"
                                name="title"
                                hintText="Title"
                                required
                                errorText="Title is required!"
                                style={{width: "100%"}}
                            />
                        </div>
                        
                        <div className="row">
                            <FormsyText
                                ref="url"
                                name="url"
                                hintText="URL"
                                required
                                errorText="URL is required!"
                                style={{width: "100%"}}
                            />
                        </div>

                        <div className="row">
							<FormsyText
								ref="description"
                                name="description"
								hintText="Description"
								multiLine={true}
								rows={1}
								rowsMax={2}
                                style={{width: "100%"}}
							/>
						</div>

                        <div className="row center-xs">
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
                </Dialog>

                <Snackbar
	                open={this.state.formInvalid}
	                message={this.state.snackbarMessage}
	                autoHideDuration={4000}
	                onRequestClose={this.handleAlertClose}
	            />
            </div>
        );
    }
}

export default PostAddButton;