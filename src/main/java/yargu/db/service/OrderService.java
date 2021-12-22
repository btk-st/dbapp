package yargu.db.service;

import org.springframework.http.ResponseEntity;
import yargu.db.model.Order;
import yargu.db.model.OrderQuery;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface OrderService {
    Integer create(Integer houseId, Integer salesAgent, BigDecimal rublePrice, BigDecimal dollarPrice, Boolean isSold, BigDecimal dollarProfit);
    List<Order> readAll();
    List<Order> queryWithFilter(OrderQuery orderQuery);

}
