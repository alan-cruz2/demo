import { combineReducers } from 'redux';
import itemStore from './itemStore';

export default combineReducers({
  items: itemStore
});
