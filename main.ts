//gonna make a simple to do list app for node.js
import {Tasks} from './classes-interfaces/TaskInterface';
import {TaskList} from "./classes-interfaces/TaskList";

let sessionList: TaskList = new TaskList;

function createTask(taskName: string,taskDate?: string): Tasks{
    return {
        name: taskName,
        id: sessionList.getNewID(),
        complete: false,
        date: taskDate
    }
}

// sessionList.addTask(createTask(prompt("What is your first task? Please note that Oops cannot be a task name.")));

function nextInvoke():void{
    let userInput: string = prompt("What would you like to do next? Type ADDTASK to add a task, REMOVETASK to remove one, COMPLETE to complete a task, and CHECK to check a task").toUpperCase();
    if (userInput === "ADDTASK"){
        let newTaskName: string = prompt("What is the name of the task? Or Type OOPS to go back. Please note that OOPS cannot be a task name.");
        if (newTaskName === "OOPS"){
            nextInvoke();
        }
        else{
            sessionList.addTask(createTask(newTaskName));
            nextInvoke();
        }
    }
    else if(userInput === "REMOVETASK"){
        alert(sessionList.sayTasks());
        let deleteTask: string = prompt("Type the ID of the task you want to remove, or type OOPS to go back");
        if (deleteTask === "OOPS"){
            nextInvoke();
        }
        else{
            let goOn: boolean = Number(deleteTask)? true: false;
            if (goOn){
                let deleteTaskID: number = Number(deleteTask);
            }
            else{
                alert("You did not type a number");
                nextInvoke();
            }
        }
    }
}
