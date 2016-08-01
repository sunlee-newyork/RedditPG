import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { iconStyles } from '../../../utils/AppTheme';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

class Logo extends React.Component {
	constructor(props) {
		super(props);

		this.goHome = this.goHome.bind(this);
	}

	goHome() {
		FlowRouter.go('/');
	}

	render() {
		return (
			<div className="logo">
				<h1 
					className="brandname"
					onClick={this.goHome} 
					style={{
						display: "inline-block", 
						margin: "0 0 0 30px", 
						fontFamily: "Roboto, sans-serif"
					}}
				>RedditPG</h1>
				<IconButton
					className="col-xs-12"
					onClick={this.goHome}
					iconStyle={iconStyles.largeIcon}
					style={iconStyles.large}
					disableTouchRipple={true}
				>
					<img src="/images/redditpg.jpg" />
				</IconButton>
			</div>
		);
	}
}

export default Logo;