import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['uuid', 'name', 'email', 'telephone', 'university', 'nim', 'role']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'telephone', 'university', 'nim', 'role'],
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  const { name, email, telephone, university, nim, password, confPassword, role } = req.body;
  if (password !== confPassword) return res.status(400).json({ message: "Password dan Confirm Password Tidak Cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      telephone: telephone,
      university: university,
      nim: nim,
      password: hashPassword,
      role: role
    });
    res.status(201).json({ message: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ message: "User Tidak Ditemukan" });
  const { name, email, telephone, university, nim, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) return res.status(400).json({ message: "Password dan Confirm Password Tidak Cocok" });
  try {
    await User.update({
      name: name,
      email: email,
      telephone: telephone,
      university: university,
      nim: nim,
      password: hashPassword,
      role: role
    },{
      where: {
        id: user.id
      }
    });
    res.status(200).json({ message: "Berhasil Update User" });
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
}

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id
    }
  });
  if (!user) return res.status(404).json({ message: "User Tidak Ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id
      }
    });
    res.status(200).json({ message: "Berhasil Hapus User" });
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
}