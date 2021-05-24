const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const { ObjectId } = Types;

const userSchema = new Schema({

	firstname: String,
	lastname: String,
	email: String,
	password: String,
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

const postSchema = new Schema({
	title: String,
	description: String,
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

const commentSchema = new Schema({
	replyPostId: ObjectId,
	title: String,
	description: String,
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

const projectSchema = new Schema({
	name: String,
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

const fileSchema = new Schema({
	name: String,
	path: String,
	projectId: ObjectId,
	createdOn: { type: Date, default: Date.now },
	updatedOn: { type: Date, default: Date.now },
});

const PostModel = mongoose.model("Post", postSchema);
const CommentModel = mongoose.model("Comment", commentSchema);
const UserModel = mongoose.model("User", userSchema);
const FileModel = mongoose.model("File", fileSchema);
const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = {
	UserModel,
	PostModel,
	CommentModel,
	FileModel,
	ProjectModel
};
