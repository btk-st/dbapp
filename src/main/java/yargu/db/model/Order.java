package yargu.db.model;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @OneToOne
    @JoinColumn(name = "house_id")
    private House house;

    @ManyToOne
    @JoinColumn(name = "sales_agent")
    private Agent salesAgent;

    @Column(name = "is_sold")
    private boolean isSold;

    @Column(name = "dollar_price")
    private BigDecimal dollarPrice;

    @Column(name = "ruble_price")
    private BigDecimal rublePrice;

    @Column(name = "dollar_profit")
    private BigDecimal dollarProfit;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_type")
    private OrderType orderType;

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public BigDecimal getDollarProfit() {
        return dollarProfit;
    }

    public void setDollarProfit(BigDecimal dollarProfit) {
        this.dollarProfit = dollarProfit;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public House getHouse() {
        return house;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public boolean isSold() {
        return isSold;
    }

    public void setSold(boolean sold) {
        isSold = sold;
    }

    public BigDecimal getDollarPrice() {
        return dollarPrice;
    }

    public void setDollarPrice(BigDecimal dollarPrice) {
        this.dollarPrice = dollarPrice;
    }

    public BigDecimal getRublePrice() {
        return rublePrice;
    }

    public void setRublePrice(BigDecimal rublePrice) {
        this.rublePrice = rublePrice;
    }

    public Agent getSalesAgent() {
        return salesAgent;
    }

    public void setSalesAgent(Agent salesAgent) {
        this.salesAgent = salesAgent;
    }
}
