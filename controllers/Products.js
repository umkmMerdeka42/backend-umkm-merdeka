import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import { requestResponse } from '../message.js';
import { Op } from 'sequelize';

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === 'user') {
      response = await Product.findAll({
        attributes: ['uuid', 'productName', 'price', 'image', 'category', 'description'],
        where: {
          userId: req.userId
        },
        include: [{
          model: User,
          attributes: ['name', 'telephone','university']
        }]
      });
    } else {
      response = await Product.findAll({
        attributes: ['uuid', 'productName', 'price', 'image', 'category', 'description'],
        include: [{
          model: User,
          attributes: ['name', 'telephone','university']
        }]
      });
    }
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const getProductsForGuest = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ['uuid', 'productName', 'price', 'image', 'category', 'description'],
      include: [{
        model: User,
        attributes: ['name', 'telephone','university']
      }]
    });
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!product) return res.status(404).json(requestResponse.failed('Produk tidak ditemukan'));

    let response;
    if (req.role === 'user') {
      response = await Product.findOne({
        attributes: ['uuid', 'productName', 'price', 'image', 'category', 'description'],
        where: {
          [Op.and]:[{id: product.id}, {userId: req.userId}],
        },
        include: [{
          model: User,
          attributes: ['name', 'telephone','university']
        }]
      });
    } else {
      response = await Product.findOne({
        attributes: ['uuid', 'productName', 'price', 'image', 'category', 'description'],
        where: {
          id: product.id
        },
        include: [{
          model: User,
          attributes: ['name', 'telephone','university']
        }]
      });
    }
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const getProductByIdForGuest = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!product) return res.status(404).json(requestResponse.failed('Produk tidak ditemukan'));

    const response = await Product.findOne({
      attributes: ['uuid', 'productName', 'price', 'image', 'category', 'description'],
      where: {
        id: product.id
      },
      include: [{
        model: User,
        attributes: ['name', 'telephone','university']
      }]
    });
    res.status(200).json(requestResponse.successWithData(response));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const createProduct = async (req, res) => {
  const { productName, price, image, category, description } = req.body;
  try {
    await Product.create({
      productName,
      price,
      image,
      category,
      description,
      userId: req.userId
    });
    res.status(201).json(requestResponse.success('Produk berhasil ditambahkan'));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!product) return res.status(404).json(requestResponse.failed('Produk tidak ditemukan'));

    const { productName, price, image, category, description } = req.body;
    if (req.role === 'admin') {
      await Product.update({
        productName,
        price,
        image,
        category,
        description
      }, {
        where: {
          id: product.id
        }
      });
    } else {
      if(req.userId !== product.userId) return res.status(403).json(requestResponse.failed('Akses Terlarang'));

      await Product.update({
        productName,
        price,
        image,
        category,
        description
      }, {
        where: {
          [Op.and]:[{id: product.id}, {userId: req.userId}],
        }
      });
    }
    res.status(200).json(requestResponse.successWithData(requestResponse.success('Produk Berhasil di update')));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id
      }
    });

    if (!product) return res.status(404).json(requestResponse.failed('Produk tidak ditemukan'));

    const { productName, price, image, category, description } = req.body;
    if (req.role === 'admin') {
      await Product.destroy({
        where: {
          id: product.id
        }
      });
    } else {
      if(req.userId !== product.userId) return res.status(403).json(requestResponse.failed('Akses Terlarang'));
      
      await Product.destroy({
        where: {
          [Op.and]:[{id: product.id}, {userId: req.userId}],
        }
      });
    }
    res.status(200).json(requestResponse.successWithData(requestResponse.success('Produk Berhasil di hapus')));
  } catch (error) {
    res.status(500).json(requestResponse.serverError(error.message));
  }
}