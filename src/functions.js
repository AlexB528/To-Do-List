import { compareAsc, format, addDays, parseISO } from 'date-fns';

// import { trashIconMaker } from './svgFunctions';

// moreIconMaker function makes the icon which, upon being clicked, shows more information and buttons for the associated project or task
function moreIconMaker (box) {
    let icon = document.createElement('div');
    let svgString = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\
              <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5M6.5,10.5A1.5,1.5 0 0,0 5,12A1.5,1.5 0 0,0 6.5,13.5A1.5,1.5 0 0,0 8,12A1.5,1.5 0 0,0 6.5,10.5M17.5,10.5A1.5,1.5 0 0,0 16,12A1.5,1.5 0 0,0 17.5,13.5A1.5,1.5 0 0,0 19,12A1.5,1.5 0 0,0 17.5,10.5Z" />\
            </svg>';
    icon.innerHTML = svgString;
    icon.classList.add('svgContainer');
    box.appendChild(icon);
    let iconSVG = icon.childNodes[0];
    iconSVG.value = 'notClicked';
    return iconSVG;
}

// trashIconMaker function makes the icon which, upon being clicked, deletes the associated project or tasks
function trashIconMaker (box) {
    let icon = document.createElement('div');
    let svgString = '<svg style="width:24px;height:24px" viewBox="0 0 24 24">\
        <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />\
        </svg>';
    icon.innerHTML = svgString;
    icon.classList.add('svgContainer');
    box.appendChild(icon);
    let iconSVG = icon.childNodes[0];
    iconSVG.value = 'notClicked';
    iconSVG.addEventListener('click',() => {
        if (iconSVG.value == 'notClicked') {
            let projectDescription = document.createElement('div');
            projectDescription.innerText = project.description;
            projectDescription.setAttribute('id','description')
            box.parentNode.appendChild(projectDescription);
            iconSVG.value = 'clicked';
        } else {
            let projectDescription = iconSVG.parentNode.parentNode.querySelector('#description');
            iconSVG.value = 'notClicked';
            iconSVG.parentNode.parentNode.removeChild(projectDescription);
        }
    });
    return iconSVG;
}

// plusIconMaker function makes the icon which, upon being clicked, creates a new project or task
function plusIconMaker (box,type) {
    let icon = document.createElement('div');
    let svgString;
    if (type == 'large') {
        svgString = '<svg style="width:200px;height:200px" viewBox="0 0 24 24">\
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />\
        </svg>'
    }
    if (type == 'small') {
        svgString = '<svg style="width:30px;height:30px" viewBox="0 0 24 24">\
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />\
        </svg>'
    }
    icon.innerHTML = svgString;
    icon.classList.add('smallPlusIcon');
    box.appendChild(icon);
    let iconSVG = icon.childNodes[0];
    iconSVG.value = 'notClicked';
    return iconSVG;
}

// inputCompletenessCheck is used so that projet or task is only completed if all inputs are entered
function inputCompletenessCheck (inputs) {
    let x =  Array.from(inputs);
    for (let i = 0; i < x.length; i++) {
        if (inputs[i].value == "") {
            return false;
        } 
        // else {
        //     return true;
        // }
    }
    return true;
}

export function toDoFactory (task,project,description,dueDate) {
    return {task,project,description,dueDate};
}

export function projectFactory (project,description,dueDate,array) {
    let index = array.length;
    let tasks = [];
    return {project,description,dueDate,tasks,index};
}

