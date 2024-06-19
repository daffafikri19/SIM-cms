import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, formatISO } from 'date-fns';

interface DefaultDates {
  startDate: string;
  endDate: string;
}

export const useDefaultDates = (): DefaultDates => {
  const [dates, setDates] = useState<DefaultDates>({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const today = new Date();
    const startDate = formatISO(startOfMonth(today), { representation: 'date' });
    const endDate = formatISO(endOfMonth(today), { representation: 'date' });

    setDates({ startDate, endDate });
  }, []);

  return dates;
};
