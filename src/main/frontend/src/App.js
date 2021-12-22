import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AvailableOrders from "./components/AvailableOrders";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import CreateHouse from "./components/CreateHouse"
import Statistics from "./components/Statistics";
import './css/App.css'

export default function App() {
    return (
        <div className="main">
            <Router>
                <nav>
                    <Link className="link"to="/">Сделки</Link>
                    <Link className="link"to="/addHouse">Добавить сделку</Link>
                    <Link className="link"to="/users">Переключение между пользователями</Link>
                    <Link className="link"to="/addUser">Добавить нового пользователя</Link>
                    <Link className="link"to="/stats">Статистика</Link>
                </nav>

                <Switch>
                    <Route path="/addUser">
                        <AddUser/>
                    </Route>
                    <Route path="/stats">
                        <Statistics/>
                    </Route>
                    <Route path="/addHouse">
                        <CreateHouse/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/">
                        <AvailableOrders/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}