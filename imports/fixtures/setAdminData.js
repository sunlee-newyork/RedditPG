import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
	const {admin} = Meteor.settings.private;

	if (!Accounts.findUserByEmail(admin.email)) {
		var userId = Accounts.createUser({
			email: admin.email,
			password: admin.password,
			profile: admin.profile
		});

		Roles.addUsersToRoles(userId, ['admin'], Roles.GLOBAL_GROUP);
	}
}
