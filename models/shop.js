'use strict';
module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define('shop', {
    shopName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {});
  shop.associate = function(models) {
    // associations are defined here
    // shop.hasMany(models.customers,{foreignkey:'customersId'});
    // shop.hasOne(models.admin,{foreignkey:'adminId'});
  };
  return shop;
};