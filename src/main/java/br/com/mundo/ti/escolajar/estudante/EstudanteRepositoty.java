package br.com.mundo.ti.escolajar.estudante;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudanteRepositoty extends JpaRepository<Estudante, Long> {

    Estudante findByNome(String name);
}