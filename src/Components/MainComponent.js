import React, { useState, useEffect } from 'react';
import FormMainComponent from './FormMainComponent';
import DoughnutComponent from './DoughnutComponent';
import { formatAmount } from './Constants/DateFormatter';
import { initialIncomeState, initialExpenseState } from './Constants/Options';
import './../index.css';

const initialState = {
  incomeCategories: initialIncomeState,
  expenseCategories: initialExpenseState
};

export default function FormValues() {
  const [totalIC, setTIC] = useState(0);
  const [totalExp, setTExp] = useState(0);

  const [ChartDataIC, updateCD_IC] = useState({
    labels: [],
    datasets: [
      {
        label: 'Votes',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [ChartDataExp, updateCD_Exp] = useState({
    labels: [],
    datasets: [
      {
        label: 'Votes',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [incomeCategories, updateIC] = useState(() => {
    const storedData = localStorage.getItem('income-values');
    return storedData ? JSON.parse(storedData) : initialState.incomeCategories;
  });

  const [expenseCategories, updateEC] = useState(() => {
    const storedData = localStorage.getItem('expense-values');
    return storedData ? JSON.parse(storedData) : initialState.expenseCategories;
  });
  useEffect(() => {
    const res1 = getValues(incomeCategories);
    const res2 = getValues(expenseCategories);

    console.log(res1);
    console.log(res2);

    if (res1.sum > 0) {
      setTIC(res1.sum);

      updateCD_IC({
        labels: res1.label,
        datasets: [
          {
            label: 'Votes',
            data: res1.amountArray,
            backgroundColor: res1.colorArray,
          },
        ],
      });
    }

    if (res2.sum > 0) {
      setTExp(res2.sum);
      updateCD_Exp({
        labels: res2.label,
        datasets: [
          {
            label: 'Votes',
            data: res2.amountArray,
            backgroundColor: res2.colorArray,
          },
        ],
      });
    }
    console.log("?");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValues = (Values) => {

    let amountArray = [];
    let colorArray = [];
    let label = [];
    let sum = 0;

    Values.forEach((element) => {
      if (element.amount > 0) {
        amountArray.push(element.amount);
        colorArray.push(element.color);
        label.push(element.type);
        sum += element.amount;
      }
    });

    return {
      amountArray: amountArray,
      colorArray: colorArray,
      label: label,
      sum: sum
    }
  }
  const updateCategories = (category, amount, update_categories, type) => {

    return new Promise((resolve, reject) => {

      let a = -1;
      const updatedValues = update_categories.map((element) => {
        if (element.type === category) {
          a = 0;
          const category_amount_updated = Number(amount) + Number(element.amount);
          return { ...element, amount: category_amount_updated };
        }
        return element;
      });


      const result = getValues(updatedValues);

      if (type === "Income") {

        updateIC(updatedValues);
        setTIC(result.sum);

        updateCD_IC({
          labels: result.label,
          datasets: [
            {
              label: 'Votes',
              data: result.amountArray,
              backgroundColor: result.colorArray,
            },
          ],
        });

      } else {
        updateEC(updatedValues);
        setTExp(result.sum);
        updateCD_Exp({
          labels: result.label,
          datasets: [
            {
              label: 'Votes',
              data: result.amountArray,
              backgroundColor: result.colorArray,
            },
          ],
        });
      }

      if (a === 0) {
        resolve('resolved');
      } else {
        reject('rejected');
      }

    });
  };

  const UpdateAmt = (type, category, amount) => {
    const state_type = type === 'Income' ? incomeCategories : expenseCategories;

    return updateCategories(category, amount, state_type, type);
  }

  useEffect(() => {
    localStorage.setItem('income-values', JSON.stringify(incomeCategories));
  }, [incomeCategories]);

  useEffect(() => {
    localStorage.setItem('expense-values', JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  return (
    <div className='App-flex-column'>
      <div className='Main-Doughnut-Component Income-Bottom'>
        <h3 style={{ textAlign: 'center' }}>Income-{formatAmount(totalIC)}</h3>
        <DoughnutComponent val={ChartDataIC} />
      </div>

      <div className='Form-Main-Component-width'>
        <FormMainComponent UpdateAmt={UpdateAmt} />
      </div>

      <div className='Main-Doughnut-Component Expense-Bottom'>
        <h3 style={{ textAlign: 'center' }}>Expense-{formatAmount(totalExp)}</h3>
        <DoughnutComponent val={ChartDataExp} />
      </div>
    </div>
  );
}
