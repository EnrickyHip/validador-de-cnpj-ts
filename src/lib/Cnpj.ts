export default class Cnpj {
  public static readonly regex = /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})$/;

  public static validateFormat(cnpj: string): boolean {
    return Cnpj.regex.test(cnpj);
  }

  public static cleanUp(cnpj: string): string {
    return cnpj.replace(/\D+/g, ""); //remove tudo que não é digito
  }

  public static format(cnpj: string) {
    const cleanCnpj = Cnpj.cleanUp(cnpj);
    if (cleanCnpj.length < 14) return null;
    return cleanCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"); //$1, $2, ... -> referem-se a cada parenteses do regex
  }

  public static validate(cnpj: string): boolean {
    const justNumbersRegex = /^\d{14}$/;
    if (!justNumbersRegex.test(cnpj) && !Cnpj.validateFormat(cnpj)) {
      return false;
    }

    const cleanCnpj = Cnpj.cleanUp(cnpj);
    if (cleanCnpj.length !== 14) return false;

    const parcialCnpj = cleanCnpj.slice(0, -2);
    const firstDigit = Cnpj.createDigit(parcialCnpj);
    const secondDigit = Cnpj.createDigit(parcialCnpj + firstDigit); // o + concatena o first digit no fim da string

    const newCnpj = parcialCnpj + firstDigit + secondDigit;
    return newCnpj === cleanCnpj;
  }

  private static createDigit(parcialCnpj: string): string {
    const cnpjArray = Array.from(parcialCnpj);

    let multiplicator = cnpjArray.length - 6;
    const cnpjMultiplicateArray = cnpjArray.map((number) => {
      multiplicator--;
      if (multiplicator === 1) multiplicator = 9;
      return Number(number) * multiplicator;
    });

    const total = cnpjMultiplicateArray.reduce((ac, value) => value + ac);
    let digit: number;
    if (total % 11 < 2) {
      digit = 0;
    } else {
      digit = 11 - (total % 11);
    }

    return String(digit);
  }
}
