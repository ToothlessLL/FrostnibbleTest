module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Shop', {
		itemName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	    price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	    emojiID: {
			type: DataTypes.TEXT,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};