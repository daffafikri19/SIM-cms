import { Result } from "antd";

export default async function notfound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman yang kamu tuju tidak ditemukan."
    />
  );
}
