module.exports = (sequelize, DataTypes) => {
	return sequelize.define('UserItems', {
		userID: DataTypes.INTEGER,
		itemID: DataTypes.INTEGER,
		guildID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	    quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};