import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Header, Icon, Menu } from 'semantic-ui-react';
import './index.scss';

export class Drawer extends Component {
	getActiveItem({ pathname, search }) {
		switch (true) {
			case /\/colleges/.test(pathname):
				return 'colleges';
			default:
				return 'colleges';
		}
	}

	render() {
		const activeItem = this.getActiveItem({
			pathname: this.props.location.pathname,
			search: this.props.location.search
		});

		return (
			<div className="drawer-container">
				<Menu
					fluid
					secondary
					vertical
					className="bt-drawer"
					style={{ margin: 0 }}
				>
					<center style={{ paddingTop: 23, fontSize: 17 }}><Header as="h5">College App (Admin)</Header></center>
					<Divider />
					<Menu.Item>
						<Menu.Header>
							<Icon
								name="wechat"
								className="bt-drawer-header-icon"
							/>
							Colleges
						</Menu.Header>
						<Menu.Menu>
							<Menu.Item
								name="colleges"
								active={activeItem === 'colleges'}
								onClick={this.handleItemClick}
								as={Link}
								to="/colleges"
							>
								All
							</Menu.Item>
						</Menu.Menu>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default Drawer;
