import React, { useState, useReducer, useEffect } from 'react';
import './../index.css';
import DateFormatter from './Constants/DateFormatter'
import FormInputs from './FormInputs';
import TodoList from './TodoList';

const ADD = {
  to_do: "todo",
  to_delete: "todelete"
}

function reducer(state, action) {
  switch (action.type) {

    case ADD.to_do:

      return [...state, {
        name: action.payload.name, id: new Date(), value: 22, type: action.payload.type,
        category: action.payload.category, date: action.payload.date
      }]
    case ADD.to_delete:

      let res = []

      state.forEach(element => {
        if (element.id !== action.payload) {
          res.push(element)
        }
      });

      return res;
    default:
      return [...state];
  }
}

export default function FormMainComponent({ UpdateAmt }) {

  const [list, dispatch] = useReducer(reducer, [], () => {
    const storedData = localStorage.getItem('transaction-history');
    const parsedData = storedData ? JSON.parse(storedData) : [];
    return Array.isArray(parsedData) ? parsedData : [];
  });

  const [value, setValue] = useState('');
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState('');
  const date = new Date();
  const FullDate = DateFormatter(date);
  const [Date_, SetDate] = useState(FullDate);

  async function handleOnSubmit(event) {
    event.preventDefault();

    if (!category) {
      alert('ADD-Category');
      return;
    }

    if (value.length === 0) {
      alert('ADD-amount');
      return;
    }

    UpdateAmt(type, category, value);
    dispatch({ type: ADD.to_do, payload: { name: value, type: type, category: category, date: Date_ } })
    setValue('');
    setCategory('');
  }

  async function handleonClickDelete(to_delete_id, Trans_type, amount, category) {
    console.log(Trans_type + " " + amount + " " + category)
    UpdateAmt(Trans_type, category, (-1) * amount);
    dispatch({ type: ADD.to_delete, payload: to_delete_id })
  }

  function handleOnChangeType(event) {
    setType(event.target.value);
    setCategory('');
  }

  function handleOnChangeCategories(event) {
    setCategory(event.target.value);
  }

  function handleOnDateChange(event) {
    SetDate(event.target.value);
  }

  function handleOnValueChange(event) {
    setValue(event.target.value)
  }

  useEffect(() => {
    localStorage.setItem('transaction-history', JSON.stringify(list))
    console.log(list)
  }, [list])

  return (
    <>
      <div className='Form-Main-Component'>

        <div className='Display-Name'>
          Expense Tracker
        </div>

        <hr ></hr>

        <FormInputs {...{ value, type, category, handleOnChangeType, handleOnChangeCategories, handleOnSubmit, Date_, handleOnDateChange, handleOnValueChange }} />

        <TodoList {...{ list, handleonClickDelete }} />

      </div>
    </>
  )
}

/*if (type === 'Income') {
  
  try {
    await val[0](category, value);
  } catch (error) {
    console.error(error);
  }
  // console.log(incomeCategories);
  
} else {
  
  try {
    await val[1](category, value);
  } catch (error) {
    console.error(error);
  }
  // console.log(expenseCategories);
}*/

/*if (Trans_type === 'Income') {
  
  try {
    await UpdateAmt()
  } catch (error) {
    console.error(error);
  }

} else {
  
  try {
    await val[1](Cats, (-1) * amount);
  } catch (error) {
    console.error(error);
  }
  
}*/