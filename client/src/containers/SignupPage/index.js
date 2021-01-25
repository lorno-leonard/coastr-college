import { connect } from 'react-redux';
import { onSubmit, reset, resetMeta } from '../../actions/SignupPage';
import SignupPage from './SignupPage';

const mapsStateToProps = state => ({
	pageProps: state.SignupPage
});

const mapsDispatchToProps = dispatch => ({
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
)(SignupPage);

