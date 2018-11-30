import { call, put, all, select } from 'redux-saga/effects';
import { getEntryItems } from '../../fetches';

function* loadEntitlementPageGroups({ data }) {

  const { searchParams: { start, end } } = data;

  const response = yield getEntryItems(end - start, start);

  const payload = {
    items: response,
    searchParams: { start, end }
  };

  yield put({ type: 'SET_ITEMS', payload });
}

export default loadEntitlementPageGroups;
