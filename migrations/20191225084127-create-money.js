'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('money', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            customerId: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            shopId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            billNo: {
                allowNull: false,
                type: Sequelize.STRING
            },
            amount: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING
            },
            currency: {
                allowNull: false,
                type: Sequelize.STRING
            },
            detail: {
                type: Sequelize.STRING
            },
            transactionDate: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('money');
    }
};