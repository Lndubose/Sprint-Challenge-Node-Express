import React from 'react';
import Project from './Project';
import { Link } from 'react-router-dom';

class ProjectList extends React.Component {
  render() {
    return (
      <div>
        {this.props.projects.map(project => {
          return (
            <Link  key={project.id} to={`/projects/${project.id}`}>
              <Project project={project} />
            </Link>
          )
        })}
      </div>
    )
  }
}

export default ProjectList;