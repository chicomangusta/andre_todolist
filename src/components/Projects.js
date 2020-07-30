import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useSelectedProjectValue, useProjectsValue } from '../context';
// import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null }) => {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();


    return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          active === project.projectId
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >       
             onKeyDown={() => {
                setActive(project.projectId)
                setSelectedProject(project.projectId)
             }}
             onClick={() => {
                setActive(project.projectId)
                setSelectedProject(project.projectId)
             }}
             

            I am a Project
        </li>
      ))
    ); 
};


// start project ID in active
// then active sidebar
// else just put in sidebar