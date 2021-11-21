/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.g1s1.repositorios.crud;

import co.edu.usa.g1s1.modelo.Empresa;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author juvinao
 */
public interface EmpresaCrudRepository extends CrudRepository<Empresa, Integer> {
    
    @Query(value = "Select e from Empresa e Where e.nit = ?1 and e.clave = ?2")
    public Optional<Empresa> findByNitAndClave(String nit, String clave);
}
