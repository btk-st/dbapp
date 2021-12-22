import React from "react";
import axios from "axios";
export default class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value:''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        axios.post('http://localhost:8080/api/agents', {"fio":this.state.value})
            .then(res => alert(`Создан пользователь '${this.state.value}'`))
        event.preventDefault()
    }

    render() {
        return (
            <form style={{margin:50}} onSubmit={this.handleSubmit}>
                <label>
                    ФИО:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Создать" />
            </form>
        );
    }
}