import { Component } from "react";
import "./todo.css";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valeur: {
        content: "",
        id: 0,
        done: false,
      },
      list: [],
      alert: false,
    };
  }

  componentDidMount() {
    let data =
      localStorage.getItem("todo") == null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    this.setState({ list: data });
  }

  componentDidUpdate() {
    localStorage.setItem("todo", JSON.stringify(this.state.list));
  }

  componentWillUnmount() {}
  handelChange = (event) => {
    this.setState({ valeur: { content: event.target.value } });
  };
  handelSubmit = (e) => {
    e.preventDefault();
    let { valeur, list: taskList } = this.state;
    if (valeur.content.trim().length !== 0) {
      let uId = Math.random() * 10000 + "_" + new Date().getTime();
      valeur.id = uId;
      valeur.done = false;
      taskList.push(this.state.valeur);
      this.setState({ list: taskList });
      console.log(this.state.list);
      this.setState({ valeur: { content: "" } });
    } else {
      this.setState({ alert: true });
    }
  };

  handelDelete = (index) => {
    let { list: task } = this.state;
    task.splice(index, 1);
    this.setState({ list: task });
  };

  handleDone = (id) => {
    let { list: taskList } = this.state;
    taskList = taskList.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    this.setState({ list: taskList });
  };
  render() {
    let { list, alert } = this.state;
    if (alert === true) {
      setTimeout(() => {
        this.setState({ alert: false });
      }, 10000);
    }
    return (
      <>
        {alert === true ? <p>Saisisez une Valeur dans le champ</p> : ""}
        <h1>ToDo List</h1>
        <form action="" onSubmit={this.handelSubmit}>
          <input
            type="text"
            onChange={this.handelChange}
            value={this.state.valeur.content}
          />
          <button id="add">Ajouter</button>
        </form>
        <h2>Liste Des Tâches</h2>
        <ul>
          {list.map((item, index) => {
            return (
              <li key={index} className="flex">
                <div
                  className={
                    item.done
                      ? "text-decoration-line-through d-inline"
                      : "d-inline"
                  }
                >
                  {item.content}
                </div>

                <div className="d-flex align-items-center ">
                  <button
                    id="delete"
                    onClick={() => {
                      this.handelDelete(index);
                    }}
                  >
                    Delete
                  </button>

                  <div className="form-check form-switch  ">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      role="switch"
                      checked={item.done == true ? true : false}
                      id="flexSwitchCheckChecked"
                      onChange={() => {
                        this.handleDone(item.id);
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
export default Form;
