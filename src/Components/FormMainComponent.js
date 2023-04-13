import React, { useState, useReducer, useContext } from 'react';
import './../index.css';
import Todo from './Todo';
import { Context as imp } from './MainComponent';
import { income as incomeCategories, expense as expenseCategories } from './Constants/Options';


const ADD = {
  to_do: "todo",
  to_delete: "todelete"
}

function reducer(state, action) {
  switch (action.type) {

    case ADD.to_do:

      return [...state, {
        name: action.payload.name, id: new Date(), value: 22, type: action.payload.type,
        category: action.payload.category
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

export default function FormMainComponent() {
  const [list, dispatch] = useReducer(reducer, []);

  const [value, setValue] = useState('');
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState(null)

  const val = useContext(imp);

  async function handleOnSubmit(event) {
    event.preventDefault();

    if (!category) {
      alert('ADD-Category');
      return;
    }

    if (value.length === 0) {
      alert('ADD-amount');
      return ;
    }

    if(type==='Income'){

      try {
        await val[0](category, value);
      } catch (error) {
        console.error(error);
      }
      // console.log(incomeCategories);

    }else{

      try {
        await val[1](category, value);
      } catch (error) {
        console.error(error);
      }
      // console.log(expenseCategories);
    }
    dispatch({ type: ADD.to_do, payload: { name: value, type: type, category: category } })
    setValue('');
    setCategory(null);
  }

  async function handleonClickDelete(to_delete_id,Trans_type,amount,Cats) {
    console.log(Trans_type+" "+amount+" "+Cats)
    if(Trans_type==='Income'){

      try {
        await val[0](Cats, (-1)*amount);
      } catch (error) {
        console.error(error);
      }
    }else{

      try {
        await val[1](Cats, (-1)*amount);
      } catch (error) {
        console.error(error);
      }
      
    }

    dispatch({ type: ADD.to_delete, payload: to_delete_id })
  }

  function handleOnChangeType(event) {
    setType(event.target.value);
  }

  function handleOnChangeCategories(event) {
    setCategory(event.target.value);
  }
  return (
    <>

      <div className='Form-Main-Component'>
        <div className='Display-Name'>
          Expense Tracker
        </div>

        <hr ></hr>
        <form onSubmit={handleOnSubmit} >
          
      

          <select id="DropDown-Type" name="DropDown" onChange={handleOnChangeType} style={{ margin: '10px', width: '45%' , height:'40px'}}>
            <option value="" disabled selected>{type}</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>


          <select id="DropDown-Categories" name='DropDown' onChange={handleOnChangeCategories} style={{ margin: '10px', width: '45%',height:'40px' }} >
            <option value="" disabled selected>Select Categories</option>
            {
              type === 'Income' ?
                incomeCategories.map((element) => { return <option>{element}</option> }) :
                expenseCategories.map((element) => { return <option>{element}</option> })
            }
          </select>

          <div className='Expense-input'>
            <input type="text" onChange={(event) => setValue(event.target.value)} value={value} placeholder='Amount'/>
          </div>

        </form>

        <button onClick={handleOnSubmit} className='Add-Btn'>Create</button>
        
        
        <div className='App-flex-column-2'>

          <div style={{ height: '200px', overflow: 'auto'  }}>

            {

              list.map((element) => {

                return <Todo key={element.id} name={element.name} handle={handleonClickDelete} id={element.id}
                  header={element.category} type={element.type} />
              })

            }
          </div>

        </div>
      </div>
    </>
  )
}
