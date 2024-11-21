module.exports = (sequelize, DataTypes) => {
	return sequelize.define('WinLoss', {
		winnerID: DataTypes.INTEGER,
		loserID: DataTypes.INTEGER,
		guildID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};