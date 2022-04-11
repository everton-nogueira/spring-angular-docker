import {FormControl} from "@angular/forms";

export class CustomValidators {
  static validateDate(control: FormControl) {
    const hoje = new Date();
    const nasc  = new Date(control.value);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())){
      idade--;
    }
    if(idade < 15 || idade > 90){
      return {erro: 'Pessoas menores de 15 não podem se cadastrar.'};
    }
    return null;
  }

  static validateCPF(control: FormControl) {
    return null;
  }
}
