const User = require("../models/User");

const userController = {
  async getUsers(req, res) {
    try {
      const dbUserData = await User.find().select("-password");

      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const dbUserData = await User.findOne({ _id: req.params.userID }).select(
        "-password"
      );

      if (!dbUserData) {
        return res.status(404).json({ message: "No user with this id" });
      }

      const sanitizedUser = dbUserData.toObject();
      delete sanitizedUser.password;

      res.json(sanitizedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateUser(req, res) {
    try {
      const dbUserData = await User.findOneandUpdate(
        { _id: req.params.userID },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!dbUserData) {
        return res.status(404).json({ messsage: "no user with this id" });
      }
      res.json(dbUserData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).send("User not found with the given ID");
      }

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(500).send("Failed to delete the user");
      }

      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = userController;
