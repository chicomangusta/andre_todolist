import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase'


export const IndividualProject = ({ project }) => {
    const { projects, setProjects } = useProjectsValue();
    const { setSelectedProject } = useSelectedProjectValue();
    const [showConfirm, setConfirm] = useState(false);

    const deleteProject = (docId) => {
    firebase
      .firestore() 
      .collection('projects') //database
      .doc(docId)
      .delete()
      .then(() => { //afetr deleted...
        setProjects([...projects]); //...reset the project...
        setSelectedProject('INBOX'); //...go back to firebase and grab a new project and reset it, (gets the code from index.js from hooks and re-render) 
      });
  }
  return (
        <>
          <span className="sidebar__dot">•</span>
          <span className="sidebar__project-name">{project.name}</span>
          <span
            className="sidebar__project-delete"
            data-testid="delete-project"
            onClick={() => setShowConfirm(!showConfirm)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowConfirm(!showConfirm);
            }}
            tabIndex={0}
            role="button"
            aria-label="Confirm deletion of project"
          >
              
          </span>
        </>
  )

};