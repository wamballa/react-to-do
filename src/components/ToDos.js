import React, { Component } from "react";
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component {
  render() {
    // access properties with this.props.todos
    // return null;
    // this.props.todos.map(todo => <h3>{todo.title}</h3>);
    return this.props.todos.map((item) => (
      <TodoItem key={item.id} 
        todo = {item} 
        markComplete = {this.props.markComplete}
        delTodo ={this.props.delTodo}
      />
    ));
  }
}
Todos.propTypes = {
  todos: PropTypes.array.isRequired
}
export default Todos;
