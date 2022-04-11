import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {Estudante} from "./model/estudante-model";
import {EstudanteService} from "./service/estudante-service";
import {CustomValidators} from "./shared/CustomValidators";
import {formatDate} from "@angular/common";
import packageJson from '../../package.json';
import {InfraService} from "./service/infra-service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  versionFront: String = packageJson.version;
  versionBack: String = "";
  colunas: string[] = ['id', 'nome', 'cpf', 'email', 'dataNascimento', 'areaInteresse', 'editar', 'deletar'];
  isAlteracao = false;
  formGroup: FormGroup;
  estudantes: Estudante[] = [];
  private estudante?: Estudante;

  @ViewChild(FormGroupDirective) formGroupDirective?: FormGroupDirective;

  constructor(private fb: FormBuilder,
              @Inject( LOCALE_ID ) private locale: string,
              private _estudanteService: EstudanteService,
              private _infraService: InfraService,
              private _snackBar: MatSnackBar) {
    this.formGroup = this.getFormGroup();
    this.resetaForm();
  }


  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  ngOnInit(): void {
    this._infraService.buscaVersao().subscribe((retorno) => {
      this.versionBack = retorno.versao;
    })
    this.listarTodos();
  }

  resetaForm() {
    this.isAlteracao = false;
    setTimeout(() =>
      this.formGroupDirective?.resetForm(), 0)
  }

  private getFormGroup() {
    return this.fb.group({
      nome: [null, Validators.required],
      cpf: [null, [Validators.required, CustomValidators.validateCPF]],
      email: [null, [Validators.required, Validators.email]],
      dataNascimento: [null, [Validators.required, CustomValidators.validateDate]],
      areaInteresse: [null, Validators.required]
    });
  }

  cadastrar() {
    this._estudanteService.cadastrar(this.montaEstudante()).subscribe((retorno) => {
      this.openSnackBar(`Estudante ${retorno.nome} cadastrado com sucesso!`);
      this.resetaForm();
      this.listarTodos();
    }, () => {
      this.openSnackBar(`Ocorreu um erro ao cadastrar o estudante!`);
    });
  }

  prepararEdicao(estudante: Estudante) {
    this.isAlteracao = true;
    this.formGroup.get('nome')?.setValue(estudante.nome);
    this.formGroup.get('cpf')?.setValue(estudante.cpf);
    this.formGroup.get('email')?.setValue(estudante.email);
    this.formGroup.get('dataNascimento')?.setValue(formatDate(estudante.dataNascimento, 'yyyy-MM-dd', this.locale, '+0000'));
    this.formGroup.get('areaInteresse')?.setValue(estudante.areaInteresse);
    this.estudante = estudante;
  }

  editar() {
    let estudante = this.montaEstudante();
    estudante = {...estudante, id: this.estudante?.id}
    this._estudanteService.alterar(estudante).subscribe((retorno) => {
      this.openSnackBar(`Estudante ${retorno.nome} alterado com sucesso!`);
      this.listarTodos();
      this.resetaForm()
    }, () => {
      this.openSnackBar(`Ocorreu um erro ao cadastrar o estudante!`);
    });
  }

  listarTodos() {
    this._estudanteService.listarTodos().subscribe((retorno) => {
      this.estudantes = retorno;
    }, () => {
      this.openSnackBar(`Ocorreu um erro ao consultar os estudantes!`);
    });
  }

  buscarPorNome() {
    this._estudanteService.buscarPorNome(this.montaEstudante()).subscribe((retorno) => {
      this.estudante = retorno;
    }, () => {
      this.openSnackBar(`Ocorreu um erro ao consultar os estudantes!`);
    });
  }

  removerEstudante(estudante: Estudante) {
    if(confirm('Deseja realmente excluir?')){
      this._estudanteService.deletar(estudante).subscribe(() => {
        this.openSnackBar(`Estudante excluido com sucesso!`);
        this.resetaForm();
        this.listarTodos();
      }, () => {
        this.openSnackBar(`Ocorreu um erro ao consultar os estudantes!`);
      });
    }
  }

  private montaEstudante() {
    const estudante: Estudante = {
      nome: this.formGroup.get('nome')?.value,
      cpf: this.formGroup.get('cpf')?.value,
      email: this.formGroup.get('email')?.value,
      dataNascimento: this.formGroup.get('dataNascimento')?.value,
      areaInteresse: this.formGroup.get('areaInteresse')?.value,
    }
    return estudante;
  }
}
