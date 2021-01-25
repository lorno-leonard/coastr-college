import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { FieldArray, reduxForm } from 'redux-form';
import { Breadcrumb, Button, Divider, Grid, Icon, Segment } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import DetailMenu from '../../components/DetailMenu';
import Loading from '../../components/loading';
import BranchStudentInput from './components/BranchStudentInput';

class BranchStudentsPage extends Component {
	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);

		this.props.getStudents();
		if (query.id) {
			this.props.getBranchStudents(query.id);
			this.props.getBranchById(query.id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			loadingSubmit: prevLoadingSubmit,
			hasLoaded: prev_hasLoaded
		} = prevProps.pageProps;
		const {
			meta,
			loadingSubmit,
			hasLoaded
		} = this.props.pageProps;
		const { query } = UrlParse(this.props.location.search, true);

		if (meta && meta !== prevMeta) {
			const alertOptions = {
				type: meta.code === 200 ? 'success' : 'error',
				...(meta.code === 40399 && { timeout: 0 })
			};
			this.props.alert.show(meta.message, alertOptions);
			this.props.resetMeta();
		}

		if (query.id && loadingSubmit && loadingSubmit !== prevLoadingSubmit) {
			this.props.getBranchStudents(query.id);
		}

		if (hasLoaded && hasLoaded !== prev_hasLoaded) {
			const { branch_students } = this.props.pageProps;
			const branchStudentIds = branch_students.map(o => _.get(o, 'student_id._id'));
			this.props.initialize({ student_ids: branchStudentIds });
		}
	}

	componentWillUnmount() {
		this.props.reset();
	}

	render() {
		const {
			pageProps,
			location,
			history,
			// redux-form props
			handleSubmit,
			pristine,
			submitting,
			invalid
		} = this.props;
		const {
			loading,
			students,
			loadingStudents,
			branch,
			loadingBranch,
			loadingSubmit
		} = pageProps;
		const { query } = UrlParse(location.search, true);

		if (loading || loadingBranch || (query.id && !branch)) {
			return (
				<Loading />
			);
		}

		const { id } = query;
		const sections = [
			{ key: '/branches', content: 'Branches', link: true, onClick: () => history.push('/branches') },
			{ key: '', content: !query.id ? 'New' : `Edit ${branch.name}`, active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${id}` },
			{ title: 'Students', path: `/students?id=${id}` }
		];

		return (
			<div>
				<React.Fragment>
					<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
						<div>
							<Icon
								className="icon-bold"
								name="arrow left"
								onClick={() => history.push('/branches')}
							/>
							<Breadcrumb
								divider="/"
								sections={sections}
							/>
						</div>
					</div>
					<Divider />
				</React.Fragment>
				<DetailMenu
					tabs={tabs}
					location={location}
					history={history}
				/>
				<div className="bt-content-padded">
					<Grid>
						<Grid.Row>
							<Grid.Column width={9}>
								<Segment>
									<h4>Branch Students - {_.get(branch, 'name')}</h4>
									<FieldArray
										loadingInitialValue={loading}
										students={students}
										loadingStudents={loadingStudents}
										name="student_ids"
										component={BranchStudentInput}
									/>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Button
						primary
						disabled={pristine || submitting || invalid || loadingSubmit}
						onClick={handleSubmit(data => this.props.onSubmit(data))}
					>
						Save
					</Button>
				</div>
			</div>
		);
	}
}

BranchStudentsPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getBranchStudents: PropTypes.func.isRequired,
	getStudents: PropTypes.func.isRequired,
	getBranchById: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};

export default compose(
	withAlert(),
	reduxForm({
		form: 'BranchStudentsPage'
	})
)(BranchStudentsPage);
