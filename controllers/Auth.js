/* eslint-disable consistent-return */
import argon2 from 'argon2';
import User from '../models/UserModel.js';
import { requestResponse } from '../message.js';

export const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) return res.status(404).json(requestResponse.failed('User Tidak Ditemukan'));

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json(requestResponse.failed('Password Yang Anda Masukkan Salah'));

  req.session.userId = user.uuid;

  const {
    uuid,
    name,
    email,
    telephone,
    university,
    nim,
    role,
  } = user;

  const data = {
    uuid,
    name,
    email,
    telephone,
    university,
    nim,
    role,
  };

  res.status(200).json(requestResponse.successLogin(data));
};

export const session = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json(requestResponse.failed('Mohon Login Ke Akun Anda dulu!'));
  }

  const user = await User.findOne({
    attributes: ['uuid', 'name', 'email', 'telephone', 'university', 'nim', 'role'],
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json(requestResponse.failed('User Tidak Ditemukan, Ayo Daftar'));
  res.status(200).json(requestResponse.successWithData(user));
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json(requestResponse.failed('Tidak Bisa Logout'));
    res.status(200).json(requestResponse.success('Berhasil Logout'));
  });
};
