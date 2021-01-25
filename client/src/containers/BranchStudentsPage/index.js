import { connect } from 'react-redux';
import { getBranchById, getBranchStudents, getStudents, onSubmit, reset, resetMeta } from '../../actions/BranchStudentsPage';
import BranchStudentsPage from './BranchStudentsPage';

const mapsStateToProps = state => ({
	pageProps: state.BranchStudentsPage
});

const mapsDispatchToProps = dispatch => ({
	getBranchStudents(id) {
		dispatch(getBranchStudents(id));
	},
	getStudents() {
		dispatch(getStudents());
	},
	getBranchById(id) {
		dispatch(getBranchById(id));
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
)(BranchStudentsPage);

