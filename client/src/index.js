import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import WebFont from 'webfontloader';
import './index.scss';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import store, { history } from './store';

WebFont.load({
	google: {
		families: ['Libre Franklin:300,400,500', 'Roboto', 'sans-serif']
	}
});

const alertOptions = {
	position: 'bottom right',
	timeout: 5000,
	offset: '30px',
	transition: 'scale',
	containerStyle: {
		zIndex: 1001
	}
};

ReactDOM.render(
	<Provider store={store()}>
		<AlertProvider
			template={AlertTemplate}
			{...alertOptions}
		>
			<ConnectedRouter history={history}>
				<Routes />
			</ConnectedRouter>
		</AlertProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
