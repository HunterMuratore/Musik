const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    bandName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2],
          msg: "Name of the band here!",
        },
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3],
          msg: "Write about the band here!",
        },
      },
    },
  },
  {
    modelName: "user_posts",
    freezeTableName: true,
    sequelize: db,
  }
);
module.exports = Post;
