package yargu.db.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yargu.db.model.Agent;
import yargu.db.service.AgentService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class AgentController {
    private final AgentService agentService;

    @Autowired
    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @GetMapping(value="api/agents")
    public ResponseEntity<List<Agent>> read() {
        return new ResponseEntity<>(agentService.readAll(), HttpStatus.OK);
    }

    @PostMapping(value = "api/agents")
    public ResponseEntity<Agent> create(@RequestBody Agent agent) {
        agentService.create(agent);
        return new ResponseEntity<>(agent, HttpStatus.CREATED);
    }

    @GetMapping(value = "api/currentAgent")
    public ResponseEntity<Agent> getCurrentAgent() {
        return new ResponseEntity<>(agentService.getCurrentAgent(), HttpStatus.OK);
    }

    @PostMapping(value = "api/currentAgent")
    public ResponseEntity setCurrentAgent(@RequestBody Agent agent) {
        agentService.setCurrentAgent(agentService.findById(agent.getId()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
