import React from 'react'
import './monthHead.css'
function MonthHead() {
  const today = new Date()
  const month =today.toLocaleString('default', { month: 'long' })

  return (
    <div><h1>Plan for the month of {month}</h1></div>
  )
}

export default MonthHead