import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estudante} from "../model/estudante-model";


@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  constructor(private http: HttpClient) {
  }

  cadastrar(estudante: Estudante): Observable<Estudante>{
    return <Observable<Estudante>>this.http.post(`http://localhost:8080/api/v1/estudantes/gravar`, estudante);
  }

  listarTodos(): Observable<Estudante[]>{
    return <Observable<Estudante[]>>this.http.get(`http://localhost:8080/api/v1/estudantes`);
  }

  alterar(estudante: Estudante): Observable<Estudante>{
    return <Observable<Estudante>>this.http.post(`http://localhost:8080/api/v1/estudantes/editar`, estudante);
  }

  deletar(estudante: Estudante): Observable<any>{
    return <Observable<any>>this.http.delete(`http://localhost:8080/api/v1/estudantes/deletar/${estudante.id}`);
  }

  buscarPorNome(estudante: Estudante): Observable<Estudante>{
    return <Observable<Estudante>>this.http.get(`http://localhost:8080/api/v1/estudantes/nomes/${estudante.nome}`);
  }
}
