import React, { useState } from "react";
import { connect } from "react-redux";
import {
  completeTodos,
  removeTodos,
  updateTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => ({
  todos: state,
});

const mapDispatchToProps = (dispatch) => ({
  removeTodo: (id) => dispatch(removeTodos(id)),
  updateTodo: (obj) => dispatch(updateTodos(obj)),
  completeTodo: (id) => dispatch(completeTodos(id)),
});

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");

  const sortedTodos = props.todos
    .filter((todo) =>
      sort === "all" ? true : sort === "active" ? !todo.completed : todo.completed
    )
    .sort((a, b) => b.priority - a.priority);

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort("active")}>
          Active
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort("completed")}>
          Completed
        </motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSort("all")}>
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {sortedTodos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              removeTodo={props.removeTodo}
              updateTodo={props.updateTodo}
              completeTodo={props.completeTodo}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
