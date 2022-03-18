package br.com.mundo.ti.escolajar.estudante;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Service
public class EstudanteService {

    private final EstudanteRepositoty estudanteRepositoty;

    @Autowired
    public EstudanteService(EstudanteRepositoty estudanteRepositoty) {
        this.estudanteRepositoty = estudanteRepositoty;
    }

    public List<Estudante> getEstudantes() {
        return estudanteRepositoty.findAll();
    }

    public Estudante getEstudanteByName(String name) {
        return estudanteRepositoty.findByNome(name);
    }

    public Estudante saveEditEstudante(Estudante estudante) {
        return estudanteRepositoty.save(estudante);
    }

    public Boolean deleteEstudante(Long id) {
        if(estudanteRepositoty.existsById(id)){
            estudanteRepositoty.deleteById(id);
            return true;
        }
        return false;
    }
}
