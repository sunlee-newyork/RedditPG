import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import AdminUser from '../components/admin/AdminUser';

class AdminPageImpl extends React.Component {
	constructor(props) {
		super(props);

		this.createUser = this.createUser.bind(this);
	}

	createUser() {

	}

	render() {
		const {users} = this.props;

		return (
			<div id="admin-page" style={{marginTop: 40}}>
				<div className="users-cards row">
					<div className="col-xs-10 col-xs-offset-1">
						<div className="row">
							{users.map(user =>
								<AdminUser key={user._id} user={user} />
							)}
						</div>
					</div>
				</div>
			</div>
		);	
	}
}

export default createContainer(() => {
	Meteor.subscribe('allUserData');
	const users = Meteor.users.find({}).fetch({});

	return {
		users
	};
}, AdminPageImpl);