import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BranchesPage from './BranchesPage';
import CollegeDetailsPage from './CollegeDetailsPage';
import CollegesPage from './CollegesPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import StudentDetailsPage from './StudentDetailsPage';
import StudentsPage from './StudentsPage';

export default history =>
	combineReducers({
		form: formReducer,
		router: connectRouter(history),
		LoginPage,
		SignupPage,
		CollegesPage,
		CollegeDetailsPage,
		StudentsPage,
		StudentDetailsPage,
		BranchesPage
	});