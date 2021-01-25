import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Drawer from '../components/drawer';
import LocalStorageHelper from '../helpers/local_storage';
import './index.scss';

export class NavigationLayout extends Component {
	render() {
		const { location, history } = this.props.children.props;
		return (
			<div>
				<div className="navigation-layout-header">
					<div className="navigation-layout-header-left">
						<div className="navigation-layout-header-left-product">College App</div>
					</div>
					<div className="navigation-layout-header-logout">
						<span>You are logged in as <u><b>{LocalStorageHelper.getUsername()}</b></u></span>
						<span style={{marginLeft: 10, marginRight: 10}}>|</span>
						<Link
							to="/logout"
							style={{color: 'white'}}
						>
							<Icon
								name="sign out"
								style={{ paddingRight: 4 }}
							/>
							Logout
						</Link>
					</div>
				</div>
				<div style={{ display: 'flex', minHeight: '100%' }}>
					<div style={{ flex: '0' }}>
						<Drawer
							location={location}
							history={history}
						/>
					</div>
					<div style={{ flex: '1' }}>
						<div>
							<div style={{ padding: '0px 0px 80px 0px' }}>{this.props.children}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default NavigationLayout;
