import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';

import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AdminUser extends React.Component {
	constructor(props) {
		super(props);

		this.addToPoster = this.addToPoster.bind(this);
		this.addToMod = this.addToMod.bind(this);
		this.addToAdmin = this.addToAdmin.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}

	addToPoster() {
		const {user} = this.props;

		Meteor.call('users.updateRoles', {userId: user._id, roles: ['poster']}, (err) => {
			if (err) {
				console.error("AdminUser - addToPoster error: ", err);
			}
		});
	}

	addToMod() {
		const {user} = this.props;

		Meteor.call('users.updateRoles', {userId: user._id, roles: ['mod']}, (err) => {
			if (err) {
				console.error("AdminUser - addToMod error: ", err);
			}
		});
	}

	addToAdmin() {
		const {user} = this.props;

		Meteor.call('users.updateRoles', {userId: user._id, roles: ['admin']}, (err) => {
			if (err) {
				console.error("AdminUser - addToAdmin error: ", err);
			}
		});
	}

	deleteUser() {
		const {user} = this.props;

		Meteor.call('users.delete', user._id, (err) => {
			if (err) {
				console.error("AdminUser - users.delete error: ", err);
			}
		});
	}

	render() {
		const {user} = this.props;

		return(
			<Card className="col-xs-12 col-md-5" style={{margin: "10px auto"}}>
				<CardHeader
					title={user.profile.name}
					subtitle={user.emails[0].address}
					avatar={<ActionAccountCircle />}
				/>
				<CardTitle title={"Role: " + Roles.getRolesForUser(user._id, Roles.GLOBAL_GROUP)} />
				<CardActions>
					{!Roles.userIsInRole(user._id, ['poster'], Roles.GLOBAL_GROUP) ? <FlatButton label="Make Poster" onTouchTap={this.addToPoster} /> : null}
					{!Roles.userIsInRole(user._id, ['mod'], Roles.GLOBAL_GROUP) ? <FlatButton label="Make Mod" onTouchTap={this.addToMod} /> : null}
					{!Roles.userIsInRole(user._id, ['admin'], Roles.GLOBAL_GROUP) ? <FlatButton label="Make Admin" onTouchTap={this.addToAdmin} /> : null}
					<RaisedButton label="Delete User" onTouchTap={this.deleteUser} />
				</CardActions>
			</Card>
		);
	}
}

export default AdminUser;