import { TIP_ACTIONS } from "../constants";

export const updatePeoples = value => ({
  type: TIP_ACTIONS.UPDATE_NUMBER_PEOPLES,
  payload:{
    numberPeoples: value
  }
})

export const updateBill = value => ({
  type: TIP_ACTIONS.UPDATE_NUMBER_BILL,
  payload:{
    bill: value
  }
})

export const updateTip = value => ({
  type: TIP_ACTIONS.UPDATE_VALUE_TIP,
  payload:{
    tip: value
  }
})

export const resetAll = value => ({
  type: TIP_ACTIONS.RESET_ALL,
  payload:{
    numberPeoples: value.numberPeoples,
    tip: value.tip,
    bill: value.bill
  }
})