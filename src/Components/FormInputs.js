import React from 'react'
import { income as incomeCategories, expense as expenseCategories } from './Constants/Options';
import './../index.css'

export default function FormInputs({ value, type, category, handleOnChangeType, handleOnChangeCategories, handleOnSubmit, Date_, handleOnDateChange, handleOnValueChange }) {
    return (
        <>
            <form onSubmit={handleOnSubmit} >

                <select id="DropDown-Type" name="DropDown" onChange={handleOnChangeType} style={{ margin: '10px', width: '45%', height: '40px' }}>
                    <option value="" disabled selected>{type}</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>


                <select id="DropDown-Categories" name='DropDown' onChange={handleOnChangeCategories} style={{ margin: '10px', width: '45%', height: '40px' }} >

                    {category.length === 0 ?
                        <option value='' disabled selected>Select category</option>
                        :
                        <option value={category} disabled defaultValue>{category}</option>
                    }

                    {type === 'Income' ?
                        incomeCategories.map((element) => { return <option>{element}</option> }) :
                        expenseCategories.map((element) => { return <option>{element}</option> })
                    }
                </select>

                <div className='Expense-input'>
                    <input type="text" onChange={handleOnValueChange} value={value} placeholder='Amount' />
                    <input type='date' onChange={handleOnDateChange} value={Date_}></input>
                </div>

            </form>
            <button onClick={handleOnSubmit} className='Add-Btn'>Create</button>
        </>
    )
}


