package co.edu.usa.Reto4.service;

import co.edu.usa.Reto4.model.User;
import co.edu.usa.Reto4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public List<User> getAll(){
        return userRepo.getAll();
    }

    public Optional<User> getUser(int id){
        return userRepo.getUser(id);
    }

    public User create(User user){
        if (user.getId() ==null){
            return user;
        }else{
            Optional<User> exist=userRepo.getUser(user.getId());
            if (exist.isEmpty()){
                if (existEmail(user.getEmail())== false){
                    return userRepo.create(user);
                }else {
                    return user;
                }
            }else {
                return user;
            }
        }
    }

    public boolean existEmail(String email){
        return userRepo.existEmail(email);
    }

    public User authenticateUser(String email, String password){
        Optional<User> usuario = userRepo.authenticateUser(email,password);

        if (usuario.isEmpty()){
            return new User();
        }
            return usuario.get();


    }



    public User update(User user){
       if(user.getId() !=null){
           Optional<User> userDb = userRepo.getUser(user.getId());
           if (!userDb.isEmpty()){
               if (user.getIdentification() !=null){
                   userDb.get().setIdentification(user.getIdentification());
               }
               if (user.getName() != null){
                   userDb.get().setName(user.getName());
               }
               if (user.getBirthtDay() != null){
                   userDb.get().setBirthtDay(user.getBirthtDay());
               }
               if (user.getMonthBirthtDay()!= null){
                   userDb.get().setMonthBirthtDay(user.getMonthBirthtDay());
               }

               if (user.getAddress() != null){
                   userDb.get().setAddress(user.getAddress());
               }
               if (user.getCellPhone() != null){
                   userDb.get().setCellPhone(user.getCellPhone());
               }
               if (user.getEmail() != null){
                   userDb.get().setEmail(user.getEmail());
               }
               if (user.getZone() != null){
                   userDb.get().setZone(user.getZone());
               }
               if (user.getType() != null){
                   userDb.get().setType(user.getType());
               }
               userRepo.update(userDb.get());
               return userDb.get();
           } else{
               return user;
           }
       }
       return user;

    }

    public boolean delete(int userId){
        Boolean userBoo = getUser(userId).map(user ->{userRepo.delete(user);
            return true;
        }).orElse(false);
        return userBoo;
    }
}
