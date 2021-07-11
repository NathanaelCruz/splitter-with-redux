import { combineReducers } from "redux";
import { tipValues } from './tipValues'

export const reducers = combineReducers({
  tipValuesReducer: tipValues
})