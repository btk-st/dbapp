package yargu.db.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import yargu.db.model.Agent;
import yargu.db.model.House;
import yargu.db.service.HouseService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class HouseController {
    private final HouseService houseService;


    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @GetMapping(value="api/houses")
    public ResponseEntity<List<House>> read() {
        final List<House> houses = houseService.readAll();
        return new ResponseEntity<>(houses, HttpStatus.OK);
    }

    @PostMapping(value = "api/houses")
    public ResponseEntity<House> create(@RequestBody House house) {
        houseService.create(house);
        return new ResponseEntity<>(house, HttpStatus.CREATED);
    }
}
