import React from "react";
import axios from "axios";
import '../css/CreateHouse.css'
export default class CreateHouse extends React.Component {
    constructor(props) {
        super(props);
        const fields = ['region', 'flatNumber', 'houseType', 'area', 'floor',
            'floorsCount', 'yearOfConstruction', 'comment', 'hasGarbageChute', 'kitchenArea',
            'hasUndergroundParking', 'hasSwimmingPool', 'ceilingHeight', 'hasBalcony', 'streetName', 'roomsCount'];

        const info = Object.fromEntries(fields.map(field => [field, null]));
        this.state = {house: info, agent: null, rublePrice: null, dollarPrice: null};
        this.state.house.houseType = 'Типичный';
        this.state.house.region = 'Дзержинский'
        //get dollar rate
        axios.get('http://localhost:8080/api/const?constName=dollar_rate')
            .then(res => this.state.dollarRate = res.data);
        axios.get('http://localhost:8080/api/const?constName=agency_percent_comission')
            .then(res => this.state.agencyComission = res.data);
        this.handleChange = this.handleChange.bind(this)
        this.handleCreateHouse = this.handleCreateHouse.bind(this)
    }

    componentDidMount() {
        //get current user
        axios.get('http://localhost:8080/api/currentAgent').then(res => this.setState({agent: res.data}))
    }


    handleChange(e) {
        console.log(this.state)
        if (e.target.name === "rublePrice" || e.target.name === "dollarPrice") {
            if (e.target.name === "rublePrice") {
                const newRublePrice = Math.floor(e.target.value * 100) / 100;
                this.setState({
                    rublePrice: newRublePrice,
                    dollarPrice: Math.floor(newRublePrice / this.state.dollarRate * 100) / 100
                })
            } else {
                const newDollarPrice = Math.floor(e.target.value * 100) / 100;
                this.setState({
                    dollarPrice: Math.floor(e.target.value * 100) / 100,
                    rublePrice: Math.floor(newDollarPrice * this.state.dollarRate * 100) / 100
                })
            }
        } else {
            //clear house info if type was changed
            let newInfo = this.state.house;
            if (e.target.name === "houseType") {
                //clear state fields
                newInfo = Object.fromEntries(Object.keys(this.state.house).map(field => [field, ""]));
                //clear frontend inputs
                document.querySelectorAll('input, select').forEach(node => {
                    if (node.name !== "houseType") {
                        node.value = "";
                    }
                })
                newInfo.houseType = e.target.value;
                newInfo.region = 'Дзержинский'
            }
            //change info
            newInfo[e.target.name] = e.target.value;
            this.setState({house: newInfo});
        }

        e.preventDefault();
    }

    handleCreateHouse(e) {
        // "" == null!!
        const toPost = this.state.house;
        Object.keys(toPost).forEach(field => {
            if (toPost[field] === "") {
                toPost[field] = null;
            }
        })
        console.log('creating house with params:')
        console.log(toPost);
        axios.post('http://localhost:8080/api/houses', toPost)
            .then(res => {
                console.log(`created house ${res.data.id}`)
                axios.post('http://localhost:8080/api/orders', {
                    sales_agent: this.state.agent.id,
                    house_id: res.data.id,
                    is_sold: false,
                    dollar_price: Math.floor((this.state.dollarPrice * (1 + this.state.agencyComission / 100)) * 100) / 100,
                    ruble_price: Math.floor((this.state.rublePrice * (1 + this.state.agencyComission / 100)) * 100) / 100,
                    dollar_profit: (Math.floor((this.state.dollarPrice * (1 + this.state.agencyComission / 100)) * 100) / 100) - this.state.dollarPrice
                })
                    .then(res => alert('Успешно создано'))
            })
    }

