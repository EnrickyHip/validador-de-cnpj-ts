import Cnpj from "./Cnpj";

describe("Cnpj", () => {
  describe("validateFormat", () => {
    it("should validate the format", () => {
      expect(Cnpj.validateFormat("00.000.000/0000-00")).toBe(true);
      expect(Cnpj.validateFormat("11.111.111/1111-11")).toBe(true);
    });

    it("should not validate the format", () => {
      expect(Cnpj.validateFormat("00.000.000.0001-00")).toBe(false);
      expect(Cnpj.validateFormat("11.111/111/1111-11")).toBe(false);
      expect(Cnpj.validateFormat("11.111.1111111-11")).toBe(false);
      expect(Cnpj.validateFormat("11/111.11/1111-11")).toBe(false);
      expect(Cnpj.validateFormat("11.111.111/111-11")).toBe(false);
      expect(Cnpj.validateFormat("11.111.11111-11")).toBe(false);
      expect(Cnpj.validateFormat("79837988000106")).toBe(false);
      expect(Cnpj.validateFormat("111.111.111/1111-11")).toBe(false);
      expect(Cnpj.validateFormat("11-1sa111-11a11")).toBe(false);
      expect(Cnpj.validateFormat("111.111.111-11")).toBe(false);
    });
  });
});
