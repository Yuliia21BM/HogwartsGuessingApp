import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import charactersSlice from './characters/charactersSlice';
import commonSlice from './common/commonSlice';
import listSlice from './list/listSlise';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  characters: charactersSlice,
  common: commonSlice,
  list: listSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
