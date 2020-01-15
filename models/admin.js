'use strict';
module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define('admin', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    admin.associate = function (models) {
        // admin.hasOne(models.shop,{foriegnkey:'shopId'});
    };
    return admin;
};