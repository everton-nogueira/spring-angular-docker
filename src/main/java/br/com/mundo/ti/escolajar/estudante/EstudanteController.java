package br.com.mundo.ti.escolajar.estudante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/estudantes")
public class EstudanteController {

    private final EstudanteService service;

    @Autowired
    public EstudanteController(EstudanteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Estudante> getEstudantes(){
        return service.getEstudantes();
    }

    @GetMapping("/nomes/{name}")
    public Estudante getEstudanteByName(@PathVariable String name){
        return service.getEstudanteByName(name);
    }

    @PostMapping("/gravar")
    public Estudante saveEstudante(@RequestBody Estudante estudante){
        return service.saveEditEstudante(estudante);
    }

    @PostMapping("/editar")
    public Estudante editEstudante(@RequestBody Estudante estudante){
        return service.saveEditEstudante(estudante);
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Long> deleteEstudante(@PathVariable Long id){
        if(service.deleteEstudante(id)) {
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
