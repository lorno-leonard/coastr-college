import { connect } from 'react-redux';
import { getBranches, getColleges, reset, resetMeta } from '../../actions/BranchesPage';
import BranchesPage from './BranchesPage';

const mapsStateToProps = state => ({
	pageProps: state.BranchesPage
});

const mapsDispatchToProps = dispatch => ({
	getBranches(options) {
		dispatch(getBranches(options));
	},
	getColleges() {
		dispatch(getColleges());
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
)(BranchesPage);

