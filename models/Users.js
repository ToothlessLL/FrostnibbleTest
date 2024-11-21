module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Users', {
		userID: {
			type: DataTypes.INTEGER,
		},
		guildID: {
			type: DataTypes.INTEGER,
		},
		balance: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		lastClaimed: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		lastAdventure: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
		itemID: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
	}, {
		timestamps: false,
	});
};