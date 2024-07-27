import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: string): string {
    if (displayFormat === 'DD/MM/YYYY') {
      // Personalizza il formato della data come "DD/MM/YYYY"
      return `${this.padTo2Digits(date.getDate())}/${this.padTo2Digits(date.getMonth() + 1)}/${date.getFullYear()}`;
    } else {
      // Usa il formato predefinito per altre visualizzazioni
      return super.format(date, displayFormat);
    }
  }

  private padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
