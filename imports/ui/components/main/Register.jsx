import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { buttonStyles, buttonLabelStyles } from '../../../utils/AppTheme';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            registerFailed: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.register = this.register.bind(this);
        this.handleAlertOpen = this.handleAlertOpen.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
    }

    handleOpen() {
        this.setState({ open: true });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleAlertOpen() {
        this.setState({ registerFailed: true });
    }

    handleAlertClose() {
        this.setState({ registerFailed: false });
    }

    register() {
        var self = this;
        const {name, email, password} = this.refs;

        const user = {
            email: email.input.value,
            password: password.input.value,
            profile: {
                name: name.input.value
            }
        };

        Accounts.createUser(user, (err) => {
            if (err) {
                console.error("Meteor.createUser() failed.");
                self.handleAlertOpen();
            } else {
                Roles.addUsersToRoles(Meteor.userId(), ['poster'], Roles.GLOBAL_GROUP);
            }
        });
    }

    render() {
        return (
            <div id="login" className="end-xs">
                <FlatButton 
                    label="Register"
                    style={buttonStyles.large}
                    labelStyle={buttonLabelStyles.large}
                    onTouchTap={this.handleOpen}
                />

                <Dialog
                    title="Register for RedditPG"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width: 300}}
                >
                    <form>
                        <div className="row">
                            <TextField
                                ref="name"
                                hintText="Username"
                            />
                        </div>
                        <div className="row">
                            <TextField 
                                ref="email"
                                hintText="Email"
                            />
                        </div>
                        
                        <div className="row">
                            <TextField
                                ref="password"
                                hintText="Password Field"
                                floatingLabelText="Password"
                                type="password"
                            />
                        </div>

                        <div className="row center-xs">
                            <RaisedButton
                                label="Register"
                                className="end-xs"
                                style={buttonStyles.large}
                                labelStyle={buttonLabelStyles.large}
                                onTouchTap={this.register}
                            />
                        </div>
                    </form>

                    <Snackbar
                        open={this.state.registerFailed}
                        message="Register failed."
                        autoHideDuration={4000}
                        onRequestClose={this.handleAlertClose}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Register;