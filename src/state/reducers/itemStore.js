const defaultState = {
  items: [],
  searchParams: {}
};

const itemReducer = (state = defaultState, action) => {
  switch (action.type) {
      case 'SET_ITEMS':
          const { searchParams, items } = action.payload;
          const hasUpdate = JSON.stringify(state.searchParams) !== searchParams;

          if (hasUpdate) {
            const newItems = state.items.concat(items);
            console.log(newItems);
            return Object.assign({}, state, {items: newItems, searchParams});
          }

          return state;
      default:
          return state;
  }
};
export default itemReducer;
