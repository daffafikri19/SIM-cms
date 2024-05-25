export function formatRupiah(nominal: number): string {
  try {
    let nominalStr: string = nominal.toString().split("").reverse().join("");
    let nominalFormatted: string =
      nominalStr.match(/\d{1,3}/g)?.join(".") || "";
    return "Rp. " + nominalFormatted.split("").reverse().join("");
  } catch (error) {
    throw new Error("Terjadi kesalahan format nominal");
  }
}

export const formatDigitRupiah = (value: number): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export function formatDateTimeString(dateString: string) {
  const [datePart, timePart] = dateString.split("T");
  const [time, _] = timePart.split(".");

  const [year, month, day] = datePart.split("-");
  const [hour, minute, second] = time.split(":");

  const formattedDateTime = `${year}-${month}-${day}, ${hour}:${minute}:${second}`;

  return formattedDateTime;
}

export const formatDateLaporan = (tanggal : Date) => {
  if (!tanggal) return null;

  const dateObj = new Date(tanggal);

  // Konversi dari UTC ke lokal Jakarta (WIB, UTC+7)
  const offset = 7 * 60 * 60 * 1000; // Offset dalam milidetik untuk UTC+7
  const localDate = new Date(dateObj.getTime() + offset);

  // Format tanggal sesuai dengan lokal Indonesia
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const dayIndex = localDate.getDay();
  const day = days[dayIndex];
  const date = localDate.getDate();
  const month = months[localDate.getMonth()];
  const year = localDate.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

export const transformDataToArray = (data: any) => {
  return Object.keys(data).map((key, index) => ({
    id: index + 1,
    product_name: key,
    ...data[key],
  }));
};
