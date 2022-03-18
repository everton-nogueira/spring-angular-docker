import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Estudante} from "./model/estudante-model";
import {EstudanteService} from "./service/estudante-service";
import {CustomValidators} from "./shared/CustomValidators";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  colunas: string[] = ['id', 'nome', 'email', 'dataNascimento', 'areaInteresse', 'editar', 'deletar'];
  isAlteracao = false;
  formGroup: FormGroup;
  estudantes: Estudante[] = [];
  private estudante?: Estudante;

  constructor(private fb: FormBuilder,
              @Inject( LOCALE_ID ) private locale: string,
              private service: EstudanteService) {
    this.formGroup = this.getFormGroup();
    this.resetaForm();
  }

  ngOnInit(): void {
    this.listarTodos();
  }

  resetaForm() {
    this.isAlteracao = false;
    this.formGroup = this.getFormGroup();
  }

  private getFormGroup() {
    return this.fb.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      dataNascimento: [null, [Validators.required, CustomValidators.ValidateDate]],
      areaInteresse: [null, Validators.required]
    });
  }

  cadastrar() {
    this.service.cadastrar(this.montaEstudante()).subscribe((retorno) => {
      alert(`Estudante ${retorno.nome} cadastrado com sucesso!`);
      this.resetaForm();
      this.listarTodos();
    }, () => {
      alert(`Ocorreu um erro ao cadastrar o estudante!`);
    });
  }

  prepararEdicao(estudante: Estudante) {
    this.isAlteracao = true;
    this.formGroup.get('nome')?.setValue(estudante.nome);
    this.formGroup.get('email')?.setValue(estudante.email);
    this.formGroup.get('dataNascimento')?.setValue(formatDate(estudante.dataNascimento, 'yyyy-MM-dd', this.locale, '+0000'));
    this.formGroup.get('areaInteresse')?.setValue(estudante.areaInteresse);
    this.estudante = estudante;
  }

  editar() {
    let estudante = this.montaEstudante();
    estudante = {...estudante, id: this.estudante?.id}
    this.service.alterar(estudante).subscribe((retorno) => {
      alert(`Estudante ${retorno.nome} alterado com sucesso!`);
      this.listarTodos();
      this.resetaForm()
    }, () => {
      alert(`Ocorreu um erro ao cadastrar o estudante!`);
    });
  }

  listarTodos() {
    this.service.listarTodos().subscribe((retorno) => {
      this.estudantes = retorno;
    }, () => {
      alert(`Ocorreu um erro ao consultar os estudantes!`);
    });
  }

  buscarPorNome() {
    this.service.buscarPorNome(this.montaEstudante()).subscribe((retorno) => {
      this.estudante = retorno;
    }, () => {
      alert(`Ocorreu um erro ao consultar os estudantes!`);
    });
  }

  removerEstudante(estudante: Estudante) {
    if(confirm('Deseja realmente excluir?')){
      this.service.deletar(estudante).subscribe(() => {
        alert(`Estudante excluido com sucesso!`);
        this.resetaForm();
        this.listarTodos();
      }, () => {
        alert(`Ocorreu um erro ao consultar os estudantes!`);
      });
    }
  }

  private montaEstudante() {
    const estudante: Estudante = {
      nome: this.formGroup.get('nome')?.value,
      email: this.formGroup.get('email')?.value,
      dataNascimento: this.formGroup.get('dataNascimento')?.value,
      areaInteresse: this.formGroup.get('areaInteresse')?.value,
    }
    return estudante;
  }
}
