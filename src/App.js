import React, { Component } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
// import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layouts/Header";
import Todos from "./components/ToDos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import uuid from 'uuid';
import Axios from 'axios';

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }
// Toggle complete
  markComplete =(id) => {
    console.log (id)
    this.setState({ 
      todos: this.state.todos.map(todo => {
          if(todo.id === id){
            todo.completed = !todo.completed
          }
          return todo;
        })
    });
  }

  delTodo = (id) => {
    // this.setState ({
    //   todos: [...this.state.todos.filter(
    //     todo => todo.id!==id
    //   )]});
    Axios.delete("https://jsonplaceholder.typicode.com/todos/${id}")
      .then(res => this.setState({todos:
        [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid(),
    //   title: title,
    //   completed: false
    // }
    // this.setState ({
    //   todos: [...this.state.todos, newTodo]
    // });
    Axios.post ('https://jsonplaceholder.typicode.com/todos',{
        title,
        completed: false
    })
      .then(res => this.setState({todos:
        [...this.state.todos, res.data]}));

  }
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props=>(
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}/>
                  <Todos todos={this.state.todos} 
                    markComplete = {this.markComplete}
                    delTodo = {this.delTodo}
                  />
                </React.Fragment>
            )} />
            <Route path="/about" component={About}/>

          </div>
        </div>

      </Router>

    );
  }
}

export default App;
