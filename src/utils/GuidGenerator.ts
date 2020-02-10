export class GuidGenerator {
  private static LETTER_RUNES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  static generate(prefix: string, length: number): string {
    const randomCharacters = length - prefix.length - 1;
    if (randomCharacters <= 0) {
      return prefix;
    }
    return prefix + '_' + this.getRandomString(randomCharacters);
  }

  private static getRandomString(length: number): string {
    let str = '';
    for (let i = 0; i < length; i++) {
      str += this.LETTER_RUNES[Math.floor((Math.random() * this.LETTER_RUNES.length))];
    }
    return str;
  }
}
