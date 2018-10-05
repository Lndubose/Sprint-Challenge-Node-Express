import React from 'react';

class ViewProject extends React.Component {
  state = {
    project: {},
    needProject: true
  }

  componentDidMount() {
    this.setState({ needProject: true })
  }

  filterProject() {
    this.props.projects.filter(project => {
      if(parseInt(this.props.match.params.projectId, 10) === project.id) {
        this.setState({ project, needProject: false })
      }
    })
  }

  componentDidUpdate() {
    if(this.state.needProject) {
      this.filterProject();
    }
  }

  render() {
    if(this.state.needProject) {
      return(
        <h3>Loading...</h3>
      )
    } else {
      return (
        <div>
          <h3>{this.state.project.name}</h3>
          <p>{this.state.project.description}</p>
        </div>
      )
    }
  }
}

export default ViewProject;