//DELETE

import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase'
import PropTypes from 'prop-types';


export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

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
        aria-label="Confirm deletion of project">

        <FaTrashAlt />

        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p> Delete project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}>

                Delete

              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                role = "button"
                tabIndex={0}               
                aria-label="Cancel adding project, do not delete">

                Cancel

              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};