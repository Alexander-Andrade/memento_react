import moment from "moment/moment";

export const calendarEventsMap = (events) => {
  return events.map((event) => ({
    id: event.id,
    entry_id: event.entry_id,
    title: event.description,
    start: new Date(event.starts_at),
    end: moment(event.starts_at).add(1, 'hour').toDate()
  }));
}
