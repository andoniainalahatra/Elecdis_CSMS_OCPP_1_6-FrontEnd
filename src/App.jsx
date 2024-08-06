import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Chart from './common/chart'

function App() {
  return (
    <>
      <Button variant="destructive">Here</Button> <br /><br />
      <Button variant="secondary">Secondary</Button> <br /><br />
      <Button variant="ghost">Secondary</Button> <br /><br />
      <Chart />
    </>
  )
}

export default App
