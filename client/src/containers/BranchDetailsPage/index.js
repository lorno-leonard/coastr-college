import { connect } from 'react-redux';
import { getBranchById, getColleges, onSubmit, reset, resetMeta } from '../../actions/BranchDetailsPage';
import BranchDetailsPage from './BranchDetailsPage';

const mapsStateToProps = state => ({
	pageProps: state.BranchDetailsPage
});

const mapsDispatchToProps = dispatch => ({
	getBranchById(id) {
		dispatch(getBranchById(id));
	},
	getColleges() {
		dispatch(getColleges());
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
)(BranchDetailsPage);

