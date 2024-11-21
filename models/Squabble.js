module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Squabble', {
		userID: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	    confirmed: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    counter: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice1: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice2: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice3: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice4: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice5: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice6: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    uchoice7: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice1: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice2: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice3: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice4: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice5: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice6: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    bchoice7: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	    canReset: {
			type: DataTypes.INTEGER,
			'default': 0,
		},
	}, {
		timestamps: false,
	});
};