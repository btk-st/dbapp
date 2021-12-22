package yargu.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yargu.db.model.Agent;

public interface AgentRepository extends JpaRepository<Agent, Integer> {
}
