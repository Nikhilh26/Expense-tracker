// import React from 'react'
import About from './Components/About';
import Firstcomp from './Components/Firstcomp';
import Form from './Components/Form';
import { useState } from 'react';
import Alert from './Components/Alert';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

export default function App2() {
const [mode,SetMode]=useState('dark')
const [obj,SetObj]=useState(null)    

function ChangeMode(){     
        if(mode==='light'){
            SetMode('dark')
            document.body.style.backgroundColor='grey'
            setvals("DARK MODE ENABLED","success")
          }else{
            SetMode('light')
            document.body.style.backgroundColor='white'
            setvals("DARK LIGHT ENABLED","success")
        }
        setTimeout(()=>{
          SetObj(null);
        },3000);
  }

function setvals(message,t){
      console.log("button was pressed")
      SetObj({
        msg:message,
        type:t
      })

      setTimeout(()=>{
        SetObj(null);
      },3000);

  }

function palletecolor(event){
  //console.log(event.target.classList[0])
  SetMode(event.target.classList[0])
  console.log(mode)
  document.body.style.backgroundColor=event.target.classList[0]
}
 return (
    <>
        <Router>
        <Firstcomp title="" val={mode} toggle={ChangeMode} changecolor={palletecolor}/>
        <Alert first={obj}/>
        {/* <Form val={mode}/> */}
    
    <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path='/' element={<Form/>}/>
    </Routes> 

      </Router>
    </>
  )
} 
