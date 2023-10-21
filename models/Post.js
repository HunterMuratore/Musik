const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    track: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // author_id: {
    //   type: DataTypes.INTEGER, 
    //   allowNull: false,
    //   references: {
    //     model: "user", 
    //     key: "id", 
    //     onDelete: "CASCADE"
    //   },
    // },
  },
  {
    modelName: "user_posts",
    freezeTableName: true,
    sequelize: db,
  }
);

module.exports = Post;
