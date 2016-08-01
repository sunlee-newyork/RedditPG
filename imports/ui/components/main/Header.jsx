import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Accounts } from 'meteor/std:accounts-ui'; 

import AccountNavigation from './AccountNavigation';
import Logo from './Logo';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="header">
				<div className="row">
					<div className="col-xs-4 col-md-6">
						<Logo />
					</div>
					<div className="col-xs-8 col-md-6">
						<AccountNavigation />
					</div>
				</div>
			</div>
		);
	}
}

export default Header;