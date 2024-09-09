import User from "../model/User.js";
import bcrypt from "bcrypt";

//get list of users GET route '/'
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users?.length)
    return res.status(204).json({ message: "No users found" });
  res.json(users);
};

//@desc create new user
//@route POST /user
//@access private
export const newUser = async (req, res) => {
  const { firstName, lastName, phone, email, username, password } = req.body;
  if (!firstName || !lastName || !phone || !email || !username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store the new user
    const result = await User.create({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      username: username,
      password: hashedPwd,
    });

    res.status(201).json({ success: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update one user's info PUT route '/'
export const updateUserInfo = async (req, res) => {
  console.log(req.body);
  if (
    !req?.body?.id ||
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.phone ||
    !req?.body?.email ||
    !req?.body?.username ||
    !Array.isArray(req?.body?.roles) ||
    !req?.body?.roles.length ||
    typeof req?.body?.active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }
  const { id, firstName, lastName, phone, email, username, roles, active } =
    req.body;

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const duplicate = await User.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.phone = phone;
  user.email = email;
  user.username = username;
  user.roles = roles;
  user.active = active;

  if (req?.body?.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  console.log(user);

  const updatedUser = await user.save();
  res.json({ message: `User ${updatedUser.username} updated` });
};

export const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};
