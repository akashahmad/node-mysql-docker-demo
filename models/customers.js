'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    shopId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    addedByAdminId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {});
  customers.associate = function(models) {
    // associations are defined here
    // customers.hasMany(models.gold,{foreignkey:'goldId'});
    // customers.hasMany(models.money,{foreignkey:'moneyId'});
    // customers.hasOne(models.shop,{foreignkey:'shopId'});
  };
  return customers;
};