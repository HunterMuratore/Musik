const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const dayjs = require('dayjs');

class Post extends Model { }

module.exports = Post;