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
}
