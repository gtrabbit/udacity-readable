import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import 'core-js/fn/array/find';
import 'core-js/fn/array/from';
import 'core-js/fn/array/find-index';

const middleware = applyMiddleware(thunk);

const store = createStore(
	reducer,
	compose(middleware)
	
	);

ReactDOM.render(
	<Provider store={store}>
	<BrowserRouter><App /></BrowserRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
