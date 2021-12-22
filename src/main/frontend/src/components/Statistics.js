import React from "react";
import axios from "axios";
import '../css/Statistics.css'
export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('rere')
        axios.get("http://localhost:8080/api/stats").then(res => {this.setState(res.data);  console.log(res.data)});
    }

    render() {
        console.log(this.state)
        return (
            <div id="statisticsCard">
                <div>
                    Всего заработано: {this.state.totalProfit && this.state.totalProfit.toLocaleString()}$
                </div>
                <div>
                    Завершенных сделок: {this.state.totalOrders}
                </div>
                <div>
                    Средний доход с одной сделки: {this.state.averageProfit && this.state.averageProfit.toLocaleString()}$
                </div>
                <hr></hr>
                <div>
                    Топ агентов по заработку:
                    <ol>
                        {this.state.agentTop && this.state.agentTop.map(agent =>
                            <li>{agent.fio}.
                                Всего заработано: {agent.agent_profit.toLocaleString()}$,
                                всего сделок: {agent.agent_sales},
                                в среднем: {(Math.floor((agent.agent_profit / agent.agent_sales) * 100)/ 100).toLocaleString()}$</li>)}
                    </ol>
                </div>
                <div>
                    Топ по видам:
                    <ol>
                        {this.state.typeTop && this.state.typeTop.map(type =>
                            <li>{type.type}.
                                Доход с этого вида недвижимости: {type.total_profit.toLocaleString()}$,
                                всего сделок: {type.total_sold},
                                в среднем: {(Math.floor((type.total_profit / type.total_sold) * 100)/ 100).toLocaleString()}$</li>)}
                    </ol>
                </div>
                <div>
                    Топ по районам:
                    <ol>
                        {this.state.regionTop && this.state.regionTop.map(region =>
                            <li>{region.region}.
                                Доход с продаж в этом районе: {region.total_profit.toLocaleString()}$,
                                всего сделок: {region.total_sold},
                                в среднем: {(Math.floor((region.total_profit / region.total_sold) * 100)/ 100).toLocaleString()}$</li>)}
                    </ol>
                </div>

            </div>

        )
    }
}