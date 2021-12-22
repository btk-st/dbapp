package yargu.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yargu.db.model.Order;

public interface OrderRepository  extends JpaRepository<Order, Integer> {
}
