const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

const dayjs = require("dayjs");

class Coo extends Model {}

Coo.init(
  {
    text: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: 3,
          msg: "Your coo message must be at least 3 characters in length.",
        },
      },
    },
    date: {
      type: DataTypes.VIRTUAL,
      get() {
        return dayjs(this.createdAt).format("MM/DD/YYYY hh:mma");
      },
    },
  },
  {
    modelName: "user_coos",
    freezeTableName: true,
    sequelize: db,
  }
);

module.exports = Coo;
