package yargu.db.service;

import yargu.db.model.Agent;

import java.util.List;

public interface AgentService {
    void create(Agent agent);
    List<Agent> readAll();

    Agent getCurrentAgent();

    void setCurrentAgent(Agent agent);
    Agent findById(Integer id);
}
