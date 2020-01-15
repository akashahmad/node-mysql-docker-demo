'use strict';
module.exports = (sequelize, DataTypes) => {
    const gold = sequelize.define('gold', {
        shopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customerId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        particular: DataTypes.STRING,
        billNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        purity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        grossWeight: DataTypes.FLOAT,
        pureWeight: DataTypes.FLOAT,
        transactionDate: DataTypes.DATE
    }, {});
    gold.associate = function (models) {
        // associations are defined here
     // gold.hasMany(models.money,{foreignkey:'moneyId'});
     // gold.hasMany(models.customers,{foreignkey:'customerId'});
         };
    return gold;
};