const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc login user
//@route POST /auth/login
//@access public
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: username }).exec();

  if (!foundUser || !foundUser?.active) {
    return res
      .status(401)
      .json({
        message: "Issues with account, please contact an administrator",
      });
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const { username, _id } = foundUser;
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username: username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Seven Day refresh
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken, id: _id });
  } else {
    res.sendStatus(401);
  }
};

//@desc logout user
//@route POST /auth/logout
//@access private
const logout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

//@desc refresh current access token
//@route POST /auth/refresh
//@access private
const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const { username } = decoded;
    const { _id } = foundUser;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ roles, accessToken, id: _id });
  });
};

module.exports = { login, logout, refresh };
