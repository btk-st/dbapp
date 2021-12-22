package yargu.db.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
public class StatisticsController {

    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ObjectMapper mapper;

    @GetMapping(value = "api/stats")
    public ObjectNode getStats() {
        ObjectNode response = mapper.createObjectNode();
        String query =
                "select sum (dollar_profit) as total " +
                "from orders " +
                "where is_sold=true";
        double totalProfit = Double.parseDouble(entityManager.createNativeQuery(query).getSingleResult().toString());
        response.put("totalProfit", totalProfit);

        query = "select count(*) " +
                "from orders " +
                "where is_sold=true";
        int totalOrders = Integer.parseInt(entityManager.createNativeQuery(query).getSingleResult().toString());
        response.put("totalOrders",totalOrders);
        double averageProfit = totalProfit / totalOrders;
        averageProfit = Math.round(averageProfit * 100.0) / 100.0;
        response.put("averageProfit", averageProfit);

        //topByProfitByHouseType
        query = "select type, count(order_id) total_sold, sum(dollar_profit) as total_profit from orders " +
                "join agents a on orders.sales_agent = a.agent_id " +
                "join houses h on orders.house_id = h.id " +
                "where is_sold=true " +
                "group by type " +
                "Order by total_profit desc";
        List<Object[]> byType = entityManager.createNativeQuery(query).getResultList();
        ArrayNode typeArray = mapper.createArrayNode();
        byType.stream().forEach(type -> {
            ObjectNode typeNode = mapper.createObjectNode();
            typeNode.put("type", (String) type[0]);
            typeNode.put("total_sold", (BigInteger) type[1] );
            typeNode.put("total_profit", (BigDecimal) type[2]);
            typeArray.add(typeNode);
        });
        response.putArray("typeTop").addAll(typeArray);

        //topByProfitByRegion
        query = "select region, count(order_id) total_sold, sum(dollar_profit) as total_profit from orders " +
                "join agents a on orders.sales_agent = a.agent_id " +
                "join houses h on orders.house_id = h.id " +
                "where is_sold=true " +
                "group by region " +
                "Order by total_profit desc";
        List<Object[]> byRegion = entityManager.createNativeQuery(query).getResultList();
        ArrayNode regionArray = mapper.createArrayNode();
        byRegion.stream().forEach(region -> {
            ObjectNode regionNode = mapper.createObjectNode();
            regionNode.put("region", (String) region[0]);
            regionNode.put("total_sold", (BigInteger) region[1] );
            regionNode.put("total_profit", (BigDecimal) region[2]);
            regionArray.add(regionNode);
        });
        response.putArray("regionTop").addAll(regionArray);

        query = "select agent_id, fio, sum(dollar_profit) as agent_profit, count(*) as agent_sales from orders " +
                "join agents a on orders.sales_agent = a.agent_id " +
                "where is_sold = true " +
                "group by agent_id, fio " +
                "order by agent_profit desc";
        List<Object[]> agentInfo = entityManager.createNativeQuery(query).getResultList();
        ArrayNode agentArray = mapper.createArrayNode();
        agentInfo.stream().forEach(agent -> {
            ObjectNode agentNode = mapper.createObjectNode();
            agentNode.put("agent_id", (Integer) agent[0]);
            agentNode.put("fio", (String) agent[1]);
            agentNode.put("agent_profit", (BigDecimal) agent[2]);
            agentNode.put("agent_sales", (BigInteger) agent[3]);
            agentArray.add(agentNode);
        });
        response.putArray("agentTop").addAll(agentArray);

        return response;
    }
}
