package yargu.db.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class ConstController {

    @Autowired
    private EntityManager entityManager;

    @GetMapping("api/const")
    public double getConstByName(@RequestParam String constName) {
        String query = "SELECT value from const where name=" + "'" + constName + "'";
        Double value = Double.parseDouble(entityManager.createNativeQuery(query).getSingleResult().toString());
        return value;
    }
}
