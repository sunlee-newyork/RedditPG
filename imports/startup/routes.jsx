import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import MainLayout from '../ui/containers/MainLayout';
import HomePage from '../ui/containers/HomePage';
import PostPage from '../ui/containers/PostPage';
import UserPostPage from '../ui/containers/UserPostPage';
import AdminPage from '../ui/containers/AdminPage';

FlowRouter.route('/', {
	name: 'homepage',
	action: () => {
		mount(MainLayout, { content: <HomePage /> });
	}
});

FlowRouter.route('/posts/:id', {
	name: 'post',
	action: (params, queryParams) => {
		mount(MainLayout, { content: <PostPage id={params.id} /> });
	}
});

FlowRouter.route('/posts/user/:name', {
	name: 'posts.user',
	action: (params, queryParams) => {
		mount(MainLayout, { content: <UserPostPage id={params.name} /> });
	}
});

FlowRouter.route('/admin', {
	name: 'admin',
	action: () => {
		mount(MainLayout, { content: <AdminPage /> });
	},
	triggersEnter: () => {
		const isAdmin = Roles.userIsInRole(Meteor.user(), ['admin'], Roles.GLOBAL_GROUP);

		if (!isAdmin) {
			FlowRouter.go('/');
		}
	}
})

FlowRouter.route('/logout', {
	name: 'logout',
	action: function() {
		Meteor.logout(() => {
			Meteor.logoutOtherClients();

			FlowRouter.go('/');
		});
	}
});