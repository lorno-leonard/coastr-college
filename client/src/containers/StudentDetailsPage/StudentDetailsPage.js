import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { compose } from 'redux';
import { Breadcrumb, Divider, Icon } from 'semantic-ui-react';
import UrlParse from 'url-parse';
import DetailMenu from '../../components/DetailMenu';
import Loading from '../../components/loading';
import StudentBasicForm from './components/StudentBasicForm';

class StudentDetailsPage extends Component {
	componentDidMount() {
		const { query } = UrlParse(this.props.location.search, true);

		if (query.id) {
			this.props.getStudentById(query.id);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, loadingSubmit: prevLoadingSubmit } = prevProps.pageProps;
		const { meta, loadingSubmit } = this.props.pageProps;
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
			this.props.getStudentById(query.id);
		}
	}

	componentWillUnmount() {
		this.props.reset();
	}

	render() {
		const { pageProps, location, history } = this.props;
		const { student, loading, loadingSubmit } = pageProps;
		const { query } = UrlParse(location.search, true);

		if (loading || (query.id && !student)) {
			return (
				<Loading />
			);
		}

		const { id } = query;
		const sections = [
			{ key: '/students', content: 'Students', link: true, onClick: () => history.push('/students') },
			{ key: '', content: !query.id ? 'New' : `Edit ${student.name}`, active: true }
		];
		const tabs = [
			{ title: 'Basic', path: `/basic?id=${id}` }
		];

		return (
			<div>
				<React.Fragment>
					<div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 0px 20px' }}>
						<div>
							<Icon
								className="icon-bold"
								name="arrow left"
								onClick={() => history.push('/students')}
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
				<StudentBasicForm
					{...this.props}
					student={student}
					loading={loading}
					loadingSubmit={loadingSubmit}
					onSubmit={this.props.onSubmit}
				/>
			</div>
		);
	}
}

StudentDetailsPage.propTypes = {
	pageProps: PropTypes.object.isRequired,
	getStudentById: PropTypes.func.isRequired,
	resetMeta: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired
};


export default compose(
	withAlert(),
)(StudentDetailsPage);
