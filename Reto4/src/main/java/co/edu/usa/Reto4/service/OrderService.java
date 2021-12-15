package co.edu.usa.Reto4.service;

import co.edu.usa.Reto4.model.Order;
import co.edu.usa.Reto4.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    public List<Order> getAll() {
        return orderRepo.getAll();
    }

    public Optional<Order> getOrder(int id) {
        return orderRepo.getOrder(id);
    }

    public Order create(Order order) {
        if (order.getId() == null) {
            return order;
        }
        return orderRepo.create(order);
    }

    public Order update(Order order) {
        if (order.getId() != null) {
            Optional<Order> orderDb = orderRepo.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                if(order.getId() != null){
                    orderDb.get().setId(order.getId());
                }
                if(order.getRegisterDay() != null){
                    orderDb.get().setRegisterDay(order.getRegisterDay());
                }
                if(order.getStatus() != null){
                    orderDb.get().setStatus(order.getStatus());
                }
                if(order.getSalesMan() != null){
                    orderDb.get().setSalesMan(order.getSalesMan());
                }
                if(order.getProducts() != null){
                    orderDb.get().setProducts(order.getProducts());
                }

                if(order.getQuantities() != null){
                    orderDb.get().setQuantities(order.getQuantities());
                }
                orderRepo.update(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }

    }

    public boolean delete(int id){
        return getOrder(id).map(order -> {
            orderRepo.delete(order);
            return true;
        }).orElse(false);
    }

    public List<Order> getByOrderZone(String zone){
        return orderRepo.getOrderByZone(zone);
    }

    public List<Order>  getOrdersSalesManById(int id){
        return orderRepo.ordersSalesManById(id);
    }

    public List<Order> getOrdersSalesManByState(String state, int id){
        return orderRepo.ordersSalesManByState(state,id);
    }

    public List<Order> getOrdersSalesManByDate(String dateStr, Integer id) {
        return orderRepo.ordersSalemanByDate(dateStr,id);
    }
}
