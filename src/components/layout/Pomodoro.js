import React      from 'react';
import DatePicker from "react-date-picker";
// import Clock from 'react-clock';
// import { FaStopwatch } from 'react-icons/fa';




export const Pomodoro = () => {

    return (
      <div className="timer-pomo" data-testid="timer">
        <p>timer</p>
        <DatePicker />
        {/* <Clock /> */}
       {/* <div className="fastop" data-testid="fastop"> */}
        {/* <FaStopwatch /> */}
        {/* </div> */}
      </div>
    );

};