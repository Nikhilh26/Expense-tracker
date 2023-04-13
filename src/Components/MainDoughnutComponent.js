import React from 'react'
import DoughnutComponent from './DoughnutComponent'
import './../index.css'


export default function MainDoughnutComponent({val}) {
  return (
    <div >
        <DoughnutComponent val={val}/>
    </div>
  )
}
