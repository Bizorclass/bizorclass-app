import { Component, ViewEncapsulation } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'calender-demo',
  templateUrl: './calender-demo.component.html',
  styles: [
    `
      .fc { /* the calendar root */
        max-width: 1100px;
        margin: 0 auto;
      }
      .fc-col-header, .fc-daygrid-body, .fc-scrollgrid-sync-table {
       width: 100% !important;
      }
      .fc-header-toolbar {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalenderDemoComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin],
    dateClick: (e) => this.handleDateClick(e),
    events: [
      { title: 'event 1', date: '2023-03-01' },
      { title: 'event 2', date: '2023-03-02' },
      {
        start: '2023-03-10',
        // end: '2023-03-11T12:30:00',
        title: 'Booked',
        display: 'background',
        color: '#fa8072',
        overlap: true,
      }
    ],
    height: 'auto',

  };

  handleDateClick(arg) {
    console.log('arg => ', arg)
    console.log('date click => ' + arg.dateStr)
    // arg.dayEl.s
  }

  constructor() {
    // this.calendarOptions.events = [
    //   {
    //     start: '2023-3-10',
    //     end: '2023-3-11',
    //     display: 'background'
    //   }
    // ]

  }







  getDatesInRange(startDate: Date, endDate: Date) {
    const date = new Date(startDate.getTime());

    date.setDate(date.getDate());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }

}
