import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { Button, Form, Icon, Table } from 'semantic-ui-react';
import { renderFormSelect } from '../../../helpers/redux_form';

const handleOnAddRestaurant = ({
	fields,
	change,
	addStudent,
	selectedStudents
}) => {
	if (
		!selectedStudents
		|| (
			selectedStudents
			&& selectedStudents.indexOf(addStudent) === -1
		)
	) {
		fields.push(addStudent);

		// clear fields
		change('add_student', '');
	}
};

let BranchStudentInput = ({
	fields,
	change,
	loadingInitialValue,
	students,
	loadingStudents,
	addStudent,
	selectedStudents
}) => {
	const optionStudents = _.map(students, student => ({
		key: _.get(student, '_id'),
		value: _.get(student, '_id'),
		text: _.get(student, 'name')
	}));

	return (
		<React.Fragment>
			<Form className="content-header">
				<Form.Group >
					<Field
						component={renderFormSelect}
						name="add_student"
						placeholder="Restaurant"
						width={8}
						options={optionStudents}
						disabled={loadingInitialValue || loadingStudents}
					/>
					<Form.Field>
						<Button
							primary
							onClick={() => handleOnAddRestaurant({
								fields,
								change,
								students,
								addStudent,
								selectedStudents
							})}
							content="Add"
							disabled={!addStudent || loadingInitialValue || loadingStudents}
						/>
					</Form.Field>
				</Form.Group>
			</Form>
			<Table columns={1}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Student</Table.HeaderCell>
						<Table.HeaderCell>Actions</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{fields.length === 0 &&
						<Table.Row key={0}>
							<Table.Cell
								colSpan={3}
								textAlign="center"
							>No Student(s)</Table.Cell>
							<Table.Cell></Table.Cell>
						</Table.Row>
					}
					{fields.map((item, index) => {
						const studentId = fields.get(index);
						const student = _.find(students, o => o._id === studentId);
						return (
							<Table.Row key={`result-${index}`}>
								<Table.Cell width={14}>{_.get(student, 'name')}</Table.Cell>
								<Table.Cell width={2}>
									<Icon
										link
										name="minus circle"
										size="large"
										onClick={() => fields.remove(index)}
									/>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		</React.Fragment>
	);
};

// Decorate with connect to read form values
const parentSelector = formValueSelector('BranchStudentsPage');
const selector = formValueSelector('BranchStudentInput');
BranchStudentInput = connect(state => {
	// can select values individually
	// or together as a group
	const add_student = selector(state, 'add_student');
	const selectedStudents = parentSelector(state, 'student_ids');
	return {
		addStudent: add_student,
		selectedStudents
	};
})(BranchStudentInput);

export default (
	reduxForm({
		form: 'BranchStudentInput'
	})
)(BranchStudentInput);