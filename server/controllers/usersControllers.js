const UserModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @description register a user
// @route http://localhost:5000/api/users/register
// @method POST
// @privacy public
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // check if fields are empty
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // check if user is already exists
    const userExists = await UserModel.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ message: "User already exist!" });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // add user to database
    const newUser = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // if unable to add user
    if (!newUser) {
      return res.status(400).json({ message: "Unable to register user!" });
    }

    // user created and sending response to front-end
    return res.status(201).json({
      message: "User registration successful",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

// @description login a user
// @route http://localhost:5000/api/users/login
// @method POST
// @privacy public
const loginUser = async (req, res) => {
  // destructure email and password
  const { email, password } = req.body;

  // check if fields are empty or not
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // setup try...catch block
  try {
    // check if user already exists
    const userExist = await UserModel.findOne({ email });

    // if user does not exist
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist !" });
    }

    // check if email dont exist or password dont match
    if (!userExist || !(await bcrypt.compare(password, userExist.password))) {
      return res.status(400).json({ message: "Invalid credentials !" });
    }

    // generate a loggedIn token
    const token = await jwt.sign(
      { user: userExist },
      process.env.LOGIN_SECRET,
      { expiresIn: "1d" }
    );

    // store user id into session
    req.session.user_id = userExist._id;

    // initialize user session
    req.session.save((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: `Internal server errror ${err}` });
      } else {
        // response to client-side
        return res.status(200).json({
          message: "user successfully logged in",
          token: token,
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
};

// @description user profile page
// @route http://localhost:5000/api/users/user
// @method GET
// @privacy protected
const userProfile = async (req, res) => {
  // destructure id from params
  // const { id } = req.params;
  const user_id = req?.user;

  try {
    // check if user id is not available
    if (!user_id) {
      return res.status(403).json({ message: "Access denied !" });
    }

    // if user exists
    const user = await UserModel.findById(user_id);

    let data = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

// @description get all users
// @route http://localhost:5000/api/users
// @method get
// @privacy protected
const allUsers = async (req, res) => {
  // setup a try catch block
  try {
    const all_users = await UserModel.find();

    // if unable to fetch data
    if (!all_users) {
      return res.status(400).json({ message: "Unable to fetch all users" });
    }

    // return all users to admin
    return res.status(200).json({
      message: "Retrived all users",
      data: all_users,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error:${error}` });
  }
};

// @description edit user profile
// @route http://localhost:5000/api/users/:id
// @method PUT
// @privacy protected
const editProfile = async (req, res) => {
  // destructure id from params
  const { id } = req.params;

  // destructure details from req.body
  const { firstName, lastName } = req.body;

  try {
    // check if id is not available
    if (id != req.session.user_id) {
      return res.status(403).json({ message: "UnAuthorized!" });
    }

    // check if user exist
    const user = await UserModel.findById(id);

    // if user dosnt exist
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // update user in db
    const updateUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );

    // check if not updated
    if (!updateUser) {
      return res.status(400).json({ message: `Unable to update record` });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

// @description delete user profile
// @route http://localhost:5000/api/users/:id
// @method delete
// @privacy protected
const deleteProfile = async (req, res) => {
  // destructure id from params
  const { id } = req.params;

  // destructure password from req.body
  const { password } = req.body;

  // setup trycatch block
  try {
    // check if id is not available
    if (id != req.session.user_id) {
      return res.status(403).json({ message: "UnAuthorized!" });
    }

    // check if user exist
    const user = await UserModel.findById(id);

    // if user dosnt exist
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // check if password match
    const password_match = await bcrypt.compare(password, user.password);

    // if password dont match
    if (!password_match) {
      return res.status(401).json({ message: "Password dont match!" });
    }

    // delete profile
    const delete_profile = await UserModel.findByIdAndDelete(user._id);

    // if unable to delete profile
    if (!delete_profile) {
      return res.status(401).json({ message: "Unable to delete profile!" });
    }

    return res.status(200).json({
      message: "Profile deleted!",
      // data: delete_profile,
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

const logoutProfile = async (req, res) => {
  try {
    // destructure id from params
    const { id } = req.params;

    if (req.user !== id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to perform this action" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ message: "Unable to logout" });
      }
      // req.session.user_id = null;
      // req.user = null;
      return res.status(200).json({ message: "Logged out" });
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error ${error}` });
  }
};

//
//

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  allUsers,
  editProfile,
  deleteProfile,
  logoutProfile,
};
