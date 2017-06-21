import languages from './languages';

describe('languages service', () => {
  describe('getLike', () => {
    it('should be able to find data of a valid language', () => {
      expect(languages.getLike('poli').length).toBeGreaterThan(0);
      expect(languages.getLike('ENGLISH').length).toBeGreaterThan(0);
      expect(languages.getLike('eng').length).toBeGreaterThan(0);
      expect(languages.getLike('De').length).toBeGreaterThan(0);
      expect(languages.getLike('').length).toBe(0);
      expect(languages.getLike(null).length).toBe(0);
      expect(languages.getLike('231').length).toBe(0);
      expect(languages.getLike(123).length).toBe(0);
      expect(languages.getLike('ac').length).toBe(0);
    });
  });
});