    render() {
        return (
            <div id="createHouseCard">
                {!this.state.agent ? <div>Сначала выберите пользователя</div> :
                    <div>
                        <div>
                            <label>Тип дома: </label>
                            <select name="houseType" value={this.state.house.houseType} onChange={this.handleChange}>
                                <option value="Типичный">Типичный</option>
                                <option value="Элитный">Элитный</option>
                                <option value="Частный">Частный</option>
                                <option value="Нежилой">Нежилой</option>
                            </select>
                        </div>

                        <div >
                            <label>Район: </label>
                            <select name="region" value={this.state.house.region} onChange={this.handleChange}>
                                <option value="Дзержинский">Дзержинский</option>
                                <option value="Заволжский">Заволжский</option>
                                <option value="Кировский">Кировский</option>
                                <option value="Красноперекопский">Красноперекопский</option>
                                <option value="Ленинский">Ленинский</option>
                                <option value="Фрунзенский">Фрунзенский</option>
                            </select>
                        </div>
                        <div >
                            <label>Улица: </label>
                            <input type="input" name="streetName" value={this.state.house.streetName}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Число комнат: </label>
                            <input type="number" name="roomsCount" value={this.state.house.roomsCount}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Номер квартиры: </label>
                            <input type="number" name="flatNumber" value={this.state.house.flatNumber}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Площадь: </label>
                            <input type="number" name="area" value={this.state.house.area}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Площадь кухни: </label>
                            <input type="number" name="kitchenArea" value={this.state.house.kitchenArea}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Высота потолков: </label>
                            <input type="number" name="ceilingHeight" value={this.state.house.ceilingHeight}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Этаж: </label>
                            <input type="number" name="floor" value={this.state.house.floor}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Число этажей: </label>
                            <input type="number" name="floorsCount" value={this.state.house.floorsCount}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Год постройки: </label>
                            <input type="number" name="yearOfConstruction" value={this.state.house.yearOfConstruction}
                                   onChange={this.handleChange}/>
                        </div>
                        <div >
                            <label>Есть мусоропровод? </label>
                            <select name="hasGarbageChute" value={this.state.house.hasGarbageChute}
                                    onChange={this.handleChange}>
                                <option value="">Не указано</option>
                                <option value="false">Нет</option>
                                <option value="true">Да</option>
                            </select>
                        </div>
                        <div >
                            <label>Есть бассейн? </label>
                            <select name="hasSwimmingPool" value={this.state.house.hasSwimmingPool}
                                    onChange={this.handleChange}>
                                <option value="">Не указано</option>
                                <option value="false">Нет</option>
                                <option value="true">Да</option>
                            </select>
                        </div>
                        <div >
                            <label>Есть подземная парковка? </label>
                            <select name="hasUndergroundParking" value={this.state.house.hasUndergroundParking}
                                    onChange={this.handleChange}>
                                <option value="">Не указано</option>
                                <option value="false">Нет</option>
                                <option value="true">Да</option>
                            </select>
                        </div>
                        <div >
                            <label>Есть балкон? </label>
                            <select name="hasBalcony" value={this.state.house.hasBalcony}
                                    onChange={this.handleChange}>
                                <option value="">Не указано</option>
                                <option value="false">Нет</option>
                                <option value="true">Да</option>
                            </select>
                        </div>
                        <div >
                            <label>Комментарий: </label>
                            <input name="comment" value={this.state.house.comment} onChange={this.handleChange}/>
                        </div>


                        <hr></hr>


                        <div>
                            <label>Цена в рублях: </label>
                            <input type="number" name="rublePrice" value={this.state.rublePrice}
                                   onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label>Цена в долларах: </label>
                            <input type="number" name="dollarPrice" value={this.state.dollarPrice}
                                   onChange={this.handleChange}/>
                        </div>
                        {this.state.rublePrice ?
                            <div>
                                <hr></hr>
                                <div>Цена с учетом комиссии агенства в {this.state.agencyComission}%:</div>
                                <span style={{fontWeight:"bold"}}>{(Math.floor((this.state.rublePrice * (1 + this.state.agencyComission / 100)) * 100) / 100).toLocaleString()} рублей</span>
                                <span style={{paddingLeft:5, paddingRight:5}}> или </span>
                                <span style={{fontWeight:"bold"}}>{(Math.floor((this.state.dollarPrice * (1 + this.state.agencyComission / 100)) * 100) / 100).toLocaleString()} долларов</span>
                            </div>
                            : null}
                        <div>Текущий пользователь: {this.state.agent.fio}</div>
                        <hr></hr>
                        <button onClick={this.handleCreateHouse}>
                            Создать
                        </button>
                    </div>
                }
            </div>

        )
    }
}