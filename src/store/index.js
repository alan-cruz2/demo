import { createStore, applyMiddleware } from 'redux';
import { watcherSaga } from '../state/sagas';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../state/reducers';

export default function configureStore() {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

	sagaMiddleware.run(watcherSaga);
	return store;
}
