import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { Divider, Grid, Icon, Table } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';

const ENTRY_PER_PAGE = 10;

class StudentsPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = query;
		this.getStudents({ page, limit });
	}

	onPageChange = (page, limit) => {
		return this.getStudents({ page, limit });
	};

	renderTableBody = students => {
		if (_.isEmpty(students)) {
			return (
				<Table.Row>
					<Table.Cell>No Students</Table.Cell>
				</Table.Row>
			);
		} else {
			return students.map((student, index) => {
				return (
					<Table.Row
						key={index}
						onClick={() =>
							this.props.history.push(`/students/id/basic?id=${student._id}`)
						}
					>
						<Table.Cell>{_.get(student, 'name')}</Table.Cell>
						<Table.Cell textAlign="center">
							<Icon
								link
								name="edit"
								size="large"
								onClick={() =>
									this.props.history.push(`/students/id/basic?id=${student._id}`)
								}
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	getStudents = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};

		this.props.getStudents({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};


	render() {
		const { pageProps } = this.props;
		const { students, loading, page, limit, total } = pageProps;
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Students</span>
					<div className="component-buttons">
						<span onClick={() => this.props.history.push('/students/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Student
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={16}>
								{loading && <Loading />}
								{!loading && (
									<React.Fragment>
										<Table striped>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell>Name</Table.HeaderCell>
													<Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												{this.renderTableBody(students)}
											</Table.Body>
										</Table>

										<Pagination
											page={page}
											limit={limit}
											total={total}
											options={[ENTRY_PER_PAGE]}
											onPageChange={this.onPageChange}
										/>
									</React.Fragment>
								)}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}

StudentsPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getStudents: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'StudentsPage'
	})
)(StudentsPage);