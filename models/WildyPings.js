module.exports = (sequelize, DataTypes) => {
	return sequelize.define('WildyPings', {
		id: {
			type: DataTypes.INTEGER
			, primaryKey: true
		},
		userID: DataTypes.STRING,
		eventNumber: DataTypes.STRING
	}, {
		timestamps: false,
	});
};