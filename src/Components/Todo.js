import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import DateFormatter from './Constants/DateFormatter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';
import './../index.css'

export default function Todo(props) {
    
    function handleonClick(){
        props.handle(props.id,props.type,props.name,props.header)
    }
    
    const date=DateFormatter(props.id);
    
    const setStyle={
      width:'80%',
      margin:'2px auto 2px auto',
      display:'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center'
    }

    return (
    <div style={setStyle}>
      {
        props.type==='Income'?
        <div style={{backgroundColor:'green',borderRadius:'50%'}}>
          <AttachMoneyIcon />
        </div> 
        : 
        <div style={{backgroundColor:'red',borderRadius:'50%'}}>
          <MoneyOffCsredIcon/>
        </div>
      }
      
      <div>
        <h5>{props.header}</h5>
        <span> <h6> ${ props.name } -{date}</h6> </span>
      </div>

      <button onClick={handleonClick}> <DeleteIcon/> </button>    
    
    </div>
  )
}
