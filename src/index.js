// import toDoFactory from './functions.js';
import { projectFactory, taskFactory, dayTasks, cardMaker } from './functions.js';
import { compareAsc, format, addDays } from 'date-fns';
import { storageAvailable } from './webStorage.js';

import './style.css';

const container = document.querySelector('#container');

let today = new Date ();
console.log(today);

// Give id to each dayContent div so that it can be tasks with matching date can be entered
const dayContentDivs = document.querySelectorAll('.dayContent');
for (let i = 0; i < 7; i++) {
    dayContentDivs[i].setAttribute('id',`${format(addDays(today,i),'EEEEEE')}`);
}

function setProjects () {
    if (!localStorage.getItem('projects')) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('projects'));
    }
}

let projects = setProjects();

//Detects whether localStorage is both supported and available
if (storageAvailable('localStorage')) {
    console.log('Yippee! We can use localStorage awesomeness');
  }
  else {
    console.log('Too bad, no localStorage for us');
  }

const calendarDayTitle = document.querySelectorAll('.dayTitle');
const calendarDayContent = document.querySelectorAll('.dayContent');
const week = document.querySelector('.week');

for (let i = 0; i < 7; i++) {
    let dOW = format(addDays(today,i),'y-M-dd');
    calendarDayTitle[i].innerText = format(addDays(today,i),'PP');
    calendarDayContent[i].classList.add(`${dOW}`);
}

dayTasks(today,week,projects);

// so I can find this line
cardMaker(container,projects);




