'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('gold', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            shopId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            customerId: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            particular: {
                type: Sequelize.STRING
            },
            billNo: {
                allowNull: false,
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING
            },
            purity: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            grossWeight: {
                type: Sequelize.FLOAT
            },
            pureWeight: {
                type: Sequelize.FLOAT
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
        return queryInterface.dropTable('gold');
    }
};