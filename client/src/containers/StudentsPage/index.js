import { connect } from 'react-redux';
import { getStudents, reset, resetMeta } from '../../actions/StudentsPage';
import StudentsPage from './StudentsPage';

const mapsStateToProps = state => ({
	pageProps: state.StudentsPage
});

const mapsDispatchToProps = dispatch => ({
	getStudents(options) {
		dispatch(getStudents(options));
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
)(StudentsPage);

