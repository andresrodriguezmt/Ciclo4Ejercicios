/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.g1s1.web;

import co.edu.usa.g1s1.modelo.Empresa;
import co.edu.usa.g1s1.servicios.EmpresaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author juvinao
 */
@RestController
@RequestMapping("/api/empresa")
@CrossOrigin
public class EmpresaController {

    @Autowired
    private EmpresaService service;

    @GetMapping("/all")
    private List<Empresa> getAll() {
        return service.getAll();
    }

    @GetMapping("/{nit}/{clave}")
    private Empresa getByNit(@PathVariable("nit") String nit, @PathVariable("clave") String clave) {
        return service.getByNitAndClave(nit, clave);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Empresa save(@RequestBody Empresa empresa) {
        return service.save(empresa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") int id) {
        return new ResponseEntity<>(service.delete(id), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Empresa update(@RequestBody Empresa empresa) {
        return service.update(empresa);
    }

}
