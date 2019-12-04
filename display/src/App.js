import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      skills: '',
      // searchname:''
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
        {/* <input type="text" className="input" onChange={this.searchBar()} placeholder="Search..." /> */}
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
          'firstName': 'Sachin',
          'lastName': 'Suresh',
          'skills_list': ['Python', 'HTML', 'CSS', 'CAT']
        },
        {
          'firstName': 'Pramod',
          'lastName': 'Ray',
          'skills_list': ['Python', 'HTML', 'CSS']
        },
        {
          'firstName': 'Samarth',
          'lastName': 'Hegde',
          'skills_list': ['Python', 'Git', 'CSS']
        },
        {
          'firstName': 'Vishal',
          'lastName': 'Sobani',
          'skills_list': ['Python', 'Git', 'CSS', 'Django']
        }
      ]
    }
    this.showDetails = this.showDetails.bind(this);
    this.sortByfirstName = this.sortByfirstName.bind(this);
    this.sortBylastName = this.sortBylastName.bind(this);
    this.sortBySkills = this.sortBySkills.bind(this);
    // this.searchBar = this.searchBar.bind(this);
  }

  sortByfirstName() {
    let sortName = this.state.students.sort(function (a, b) {
      return a.firstName.localeCompare(b.firstName)
    })
    this.setState({
      students: sortName
    });
  }

  sortBylastName() {
    let sortName = this.state.students.sort(function (a, b) {
      return a.lastName.localeCompare(b.lastName)
    })
    this.setState({
      students: sortName
    });
  }
  sortBySkills() {
    let sortSkills = this.state.students.sort(function (a, b) {
      if (a.skills_list.length > b.skills_list.length) {
        return -1;
      }
      if (a.skills_list.length < b.skills_list.length) {
        return 1;
      }
      return 0;
    });
    this.setState({
      students: sortSkills
    });
  }

  showDetails(note) {
    this.setState({
      students: [...this.state.students, note]
    });
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/students/student/").then(res => {
      this.setState({
      students:res.data});
      })}

  // searchBar(event) {
  //     let inputData = event.target.value
  //      this.setState({
  //       searchname:inputData
  //      })
  //   }

  render() {
    return (
      <div className="App">
        <Details showDetails={this.showDetails} />
        <table className="body">
          <thead>
            <tr>
              <th onClick={this.sortByfirstName}>Firstname</th>
              <th onClick={this.sortBylastName}>Lastname</th>
              <th onClick={this.sortBySkills}>Skills</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((item, index) => (
              <tr key={index}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td><ul>{item.skills_list.map((item, index) => (
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