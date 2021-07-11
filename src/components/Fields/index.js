import React from 'react';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce/lib';
import { TIP_ACTIONS } from '../../constants';
import * as Styles from './styles.module.css';

function Fields() {

  const dispatch = useDispatch()

  const dispatchReset = () => dispatch({
    type: TIP_ACTIONS.UPDATE_VALUE_TIP,
    payload: {
      tip: 0.00
    }
  })

  const clearValidateButton = () => {
    let buttonCurrency = document.querySelector('button.is__selected')

    buttonCurrency && buttonCurrency.classList.remove('is__selected')
  }

  const clearValidateInput= () => {
    let inputCustomValueTips = document.querySelector('#txt_customTip')

    inputCustomValueTips.value = ''
  }

  const resetCustomTip = () => {
    let inputCustomValue = document.querySelector('#txt_customTip')
    let inputErrorMessage = document.querySelector('span[data-ref="txt_customTip"]')

    inputErrorMessage.innerText = ''
    inputCustomValue.classList.remove('is__invalid')
  }

  const debounceSetState = useDebouncedCallback(
    //function
    (value, targetInput, key, type, options) => {
      let inputIsInValidate = document.querySelector('#' + targetInput)
      let inputErrorMessage = document.querySelector('span[data-ref="' + targetInput + '"]')
      let valueFormated = value.replace(',', '.')

      if(isNaN(parseInt(valueFormated))){
        inputIsInValidate.classList.add('is__invalid')
        inputErrorMessage.innerText = 'Can\'t be invalid'
        options.clearButton && clearValidateButton()
        dispatchReset()
      }
      else if(parseInt(valueFormated) === 0){
        inputIsInValidate.classList.add('is__invalid')
        inputErrorMessage.innerText = 'Can\'t be zero'
        options.clearButton && clearValidateButton()
        dispatchReset()
      } else {
        inputIsInValidate.classList.remove('is__invalid')
        inputErrorMessage.innerText = ''
        options.clearButton && clearValidateButton()
        dispatch({
          type: type,
          payload: {
            [key]: valueFormated / options.division
          }
        })
      }
    },
    500
  )

  const debounceSetStateButton = useDebouncedCallback(
    (valueButton) => {
      clearValidateInput()
      clearValidateButton()
      resetCustomTip()

      valueButton.classList.add('is__selected')
      dispatch({
        type: TIP_ACTIONS.UPDATE_VALUE_TIP,
        payload: {
          tip: parseFloat(valueButton.value)
        }
      })
    },
    500
  )


  return (
    <div className={Styles.fields} role="contentinfo">
      <div className={Styles.fields__group}>
        <label htmlFor="txt_bill" className={Styles.fields__label}>Bill</label>
        <span className={Styles.fields__error} data-ref="txt_bill"></span>
        <div className={Styles.fields__textInputContent}>
          <img src="/images/icon-dollar.svg" alt="Simbolo de cifrão" className={Styles.fields__icon} />
          <input type="number" step="any" name="txt_bill" id="txt_bill" className={Styles.fields__textInput} placeholder="0" onChange={(e) => debounceSetState(e.target.value, 'txt_bill', 'bill', TIP_ACTIONS.UPDATE_NUMBER_BILL, {division: 1, clearButton: false})} />
        </div>
      </div>
      <div className={Styles.fields__group}>
        <p className={Styles.fields__label}>Select Tip %</p>
        <span className={Styles.fields__error} data-ref="txt_customTip"></span>
        <ul className={Styles.list__tipsPercents}>
          <li className={Styles.list__tipsPercents__item}>
            <button type="button" value="0.05"
             className={Styles.list__tipsPercents__button}
             onClick={(e) => debounceSetStateButton(e.target.value, this)}
             >5%</button>
          </li>
          <li className={Styles.list__tipsPercents__item}>
            <button type="button" value="0.1"
             className={Styles.list__tipsPercents__button}
             onClick={(e) => debounceSetStateButton(e.target)}
             >10%</button>
          </li>
          <li className={Styles.list__tipsPercents__item}>
            <button type="button" value="0.15"
             className={Styles.list__tipsPercents__button}
             onClick={(e) => debounceSetStateButton(e.target)}
             >15%</button>
          </li>
          <li className={Styles.list__tipsPercents__item}>
            <button type="button" value="0.25"
             className={Styles.list__tipsPercents__button}
             onClick={(e) => debounceSetStateButton(e.target)}
             >25%</button>
          </li>
          <li className={Styles.list__tipsPercents__item}>
            <button type="button" value="0.5"
             className={Styles.list__tipsPercents__button}
             onClick={(e) => debounceSetStateButton(e.target)}
             >50%</button>
          </li>
          <li className={Styles.list__tipsPercents__item}>
            <input type="number" step="any" name="txt_customTip" id="txt_customTip" className={`${Styles.fields__textInput} ${Styles.fields__textIput__custom}`} placeholder="Custom" onChange={(e) => debounceSetState(e.target.value, 'txt_customTip', 'tip', TIP_ACTIONS.UPDATE_VALUE_TIP, {division: 100, clearButton: true})} />
          </li>
        </ul>
      </div>
      <div className={Styles.fields__group}>
        <label htmlFor="txt_person" className={Styles.fields__label}>Number of People</label>
        <span className={Styles.fields__error} data-ref="txt_person"></span>
        <div className={Styles.fields__textInputContent}>
          <img src="/images/icon-person.svg" alt="Simbolo de cifrão" className={Styles.fields__icon} />
          <input type="number" name="txt_person" id="txt_person" className={Styles.fields__textInput} placeholder="0" onChange={(e) => debounceSetState(e.target.value, 'txt_person', 'numberPeoples', TIP_ACTIONS.UPDATE_NUMBER_PEOPLES,{division: 1, clearButton: false})} />
        </div>
      </div>
    </div>
  );
}

export default Fields;