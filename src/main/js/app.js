import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {houses: []};
    }

    componentDidMount() {
        axios.get('houses').then(res => {
            this.setState({houses: res.data});
        });
    }

    render() {
        return (
            <div1>
                <h1 className= "text-center"> List</h1>
                <table className="table table-striped">
                    <thead>
                        <td>id</td>
                        <td>region</td>
                    </thead>
                    <tbody>
                    {
                        this.state.houses.map(house =>
                        <tr>
                            <td>{house.id}</td>
                            <td>{house.region}</td>
                        </tr>)
                    }
                    </tbody>
                </table>
            </div1>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)