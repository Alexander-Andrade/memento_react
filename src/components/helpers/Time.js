import moment from "moment/moment";

export const formatDateTime = (created_at) => {
    const moment_date = moment(created_at)
    const currentYear = moment().year();

    if(moment_date.year() === currentYear) {
      return moment_date.format('MMM D [at] HH:mm');
    } else {
      return moment_date.format('MMM DD, YYYY');
    }
}
