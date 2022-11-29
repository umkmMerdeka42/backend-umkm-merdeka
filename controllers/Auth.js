import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) return res.status(404).json({ message: "User Tidak Ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if(!match) return res.status(400).json({ message: "Password Yang Anda Masukkan Salah" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const telephone = user.telephone;
  const university = user.university;
  const nim = user.nim;
  const role = user.role;
  res.status(200).json( {uuid, name, email, telephone, university, nim, role} );
}

export const session = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon Login Ke Akun Anda!" });
  }
  const user = await User.findOne({
    attributes: ['uuid', 'name', 'email', 'telephone', 'university', 'nim', 'role' ],
    where: {
      uuid: req.session.userId
    }
  });
  if (!user) return res.status(404).json({ message: "User Tidak Ditemukan" });
  res.status(200).json(user);
}

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak Dapat Logout" });
    res.status(200).json({ message: "Anda Telah Logout" });
  });
}