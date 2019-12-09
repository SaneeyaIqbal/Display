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
    }
    this.addDetails = this.addDetails.bind(this);

  }
  addDetails() {
    // let skill = this.state.skills.split(',');
    // let text = this.state;
    // text['skills'] = skill;
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

class SearchName extends Component {

  render() {
    return (
      <div className='search'>
        <input type="text" onChange={(event) => this.props.searchinfo(event.target.value)} placeholder="Search for names.." ></input>
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
      students: [],
      searchname: ''
    }
    this.showDetails = this.showDetails.bind(this);
    this.sortByfirstName = this.sortByfirstName.bind(this);
    this.sortBylastName = this.sortBylastName.bind(this);
    this.sortBySkills = this.sortBySkills.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateDB = this.updateDB.bind(this);
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
    axios.post("http://127.0.0.1:8000/students/student/create/", note)
      .then(() => {this.updateDB();})
  }

  componentDidMount() {
    this.updateDB();
  }

  updateDB() {
    axios.get("http://127.0.0.1:8000/students/student/").then(res => {
      this.setState({
        students: res.data
      });
    })
  }

  searchBar(text) {
    this.setState({
      searchname: text
    })
  }

  deleteItem(id){
    axios.delete("http://127.0.0.1:8000/students/"+id.toString()+"/delete/")
    .then(() => {this.updateDB();})
  }
  
  render() {
    return (
      <div className="App">
        <Details showDetails={this.showDetails} />
        <SearchName searchinfo={this.searchBar} />

        <table className="body">
          <thead>
            <tr>
              <th onClick={this.sortByfirstName}>Firstname</th>
              <th onClick={this.sortBylastName}>Lastname</th>
              <th onClick={this.sortBySkills}>Skills</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.filter(name => {
              return name.firstName.toLowerCase().includes(this.state.searchname.toLowerCase()) ||
                name.lastName.toLowerCase().includes(this.state.searchname.toLowerCase());
            })
              .map((item, index) => (
                <tr key={index} >
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>
                    <ul>
                      {/* {console.log("item: ",item)}{console.log("skills_array", item.skills_array)} */}
                      {item.skills_array.map((item_new, index_new) =>
                        <li key={index_new}>{item_new}</li>
                      )
                      }
                    </ul>
                  </td>
                  <td><ul>
                    <button className="button">Edit</button><br />
                    <br /><button className="button" onClick={(event)=>this.deleteItem(item.id)}>Delete</button>
                  </ul></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;