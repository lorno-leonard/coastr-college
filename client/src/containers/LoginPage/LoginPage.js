import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Grid, Message } from 'semantic-ui-react';
import Loading from '../../components/loading';
import GeneralHelper from '../../helpers/general';

class LoginPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}

	componentDidMount() {
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.showLoginForm({
			path: _.get(query, 'path')
		});
	}

	onFieldChange = (e, data) => {
		this.props.onFieldChange(e.target.name, data.value);
	}

	onKeyPress = e => {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	}
	
	onSubmit = e => {
		const { email, password } = this.props.pageProps;
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.login({ email, password, query });
	}

	render() {
		const { pageProps, history } = this.props;
		const { email, password, loading, error } = pageProps;

		if (!pageProps.showLoginForm) {
			return (
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<Loading />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			);
		}


		return (
			<Grid
				centered
				stackable
				className="with-padding"
			>
				<Grid.Row centered>
					<Grid.Column width={6}>
						<Form
							error={error !== ''}
							onSubmit={this.onSubmit}
							style={{ marginBottom: 10 }}
						>
							<Form.Group widths="equal">
								<Form.Input
									name="email"
									type="email"
									label="Email address"
									value={email}
									onChange={this.onFieldChange}
									onKeyPress={this.onKeyPress}
									required
								/>
							</Form.Group>
							<Form.Group widths="equal">
								<Form.Input
									name="password"
									type="password"
									label="Password"
									value={password}
									onChange={this.onFieldChange}
									onKeyPress={this.onKeyPress}
									required
								/>
							</Form.Group>
							<Button
								content="Login"
								primary
								fluid
								loading={loading}
								disabled={loading}
							/>
						</Form>
						<Button
							content="Sign Up"
							secondary
							fluid
							loading={loading}
							disabled={loading}
							onClick={() => history.push('/signup')}
						/>
						{error && (
							<Message
								error
								content={error}
							/>
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

LoginPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	onFieldChange: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired
};

export default LoginPage;
