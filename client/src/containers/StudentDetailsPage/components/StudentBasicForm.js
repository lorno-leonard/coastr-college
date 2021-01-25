import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import {
	renderFormInput,
	validateRequired
} from '../../../helpers/redux_form';


let StudentBasicForm = props => {
	const {
		loadingSubmit,
		onSubmit,
		loading,
		handleSubmit,
		pristine,
		submitting,
		invalid
	} = props;

	return (
		<div className="bt-content-padded">
			<Grid>
				<Grid.Row>
					<Grid.Column width={9}>
						<Segment>
							<h4>Student Information</h4>
							<Form loading={loading || loadingSubmit}>
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

StudentBasicForm = reduxForm({
	form: 'StudentBasicForm'
})(StudentBasicForm);

StudentBasicForm = connect(
	state => {
		return({
			initialValues: state.StudentDetailsPage.student
		});
	}
)(StudentBasicForm);

export default StudentBasicForm;
