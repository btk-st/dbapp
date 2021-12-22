package yargu.db.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yargu.db.model.Agent;
import yargu.db.model.House;
import yargu.db.repository.HouseRepository;

import java.util.List;

@Service
public class HouseServiceImpl implements HouseService{

    @Autowired
    private HouseRepository houseRepository;

    @Override
    public void create(House house) {
        houseRepository.save(house);
    }

    @Override
    public List<House> readAll() {
        return houseRepository.findAll();
    }

    @Override
    public House findById(Integer id) {
        return houseRepository.findById(id).get();
    }

}
