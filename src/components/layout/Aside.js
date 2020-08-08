import React, { useState } from 'react';
import Calendar            from 'react-calendar';
import { FaStopwatch }     from 'react-icons/fa';
// import Clock from "react-clock";




export const Aside = () => {
    const [value, onChange] = useState(new Date());

        // onChange = value => this.setState({ value });

        // render() {
        //     const { value } = this.state;
        // }

    return (
      <div className="aside-right" data-testid="aside-right">
        <div className="calendar" data-testid="calendar">
          <p>Calendar</p>
          <div className="calendar-img" data-testid="calendar-import">
            <Calendar onChange={onChange} value={value} />
          </div>
        </div>
        
        <div className="notifications" data-testid="notifications">
            <p>Notifications</p>
        </div>


        <div className="stopwatch" data-testid="stopwatch">
          <p>Pomodoro Timer</p>
          <div className="fastop" data-testid="fastop">
          <FaStopwatch />
          </div>
        </div>
      </div>
    );
};    
