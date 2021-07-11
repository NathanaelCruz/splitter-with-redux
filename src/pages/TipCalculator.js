import React from 'react';
import Fields from '../components/Fields';
import Result from '../components/Result';
import * as Styles from './styles.module.css'

const TipCalculator = () => {
  return (
    <main>
      <section className={Styles.wrapper}>
        <h1 className={Styles.wrapper__title}>
          SPLI <br />
          TTER
        </h1>
        <form action="#" className={Styles.wrapper__form}>
          <Fields />
          <Result />
        </form>
      </section>
    </main>
  );
}

export default TipCalculator;