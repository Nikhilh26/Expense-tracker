import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as Chartjs,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

Chartjs.register(
  ArcElement,
  Tooltip,
  Legend
)

export default function DoughnutComponent(props) {
  return (
    <div>
      <Doughnut
        data={props.val}
      ></Doughnut>
    </div>
  )
}
