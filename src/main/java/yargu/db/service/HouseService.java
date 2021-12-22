package yargu.db.service;

import yargu.db.model.House;

import java.util.List;

public interface HouseService {
    void create(House house);
    List<House> readAll();
    House findById(Integer id);
}
