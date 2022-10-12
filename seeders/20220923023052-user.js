// @ts-nocheck
'use strict';
const { v4 } = require('uuid');
const { genSaltSync, hashSync } = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = genSaltSync();
    console.log('hashSync :>> ', hashSync('test1234', salt));
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: v4(),
          email: 'longthanhlong@gmail.com',
          fullName: 'Nguyễn Thanh Long',
          username: 'thanhlong',
          password: hashSync('test1234', salt),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
