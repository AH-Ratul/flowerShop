import { createUser } from "../model/userModel.js";

export const signup = (req, res) => {
  const { password, passwordConfirm, ...userData } = req.body;

  // validate if password and passwordConfirm are same
  if (password !== passwordConfirm) {
    return callback(new Error("Passwords doesn't Match"));
  }

  createUser({ ...userData, password }, (err) => {
    if (err) return res.status(500).json({ error: "Error register user" });
    res.redirect("/users/login");
  });
};

export const login = (req, res) => {
    
}