export function cardMaker (container,projects) {
    // Create card with plus icon which will allow user to create new projects
    let newCardContainer = document.createElement('div');
    newCardContainer.classList.add("projectCardContainer");
    newCardContainer.classList.add("firstCardContainer");
    let plusIcon = plusIconMaker(newCardContainer,'large');
    plusIcon.addEventListener('click',() => {
    plusIcon.remove();
    const formContainer = document.createElement('div');
    formContainer.innerHTML = '<div class="projectInputContainer">\
    <label for="project">Project:</label>\
    <input type="text" id="project"><br>\
    <label for="description">Description:</label>\
    <input type="text" id="description"><br>\
    <label for="dueDate">Due Date:</label>\
    <input type="date" id="dueDate" value="" min="2018-01-01" max="2100-12-31"><br>\
    <button id="submitButton">Submit</button>\
    </div>'
    newCardContainer.appendChild(formContainer);
    });
    container.appendChild(newCardContainer);

    // create form and then use submitted form to create a new project card
    let submitButton;
    plusIcon.addEventListener('click', () => {
        submitButton = document.querySelector("#submitButton")
        
        submitButton.addEventListener('click', function (e) {

            const projectInputContainer = document.querySelector('.projectInputContainer');
            const tasksInputContainer = document.querySelector('.tasksInputContainer');
        
            // Select the input elements within the projectInputContainer div
            const projectProject = projectInputContainer.querySelector("#project");
            const projectDescription = projectInputContainer.querySelector("#description");
            const projectDueDate = projectInputContainer.querySelector("#dueDate");
            const projectInputs = projectInputContainer.querySelectorAll("input");

                if (e.target.parentNode.classList == "projectInputContainer") {
                    if (inputCompletenessCheck(projectInputs)) {
                        projects.push(projectFactory(projectProject.value,projectDescription.value,projectDueDate.value,projects));
                        localStorage.setItem('projects', JSON.stringify(projects));
                        projectCardMaker(projects[projects.length - 1],projects,container);
                        let projectCardContainers = document.querySelectorAll('.projectCardContainer');
                        projectCardContainers.forEach(projectCardContainer => projectCardContainer.remove());
                        cardMaker(container,projects);
                    } else {
                        alert("All inputs must be entered to create a new project")
                    }
                }
        });
    });

    // display all projects
    for (let i = projects.length - 1; i >= 0; i--) {
        projectCardMaker(projects[i],projects,container);
    }
};

function projectCardMaker (project,projects,container) {
    let newCardContainer = document.createElement('div');
    newCardContainer.classList.add("projectCardContainer");
    newCardContainer.setAttribute("id", `${project.index}`);
    container.appendChild(newCardContainer);

    let projectDivContainer = document.createElement('div');
    projectDivContainer.setAttribute('id','projectDivContainer');
    newCardContainer.appendChild(projectDivContainer);

    let projectDiv = document.createElement('div');

    projectDiv.classList.add("projectDiv");
    projectDivContainer.appendChild(projectDiv);
        let projectTitle = document.createElement('div')
        projectTitle.innerText = project.project;
        projectTitle.classList.add('projectTitle')
        projectDiv.appendChild(projectTitle);

        let projectDueDate = document.createElement('div')
        projectDueDate.classList.add('projectDueDate');
        projectDueDate.innerText = `Due on: ${project.dueDate}`;
        projectDiv.appendChild(projectDueDate);

        let moreIconSVG = moreIconMaker(projectDiv);
        moreIconSVG.addEventListener('click',() => {
            if (moreIconSVG.value == 'notClicked') {
                let moreContainer = document.createElement('div');
                moreContainer.setAttribute('id','moreContainer');
                projectDivContainer.appendChild(moreContainer);
                let projectDescription = document.createElement('div');
                projectDescription.innerText = project.description;
                projectDescription.setAttribute('id','description')
                moreContainer.appendChild(projectDescription);
                moreIconSVG.value = 'clicked';
            } else {
                let moreContainer = moreIconSVG.parentNode.parentNode.parentNode.querySelector('#moreContainer');
                moreIconSVG.value = 'notClicked';
                moreIconSVG.parentNode.parentNode.parentNode.removeChild(moreContainer);
            }
        });

    let borderDiv = document.createElement('div');
    borderDiv.classList.add('borderDiv');


    newCardContainer.appendChild(borderDiv);

    tasksMaker(newCardContainer,project,projects);

    // let inputsArray = Array.from(inputs);
    // inputsArray.forEach(input => input.value = '');
}
export function taskFactory (task,project,description,dueDate) {
    return {task,project,description,dueDate};
}

