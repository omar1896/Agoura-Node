const path = require("path");
const User = require(path.join(__dirname, "../Models/User"));
const Bid = require(path.join(__dirname, "../Models/Bid"));
const Order = require(path.join(__dirname, "../Models/Order"));
const Apartment = require(path.join(__dirname, "../Models/Apartment"));

class ProfileController {
  async getUserProfile(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ error: "User Not Found" });
      }
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async updateUserProfile(req, res) {
    let userID = req.params.id;
    let { userName, email } = req.body;
    let userImage = req.body.images[0];
    try {
      let isUpdated = await User.findOneAndUpdate(
        { _id: userID },
        { name: userName, email, image: userImage },
        { new: true }
      );
      if (isUpdated) {
        return res.status(200).json({
          success: true,
          message: "user updated successfully",
          data: isUpdated,
        });
      } else {
        throw new Error("user not found");
      }
    } catch (error) {
      console.log(err);
      return res.json({
        success: false,
        message: err.message,
      });
    }
  }

  async updateUserImage(req, res) {
    let userID = req.user._id;
    let userImage = req.body.images[0];

    try {
      let isUpdated = await User.findOneAndUpdate(
        { _id: userID },
        { image: userImage },
        { new: true }
      );
      if (isUpdated) {
        return res.status(201).json({
          success: true,
          message: "user image updated successfully",
          data: isUpdated,
        });
      } else {
        throw new Error("user not found");
      }
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserBids(req, res) {
    try {
      const bidsData = await Bid.findOne({ user: req.user._id });
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: bidsData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "there is something wrong",
      });
    }
  }
  async getUserOrders(req, res) {
    try {
      const ordersData = await Order.findOne({ user: req.user._id });
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: ordersData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "there is something wrong",
      });
    }
  }
  async getUserApartments(req, res) {
    try {
      const apartmentsData = await Apartment.findOne({ user: req.user._id });
      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: apartmentsData,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "there is something wrong",
      });
    }
  }

  async changePassword(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        let updatedUser = await User.findOne({ email: email });
        updatedUser.password = password;
        await updatedUser.save();
      }
      return res.json({
        success: true,
        message: "password updated successfully",
      });
    } catch (error) {}
    return res.status(500).json({
      success: false,
      message: "there is something wrong",
    });
  }
}

module.exports = new ProfileController();
