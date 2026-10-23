export class SecurityHelper {
  static sanitizeMessage(text: string): string {
    let sanitized = text;

    // 1. Telefon Numaraları (Türkiye formatı ve genel 10+ haneli sayılar)
    const phoneRegex = /(?:\+?90|0)?\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}/gm;
    sanitized = sanitized.replace(phoneRegex, '[NUMARA SANSÜRLENDİ]');

    // Herhangi bir yerdeki 10 haneli ardışık sayı dizisi
    const longDigitRegex = /\d{10,}/gm;
    sanitized = sanitized.replace(longDigitRegex, '[NUMARA SANSÜRLENDİ]');

    // 2. Sosyal Medya Platformları ve Anahtar Kelimeler
    const platformKeywords = [
      'instagram', 'insta', 'ig', 'telegram', 'tg', 'whatsapp', 'wp',
      'numaram', 'telefon', 'tel', 'iletişim'
    ];

    for (const keyword of platformKeywords) {
      const pattern = new RegExp(`${keyword}[:\\s]*[\\w\\d._]+`, 'gim');
      sanitized = sanitized.replace(pattern, '[BİLGİ SANSÜRLENDİ]');
    }

    // 3. Kullanıcı Adları (@username)
    const mentionRegex = /@[\w\d._]+/gm;
    sanitized = sanitized.replace(mentionRegex, '[KULLANICI ADI SANSÜRLENDİ]');

    return sanitized;
  }
}
