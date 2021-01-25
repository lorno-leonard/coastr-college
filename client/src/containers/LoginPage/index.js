import { connect } from 'react-redux';
import { login, onFieldChange, reset, showLoginForm } from '../../actions/LoginPage';
import LoginPage from './LoginPage';

const mapsStateToProps = state => ({
	pageProps: state.LoginPage
});

const mapsDispatchToProps = dispatch => ({
	onFieldChange(fieldName, fieldValue) {
		dispatch(onFieldChange(fieldName, fieldValue));
	},
	login(opts) {
		dispatch(login(opts));
	},
	reset() {
		dispatch(reset());
	},
	showLoginForm(opts) {
		dispatch(showLoginForm(opts));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LoginPage);
