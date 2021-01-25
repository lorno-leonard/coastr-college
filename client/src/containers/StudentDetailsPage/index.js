import { connect } from 'react-redux';
import { getStudentById, onSubmit, reset, resetMeta } from '../../actions/StudentDetailsPage';
import StudentDetailsPage from './StudentDetailsPage';

const mapsStateToProps = state => ({
	pageProps: state.StudentDetailsPage
});

const mapsDispatchToProps = dispatch => ({
	getStudentById(id) {
		dispatch(getStudentById(id));
	},
	onSubmit(options) {
		dispatch(onSubmit(options));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	reset() {
		dispatch(reset());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(StudentDetailsPage);

