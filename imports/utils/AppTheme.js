import Colors from 'material-ui/styles/colors';

const mui = {
	appBar: {},
	palette: {
		primary1Color: Colors.cyan300,
		primary2Color: Colors.cyan200,
		primary3Color: Colors.cyan100,
		accent1Color: Colors.purple400,
		accent2Color: Colors.purple300,
		accent3Color: Colors.purple200
	}
};

const iconStyles = {
	smallIcon: {
		width: 36,
		height: 36,
	},
	mediumIcon: {
		width: 48,
		height: 48,
	},
	largeIcon: {
		width: 60,
		height: 60
	},
	small: {
		width: 72,
		height: 72,
		padding: 16,
	},
	medium: {
		width: 96,
		height: 96,
		padding: 24,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	}
};

const buttonStyles = {
	large: {
		width: 120,
		height: 50,
		margin: 30
	}
}

const buttonLabelStyles = {
	large: {
		fontSize: 20
	}
}

export {
	mui,
	iconStyles,
	buttonStyles,
	buttonLabelStyles
};