import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function FormatDate(timeStamps: string | undefined): string {
  if (typeof timeStamps === 'undefined') return 'Invalid';
  // Giriş tarihini oluştur
  const girisTarihi = new Date(timeStamps);

  // 3 saat ekleyerek yeni tarihi oluştur
  const yeniTarih = new Date(girisTarihi.getTime() + 3 * 60 * 60 * 1000);

  // Tarih ve saat bilgisini düzenli bir formatta al
  const gun = yeniTarih.getDate();
  const ay = yeniTarih.getMonth() + 1; // Ay indeksi 0'dan başlar
  const yil = yeniTarih.getFullYear();
  const saat = yeniTarih.getUTCHours(); // UTC saat bilgisini al
  const dakika = yeniTarih.getUTCMinutes();

  // Düzenli formatta tarih ve saat bilgisini oluştur
  const formatliTarih = `${gun} ${ayAdi(ay)} ${yil} ${
    saat < 10 ? '0' : ''
  }${saat}:${dakika < 10 ? '0' : ''}${dakika}`;

  return formatliTarih;
}

// Ay indeksini alıp, adını döndüren yardımcı bir fonksiyon
function ayAdi(ayIndeks: number): string {
  const aylar = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];
  return aylar[ayIndeks - 1];
}

export function formatTarih(tarihDegeri: string): Date | null {
  try {
    // Verilen tarih değerini ayrıştır
    const tarih = new Date(tarihDegeri);

    // Tarih değeri geçerli değilse null döndür
    if (isNaN(tarih.getTime())) {
      throw new Error('Geçersiz tarih formatı');
    }

    // Tarihi istenen formata çevir
    const formattedTarih = `${tarih.getFullYear()}-${padZero(
      tarih.getMonth() + 1
    )}-${padZero(tarih.getDate())} ${padZero(tarih.getHours())}:${padZero(
      tarih.getMinutes()
    )}:${padZero(tarih.getSeconds())}.${tarih.getMilliseconds()}`;

    return new Date(formattedTarih);
  } catch (error) {
    console.error('Hata:', error);
    return null;
  }
}

// Sayıyı iki haneli bir dizeye çeviren yardımcı fonksiyon
function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

export function formatDateTime(inputDate: Date | undefined): string {
  if (typeof inputDate === 'undefined') return 'Invalid';
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');
  const seconds = String(inputDate.getSeconds()).padStart(2, '0');
  const milliseconds = String(inputDate.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
