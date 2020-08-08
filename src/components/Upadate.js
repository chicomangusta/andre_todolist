//UPDATE
//===================================================================
import React, { useState }                           from 'react';
import { FaEdit }                                    from 'react-icons/fa';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase }                                  from '../firebase'
import { generatePushId }                            from '../helpers';
import { useProjectsValue }                          from '../context';
import PropTypes                                     from 'prop-types';



//===================================================================
//ADD SECTION
//===================================================================

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState('');

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'bart1104',
      })
      .then(() => {
        setProjects([...projects]);
        setProjectName('');
        setShow(false);
      });

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Edit Project
          </button>
          <span
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShow(false);
            }}
            role="button"
            tabIndex={-1}
          >
            Cancel
          </span>
        </div>
      )}
      {/* <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        🚜 New Project 🚜
      </span> */}
    </div>
  );
};

//===================================================================
//DELETE SECTION
//===================================================================
export const Update = ({projects}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();
    
    const updateProject = (docId) => {
     firebase
      .firestore() 
      .collection('projects') //database
      .doc(docId)
      .update()
      .then(() => { //afetr update...   
        setProjects([...projects]); //...reset the project...
        setSelectedProject('INBOX'); //...go back to firebase and grab a new project and reset it, (gets the code from index.js from hooks and re-render) 
      });
  }

    return (
<>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-update"
        data-testid="update-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project">

        <FaEdit />

        {showConfirm && (
          <div className="project-update-modal">
            < div className = "project-update-modal__inner" >
            
              <button
                type="button"
                onClick={() => updateProject(project.docId)}>

                Update

              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                role = "button"
                tabIndex={0}>

                Cancel

              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

Update.propTypes = {
  project: PropTypes.object.isRequired,
  shouldShow: PropTypes.bool,
};
 