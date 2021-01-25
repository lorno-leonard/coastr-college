import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Divider, Form, Grid, Icon, Table } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import Loading from '../../components/loading';
import { Pagination } from '../../components/pagination';
import { renderFormSelect } from '../../helpers/redux_form';

const ENTRY_PER_PAGE = 10;

class BranchesPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit, college_id } = query;

		// Initialize redux-form search filter
		this.props.initialize({ college_id });

		this.props.getColleges();
		this.getBranches({ page, limit, college_id });
	}

	onPageChange = (page, limit) => {
		return this.getBranches({ page, limit });
	};

	renderTableBody = branches => {
		if (_.isEmpty(branches)) {
			return (
				<Table.Row>
					<Table.Cell>No Branchs</Table.Cell>
				</Table.Row>
			);
		} else {
			return branches.map((college, index) => {
				return (
					<Table.Row
						key={index}
						onClick={() =>
							this.props.history.push(`/branches/id/basic?id=${college._id}`)
						}
					>
						<Table.Cell>{_.get(college, 'name')}</Table.Cell>
						<Table.Cell textAlign="center">
							<Icon
								link
								name="edit"
								size="large"
								onClick={() =>
									this.props.history.push(`/branches/id/basic?id=${college._id}`)
								}
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	getBranches = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit,
			college_id
		} = opts || {};

		this.props.getBranches({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE,
			college_id: college_id || ''
		});
	};


	render() {
		const { pageProps } = this.props;
		const {
			branches,
			loading,
			page,
			limit,
			total,
			colleges
		} = pageProps;

		const optionColleges = _.map(colleges, college => ({
			key: _.get(college, '_id'),
			value: _.get(college, '_id'),
			text: _.get(college, 'name')
		}));

		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Branches</span>
					<div className="component-buttons">
						<span onClick={() => this.props.history.push('/branches/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add Branch
						</span>
					</div>
				</div>
				<Divider />
				<div className="bt-content-padded">
					<Form>
						<Form.Group>
							<Field
								component={renderFormSelect}
								placeholder="College"
								name="college_id"
								options={optionColleges}
							/>
							<Button
								primary
								onClick={this.props.handleSubmit((data) => this.getBranches({
									page: 1, ...data
								}))}
							>
								Filter
							</Button>
						</Form.Group>
					</Form>
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
												{this.renderTableBody(branches)}
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

BranchesPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getBranches: PropTypes.func.isRequired,
	getColleges: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'BranchesPage'
	})
)(BranchesPage);