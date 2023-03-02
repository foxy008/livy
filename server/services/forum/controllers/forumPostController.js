const { connect, disconnect, ForumPost, ForumComment } = require("../mongo");
const { ObjectId } = require("mongodb");
const connectDB = connect();
class forumPostController {
  static async getAllPost(req, res) {
    try {
      // await connectDB
      let allPost = await ForumPost.find().toArray();
      console.log(allPost);
      res.status(200).json(allPost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  static async createPost(req, res) {
    try {
      let { title, images, caption, UserId, helpful } = req.body;
      await ForumPost.insertOne({
        title,
        images,
        caption,
        UserId,
        helpful,
        createdAt: new Date(),
      });
      res.status(201).json({
        message: "successfully created",
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async getPostById(req, res) {
    try {
      let { postId } = req.params;
      let postById = await ForumPost.findOne({ _id: new ObjectId(postId) });
      if (postById) {
        res.status(200).json(postById);
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async updatePostById(req, res) {
    try {
      //   await connectDB
      let { postId } = req.params;
      console.log(postId);
      let { title, images, caption, UserId, helpful } = req.body;
      console.log(title, images, caption, UserId, helpful);
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { title, images, caption, UserId, helpful } }
      );
      if (result) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async deletePostById(req, res) {
    try {
      let { postId } = req.params;
      let result = await ForumPost.deleteOne({ _id: new ObjectId(postId) });
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async getCommentByPostId(req, res) {
    try {
      let { postId } = req.params;
      let comments = await ForumComment.find({ forumPostId: postId }).toArray();
      console.log(comments);
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async createComment(req, res) {
    try {
      let { postId } = req.params;
      let { text, UserId, helpful } = req.body;
      await ForumComment.insertOne({
        forumPostId: postId,
        text,
        UserId,
        helpful,
        createdAt: new Date(),
      });
      res.status(201).json({
        message: "successfully created",
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async updateComment(req, res) {
    try {
      let { postId, commentId } = req.params;
      let { text } = req.body;
      let result = await ForumComment.updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { text } }
      );
      if (result) {
        res.status(200).json({
          message: "successfully updated",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteComment(req, res) {
    try {
      let { postId, commentId } = req.params;
      let result = await ForumComment.deleteOne({
        _id: new ObjectId(commentId),
      });
      if (result.deletedCount === 1) {
        res.status(200).json({
          message: "successfully deleted",
        });
      } else {
        res.status(404).json({ message: "No documents matched the query" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = forumPostController;
