import { takeLatest } from 'redux-saga/effects';
import fetchItemsSaga from './fetchItemsSaga';

export function* watcherSaga() {
	yield [
    takeLatest('LOAD_ITEMS', fetchItemsSaga)
	];
}
