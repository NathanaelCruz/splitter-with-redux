import { TIP_ACTIONS } from "../constants"

const INITIAL_STATE = {
  numberPeoples: 1,
  bill: 0.0,
  tip: 0.0
}

export const tipValues = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case TIP_ACTIONS.UPDATE_NUMBER_PEOPLES:
     return {
       ...state,
       numberPeoples: action.payload.numberPeoples
     }

    case TIP_ACTIONS.UPDATE_NUMBER_BILL:
      return {
        ...state,
        bill: action.payload.bill
      }

    case TIP_ACTIONS.UPDATE_VALUE_TIP:
       return {
        ...state,
        tip: action.payload.tip
      }

    case TIP_ACTIONS.RESET_ALL:
      return {
       ...state,
       numberPeoples: action.payload.numberPeoples,
       tip: action.payload.tip,
       bill: action.payload.bill
     }
   
    default:
      return state
  }

}