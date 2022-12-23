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

  describe("cleanUp", () => {
    it("should clean up cnpj", () => {
      expect(Cnpj.cleanUp("27.103.239/0001-56")).toBe("27103239000156");
      expect(Cnpj.cleanUp("649.98136054123")).toBe("64998136054123");
      expect(Cnpj.cleanUp("65-280-961-0001-43")).toBe("65280961000143");
      expect(Cnpj.cleanUp("289 asasa88a  43w2sassa7.56as002")).toBe("28988432756002");
    });
  });

  describe("format", () => {
    it("should format cnpj", () => {
      expect(Cnpj.format("27303239456634")).toBe("27.303.239/4566-34");
      expect(Cnpj.format("649.98136054354")).toBe("64.998.136/0543-54");
      expect(Cnpj.format("65-280-961-0001-43")).toBe("65.280.961/0001-43");
      expect(Cnpj.format("289 asasa88a   43w2sassa7.56as002")).toBe("28.988.432/7560-02");
    });

    it("should return null if is not possible to format", () => {
      expect(Cnpj.format("965563860012")).toBeNull();
      expect(Cnpj.format("aaaa")).toBeNull();
      expect(Cnpj.format("23.547.298/6663-4")).toBeNull();
      expect(Cnpj.format("aa.aaa.aaa/aaaa-aa")).toBeNull();
    });
  });

  describe("validate", () => {
    it("should validate cnpj", () => {
      expect(Cnpj.validate("11.362.185/0001-09")).toBe(true);
      expect(Cnpj.validate("54.652.513/0001-06")).toBe(true);
      expect(Cnpj.validate("86.533.637/0001-69")).toBe(true);
      expect(Cnpj.validate("83.104.215/0001-80")).toBe(true);
      expect(Cnpj.validate("50.243.835/0001-40")).toBe(true);
      expect(Cnpj.validate("08116547000169")).toBe(true);
      expect(Cnpj.validate("71751613000109")).toBe(true);
      expect(Cnpj.validate("93852397000120")).toBe(true);
      expect(Cnpj.validate("11223946000133")).toBe(true);
    });

    it("should not validate cnpj", () => {
      expect(Cnpj.validate("11.362.185/1001-09")).toBe(false);
      expect(Cnpj.validate("54.652.113/0001-06")).toBe(false);
      expect(Cnpj.validate("86.533.237/0001-69")).toBe(false);
      expect(Cnpj.validate("83.404.215/0001-80")).toBe(false);
      expect(Cnpj.validate("50.223.835/0001-40")).toBe(false);
      expect(Cnpj.validate("08116547110169")).toBe(false);
      expect(Cnpj.validate("71757613000109")).toBe(false);
      expect(Cnpj.validate("aaaa")).toBe(false);
      expect(Cnpj.validate("asd2 234 23")).toBe(false);
    });
  });
});
