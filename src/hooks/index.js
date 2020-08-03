//REACT HOOKS
//============================================================

import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
//============================================================


export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
        let unsubscribe = firebase
          .firestore()
          .collection('tasks')
          .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'); // Go to Firebase and use my ID == this


        unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ? 
        (unsubscribe = unsubscribe.where('projectId', '==', selectedProject)) 
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))//moment() to manage time zones
        : selectedProject === 'INBOX' || selectedProject === 0 
        ? (unsubscribe = unsubscribe.where('date', '==', '')) 
        :unsubscribe;// GO THRU ALL THE TASKS AND SELECT THE KEY AND GIVE ME THE PROJECTS

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
          const newTasks = snapshot.docs.map(task => ({
            id: task.id,
            ...task.data(),
          }));

      setTasks(
          selectedProject === 'NEXT_7' ?
          newTasks.filter(
            task =>
            moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && //.diff() is the difference between two dates in days
            task.archived !== true): newTasks.filter(task => task.archived !== true));
                 
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
      });


    return () => unsubscribe();
    }, [selectedProject]); //when this changes re-run all the above functions


    return { tasks, archivedTasks };
};


export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore() //go to firestore
      .collection('projects') // get collection, projects
      .where('userId', '==', 'bart1104') // set the user ID
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