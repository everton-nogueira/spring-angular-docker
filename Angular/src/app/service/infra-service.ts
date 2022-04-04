import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Infra} from "../model/infra-model";

@Injectable({
  providedIn: 'root'
})
export class InfraService {
  private RESOURCE_URL = environment.URL;

  constructor(private http: HttpClient) {
  }

  buscaVersao(): Observable<Infra>{
    return <Observable<Infra>>this.http.get(`${this.RESOURCE_URL}/api/v1/projeto/versao`);
  }
}
