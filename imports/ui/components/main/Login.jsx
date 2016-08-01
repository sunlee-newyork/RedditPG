import { Meteor } from 'meteor/meteor';
import React from 'react';
import { buttonStyles, buttonLabelStyles } from '../../../utils/AppTheme';

import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loginFailed: false
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.login = this.login.bind(this);
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
        this.setState({ loginFailed: true });
    }

    handleAlertClose() {
        this.setState({ loginFailed: false });
    }

    login() {
        var self = this;
        Meteor.loginWithPassword(this.refs.email.input.value, this.refs.password.input.value, (err) => {
            if (err) {
                console.error("Meteor.loginWithPassword() failed.");
                self.handleAlertOpen();
            }
        });
    }

    render() {
        return (
        	<div id="login" className="end-xs">
        		<RaisedButton 
                    label="Login"
                    style={buttonStyles.large}
                    labelStyle={buttonLabelStyles.large}
                    onTouchTap={this.handleOpen}
                />

                <Dialog
                    title="Login to RedditPG"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{width: 300}}
                >
                    <form>
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
                                label="Login"
                                className="end-xs"
                                style={buttonStyles.large}
                                labelStyle={buttonLabelStyles.large}
                                onTouchTap={this.login}
                            />
                        </div>
                    </form>

                    <Snackbar
                        open={this.state.loginFailed}
                        message="Login failed. Please check your email or password."
                        autoHideDuration={4000}
                        onRequestClose={this.handleAlertClose}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Login;
