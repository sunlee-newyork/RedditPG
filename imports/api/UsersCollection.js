import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';

const errorCodes = {
	NOT_AUTHORIZED: 'NOT_AUTHORIZED',
	DATABASE_ERROR: 'DATABASE_ERROR'
};

if (Meteor.isServer) {
	Meteor.publish("allUserData", () => {
	    return Meteor.users.find({});
	});	
}

Meteor.methods({
	'users.get'(name) {
		if (Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
			return Meteor.users().findOne({"profile.name": name});
		} else {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to get users.');
		}
	},

	'users.create'(options) {
		if (Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
			const newUser = {
				email: options.user.email
			}

			var newUserId = Accounts.createUser(options.user);
			Roles.addUsersToRoles(newUserId, [options.roles], Roles.GLOBAL_GROUP);
		} else {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to create new users.');
		}
	},

	'users.delete'(userId) {
		check(userId, String);

		if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to delete users.');
		}
	},

	'users.updateRoles'(options) {
		check(options, Object);
		check(options.userId, String);
		check(options.roles, Array);

		if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to user data.');
		}

		Roles.removeUsersFromRoles(options.userId, ['poster', 'mod', 'admin'], Roles.GLOBAL_GROUP);
		Roles.addUsersToRoles(options.userId, options.roles, Roles.GLOBAL_GROUP);
	}
});