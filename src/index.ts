import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import type { Event} from './types'

window.Webflow ||= [];
window.Webflow.push(() => {
  const calendarElement=document.querySelector<HTMLDivElement>('[data-element="calendar"]')
  if(!calendarElement) return;

  const events = getEvent();
  console.log({events});
  
  const calendar = new Calendar(calendarElement, {
    plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth,listWeek'
    },
    events,
  });
  calendar.render();  
});


const getEvent = (): Event[] => {
  const scripts = document.querySelectorAll<HTMLScriptElement>('[data-element="event-data"]');
  console.log({scripts});

  const events = [...scripts].map((script)=> {
    const event: Event = JSON.parse(script.textContent!);
    event.start=new Date(event.start);
    event.end=new Date(event.end);

    return event ;
  });
  

  return events;
};