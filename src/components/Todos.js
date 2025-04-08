import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import axios from "axios";

const mapStateToProps = (state) => ({ todos: state });

const mapDispatchToProps = (dispatch) => ({
  addTodo: (obj) => dispatch(addTodos(obj)),
});

const Todos = (props) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const add = async () => {
    if (input.trim() === "") {
      alert("Input is Empty");
      return;
    }

    const parts = input.split(",");
    if (parts.length !== 3) {
      alert("Please use the format: task,priority,inside/outside");
      return;
    }

    const [task, priorityStr, activity] = parts.map((x) => x.trim());
    const priority = parseInt(priorityStr);
    if (isNaN(priority) || (activity !== "inside" && activity !== "outside")) {
      alert("Invalid format or values. Example: Buy milk,1,inside");
      return;
    }

    let weather = "";
    if (activity === "outside") {
      try {
        const API_KEY = "b4b62b773c8da391c3bd9ea1bf651d12"; // Replace with your OpenWeatherMap API key
        const city = "Bhubaneswar";
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        weather = `${res.data.weather[0].description}, ${res.data.main.temp}°C`;
      } catch (err) {
        weather = "Unable to fetch weather";
      }
    }

    props.addTodo({
      id: Math.floor(Math.random() * 1000),
      item: task,
      completed: false,
      priority,
      activity,
      weather,
    });
    setInput("");
  };

  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={handleChange}
        className="todo-input"
        value={input}
        placeholder="Task,Priority,Inside/Outside"
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="add-btn"
        onClick={add}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
