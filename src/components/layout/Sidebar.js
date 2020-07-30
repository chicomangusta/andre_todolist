 import React, { useState } from 'react';
 import {
     FaChevronDown,
     FaInbox,
     FaRegCalendarAlt,
     FaRegCalendar,
 } from 'react-icons/fa';
 import { Projects } from '../Projects';
 import { useSelectedProjectValue } from '../../context';
//  import { AddProject } from '../AddProject';



 export const Sidebar = () => {
     const { setSelectedProject } = useSelectedProjectValue;
     const { acticve, setActive } = useState('inbox');
     const [showProjects, setShowProjects] = useState(true);
    
    return (
    <div className="Sidebar" data-testid="sidebar">
       <ul className="sidebar__generic">
           <li className="inbox" data-testid="inbox">
               <span>
                   <FaInbox />
               </span>
               <span>Inbox</span>
            </li>

           <li className="today" data-testid="today"> 
           <span> 
               <FaRegCalendar />
            </span>
               <span>Today</span>
            </li>

           <li className="next_7" data-testid="next_7"> 
           <span> 
               <FaRegCalendarAlt />
            </span>
               <span>Next 7 days</span>
            </li>

       </ul>

       <div className="sidebar_middle">
           <span><FaChevronDown /></span>
           <h2>Project</h2>
       </div>



       <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

       {showProjects && <Projects />}

    </div>
 );
};


// USE STATE
// useState let you use state and other React features/ components without writing a new class.