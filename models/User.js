// Import Model and DataTypes from sequelize
const { Model, DataTypes } = require("sequelize");
const { hash, compare } = require('bcrypt');
const db = require("../config/connection");
const Post = require('./Post');

// Create a User class and extend the Model class
class User extends Model { }

User.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "That email address is already in use.",
            },
            validate: {
                isEmail: true,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "That username is already in use.",
            },
            validate: {
                len: {
                    args: 3,
                    msg: "Your username must be at least 3 characters in length.",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 6,
                    msg: "Your password must be at least 6 characters in length.",
                },
            },
        },
    },
    {
        modelName: "user",
        // Connection object
        sequelize: db,
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10);

                return user;
            },
        },
    }
);

User.prototype.validatePass = async function (form_password) {
    const is_valid = await compare(form_password, this.password);

    return is_valid;
};

User.hasMany(Post, { as: "posts", foreignKey: "author_id" });
Post.belongsTo(User, { as: "author", foreignKey: "author_id" });

// Export the User model
module.exports = User;
