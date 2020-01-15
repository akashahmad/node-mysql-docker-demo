'use strict';
module.exports = (sequelize, DataTypes) => {
    const money = sequelize.define('money', {
        customerId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        shopId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        billNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detail: {
            type: DataTypes.STRING,
        },
        transactionDate: DataTypes.DATE
    }, {});
    money.associate = function (models) {
        // associations are defined here
        // money.hasMany(models.gold,{foreignkey:'goldId'});
        // money.hasMany(models.customers,{foreignkey:'customerId'});
        
    };
    return money;
};