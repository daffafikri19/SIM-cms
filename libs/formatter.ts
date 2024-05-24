import { id } from "date-fns/locale";
import { format } from "date-fns";

export function formatRupiah(nominal: number): string {
  try {
    // Ubah nominal menjadi string dan balik urutan karakternya
    let nominalStr: string = nominal.toString().split("").reverse().join("");
    // Pisahkan setiap tiga digit dengan titik
    let nominalFormatted: string =
      nominalStr.match(/\d{1,3}/g)?.join(".") || "";
    // Balik kembali urutan karakternya dan tambahkan 'Rp. ' di depan
    return "Rp. " + nominalFormatted.split("").reverse().join("");
  } catch (error) {
    throw new Error("Terjadi kesalahan format nominal");
  }
}

export function formatDateTimeString(dateString: string) {
  // Bagi tanggal dan waktu dari string
  const [datePart, timePart] = dateString.split("T");
  const [time, _] = timePart.split(".");

  // Ambil nilai-nilai tanggal, bulan, tahun, jam, menit, dan detik
  const [year, month, day] = datePart.split("-");
  const [hour, minute, second] = time.split(":");

  // Format string tanggal dan waktu sesuai format yang diinginkan
  const formattedDateTime = `${year}-${month}-${day}, ${hour}:${minute}:${second}`;

  return formattedDateTime;
}

export const formatDateLaporan = (tanggal : Date) => {
  return format(tanggal, "EEEE, dd MMMM yyyy", { locale: id });
};

export const transformDataToArray = (data : any) => {
  return Object.keys(data).map((key, index) => ({
    id: index + 1,
    product_name: key,
    ...data[key],
  }));
};