import React from "react";
import axios from "axios";
import {logDOM} from "@testing-library/react";
import AddUser from "./AddUser";

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []}
        this.handleChangeAgent = this.handleChangeAgent.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/agents').then(res => this.setState({users: res.data}));
    }

    handleChangeAgent(e) {
        const id = Number(e.currentTarget.dataset.id);
        const newUser = this.state.users.find(user => user.id === id);
        axios.post('http://localhost:8080/api/currentAgent', newUser).then(res => alert(`Текущий пользователь сменен на: ${newUser.fio}`))
    }

    render() {
        return (
            <table style={{margin:50, textAlign:"left", display:"inline-table"}}>
                {
                    this.state.users.map(user => (
                        <tr>
                            <td>{user.fio}</td>
                            <td>
                                <button data-id={user.id} onClick={this.handleChangeAgent}>
                                    Сменить
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </table>

        )
    }
}