function tasksMaker (newCardContainer,project,projects) {
    let tasksDiv = document.createElement('div');
    tasksDiv.classList.add("tasksDiv");
    // Make the first Div in the list of tasks the div with the plus icon that allows the user to add new tasks
    let taskAdderDiv = document.createElement('div');
    taskAdderDiv.setAttribute('id','taskDivContainer');
    let plusIcon = plusIconMaker(taskAdderDiv,'small');
    plusIcon.addEventListener('click',() => {
    plusIcon.remove();
    const formContainer = document.createElement('div');
    formContainer.innerHTML = '<div class="tasksInputContainer">\
    <label for="task">Task:</label>\
    <input type="text" id="task"><br>\
    <label for="description">Description:</label>\
    <input type="text" id="description"><br>\
    <label for="dueDate">Due Date:</label>\
    <input type="date" id="dueDate" value="" min="2018-01-01" max="2100-12-31"><br>\
    <button id="submitButton">Submit</button>\
    </div>'
    taskAdderDiv.appendChild(formContainer);
    });
    tasksDiv.appendChild(taskAdderDiv);

    // create form and then use submitted form to create a new project card
    let submitButton;
    plusIcon.addEventListener('click', () => {
        submitButton = document.querySelector("#submitButton")
            
        submitButton.addEventListener('click', function (e) {

            const tasksInputContainer = document.querySelector('.tasksInputContainer');

            //get index number for project in order to access project in projects array
            let index = Number(e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id);
            
            // Select the input elements within the tasksInputContainer div
            const taskTask = tasksInputContainer.querySelector("#task");
            const taskProject = projects[index].project;
            const taskDescription = tasksInputContainer.querySelector("#description");
            const taskDueDate = tasksInputContainer.querySelector("#dueDate");
            const taskInputs = tasksInputContainer.querySelectorAll("input");

                        if (inputCompletenessCheck(taskInputs)) {

                        
                        let task = taskFactory(taskTask.value,taskProject.value,taskDescription.value,taskDueDate.value)
                        taskCardMaker(tasksDiv,taskInputs,task);
                        projects[index].tasks.push(task);
            
                        localStorage.setItem('projects', JSON.stringify(projects));
                        tasksDiv.remove();
                        tasksMaker (newCardContainer,project,projects);
                    } else {
                        alert ("All inputs must be entered to create a new task")
                    }
            });
            
    });
    
    if (project.tasks.length !== 0)  {
        for (let i = 0; i < project.tasks.length; i++) {
            taskCardMaker (tasksDiv,'N/A',project.tasks[i])
            // let taskDiv = document.createElement('div');
            // taskDiv.innerText = project.tasks[i].task;
            // tasksDiv.appendChild(taskDiv);
        }
    }
    newCardContainer.appendChild(tasksDiv);
}


function taskCardMaker (tasksDiv,inputs,task) {
    const taskDivContainer = document.createElement('div');
    taskDivContainer.setAttribute('id','taskDivContainer');
    tasksDiv.appendChild(taskDivContainer);

    const taskDiv = document.createElement('div');
    taskDivContainer.appendChild(taskDiv);
        const taskTitle = document.createElement('div');
        taskTitle.innerText = `${task.task}`;
        taskDiv.appendChild(taskTitle);
        taskDiv.classList.add('taskDiv')
        let moreIconSVG = moreIconMaker(taskDiv);
        moreIconSVG.addEventListener('click',() => {
            if (moreIconSVG.value == 'notClicked') {
                let moreContainer = document.createElement('div');
                moreContainer.setAttribute('id','moreContainer');
                taskDivContainer.appendChild(moreContainer);
                let taskDescription = document.createElement('div');
                taskDescription.innerText = task.description;
                taskDescription.setAttribute('id','description');
                moreContainer.appendChild(taskDescription);
                moreIconSVG.value = 'clicked';
                let trashIcon = trashIconMaker(moreContainer);
                trashIcon.addEventListener('click', (e) => {
                    e.target.parentNode.parentNode.parentNode.parentNode.remove();


                });
            } else {
                let taskDescription = moreIconSVG.parentNode.parentNode.parentNode.querySelector('#moreContainer');
                moreIconSVG.value = 'notClicked';
                moreIconSVG.parentNode.parentNode.parentNode.removeChild(taskDescription);
            }
        })

    if (inputs == 'N/A') {
        return;
    } else {
        let inputsArray = Array.from(inputs);
        inputsArray.forEach(input => input.value = '');
    }

}

export function dayTasks (today,week,projects) {
    projects.forEach(project => project.tasks.forEach(task => {
        if (task.dueDate >= format(today,'y-M-dd') && task.dueDate <=  format(addDays(today, 6),'y-M-dd')) {
            let dayTask = document.createElement('li');
            dayTask.innerText = task.task;

            let dd = format(parseISO(task.dueDate), 'EEEEEE');
            week.querySelector(`#${dd}`).appendChild(dayTask);
        }
    }));
}



