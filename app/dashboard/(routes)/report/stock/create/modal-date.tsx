"use client";
import { Button, DatePicker, Modal, Typography } from "antd";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState, useTransition } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { format } from "date-fns";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCurrentDate } from "@/store/use-date";
dayjs.extend(customParseFormat);

type props = {
  session: {
    name: string;
    shift: string;
  };
};

const dateFormat = "YYYY-MM-DD";

export const ModalDate = ({ session }: props) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [pending, startTransition] = useTransition();
  const { currentDate, setCurrentDate } = useCurrentDate();

  const onChange: DatePickerProps<Dayjs>["onChange"] = (date, dateString) => {
    if (date) {
      setCurrentDate(new Date(date.format(dateString as string)));
    }
  };

  useEffect(() => {
    if (openModal && !currentDate) {
      const defaultDate = new Date(Date.now());
      setCurrentDate(defaultDate);
    }
  }, [openModal, currentDate, setCurrentDate]);

  const handleOk = () => {
    if (!currentDate) {
      return;
    } else {
      startTransition(() => {
        router.push("/dashboard/report/stock/create");
      });
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpenModal(true)}
      >
        Buat Laporan
      </Button>
      <Modal
        open={openModal}
        title="Konfirmasi pembuatan laporan"
        onCancel={() => setOpenModal(false)}
        onOk={handleOk}
        confirmLoading={pending}
        cancelText="Batal"
        okText="Lanjutkan"
      >
        <Typography>Apakah tanggal laporan sudah sesuai ? </Typography>
        <DatePicker
          className="!w-full"
          mode="date"
          placeholder="sesuaikan tanggal"
          defaultValue={dayjs(
            format(new Date(Date.now()), "yyyy-MM-dd"),
            dateFormat
          )}
          onChange={onChange}
        />
        <div className="mt-5">
          <Typography>Pembuat : {session.name}</Typography>
          <Typography>Laporan : {session.shift}</Typography>
        </div>
      </Modal>
    </div>
  );
};
