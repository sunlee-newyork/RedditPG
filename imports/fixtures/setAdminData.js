import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

if (Meteor.isServer) {
	const roles = Roles.getAllRoles().fetch();
	let adminExists = false;

	roles.forEach((role) => {
		if (role.name == 'admin') {
			adminExists = true;
		}
	});

	if (!adminExists) {
		const adminId = Meteor.settings.private.admin.id;
		Roles.addUsersToRoles(adminId, 'admin', Roles.GLOBAL_GROUP);
	}
}