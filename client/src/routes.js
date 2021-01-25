import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import CollegeDetailsPage from './containers/CollegeDetailsPage';
import CollegesPage from './containers/CollegesPage';
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import SignupPage from './containers/SignupPage';
import StudentsPage from './containers/StudentsPage';
import UnauthorizedPage from './containers/UnauthorizedPage';
import AuthHelper from './helpers/auth';
/* layouts */
import BasicLayout from './layouts/basic-layout';
import NavigationLayout from './layouts/navigation-layout';

const routes = [
	{ path: '/unauthorized', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: UnauthorizedPage },
	{ path: '/signup', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: SignupPage },
	{ path: '/login', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: LoginPage },
	{ path: '/logout', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: LogoutPage },

	// Colleges
	{ path: '/', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CollegesPage },
	{ path: '/colleges', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CollegesPage },
	{ path: '/colleges/create', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CollegeDetailsPage },
	{ path: '/colleges/id/', exact: false, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: CollegeDetailsPage },

	// Students
	{ path: '/students', exact: true, isPrivate: true, Layout: NavigationLayout, layoutClass: 'fill', Component: StudentsPage }
];

function getRedirectedPath(location) {
	if (
		location.pathname.split('?')[0] === '/login'
		&& location.pathname.split('?').length > 1
	) {
		return location.pathname + location.search + location.hash;
	}

	// skip the redirection from these routes
	if (
		[
			'/login',
			'/logout'
		].indexOf(location.pathname.split('?')[0]) !== -1) {
		return '/login';
	}
	return `/login?path=${location.pathname + location.search + location.hash}`;
}


const PrivateRoute = ({ layout: Layout, layoutClass, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (AuthHelper.isAuthenticated()) {
				return (
					<Layout containerClass={layoutClass}>
						<Component {...props} />
					</Layout>
				);
			} else {
				return (
					<Redirect
						to={{
							pathname: getRedirectedPath(props.location),
							state: { from: props.location }
						}}
					/>
				);
			}
		}}
	/>
);

export class Routes extends Component {
	render() {
		const { location } = this.props;
		return (
			<Switch location={location}>
				{routes.map(({ path, exact, isPrivate, Layout, layoutClass, Component }) => {
					if (isPrivate) {
						return (
							<PrivateRoute
								key={0}
								path={path}
								exact={exact}
								layout={Layout}
								layoutClass={layoutClass}
								component={Component}
							/>
						);
					} else {
						return (
							<Route
								key={0}
								path={path}
								exact={exact}
								render={props => (
									<Layout
										containerClass={layoutClass}
										location={location}
									>
										<Component {...props} />
									</Layout>
								)}
							/>
						);
					}
				})}
				<Route render={props => (AuthHelper.isAuthenticated() ? <Redirect to={'/reports'} /> : <Redirect to={getRedirectedPath(props.location)} />)} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
