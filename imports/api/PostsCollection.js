import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { Roles } from 'meteor/alanning:roles';
import cheerio from 'cheerio';

const PostsCollection = new Mongo.Collection('posts');

const errorCodes = {
	NOT_AUTHORIZED: 'NOT_AUTHORIZED'
};

if (Meteor.isServer) {
	Meteor.publish('posts', () => {
		return PostsCollection.find();
	});
	Meteor.publish('posts.byUsername', (username) => {
		return PostsCollection.find({"username": username});
	})
}

Meteor.methods({
	'posts.updateVotes'(data) {
		check(data.id, String);
		check(data.isIncrement, Boolean);

		const incrementValue = data.isIncrement ? 1 : -1;

		return PostsCollection.update({_id: data.id}, {$inc: {votesCount: incrementValue}});
	},

	'posts.byUsername'(username) {
		check(username, String);

		const posts = PostsCollection.find({"username": username});

		return posts;
	},

	'posts.add'(post) {
		check(post.title, String);
		check(post.url, String);
		check(post.description, String);
		check(post.userId, String);
		check(post.username, String);
		check(post.votesCount, Number);
		check(post.dateCreated, Date);

		if (!Meteor.user()) {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to add a post.');
		}

		try {
			let $ = cheerio.load(HTTP.get(post.url).content, (err) => {
				console.error("PostsCollection - HTTP async response: ", err)
			});
			const ogImage = $('meta[property="og:image"]').attr('content');
			post.image = ogImage;
		} catch (e) {
			console.error("PostsCollection - Error while getting meta property of post's url: ", e.toString());
		}

		return PostsCollection.insert(post);
	},

	'posts.delete'(post) {
		check(post._id, String);

		if (this.userId == post.userId || Roles.userIsInRole(this.userId, ['mod', 'admin'], Roles.GLOBAL_GROUP)) {
			const item = {_id: post._id};

			return PostsCollection.remove(item);
		} else {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to delete this post.');
		}
	},

	'posts.update'(post) {
		check(post._id, String);
		check(post.title, String);
		check(post.url, String);
		check(post.description, String);

		if (this.userId == post.userId || Roles.userIsInRole(this.userId, ['mod', 'admin'], Roles.GLOBAL_GROUP)) {
			const item = {
				title: post.title,
				url: post.url,
				description: post.description
			};

			return PostsCollection.update({_id: post._id}, {$set: item});	
		} else {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to update this post.');
		}
	},

	'posts.addComment'(options) {
		const {post, comment} = options;
		check(post._id, String);
		check(comment.text, String);
		check(comment.dateCreated, Date);

		if (!Meteor.user()) {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to add comments.');
		}

		const commentId = new Meteor.Collection.ObjectID();

		const item = {
			_id: commentId._str,
			text: comment.text,
			dateCreated: comment.dateCreated,
			postId: post._id,
			username: Meteor.user().profile.name
		};

		return PostsCollection.update({_id: post._id}, {$push: {"comments": item}});	
	},

	'posts.deleteComment'(comment) {
		check(comment._id, String);
		check(comment.postId, String);
		check(comment.username, String);
		check(comment.text, String);
		check(comment.dateCreated, Date);

		if (Meteor.user().profile.name == comment.username || Roles.userIsInRole(this.userId, ['mod', 'admin'], Roles.GLOBAL_GROUP)) {
			return PostsCollection.update({_id: comment.postId, "comments._id": comment._id}, {$pull: {comments: {_id: comment._id}}});
		} else {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to delete this comment.');
		}	
	},

	'posts.updateComment'(comment) {
		check(comment._id, String);
		check(comment.postId, String);
		check(comment.username, String);
		check(comment.text, String);
		check(comment.dateCreated, Date);

		if (Meteor.user().profile.name == comment.username || Roles.userIsInRole(this.userId, ['mod', 'admin'], Roles.GLOBAL_GROUP)) {
			PostsCollection.update({_id: comment.postId, "comments._id": comment._id}, {$set: {"comments.$.text": comment.text}});
		} else {
			return new Meteor.Error(errorCodes.NOT_AUTHORIZED, 'User is not authorized to update this comments.');
		}
	}
});

export default PostsCollection;