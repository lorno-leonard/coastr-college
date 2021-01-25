import { connect } from 'react-redux';
import { getColleges, reset, resetMeta } from '../../actions/CollegesPage';
import CollegesPage from './CollegesPage';

const mapsStateToProps = state => ({
	pageProps: state.CollegesPage
});

const mapsDispatchToProps = dispatch => ({
	getColleges(options) {
		dispatch(getColleges(options));
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
)(CollegesPage);

