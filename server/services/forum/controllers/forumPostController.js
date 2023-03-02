const { connect, disconnect, ForumPost, ForumComment } = require("../mongo");
const { ObjectId } = require("mongodb");
const connectDB = connect();
const { User } = require("../models");
const { sequelize } = require("../models/");
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
  
  static async createHelpfulPost(req, res) {
    try {
      let { postId } = req.params;
      // console.log(postId);
      let { UserId } = req.body;
      // console.log(UserId);
      let postById = await ForumPost.findOne({ _id: new ObjectId(postId) });
      let helpfulDataBefore = postById.helpful;
      let helpfulAdded = helpfulDataBefore;
      const userPostgres = await User.findOne({ where: { id: UserId } });
      let helpfulAddedtoPostgres = userPostgres.helpful;
      if (!helpfulAdded.includes(UserId)) {
        helpfulAdded.push(UserId);
        helpfulAddedtoPostgres++;
        // console.log(helpfulAddedtoPostgres);
        await User.update(
          { helpful: helpfulAddedtoPostgres },
          {
            where: {
              id: UserId,
            },
          }
        );
      }
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { helpful: helpfulAdded } }
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
  static async deleteHelpfulPost(req, res) {
    try {
      let { postId } = req.params;
      // console.log(postId);
      let { UserId } = req.body;
      // console.log(UserId);
      let postById = await ForumPost.findOne({ _id: new ObjectId(postId) });
      let helpfulDataBefore = postById.helpful;
      let helpfulAdded = helpfulDataBefore;
      const userPostgres = await User.findOne({ where: { id: UserId } });
      let helpfulAddedtoPostgres = userPostgres.helpful;
      if (helpfulAdded.includes(UserId)) {
        var temp = helpfulAdded.filter(function (value, index, arr) {
          return value != UserId
        });
        helpfulAdded = temp
        helpfulAddedtoPostgres--
        // console.log(helpfulAddedtoPostgres);
        await User.update(
          { helpful: helpfulAddedtoPostgres },
          {
            where: {
              id: UserId,
            },
          }
        );
      }
      let result = await ForumPost.updateOne(
        { _id: new ObjectId(postId) },
        { $set: { helpful: helpfulAdded } }
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

}

module.exports = forumPostController;