const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Post extends Model { }

module.exports = Post;
