import React, { useState , useContext } from "react";

import { TimerContext } from "../App";

export default function Home() {
    const [selectTime ,setselectTime] = useState({h:0,m:0,s:0});

    const {setTimer,startTimer  , timer, clearTimer} = useContext(TimerContext);

    const startselectTime = ()=>{
        if((selectTime.h != 0 && selectTime.m != 0 && selectTime.s != 0) ){
            console.log("call"); 
            setTimer({h:Number(selectTime.h) , m : Number(selectTime.m) , s : Number(selectTime.s)});
            startTimer();
        }else{
            clearTimer();
        }
       
    }

    const clearSelectTime = ()=>{
        clearTimer();
    }

    


  return (
    <div className=" container d-flex justify-content-center align-items-center mt-5">
      <div className=" card p-3 shadow shadow-1 border-0 rounded">
      <div className="card-hader text-center fs-3 mb-3">Enter Time</div>
      <form className="row g-3">
        <div className="d-flex">
          <input
            type="number"
            // value={selectTime.h}
            className="form-control  me-3"
            onChange={(e)=> setselectTime({...selectTime , h : e.target.value})}
            placeholder="hh"
            required
          />
          <input
            type="number"
            className="form-control me-3"
            // value={selectTime.m}
            onChange={(e)=> setselectTime({...selectTime , m : e.target.value})}
            placeholder="mm"
            required
          />
          <input
            type="number"
            className="form-control"
            // value={selectTime.s}
            onChange={(e)=> setselectTime({...selectTime , s : e.target.value})}
            placeholder="ss"
            required
          /> 
        </div>
        <div className="col d-flex justify-content-center">
            
            {(timer.h == 0 && timer.m == 0 && timer.s == 0) ? 
            <div onClick={startselectTime} className="btn btn-primary mb-3 me-3 ">
               start 
           </div>
            :
            <div className="btn btn-primary mb-3 me-3 disabled">
            start
           </div>
             }
          <div onClick={clearSelectTime} className="btn btn-primary mb-3">
            clear
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
