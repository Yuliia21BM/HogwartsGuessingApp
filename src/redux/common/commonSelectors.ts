import {RootState} from '../store';

export const selectIsThemeDark = (state: RootState) => state.common.isThemeDark;
