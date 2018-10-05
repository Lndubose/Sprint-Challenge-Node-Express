import React from 'react';

class Project extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.project.name}</h3>
      </div>
    )
  }
}

export default Project;