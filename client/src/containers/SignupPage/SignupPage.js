import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import Loading from '../../components/loading';
import GeneralHelper from '../../helpers/general';
import {
	renderFormInput,
	validateEmail,
	validateRequired
} from '../../helpers/redux_form';

const validatePassword = (value, allValues, props, name) => {
	const password = _.get(allValues, 'password');
	const confirmPassword = _.get(allValues, 'confirm_password');

	if (password !== confirmPassword) {
		return 'Password not the same.';
	}

	return undefined;
};

class SignupPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.pageProps;
		const { meta } = this.props.pageProps;

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}
	}
	
	onSubmit = e => {
		const { email, password } = this.props.pageProps;
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.login({ email, password, query });
	}

	render() {
		const {
			pageProps,
			history,
			// redux-form props
			handleSubmit,
			pristine,
			submitting,
			invalid
		} = this.props;
		const {
			hasSignedUp,
			loadingSubmit
		} = pageProps;

		if (loadingSubmit) {
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

		if (!loadingSubmit && hasSignedUp) {
			return (
				<Grid>
					<Grid.Row centered>
						<Grid.Column width={6}>
							<h1>Ready to Login!</h1>
							<Button
								secondary
								fluid
								onClick={() => history.push('/login')}
							>
								Go back to Login page
							</Button>
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
						<Segment padded>
							<h4>Sign Up</h4>
							<Form loading={loadingSubmit}>
								<Form.Group widths="equal">
									<Form.Field>
										<label>Name</label>
										<Field
											component={renderFormInput}
											validate={[validateRequired]}
											name="name"
											placeholder="Name"
										/>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<label>Email</label>
										<Field
											component={renderFormInput}
											validate={[validateRequired, validateEmail]}
											name="email"
											placeholder="Email"
										/>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<label>Password</label>
										<Field
											component={renderFormInput}
											validate={[validateRequired, validatePassword]}
											name="password"
											placeholder="Password"
											type="password"
										/>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<label>Confirm Password</label>
										<Field
											component={renderFormInput}
											validate={[validateRequired, validatePassword]}
											name="confirm_password"
											placeholder="Confirm Password"
											type="password"
										/>
									</Form.Field>
								</Form.Group>
								<Button
									primary
									fluid
									disabled={pristine || submitting || invalid || loadingSubmit}
									onClick={handleSubmit(data => this.props.onSubmit(data))}
									content="Save"
									style={{ marginBottom: 10 }}
								/>
								<Button
									secondary
									fluid
									onClick={() => history.push('/login')}
								>
									Go back to Login page
								</Button>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

SignupPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'SignupPage'
	})
)(SignupPage);
