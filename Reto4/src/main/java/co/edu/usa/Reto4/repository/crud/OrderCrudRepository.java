package co.edu.usa.Reto4.repository.crud;

import co.edu.usa.Reto4.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderCrudRepository extends MongoRepository<Order,Integer> {


    List<Order> findBySalesManZone(String Zone);
}
