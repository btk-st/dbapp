package yargu.db.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import yargu.db.model.Agent;
import yargu.db.repository.AgentRepository;

import javax.validation.Valid;
import java.util.List;

@Service
public class AgentServiceImpl implements AgentService{


    @Autowired
    private AgentRepository agentRepository;
    private Agent currentAgent = null;

    @Override
    public void create(Agent agent) {
        agentRepository.save(agent);
    }

    @Override
    public List<Agent> readAll() {
        return agentRepository.findAll();
    }

    @Override
    public Agent getCurrentAgent() {
        return currentAgent;
    }

    @Override
    public void setCurrentAgent(Agent agent) {
        currentAgent = agent;
    }

    @Override
    public Agent findById(Integer id) {
        return agentRepository.findById(id).get();
    }
}
