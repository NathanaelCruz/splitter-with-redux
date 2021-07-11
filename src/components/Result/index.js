import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TIP_ACTIONS } from '../../constants';
import * as Styles from './styles.module.css';

const Result = () => {

  let amountPerson = useSelector(state => state.tipValuesReducer.numberPeoples)
  let valueTip = useSelector(state => state.tipValuesReducer.tip)
  let valueBill = useSelector(state => state.tipValuesReducer.bill)

  let dispatch = useDispatch()

  const formatedPrice = (price, rounded, decimals) => {
    let priceFormated = 0

    if(rounded === 'down'){
      let priceBroken = String(price).split('.')
      if(priceBroken[1]){
        priceFormated = String(price).split('.')[0] + '.' + String(price).split('.')[1].substr(0,2)
      }

      priceFormated = price.toFixed(decimals)
      
    } else {
      priceFormated = price.toFixed(decimals)
    }

    return priceFormated.toLocaleString('en-US')
  }

  const removeStatus = () => {
    let buttonTip = document.querySelector('button.is__selected')
    let inputError = document.querySelector('input.is__invalid')
    let msgErrors = document.querySelectorAll('span[data-ref]')

    buttonTip && buttonTip.classList.remove('is__selected')
    inputError && inputError.classList.remove('is__invalid')

    msgErrors.forEach(span => {
      span.innerText = ''
    })
  }

  const resetAll = () => {
    let inputAmountPeople = document.querySelector('#txt_person')
    let inputTipCustom = document.querySelector('#txt_customTip')
    let inputBill = document.querySelector('#txt_bill')

    inputAmountPeople.value = 1
    inputBill.value = 0
    inputTipCustom.value = 0

    removeStatus()

    dispatch({
      type: TIP_ACTIONS.RESET_ALL,
      payload: {
        numberPeoples: 1,
        tip: 0.00,
        bill: 0.00
      }
    })
  }

  return (
   <div role="contentinfo" className={Styles.results}>
     <ul className={Styles.results__listValues}>
      <li className={Styles.list__resultItem}>
        <p className={Styles.list__label}>
          <b className={Styles.label__title}>Tip Amount</b>
          <br />
          / person
        </p>
        <p className={Styles.price__content}>
            $
          <strong className={Styles.price__value}>{formatedPrice((valueBill * valueTip)/amountPerson, 'down', 2)}</strong>
        </p>
      </li>
      <li className={Styles.list__resultItem}>
        <p className={Styles.list__label}>
          <b className={Styles.label__title}>Total</b>
          <br />
          / person
        </p>
        <p className={Styles.price__content}>
            $
          <strong className={Styles.price__value}>{formatedPrice((valueBill * (1 + valueTip))/amountPerson, 'up', 2)}</strong>
        </p>
      </li>
     </ul>
     <button
      className={Styles.results__button}
       type="button"
        aria-label="Reset de informações" onClick={() => resetAll()}>RESET</button>
   </div> 
  )
}

export default Result;