export default class Cnpj {
  public static readonly regex = /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})$/;

  public static validateFormat(cnpj: string): boolean {
    return Cnpj.regex.test(cnpj);
  }
}
