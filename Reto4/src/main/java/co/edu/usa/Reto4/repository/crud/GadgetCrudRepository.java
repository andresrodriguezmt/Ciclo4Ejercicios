package co.edu.usa.Reto4.repository.crud;

import co.edu.usa.Reto4.model.Gadget;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GadgetCrudRepository extends MongoRepository<Gadget,Integer> {
}
