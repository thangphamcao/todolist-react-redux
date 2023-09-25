import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';

const compose = composeWithDevTools();
const store = createStore(reducer, compose);

export default store;
