module.exports = (sequelize, DataTypes) => {
	return sequelize.define('rsn', {
		id: {
			type: DataTypes.INTEGER
			, primaryKey: true
		},
		userID: DataTypes.STRING,
		rsn: DataTypes.STRING
	}, {
		timestamps: false,
	});
};