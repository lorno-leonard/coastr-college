import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import {
	renderFormInput,
	renderFormSelect,
	validateRequired
} from '../../../helpers/redux_form';


let BranchBasicForm = props => {
	const {
		loadingSubmit,
		onSubmit,
		loading,
		colleges,
		loadingColleges,
		// redux-form props
		handleSubmit,
		pristine,
		submitting,
		invalid
	} = props;

	const optionColleges = _.map(colleges, college => ({
		key: _.get(college, '_id'),
		value: _.get(college, '_id'),
		text: _.get(college, 'name')
	}));

	return (
		<div className="bt-content-padded">
			<Grid>
				<Grid.Row>
					<Grid.Column width={9}>
						<Segment>
							<h4>College Information</h4>
							<Form loading={loading || loadingSubmit}>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormSelect}
											validate={[validateRequired]}
											name="college_id"
											placeholder="College"
											disabled={loadingColleges}
											options={optionColleges}
										/>
										<label>College</label>
									</Form.Field>
								</Form.Group>
								<Form.Group widths="equal">
									<Form.Field>
										<Field
											component={renderFormInput}
											validate={[validateRequired]}
											name="name"
											placeholder="Name"
										/>
										<label>Name</label>
									</Form.Field>
								</Form.Group>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Button
				primary
				disabled={pristine || submitting || invalid || loadingSubmit}
				onClick={handleSubmit(data => onSubmit(data))}
			>
				Save
			</Button>
		</div>
	);
};

BranchBasicForm = reduxForm({
	form: 'BranchBasicForm'
})(BranchBasicForm);

BranchBasicForm = connect(
	state => {
		const { branch } = state.BranchDetailsPage;
		return({
			initialValues: {
				name: _.get(branch, 'name'),
				college_id: _.get(branch, 'college_id._id')
			}
		});
	}
)(BranchBasicForm);

export default BranchBasicForm;
