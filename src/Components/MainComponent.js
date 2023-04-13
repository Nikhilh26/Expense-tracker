import React,{useState} from 'react'
import FormMainComponent from './FormMainComponent';
import MainDoughnutComponent from './MainDoughnutComponent';
import {formatAmount} from './Constants/DateFormatter';
import './../index.css'
const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d', '#00ff9d'];
const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f'];


export const Context=React.createContext()

export default function FormValues() {
    const [totalIC,setTIC]=useState(0);
    const [totalExp,setTExp]=useState(0);
    const [ChartDataIC,updateCD_IC] = useState(
    {
    labels: [],
    
    datasets: [{
      label: 'Votes',
      data: [],
      backgroundColor: []
    }]
  
  });
  
  const [ChartDataExp,updateCD_Exp]=useState(
    {
      labels: [],
      
      datasets: [{
        label: 'Votes',
        data: [],
        backgroundColor: []
      }]
    
    });

  const [incomeCategories,updateIC]=useState(
    [
      { type: 'Business', amount: 0, color: incomeColors[0] },
      { type: 'Investments', amount: 0, color: incomeColors[1] },
      { type: 'Extra income', amount: 0, color: incomeColors[2] },
      { type: 'Deposits', amount: 0, color: incomeColors[3] },
      { type: 'Lottery', amount: 0, color: incomeColors[4] },
      { type: 'Gifts', amount: 0, color: incomeColors[5] },
      { type: 'Salary', amount: 0, color: incomeColors[6] },
      { type: 'Savings', amount: 0, color: incomeColors[7] },
      { type: 'Rental income', amount: 0, color: incomeColors[8] },
    ]
  )
  const [expenseCategories,updateEC]=useState(
    [
      { type: 'Bills', amount: 0, color: expenseColors[0] },
      { type: 'Car', amount: 0, color: expenseColors[1] },
      { type: 'Clothes', amount: 0, color: expenseColors[2] },
      { type: 'Travel', amount: 0, color: expenseColors[3] },
      { type: 'Food', amount: 0, color: expenseColors[4] },
      { type: 'Shopping', amount: 0, color: expenseColors[5] },
      { type: 'House', amount: 0, color: expenseColors[6] },
      { type: 'Entertainment', amount: 0, color: expenseColors[7] },
      { type: 'Phone', amount: 0, color: expenseColors[8] },
      { type: 'Pets', amount: 0, color: expenseColors[9] },
      { type: 'Other', amount: 0, color: expenseColors[10] },
    ]
  )
  
    const updateIncome=(category,amount)=>{
       console.log(amount)
        return new Promise((resolve,reject)=>{
          let a=-1;
          
          const Updatevalues=
          incomeCategories.map((element)=>{
            if(element.type===category){
              a=0;
              setTIC(Number(Number(totalIC)+Number(amount)))
              return {...element,amount:element.amount+amount};
            }
                  return element;
          })
          
          updateIC(Updatevalues);
          
          let amountArray=[];
          let colorArray=[];
          let label=[];

          Updatevalues.forEach((element)=>{
            if(element.amount>0){
                amountArray.push(element.amount);
                colorArray.push(element.color);
                label.push(element.type);
            }
          })

          updateCD_IC({
    
            labels:label,
            
            datasets: [{
              label: 'Votes',
              data: amountArray,
              backgroundColor: colorArray
            }]
          
          })

          console.log(Updatevalues);
          console.log(ChartDataIC);

          
          if(a===0){
            resolve("resolved");
          }else{
            reject("rejected ");
          }
        })
      }
      
    const updateExpense=(category,amount)=>{
        return new Promise((resolve,reject)=>{
          let a=-1;
          const Updatevalues=
          expenseCategories.map((element)=>{
            if(element.type===category){
                a=0;
                setTExp(Number(Number(totalExp)+Number(amount)));
                return {...element,amount:element.amount+amount};
            }
            console.log(totalExp)
            return element;
          })
          
          let amountArray=[];
          let colorArray=[];
          let label=[];

          Updatevalues.forEach((element)=>{
            if(element.amount>0){
                amountArray.push(element.amount);
                colorArray.push(element.color);
                label.push(element.type);
            }
          })

          updateCD_Exp({
    
            labels:label,
            
            datasets: [{
              label: 'Votes',
              data: amountArray,
              backgroundColor: colorArray
            }]
          
          })

          updateEC(Updatevalues);

          if(a===0){
            resolve("resolved");
          }else{
            reject("rejected");
          }
        })
      }
  
      return (
      <Context.Provider value={[updateIncome,updateExpense]}>

      <div className='App-flex-column'>
        
        <div className='Main-Doughnut-Component Income-Bottom'>
          <h3 style={{textAlign:'center'}}>Income-{formatAmount(totalIC)}</h3>
          <MainDoughnutComponent val={ChartDataIC}/> 
        </div>
        
        <div>
          <FormMainComponent />
        </div>
        
        <div className='Main-Doughnut-Component Expense-Bottom'>
          <h3 style={{textAlign:'center'}}>Expense-{formatAmount(totalExp)}</h3>
          <MainDoughnutComponent val={ChartDataExp} />
        </div>
      </div>

      </Context.Provider>
      
      )
}


