import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import { iconStyles } from '../../../utils/AppTheme';
import { buttonStyles, buttonLabelStyles } from '../../../utils/AppTheme';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';
import UserAccess from './UserAccess';
import PostAddButton from '../posts/PostAddButton';

class AccountNavigation extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            registerFailed: false
        };

        this.goToAdminPage = this.goToAdminPage.bind(this);
        this.createUser = this.createUser.bind(this);
        this.logout = this.logout.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAlertOpen = this.handleAlertOpen.bind(this);
        this.handleAlertClose = this.handleAlertClose.bind(this);
        this.renderActionAccountCircle = this.renderActionAccountCircle.bind(this);
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

    goToAdminPage() {
        FlowRouter.go('/admin')
    }

    createUser() {
        var self = this;
        const {name, email, password, roles} = this.refs;

        const user = {
            email: email.input.value,
            password: password.input.value,
            profile: {
                name: name.input.value
            }
        };

        Meteor.call('users.create', {user: user, roles: roles.state.selected}, (err) => {
            if (err) {
                console.error('AccountNavigation - users.create error: ', err);
            } else {
                this.handleClose();
            }
        });
    }

    logout() {
        FlowRouter.go('/logout');
    }

    renderActionAccountCircle() {
        const {user} = this.props;

        const isAdmin = Roles.userIsInRole(user._id, ['admin'], Roles.GLOBAL_GROUP);

        return (
            <div className="row center-xs end-md">
                <div className="col-xs-6 col-md-3">
                    <PostAddButton />
                </div>
                <div className="col-xs-6 col-md-3 center-xs">
                    <IconMenu
                        iconButtonElement={
                            <IconButton
                                iconStyle={iconStyles.largeIcon}
                                style={iconStyles.large}
                            >
                                <ActionAccountCircle />
                            </IconButton>
                        }
                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                        <span style={{display: "block", margin: "1em", fontWeight: "bold"}}>{user.profile.name ? "Hi, " + user.profile.name : user.email}</span>
                        {isAdmin ? <MenuItem primaryText="Admin Page" onTouchTap={this.goToAdminPage} /> : null}
                        {isAdmin ? <MenuItem primaryText="New User" onTouchTap={this.handleOpen} /> : null}
                        <MenuItem primaryText="Sign out" onTouchTap={this.logout} />
                    </IconMenu>
                </div>

                <Dialog
                    title="Create New User"
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

                        <div className="row">
                            <RadioButtonGroup name="roles" ref="roles" style={{width: "100%", marginTop: 20}}>
                                <RadioButton value="poster" label="Make Poster" />
                                <RadioButton value="mod" label="Make Mod" />
                                <RadioButton value="admin" label="Make Admin" />
                            </RadioButtonGroup>
                        </div>

                        <div className="row center-xs">
                            <RaisedButton
                                label="Create"
                                className="end-xs"
                                style={buttonStyles.large}
                                labelStyle={buttonLabelStyles.large}
                                onTouchTap={this.createUser}
                            />
                        </div>
                    </form>

                    <Snackbar
                        open={this.state.registerFailed}
                        message="Create user failed."
                        autoHideDuration={4000}
                        onRequestClose={this.handleAlertClose}
                    />
                </Dialog>
            </div>
        );
    }

    render() {
        const {user} = this.props;

        return (
        	<div id="account-navigation">
                {user ? this.renderActionAccountCircle() : <UserAccess />}
        	</div>
        );
    }
}

AccountNavigation.propTypes = {
    user: React.PropTypes.object
}

export default createContainer(() => {
    const user = Meteor.user();

    return {
        user
    };
}, AccountNavigation);