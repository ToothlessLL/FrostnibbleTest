module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Challenges', {
		challengerID: {
			type: DataTypes.INTEGER,
		},
		receiverID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		guildID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		itemID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};