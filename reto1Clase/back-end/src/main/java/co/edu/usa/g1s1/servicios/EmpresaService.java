/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.usa.g1s1.servicios;

import co.edu.usa.g1s1.modelo.Empresa;
import co.edu.usa.g1s1.repositorios.EmpresaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author juvinao
 */
@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> getAll() {
        return empresaRepository.getAll();
    }

    public Empresa getById(int id) {
        Optional<Empresa> empresa = empresaRepository.getById(id);
        return empresa.orElse(null);
    }

    public Empresa getByNitAndClave(String nit, String clave) {
        Optional<Empresa> empresa = empresaRepository.getByNitAndClave(nit, clave);
        if (empresa.isPresent()) {
            return empresa.get();
        } else {
            Empresa e = new Empresa();
            e.setNit(nit);
            e.setClave(clave);
            e.setNombre("NO DEFINIDO");
            return e;
        }
    }

    public Empresa save(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public boolean delete(int id) {

        Boolean d = empresaRepository.getById(id).map(empresa -> {
            empresaRepository.delete(empresa);
            return true;
        }).orElse(false);
        return d;

    }

    public Empresa update(Empresa empresa) {
        if (empresa.getId() != null) {
            Optional<Empresa> consultado = empresaRepository.getById(empresa.getId());
            if (consultado.isPresent()) {
                if (empresa.getNit() != null) {
                    consultado.get().setNit(empresa.getNit());
                }
                if (empresa.getClave() != null) {
                    consultado.get().setClave(empresa.getClave());
                }
                return empresaRepository.save(consultado.get());
            }
        }
        return empresa;
    }

}
