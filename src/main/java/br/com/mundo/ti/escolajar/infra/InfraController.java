package br.com.mundo.ti.escolajar.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/projeto")
public class InfraController {

    @Value("${project.version}")
    private String versao;

    @GetMapping("/versao")
    public Infra getVersaoProjeto(){
        return Infra.builder().versao(versao).build();
    }
}
