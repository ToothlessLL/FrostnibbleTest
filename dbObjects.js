import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('gamba', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('gamba', 'username', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	logging: false,
// 	storage: 'database.sqlite',
// });

// const Shop = require('./models/Shop.js')(sequelize, Sequelize.DataTypes);
// const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
// const UserItems = require('./models/UserItems.js')(sequelize, Sequelize.DataTypes);
// const Challenges = require('./models/Challenges.js')(sequelize, Sequelize.DataTypes);
// const WinLoss = require('./models/WinLoss.js')(sequelize, Sequelize.DataTypes);
// const Squabble = require('./models/Squabble.js')(sequelize, Sequelize.DataTypes);
// const SquabbleScore = require('./models/SquabbleScore.js')(sequelize, Sequelize.DataTypes);
// const WildyPings = require('./models/WildyPings.js')(sequelize, Sequelize.DataTypes);
// const Goals = require('./models/Goals.js')(sequelize, Sequelize.DataTypes);
// const rsn = require('./models/rsn.js')(sequelize, Sequelize.DataTypes);
// const VoiceStateUpdate = require('./models/VoiceStateUpdate.js')(sequelize, Sequelize.DataTypes);

// UserItems.belongsTo(Shop, { foreignKey: 'id', as: 'item' });

// //Reflect.defineProperty(Users.prototype, 'addItem', {
// 	/* eslint-disable-next-line func-name-matching */
// /*	value: async function addItem(item) {
// 		const userItem = await UserItems.findOne({
// 			where: { user_id: this.user_id, item_id: item.id },
// 		});

// 		if (userItem) {
// 			userItem.amount += 1;
// 			return userItem.save();
// 		}

// 		return UserItems.create({ user_id: this.user_id, item_id: item.id, amount: 1 });
// 	},
// });

// Reflect.defineProperty(Users.prototype, 'getItems', {
// 	/* eslint-disable-next-line func-name-matching */
// /*	value: function getItems() {
// 		return UserItems.findAll({
// 			where: { user_id: this.user_id },
// 			include: ['item'],
// 		});
// 	},
// });*/

// module.exports = { Users, Shop, UserItems, Challenges, WinLoss, Squabble, SquabbleScore, VoiceStateUpdate, WildyPings, Goals, rsn, sequelize };