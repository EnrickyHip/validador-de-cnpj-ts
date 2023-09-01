import { random } from "./utils/random";

export default class Cnpj {
  public static readonly regex = /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})$/;

  /**
   * Checa se o formato enviado corresponde com o formato tradicional de CNPJ's: 99.999.999/0001-99
   * @param cnpj CNPJ a ser checado.
   * @returns `true` se o formato corresponder ou `false` caso não.
   */
  public static validateFormat(cnpj: string): boolean {
    return Cnpj.regex.test(cnpj);
  }

  /**
   * Remove todo tipo de caractere que não seja um dígito.
   * @param cnpj Cnpj a ser limpado.
   * @returns O CNPJ com apenas dígitos.
   *
   * @example
   *
   * const CNPJLimpo = Cnpj.cleanUp('36.865.382/0001-63');
   * console.log(CNPJLimpo);
   * //output: 36865382000163
   */

  public static cleanUp(cnpj: string): string {
    return cnpj.replace(/\D+/g, ""); //remove tudo que não é digito
  }

  /**
   * Formata um CNPJ no formato: 99.999.999/0001-99.
   * @param cnpj CNPJ a ser formatado. Esse parâmetro é extremamente livre, pois a função filtra tudo que não for dígito.
   * @returns O CNPJ formatado. Caso não seja possível formatar o cnpj por não possuir a quantidade necessária de caracteres, o retorno será `null`
   * @example
   *
   * const cnpjFormatado = Cnpj.format('36865382000163');
   * console.log(cnpjFormatado);
   * //output: 36.865.382/0001-63
   *
   * const cnpjFormatado = Cnpj.format('368.65382000163');
   * console.log(cnpjFormatado);
   * //output: 36.865.382/0001-63
   *
   * const cnpjFormatado = Cnpj.format('36-865-382-0001-63');
   * console.log(cnpjFormatado);
   * //output: 36.865.382/0001-63
   *
   * const cnpjFormatado = Cnpj.format('289 asasa88a   43w2sassa7.56as002');
   * console.log(cnpjFormatado);
   * //output: 28.988.432/7560-02
   */
  public static format(cnpj: string): string | null {
    const cleanCnpj = Cnpj.cleanUp(cnpj);
    if (cleanCnpj.length < 14) return null;
    return cleanCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"); //$1, $2, ... -> referem-se a cada parenteses do regex
  }

  /**
   * Checa validade de um CNPJ.
   * @param cnpj Cnpj a ser validado. O CNPJ obrigatoriamente precisa estar no formato: 12.123.123/0001-12 ou 12123123000112. Mesmo que os dígitos sejam válidos, caso a string não esteja nesses formatos, o retorno será falso.
   * @returns `true` se o CNPJ for válido ou `false` caso não seja.
   */
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

  /**
   * Gera um CNPJ válido aleatório.
   * @returns O cnpj no formato: 99.999.999/0001-99.
   */
  public static generate(): string {
    let cnpjString = "";
    for (let index = 0; index < 8; index++) {
      const randomNumber = random(0, 9);
      cnpjString += randomNumber.toString();
    }

    const cnpj = cnpjString.toString() + "0001";
    const firstDigit = Cnpj.createDigit(cnpj);
    const secondDigit = Cnpj.createDigit(cnpj + firstDigit); // o + concatena o first digit no fim da string
    return Cnpj.format(cnpj + firstDigit + secondDigit) as string;
  }

  private static createDigit(parcialCnpj: string): string {
    const cnpjArray = Array.from(parcialCnpj);

    let total = 0;
    let multiplier = cnpjArray.length - 6;

    for (const digit of cnpjArray) {
      multiplier--;
      if (multiplier === 1) multiplier = 9;
      total += Number(digit) * multiplier;
    }

    let digit = 11 - (total % 11);
    if (digit > 9) digit = 0;
    return String(digit);
  }
}
