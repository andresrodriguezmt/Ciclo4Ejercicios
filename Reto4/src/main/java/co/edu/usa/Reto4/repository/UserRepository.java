package co.edu.usa.Reto4.repository;

import co.edu.usa.Reto4.model.User;
import co.edu.usa.Reto4.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class  UserRepository {

    @Autowired
    private UserCrudRepository userCrudRepo;

    public Optional<User> getUser(int id){
        return userCrudRepo.findById(id);
    }
    public List<User> getAll(){
        return (List<User>)userCrudRepo.findAll();
    }

    public boolean existEmail(String email){
        Optional<User> usuario = userCrudRepo.findByEmail(email);
        return !usuario.isEmpty();
    }

    public Optional<User> authenticateUser(String email, String password){
        return userCrudRepo.findByEmailAndPassword(email,password);
    }

    public User create(User user){
        return userCrudRepo.save(user);
    }

    public User update(User user){
        return userCrudRepo.save(user);
    }

    public void delete(User user){
        userCrudRepo.delete(user);
    }
}
