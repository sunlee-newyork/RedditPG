import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { mui } from '../../utils/AppTheme';

import Header from '../components/main/Header';

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            muiTheme: getMuiTheme(mui)
        };
    }

    render() {
        return (
            <div id="redditpg">
                <Header />

                { this.props.content }
            </div>
        );
    }
}

MainLayout.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default MainLayout;