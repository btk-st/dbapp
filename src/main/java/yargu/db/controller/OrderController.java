package yargu.db.controller;

import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yargu.db.model.Agent;
import yargu.db.model.Order;
import yargu.db.model.OrderQuery;
import yargu.db.model.OrderType;
import yargu.db.service.HouseService;
import yargu.db.service.OrderService;

import javax.persistence.EntityManager;
import javax.swing.text.StyledEditorKit;
import javax.transaction.Transaction;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class OrderController {
    private final OrderService orderService;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(value = "api/orders")
    public ResponseEntity<List<Order>> read() {
        final List<Order> orders = orderService.readAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    @PostMapping(value = "api/orders/filter")
    public ResponseEntity<List<Order>> filter(@RequestBody OrderQuery orderQuery) {
        final List<Order> orders = orderService.queryWithFilter(orderQuery);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping(value = "api/orders")
    public ResponseEntity<Integer> create(@RequestBody Map<String, String> payload) {

        Integer id = orderService.create(OrderType.valueOf(payload.get("order_type")),
                Integer.parseInt(payload.get("house_id")),
                Integer.parseInt(payload.get("sales_agent")),
                new BigDecimal(payload.get("ruble_price")),
                new BigDecimal(payload.get("dollar_price")),
                Boolean.parseBoolean(payload.get("is_sold")),
                new BigDecimal(payload.get("dollar_profit")));
        return new ResponseEntity<Integer>(id, HttpStatus.CREATED);
    }

    @GetMapping(value="api/finishOrder")
    @Transactional
    public boolean finishOrder(@RequestParam Integer id) {
        String query = "update orders set is_sold = true where order_id=" + id;
        int result  = entityManager.createNativeQuery(query).executeUpdate();
        return result == 1;
    }

}
