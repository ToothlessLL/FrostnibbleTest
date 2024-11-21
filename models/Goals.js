module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Goals', {
		id: {
			type: DataTypes.INTEGER
			, primaryKey: true
		},
		userID: DataTypes.STRING,
		goal: DataTypes.STRING,
		priority: DataTypes.INTEGER,
	}, {
		timestamps: false,
	});
};