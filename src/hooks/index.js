//REACT HOOKS
//============================================================

import { useState, useEffect } from 'react';
import { firebase } from '../firebase'
import { collatedTasksExist } from '../helpers';
import moment from "moment";


export const useTasks = selectProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    

    useEffect(() => {
        let unsubscribe = firebase
        .firestore()
        .collection('tasks')
        .where('userId', '==', 'bart1104');// Go to Firebase and use my ID == this


        unsubscribe = selectProject && !collatedTasksExist(selectProject) ? 
        (unsubscribe = unsubscribe.where('projectId', '==', selectProject)) 
        : selectProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))//moment() to manage time zones
        : selectProject === 'INBOX' || selectProject === 0 
        ? (unsubscribe = unsubscribe.where('date', '==', '')) 
        :unsubscribe;// GO THRU ALL THE TASKS AND SELECT THE KEY AND GIVE ME THE PROJECTS

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTask = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 && //.diff() is the difference between two dates in days
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));// show all the tasks that are true
    });

    return () => unsubscribe();

    }, [selectProject]);//when this changes re-run all the above functions


    return { tasks, archivedTasks };
};


export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore() //go to firestore
      .collection('projects') // get collection, projects
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw') // set the user ID
      .orderBy('projectId') //order by the ID of the project
      .get() //get  
      .then(snapshot => {// data from a database location
        const allProjects = snapshot.docs.map(project => ({ //map through the database of all projects
          ...project.data(),
          docId: project.id, //docId is in case we want to delete somthing
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects); // this is to avoid infite loop, because the function is checking its self, calling its self all the time it changes
        }
      });
  }, [projects]);

  return { projects, setProjects };
};