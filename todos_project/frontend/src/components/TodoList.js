import React from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdEdit, MdDelete } from "react-icons/md";


export default function TodoList({ todos = [], setTodos }) {

  const handleUpdate = async (id, value) => {
    return axios.patch(`/api/todos/${id}/`, value)
      .then((res) => {
        const { data } = res;
        const new_Todos = todos.map(t => {
          if (t.id === id) {
            return data;
          }
          return t;
        })
        setTodos(new_Todos);
      }).catch(() => {
        alert("Something went wrong");
      })

  }


  const renderListGroupItem = (t) => {
    return <ListGroupItem key={t.id}
      className="d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-center">
        <span style={{
          marginRight: "12px", cursor: "pointer"
        }} onClick={() => {
          handleUpdate(t.id, {
            completed: !t.completed
          })
        }}>
          {t.completed === true ? <MdCheckBox /
          > : <MdCheckBoxOutlineBlank />}
        </span>
        <span>
          {t.name}
        </span>
      </div>
      <div>
        <MdEdit style={{
          cursor: "pointer",
          marginRight: "12px"
        }} />
        <MdDelete style={{
          cursor: "pointer",
        }} />

      </div>
    </ListGroupItem>
  }


  return <ListGroup>
    {todos.map(renderListGroupItem)}
  </ListGroup>
}