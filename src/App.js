import React from 'react'
import './App.css'
import Radium, { StyleRoot } from 'radium'
import Person from './Person/Person'

class App extends React.Component {
  state = {
    persons: [
      { id: '1', name: 'Dursun', age: 37 },
      { id: '2', name: 'Yasemin', age: 36 },
      { id: '3', name: 'Elif Nisa', age: 7 },
      { id: '4', name: 'Beyza', age: 4 },
    ],
    ulcase: false,
    showPersons: true
  }

  switchNameHandler = () => {
    console.log('current: ', this.state)
    let newState;
    if (this.state.ulcase) {
      newState = {
        persons: this.state.persons.map(person => ({ ...person, name: person.name.toLowerCase() })),
        ulcase: !this.state.ulcase
      }
    } else {
      newState = {
        persons: this.state.persons.map(person => ({ ...person, name: person.name.toUpperCase() })),
        ulcase: !this.state.ulcase
      }
    }
    console.log('updating: ', newState)
    this.setState(newState)
    console.log('new: ', this.state)
  }

  tooglePersons = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  changeHandler = (index) => {
    return (event) => {
      let persons = [...this.state.persons]

      let personIndex = persons.findIndex(p => p.id === index)

      let person = { ...persons[personIndex], name: event.target.value }

      persons[personIndex] = person

      this.setState({
        persons: persons
      })
    }
  }

  deletePersonHandler = (index) => {
    let remainingPersons = [...this.state.persons]
    console.log('Deleting index: ', index)
    console.log('Before: ', remainingPersons)
    remainingPersons = remainingPersons.filter(p => p.id !== index)
    console.log('After: ', remainingPersons)
    this.setState({
      persons: remainingPersons
    })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'gray',
        border: '1px solid lightgreen'
      }
    }

    let ps = null
    if (this.state.showPersons) {
      style.backgroundColor = 'red'
      style.color = 'black'
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'gray',
        border: '1px solid salmon'
      }
      ps = this.state.persons.map(p => <Person key={p.id} name={p.name} age={p.age}
        onClick={this.deletePersonHandler.bind(this, p.id)}
        changeHandler={this.changeHandler(p.id)} />)
    }

    const classes = []
    if (this.state.persons.length <= 2) {
      classes.push('red')
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold')
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hello World!</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <button style={style} onClick={this.tooglePersons}>Toogle</button>
          {ps}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
