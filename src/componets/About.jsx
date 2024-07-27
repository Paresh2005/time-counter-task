import React , {useContext} from 'react'


//context
import { TimerContext } from "../App";

export default function About() {

  const {timer} = useContext(TimerContext);

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5'>
      <div className='card text-center shadow shadow-1 border-0 rounded p-3 fs-3'>
      {timer.h} : {timer.m} : {timer.s}
      </div>
    </div>
  )
}
