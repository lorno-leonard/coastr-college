import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import LocalStorageHelper from '../helpers/local_storage';
import './index.scss';

export class BasicLayout extends Component {
	render() {
		const showLogoutButton = this.props.location.pathname.indexOf('/unauthorized') === 0;
		return (
			<div>
				<div className="navigation-layout-header">
					<div className="navigation-layout-header-left">
						<div className="navigation-layout-header-left-product">College App</div>
					</div>
					{
						showLogoutButton &&
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
					}
				</div>
				<div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 40 }}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default BasicLayout;
