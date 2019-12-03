import React, { Component } from 'react';
import './App.css';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      skills: ''
    }
    this.addDetails = this.addDetails.bind(this);
    
  }
  addDetails() {
    let skill = this.state.skills.split(',');
    let text = this.state;
    text['skills'] = skill;
    this.props.showDetails(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      skills: ''
    })
  }

  render() {
    return (
      <div className="">  
      <h2>STUDENT DETAILS</h2>      
        <div className='form'>
          Firstname:<br />
          <input className="input" type="text" onChange={(event) => this.setState({ firstName: event.target.value })} />
          <br />
          Lastname:<br />
          <input className="input" type="text" onChange={(event) => this.setState({ lastName: event.target.value })} />
          <br />
          Skills:<br />
          <input className="input" type="text" onChange={(event) => this.setState({ skills: event.target.value })} />
          <br />
          <button className="button" onClick={this.addDetails}>Add</button>
        </div>
      </div>

    )
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      skills: '',
      students: [
        {
          'firstName': 'Pramod',
          'lastName': 'Ray',
          'skills': ['Python', 'HTML', 'CSS']
        },
        {
          'firstName': 'Sachin',
          'lastName': 'Suresh',
          'skills': ['Python', 'HTML', 'CSS', 'CAT']
        },
        {
          'firstName': 'Samarth',
          'lastName': 'Hegde',
          'skills': ['Python', 'Git', 'CSS']
        }
      ]
    }
    this.showDetails = this.showDetails.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortBySkills = this.sortBySkills.bind(this);
  }

  sortByName() {
    let sortName = this.state.students.sort(function(a,b){
      return a.firstName.localeCompare(b.firstName)})
      this.setState({
        students:sortName
      });
    }
  
    sortBySkills() {
      let sortSkills = this.state.students.sort(function(a,b){
        if (a.skills.length > b.skills.length) {
          return -1;
        }
        if (a.skills.length < b.skills.length){
        return 1;
        }
        return 0;
      });
      this.setState({
        students:sortSkills
      });
    }

  showDetails(note) {
    this.setState({
      students: [...this.state.students, note]
    });
  }


  render() {
    return (
      <div className="App">
        <Details showDetails={this.showDetails} />
        <table className="body">
          <thead>
            <tr>
              <th onClick={this.sortByName}>Firstname</th>
              <th>Lastname</th>
              <th onClick={this.sortBySkills}>Skills</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td><ul>{item.skills.map((item, index) => (
                  <li key={item}>
                    <li>{item}</li>
                  </li>
                ))}</ul>
                </td>
              </tr>
            )
            )
            }
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;
