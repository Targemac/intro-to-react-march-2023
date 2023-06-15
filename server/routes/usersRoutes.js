const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  userProfile,
  allUsers,
  editProfile,
  deleteProfile,
  logoutProfile,
} = require("../controllers/usersControllers");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

// @description register a user
// @route http://localhost:5000/api/users/register
// @method POST
// @privacy public
userRouter.post("/register", registerUser);

// @description login a user
// @route http://localhost:5000/api/users/login
// @method POST
// @privacy public
userRouter.post("/login", loginUser);

// @description user profile page
// @route http://localhost:5000/api/users/user
// @method get
// @privacy protected
userRouter.get("/user", isAuth, userProfile);

// @description get all users
// @route http://localhost:5000/api/users
// @method get
// @privacy protected
userRouter.get("/", isAdmin, allUsers);

// @description update user

// @route http://localhost:5000/api/users/:id
// @method put
// @privacy protected
userRouter.put("/:id", isAuth, editProfile);

// @description delete user
// @route http://localhost:5000/api/users/:id
// @method delete
// @privacy protected
userRouter.delete("/:id", isAuth, deleteProfile);

// @description logout user
// @route http://localhost:5000/api/users/logout/:id
// @method post
// @privacy protected
userRouter.post("/logout/:id", isAuth, logoutProfile);

module.exports = userRouter;
