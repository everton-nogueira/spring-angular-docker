import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if (!value) {
      return '';
    }
    let identificacao = value.replace(/[^0-9]/g, '');
    if (identificacao.length < 11) {
      identificacao = identificacao.padStart(11, '0');
    } else {
      if (identificacao.length > 11 && identificacao.length < 14) {
        identificacao = identificacao.padStart(14, '0');
      }
    }

    if (identificacao.length === 11) {
      return identificacao.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    } else if (identificacao.length === 14) {
      return identificacao.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
    }
    return value;
  }

}
