package yargu.db.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yargu.db.model.Order;
import yargu.db.model.OrderQuery;
import yargu.db.repository.OrderRepository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private HouseService houseService;
    @Autowired
    private AgentService agentService;

    @Override
    public Integer create(Integer houseId, Integer salesAgent, BigDecimal rublePrice, BigDecimal dollarPrice, Boolean isSold, BigDecimal dollarProfit) {
        Order order = new Order();
        order.setHouse(houseService.findById(houseId));
        order.setDollarPrice(dollarPrice);
        order.setRublePrice(rublePrice);
        order.setDollarProfit(dollarProfit);
        order.setSalesAgent(agentService.findById(salesAgent));
        return orderRepository.save(order).getOrderId();
    }

    @Override
    public List<Order> readAll() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> queryWithFilter(OrderQuery orderQuery) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Order> criteriaQuery = criteriaBuilder.createQuery(Order.class);
        Root<Order> itemRoot = criteriaQuery.from(Order.class);

        // construct filter
        List<Predicate> predicateList = new ArrayList<>(Collections.emptyList());
        //region
        if (orderQuery.getRegion() != null) predicateList.add(criteriaBuilder.equal((itemRoot.get("house").get("region")), orderQuery.getRegion()));
        //type
        if (orderQuery.getHouseType() != null) predicateList.add(criteriaBuilder.equal((itemRoot.get("house").get("houseType")), orderQuery.getHouseType()));
        //area
        if (orderQuery.getAreaFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("house").get("area")), orderQuery.getAreaFrom()));
        if (orderQuery.getAreaTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("house").get("area")), orderQuery.getAreaFrom()));
        //kitchen area
        if (orderQuery.getKitchenAreaFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("house").get("kitchenArea")), orderQuery.getKitchenAreaFrom()));
        if (orderQuery.getKitchenAreaTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("house").get("kitchenArea")), orderQuery.getKitchenAreaTo()));
        // floor
        if (orderQuery.getFloorFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("house").get("floor")), orderQuery.getFloorFrom()));
        if (orderQuery.getFloorTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("house").get("floor")), orderQuery.getFloorTo()));
        //year of construction
        if (orderQuery.getYearOfConstructionFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("house").get("yearOfConstruction")), orderQuery.getYearOfConstructionFrom()));
        if (orderQuery.getYearOfConstructionTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("house").get("yearOfConstruction")), orderQuery.getYearOfConstructionTo()));
        //ceilingHeight
        if (orderQuery.getCeilingHeightFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("house").get("ceilingHeight")), orderQuery.getCeilingHeightFrom()));
        if (orderQuery.getCeilingHeightTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("house").get("ceilingHeight")), orderQuery.getCeilingHeightTo()));

        // ruble price
        if (orderQuery.getRublePriceFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("rublePrice")), orderQuery.getRublePriceFrom()));
        if (orderQuery.getRublePriceTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("rublePrice")), orderQuery.getRublePriceTo()));
        // usd
        if (orderQuery.getDollarPriceFrom() != null) predicateList.add(criteriaBuilder.greaterThan((itemRoot.get("dollarPrice")), orderQuery.getDollarPriceFrom()));
        if (orderQuery.getDollarPriceTo() != null) predicateList.add(criteriaBuilder.lessThan((itemRoot.get("dollarPrice")), orderQuery.getDollarPriceTo()));

        // hasGarbageChute
        if (orderQuery.getHasGarbageChute() != null) predicateList.add(criteriaBuilder.equal((itemRoot.get("house").get("hasGarbageChute")), orderQuery.getHasGarbageChute()));
        // hasUndergroundParking
        if (orderQuery.getHasUndergroundParking() != null) predicateList.add(criteriaBuilder.equal((itemRoot.get("house").get("hasUndergroundParking")), orderQuery.getHasUndergroundParking()));
        // hasSwimmingPool
        if (orderQuery.getHasSwimmingPool() != null) predicateList.add(criteriaBuilder.equal((itemRoot.get("house").get("hasSwimmingPool")), orderQuery.getHasSwimmingPool()));
        //hasBalcony
        if (orderQuery.getHasBalcony() != null) predicateList.add(criteriaBuilder.equal((itemRoot.get("house").get("hasBalcony")), orderQuery.getHasBalcony()));

        //comment
        if (orderQuery.getComment() != null) predicateList.add(criteriaBuilder.like((itemRoot.get("house").get("comment")), "%" + orderQuery.getComment() + "%"));

        //apply with AND condition
        Predicate predicate = criteriaBuilder.and(predicateList.toArray(new Predicate[0]));
        criteriaQuery.where(predicate);
        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
