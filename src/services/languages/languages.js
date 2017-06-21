import languages from 'languages';

const languagesData = languages.getAllLanguageCode().map(
  langCode => Object.assign({}, { code: langCode }, languages.getLanguageInfo(langCode))
);

class Languages {
  getLike(value) {
    if (typeof value !== 'string' || value.length < 1) {
      return [];
    }

    return languagesData.filter((language) => {
      if (
        typeof language.name !== 'string'
        || typeof language.nativeName !== 'string'
      ) {
        return false;
      }

      if (
        this.isLike(value, language.name)
        || this.isLike(value, language.nativeName)
      ) {
        return true;
      }

      return false;
    });
  }

  isLike(value, fullString) {
    return fullString.toLowerCase().indexOf(value.toLowerCase()) === 0;
  }
}

export default new Languages();
