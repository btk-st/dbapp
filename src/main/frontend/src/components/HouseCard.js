import React from "react";
import '../css/HouseCard.css'
export default class HouseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.houseInfo;
        console.log(this.state)
    }

    render() {
        return <div id="houseCard">
            <table  border="1" width={300}>
                <caption>Дом №{this.state.id}.</caption>
                <tr>
                    <td>Тип дома: {this.state.houseType}</td>
                </tr>
                <tr>
                    <td>Район: {this.state.region}</td>
                </tr>
                {this.state.streetName != null && <tr>
                    <td>Улица: {this.state.streetName}</td>
                </tr>}
                {this.state.flatNumber != null && <tr>
                    <td>Номер квартиры: {this.state.flatNumber}</td>
                </tr>}
                {this.state.roomsCount != null && <tr>
                    <td>Число комнат: {this.state.roomsCount}</td>
                </tr>}
                {this.state.area != null && <tr>
                    <td>Площадь: {this.state.area} кв.м</td>
                </tr>}
                {this.state.kitchenArea != null && <tr>
                    <td>Площадь кухни: {this.state.kitchenArea} кв.м</td>
                </tr>}
                {this.state.ceilingHeight != null && <tr>
                    <td>Высота потолков, см: {this.state.ceilingHeight} м.</td>
                </tr>}
                {this.state.floor != null && <tr>
                    <td>Этаж: {this.state.floor}</td>
                </tr>}
                {this.state.floorsCount != null && <tr>
                    <td>Число этажей: {this.state.floorsCount}</td>
                </tr>}
                {this.state.yearOfConstruction != null && <tr>
                    <td>Дата строительства: {this.state.yearOfConstruction} г.</td>
                </tr>}
                {this.state.hasSwimmingPool != null && <tr>
                    <td>{this.state.hasSwimmingPool ? 'Есть плавательный бассейн' : 'Нет плавательного бассейна'}</td>
                </tr>}
                {this.state.hasUndergroundParking != null && <tr>
                    <td>{this.state.hasUndergroundParking ? 'Есть подземная парковка' : 'Нет подземной парковки'}</td>
                </tr>}
                {this.state.hasGarbageChute != null &&<tr>
                    <td>{this.state.hasGarbageChute ? 'Есть мусоропровод':'Нет мусоропровода'} </td>
                </tr>}
                {this.state.hasBalcony != null && <tr>
                    <td>{this.state.hasBalcony ? 'Есть балкон' : 'Нет балкона'}</td>
                </tr>}
                {this.state.comment != null && <tr>
                    <td>Комментарий: {this.state.comment}</td>
                </tr>}
            </table>
        </div>
    }

}
