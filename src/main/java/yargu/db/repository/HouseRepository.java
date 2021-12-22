package yargu.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yargu.db.model.House;

public interface HouseRepository  extends JpaRepository<House, Integer> {
}
