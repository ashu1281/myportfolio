import dayjs from 'dayjs';
import { useState } from 'react';
import CalendarFilter from './CalendarFilter';

const ShowcaseCalendar = () => {
  const [date, setDate] = useState({
    start: dayjs().format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD'),
    type: 'week',
  });

  return (
    <CalendarFilter
      selectedDate={date}
      onApply={(params) => setDate(params)}
    />
  );
};

export default ShowcaseCalendar;
