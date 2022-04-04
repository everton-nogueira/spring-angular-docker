import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Estudante} from "../model/estudante-model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class EstudanteService {
  private RESOURCE_URL = environment.URL;

  constructor(private http: HttpClient) {
  }

  cadastrar(estudante: Estudante): Observable<Estudante>{
    return <Observable<Estudante>>this.http.post(`${this.RESOURCE_URL}/api/v1/estudantes/gravar`, estudante);
  }

  listarTodos(): Observable<Estudante[]>{
    return <Observable<Estudante[]>>this.http.get(`${this.RESOURCE_URL}/api/v1/estudantes`);
  }

  alterar(estudante: Estudante): Observable<Estudante>{
    return <Observable<Estudante>>this.http.post(`${this.RESOURCE_URL}/api/v1/estudantes/editar`, estudante);
  }

  deletar(estudante: Estudante): Observable<any>{
    return <Observable<any>>this.http.delete(`${this.RESOURCE_URL}/api/v1/estudantes/deletar/${estudante.id}`);
  }

  buscarPorNome(estudante: Estudante): Observable<Estudante>{
    return <Observable<Estudante>>this.http.get(`${this.RESOURCE_URL}/api/v1/estudantes/nomes/${estudante.nome}`);
  }
}
