import React from 'react';

import Login from './Login';
import Register from './Register';

class UserAccess extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row end-xs">
				<div className="col-xs-3">
					<Register />
				</div>
				<div className="col-xs-3">
					<Login />
				</div>
			</div>
		);
	}
}

export default UserAccess;