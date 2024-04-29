import { Card, Button, Result } from "antd";
import Link from "next/link";

export default async function notfound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman yang kamu tuju tidak ditemukan."
      extra={<Link href={"/dashboard"}><Button type="primary">Kembali ke Beranda</Button></Link>}
    />
  );
}
