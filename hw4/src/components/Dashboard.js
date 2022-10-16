/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver }) {
  let [time, setTime] = useState(0);
  let [sTime, setSTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  // let [startTime, setStartTime] = useState(Date.now())
  
  // if (gameOver === false)
  // { 
  //   console.log(startTime)
  //   console.log(time)
  // }

  // console.log(time)

  // Advanced TODO: Implement the timer on the Dashboard
  {/* Useful Hint: Try to understand the difference between time and sTime. */ }

  useEffect(() => {
    // setTime((Math.floor((Date.now() - sTime)/1000)))
    // console.log(time)
    if(!gameOver){
      let inteval = Math.floor((sTime-startTime)/1000)
      // console.log(sTime)
      timeIntervalId = setInterval(()=>setSTime(Date.now()), 0) 
      setTime(inteval)
      return () => clearInterval(timeIntervalId);
    }
    // let inteval = Math.floor((sTime-startTime)/1000)
    // console.log(1000-inteval)
    // let inteval = ((sTime-startTime)%1000)
    // console.log(inteval)
   
  },);

  useEffect(() => {
    setStartTime(Date.now())
  }, [gameOver]);

  return (
    <div className="dashBoard" >
      <div id='dashBoard_col1' >
        <div className='dashBoard_col'>
          <p className='icon'>🚩</p>
          {remainFlagNum}
        </div>
      </div>
      <div id='dashBoard_col2' >
        <div className='dashBoard_col'>
          <p className='icon'>⏰</p>
          {/* {gameOver ? sTime : time} */}
          {time}
        </div>
      </div>
    </div>
  );
}

