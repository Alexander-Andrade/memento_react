import {useCallback, useEffect} from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/en-gb';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'
import {Box} from "@chakra-ui/react";
import {useCalendarStore} from "../../store/Calendar";
import {useShallow} from "zustand/react/shallow";
import {calendarEventsMap} from "../../helpers/CalendarEventsMapper";


export const CalendarDetail = () => {
  const {
    events,
    fetchEvents,
  } = useCalendarStore(
    useShallow((state) => ({
      events: state.events,
      fetchEvents: state.fetch,
    }))
  );

  const onRangeChange = useCallback((range) => {
    let start, end;

    if(Array.isArray(range)) {
      start = range[0]
      end = range.slice(-1)[0]
    }
    else if (typeof range === 'object') {
      start = range.start
      end = range.end
    }
    fetchEvents(start.toISOString(), end.toISOString())
  }, [])

  useEffect(() => {
    const currentDate = new Date()

    const start = moment(currentDate).startOf('month').startOf('week').toDate().toISOString()
    const end = moment(currentDate).endOf('month').endOf('week').toDate().toISOString()

    fetchEvents(start, end)
  }, []);
  moment.locale('cs');
  const localizer = momentLocalizer(moment)
  // const myEventsList = [{ title: 'Lapka', start: moment().toDate(), end: moment().add(1, 'hour').toDate()}]
  return (
    <Box width={'40vw'}>
      <Calendar
        localizer={localizer}
        events={calendarEventsMap(events)}
        startAccessor="start"
        endAccessor="end"
        style={{height: '100vh'}}
        onRangeChange={onRangeChange}
        onSelectEvent={(event)=> console.log(event)}
      />
    </Box>
  );
}