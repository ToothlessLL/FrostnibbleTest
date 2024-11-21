module.exports = (sequelize, DataTypes) => {
	return sequelize.define('SquabbleScore', {
		userID: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	    wins: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	    losses: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	    totalWins: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	    totalLosses: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	    reset: {
			type: DataTypes.INTEGER,
			allowNull: false,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};