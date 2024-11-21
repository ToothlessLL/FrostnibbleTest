module.exports = (sequelize, DataTypes) => {
	return sequelize.define('VoiceStateUpdate', {
		VSUID: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}, timer: {
			type: DataTypes.INTEGER,
		},
	}, {
		timestamps: false,
	});
};