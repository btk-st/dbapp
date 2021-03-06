import React from "react";
import axios from "axios";
import HouseCard from "./HouseCard";
import '../css/AvailableOrders.css'

export default class AvailableOrders extends React.Component {
    constructor(props) {
        super(props);
        const filterFields = ['houseType', 'region', 'areaFrom', 'areaTo', 'kitchenAreaFrom', 'kitchenAreaTo', 'floorFrom',
        'floorTo', 'yearOfConstructionFrom', 'yearOfConstructionTo','ceilingHeightFrom', 'ceilingHeightTo', 'rublePriceFrom',
        'rublePriceTo', 'dollarPriceFrom', 'dollarPriceTo', 'hasGarbageChute', 'hasUndergroundParking', 'hasSwimmingPool',
            'hasBalcony', 'comment', 'roomsCountTo', 'roomsCountFrom', 'streetName', 'orderType']
        axios.get('http://localhost:8080/api/const?constName=dollar_rate')
            .then(res => this.state.dollarRate = res.data);
        this.state = {orders: [], filterFields:Object.fromEntries(filterFields.map(field => [field, null]))}
        this.handleSale = this.handleSale.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this)

    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/orders').then(res => {
            const availableOrders = res.data.filter(order => order.sold === false)
            this.setState({orders: availableOrders})
        })
        axios.get('http://localhost:8080/api/currentAgent').then(res => this.setState({agent: res.data}))
    }
    handleFilterChange(e) {
        console.log(this.state.filterFields);
        //price field
        switch (e.target.name) {
            case 'rublePriceFrom':
                const newRublePrice = Math.floor(e.target.value * 100) / 100;
                this.setState({filterFields: {...this.state.filterFields, rublePriceFrom : newRublePrice,
                    dollarPriceFrom: Math.floor(newRublePrice / this.state.dollarRate * 100) / 100}})
                break;
            case 'dollarPriceFrom':
                const newDollarPrice = Math.floor(e.target.value * 100) / 100;
                this.setState({filterFields: {...this.state.filterFields, dollarPriceFrom: newDollarPrice,
                    rublePriceFrom: Math.floor(newDollarPrice * this.state.dollarRate * 100) / 100}})
                break;
            case 'rublePriceTo':
                const newRublePrice1 = Math.floor(e.target.value * 100) / 100;
                this.setState({filterFields: {...this.state.filterFields, rublePriceTo : newRublePrice1,
                    dollarPriceTo: Math.floor(newRublePrice1 / this.state.dollarRate * 100) / 100}})
                break;
            case 'dollarPriceTo':
                const newDollarPrice1 = Math.floor(e.target.value * 100) / 100;
                this.setState({filterFields: {...this.state.filterFields, dollarPriceTo: newDollarPrice1,
                    rublePriceTo: Math.floor(newDollarPrice1 * this.state.dollarRate * 100) / 100}})
                break;
            default:
                const newState = this.state.filterFields;
                newState[e.target.name] = e.target.value;
                this.setState({filterFields:newState});
        }
        e.preventDefault();
    }

    handleSale(e) {
        e.preventDefault();
        const orderToFinish = Number(e.currentTarget.dataset.id);
        const agentId = this.state.orders.find(order => order.orderId === orderToFinish).salesAgent.id;
        if (agentId !== this.state.agent.id) {
            alert("???? ???? ???????????? ?????????????????????? ?????? ????????????. ?????????????? ????????????????????????");
            return;
        }
        axios.get(`http://localhost:8080/api/finishOrder?id=${orderToFinish}`)
            .then(res => {
                console.log(this.state.orders.filter(order => order.orderId !== orderToFinish))
                this.setState({orders: this.state.orders.filter(order => order.orderId !== orderToFinish)})
            })
    }
    handleFilterSubmit(e) {
        const toPost = this.state.filterFields;
        // "" == null!!
        Object.keys(toPost).forEach(field => {
            if (toPost[field] === "") {
                toPost[field] = null;
            }
        })
        console.log('filter object before post:')
        console.log(toPost)
        axios.post('http://localhost:8080/api/orders/filter', toPost)
            .then(res => {
                this.setState({orders:res.data.filter(order => order.sold === false)})
            })
    }
    handleClear(e) {
        const newState = this.state.filterFields;
        Object.keys(newState).forEach(field => newState[field] = null)
        this.setState({filterFields:newState})
        //clear inputs
        document.querySelectorAll('input, select').forEach(node => {
            node.value = "";
        })
    }

    render() {
        return (
            <div>
                <div id="filter">
                    <label style={{fontWeight:"bold", color:"black"}}>????????????</label>
                    <hr/>
                    <div>
                        <div>

                            <div className="leftSideFilter">
                                <div>
                                    <label>?????? ????????????: </label>
                                    <select name="orderType" value={this.state.filterFields.orderType} onChange={this.handleFilterChange}>
                                        <option value="">??????????</option>
                                        <option value="??????????????">??????????????</option>
                                        <option value="????????????">????????????</option>
                                    </select>
                                </div>
                                <div>
                                    <label>?????? ????????:  </label>
                                    <select name="houseType" value={this.state.filterFields.houseType} onChange={this.handleFilterChange}>
                                        <option value="">??????????</option>
                                        <option value="????????????????">????????????????</option>
                                        <option value="??????????????">??????????????</option>
                                        <option value="??????????????">??????????????</option>
                                        <option value="??????????????">??????????????</option>
                                    </select>
                                </div>
                                <div>
                                    <label>??????????: </label>
                                    <select name="region" value={this.state.filterFields.region} onChange={this.handleFilterChange}>
                                        <option value="">??????????</option>
                                        <option value="??????????????????????">??????????????????????</option>
                                        <option value="????????????????????">????????????????????</option>
                                        <option value="??????????????????">??????????????????</option>
                                        <option value="??????????????????????????????????">??????????????????????????????????</option>
                                        <option value="??????????????????">??????????????????</option>
                                        <option value="??????????????????????">??????????????????????</option>
                                    </select>
                                </div>
                                <div >
                                    <label>?????????????? ????: </label>
                                    <input type="number" name="areaFrom" value={this.state.filterFields.areaFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="areaTo" value={this.state.filterFields.areaTo} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>?????????????? ?????????? ????: </label>
                                    <input type="number" name="kitchenAreaFrom" value={this.state.filterFields.kitchenAreaFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="kitchenAreaTo" value={this.state.filterFields.kitchenAreaTo} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>???????? ????: </label>
                                    <input type="number" name="floorFrom" value={this.state.filterFields.floorFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="floorTo" value={this.state.filterFields.floorTo} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>?????? ?????????????????? ????: </label>
                                    <input type="number" name="yearOfConstructionFrom" value={this.state.filterFields.yearOfConstructionFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="yearOfConstructionTo" value={this.state.filterFields.yearOfConstructionTo} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>???????????? ????????????????, ???? ????: </label>
                                    <input type="number" name="ceilingHeightFrom" value={this.state.filterFields.ceilingHeightFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="ceilingHeightTo" value={this.state.filterFields.ceilingHeightTo} onChange={this.handleFilterChange} />
                                </div>
                            </div>
                            <div className="rightSideFilter">
                                <div>
                                    <label>?????????? ???????????? ????: </label>
                                    <input type="number" name="roomsCountFrom" value={this.state.filterFields.roomsCountFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="roomsCountTo" value={this.state.filterFields.roomsCountTo} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>??????????: </label>
                                    <input name="streetName" value={this.state.filterFields.streetName} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>???????? ?????????????????????????  </label>
                                    <select name="hasGarbageChute" value={this.state.filterFields.hasGarbageChoute} onChange={this.handleFilterChange}>
                                        <option value="">???? ??????????????</option>
                                        <option value="false">??????</option>
                                        <option value="true">????</option>
                                    </select>
                                </div>
                                <div>
                                    <label>???????? ?????????????????? ?????????????????  </label>
                                    <select name="hasUndergroundParking" value={this.state.filterFields.hasUndergroundParking} onChange={this.handleFilterChange}>
                                        <option value="">???? ??????????????</option>
                                        <option value="false">??????</option>
                                        <option value="true">????</option>
                                    </select>
                                </div>
                                <div>
                                    <label>???????? ???????????????????????? ???????????????  </label>
                                    <select name="hasSwimmingPool" value={this.state.filterFields.hasSwimmingPool} onChange={this.handleFilterChange}>
                                        <option value="">???? ??????????????</option>
                                        <option value="false">??????</option>
                                        <option value="true">????</option>
                                    </select>
                                </div>
                                <div>
                                    <label>???????? ?????????????  </label>
                                    <select name="hasBalcony" value={this.state.filterFields.hasBalcony} onChange={this.handleFilterChange}>
                                        <option value="">???? ??????????????</option>
                                        <option value="false">??????</option>
                                        <option value="true">????</option>
                                    </select>
                                </div>
                                <div>
                                    <label>?????????????????????? ???????????????? ?? ????????: </label>
                                    <input name="comment" value={this.state.filterFields.comment} onChange={this.handleFilterChange} />
                                </div>
                            </div>
                            <hr/>
                            <div className="priceFilter">
                                <div>
                                    <label>???????? ?? ???????????? (?? ???????????? ???????????????? ??????????) ????: </label>
                                    <input type="number" name="rublePriceFrom" value={this.state.filterFields.rublePriceFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="rublePriceTo" value={this.state.filterFields.rublePriceTo} onChange={this.handleFilterChange} />
                                </div>
                                <div>
                                    <label>???????? ?? ???????????????? (?? ???????????? ???????????????? ??????????) ????: </label>
                                    <input type="number" name="dollarPriceFrom" value={this.state.filterFields.dollarPriceFrom} onChange={this.handleFilterChange} />
                                    <label> ???? </label>
                                    <input type="number" name="dollarPriceTo" value={this.state.filterFields.dollarPriceTo} onChange={this.handleFilterChange} />
                                </div>
                            </div>
                        </div>



                        <div>
                            <button onClick={this.handleClear}>
                                ???????????????? ????????????
                            </button>
                            <button onClick={this.handleFilterSubmit}>
                                ?????????????????? ????????????
                            </button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div style={{fontWeight:"bold", color:"black"}}>{!this.state.orders || this.state.orders.length === 0 ?  "???????? ?????? ???????????????? ????????????, ???????? ???? ???????? ???????????? ???? ???????????????? ?????? ????????????" : "???????? ?? ???????????? ????????????????????:"}</div>
                {this.state.orders.map(order => {
                    return <div className="orderCard">
                        <HouseCard houseInfo={order.house}/>
                        <div>
                            {order.orderType}
                        </div>
                        <div>
                            ???????? ?? ????????????????: {order.dollarPrice.toLocaleString()}
                        </div>
                        <div>
                            ???????? ?? ????????????: {order.rublePrice.toLocaleString()}
                        </div>
                        <div>
                            ?????????? ???? ??????????????: {order.salesAgent.fio}
                        </div>
                        <button data-id={order.orderId} onClick={this.handleSale}>
                            ?????????????????? ????????????
                        </button>
                    </div>
                })}

            </div>
        )

    }
}
