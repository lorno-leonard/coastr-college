import { connect } from 'react-redux';
import { getCollegeById, onSubmit, reset, resetMeta } from '../../actions/CollegeDetailsPage';
import CollegeDetailsPage from './CollegeDetailsPage';

const mapsStateToProps = state => ({
	pageProps: state.CollegeDetailsPage
});

const mapsDispatchToProps = dispatch => ({
	getCollegeById(id) {
		dispatch(getCollegeById(id));
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
)(CollegeDetailsPage);

