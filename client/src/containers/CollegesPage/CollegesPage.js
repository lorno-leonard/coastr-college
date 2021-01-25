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

class CollegesPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}

	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);
		const { page, limit } = query;
		this.getColleges({ page, limit });
	}

	onPageChange = (page, limit) => {
		return this.getColleges({ page, limit });
	};

	renderTableBody = colleges => {
		if (_.isEmpty(colleges)) {
			return (
				<Table.Row>
					<Table.Cell>No Colleges</Table.Cell>
				</Table.Row>
			);
		} else {
			return colleges.map((college, index) => {
				return (
					<Table.Row
						key={index}
						onClick={() =>
							this.props.history.push(`/colleges/id/basic?id=${college._id}`)
						}
					>
						<Table.Cell>{_.get(college, 'name')}</Table.Cell>
						<Table.Cell textAlign="center">
							<Icon
								link
								name="edit"
								size="large"
								onClick={() =>
									this.props.history.push(`/colleges/id/basic?id=${college._id}`)
								}
							/>
						</Table.Cell>
					</Table.Row>
				);
			});
		}
	};

	getColleges = opts => {
		const { query } = UrlParse(this.props.location.search, true);
		const {
			page,
			limit
		} = opts || {};

		this.props.getColleges({
			page: page || query.page || 1,
			limit: limit || query.limit || ENTRY_PER_PAGE
		});
	};


	render() {
		const { pageProps } = this.props;
		const { colleges, loading, page, limit, total } = pageProps;
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
					<span>Colleges</span>
					<div className="component-buttons">
						<span onClick={() => this.props.history.push('/colleges/create')}>
							<Icon
								name="plus square"
								className="icon-bold"
							/>
							Add College
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
												{this.renderTableBody(colleges)}
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

CollegesPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getColleges: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'CollegesPage'
	})
)(CollegesPage);