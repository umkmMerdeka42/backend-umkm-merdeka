/* eslint-disable consistent-return */
import argon2 from 'argon2';
import User from '../models/UserModel.js';
import { requestResponse } from '../message.js';

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['uuid', 'name', 'email', 'telephone', 'university', 'nim', 'role'],
    });
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ['uuid', 'name', 'email', 'telephone', 'university', 'nim', 'role'],
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) return res.status(404).json(requestResponse.failed('User Tidak Ditemukan'));
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
};

export const createUser = async (req, res) => {
  const {
    name, email, telephone, university, nim, password, confPassword, role,
  } = req.body;
  if (password !== confPassword) return res.status(400).json(requestResponse.failed('Password dan Confirm Password Tidak Cocok'));
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name,
      email,
      telephone,
      university,
      nim,
      password: hashPassword,
      role,
    });
    res.status(201).json(requestResponse.success('Registrasi Berhasil'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json(requestResponse.failed('User Tidak Ditemukan'));

  const {
    name,
    email,
    telephone,
    university,
    nim,
    password,
    confPassword,
    role,
  } = req.body;

  let hashPassword;

  if (password === '' || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword) return res.status(400).json(requestResponse.failed('Password dan Confirm Password Tidak Cocok'));

  try {
    await User.update({
      name,
      email,
      telephone,
      university,
      nim,
      password: hashPassword,
      role,
    }, {
      where: {
        id: user.id,
      },
    });
    res.status(200).json(requestResponse.success('Berhasil Update User'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json(requestResponse.failed('User Tidak Ditemukan'));

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json(requestResponse.success('Berhasil delete user'));
  } catch (error) {
    res.status(400).json(requestResponse.failed(error.message));
  }
};
