import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Accounts.config({
	sendVerificationEmail: false,
	forbidClientAccountCreation: false
});

Accounts.ui.config({
	passwordSignupFields: 'EMAIL_ONLY',
	minimumPasswordLength: 6
});

Accounts.onCreateUser(function (options, user) {
	user.profile = options.profile;

	return user;
});