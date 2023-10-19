const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');
const db = require('../config/connection');
const Post = require('./Post');

class User extends Model { }

module.exports = User;