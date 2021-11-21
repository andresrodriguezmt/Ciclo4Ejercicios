/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.g1s1.repositorios;

import co.edu.usa.g1s1.modelo.Empresa;
import co.edu.usa.g1s1.repositorios.crud.EmpresaCrudRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author juvinao
 */
@Repository
public class EmpresaRepository {

    @Autowired
    private EmpresaCrudRepository repo;

    public List<Empresa> getAll() {
        return (List<Empresa>) repo.findAll();
    }
    
    public Optional<Empresa> getByNitAndClave(String nit, String clave) {
        return repo.findByNitAndClave(nit, clave);
    }

    public Optional<Empresa> getById(int id) {
        return repo.findById(id);
    }

    public Empresa save(Empresa empresa) {
        return repo.save(empresa);
    }

    public void delete(Empresa empresa) {
        repo.delete(empresa);
    }



}
