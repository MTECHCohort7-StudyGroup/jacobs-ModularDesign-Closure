import {Tasks} from "./TaskInterface";
import {searchResult} from "./searchResultInterface";

export class TaskList{
    private theList: Tasks[];
    public newID: number;
    constructor(){
        this.theList = [];
        this.newID = 0;
    }
    addTask(aTask: Tasks): void{
        let repeat: boolean = false;
        for (let i = 0; i < this.theList.length; i++){
            if (this.theList[i].name === aTask.name){
                repeat = true;
            }
        }
        if(!repeat){
            this.theList.push(aTask);
        }
        this.sortTasks();
    }
    searchTask(taskID: number): searchResult{
        //initial check
        let lowBound: number = 0;
        let midPoint: number =Math.floor(this.theList.length/2);
        let highPoint: number = this.theList.length-1;
        let newMid: number;
        if(this.theList[0].id === taskID){
            return {result: this.theList[0], index: 0};
        }
        else{
            //loop to keep halving
            let done: boolean = false;
            while(!done){
                //check if midpoint is search
                if(this.theList[midPoint].id=== taskID){
                    done = true;
                    return {result: this.theList[midPoint], index: midPoint};
                }
                else{
                    //checks after midpoint
                    if(this.theList[midPoint].id > taskID){
                        lowBound = midPoint;
                        newMid = midPoint + Math.floor((highPoint-midPoint)/2);
                        if(newMid === midPoint){
                            done = true;
                            return null;
                        }
                        else{
                            midPoint = newMid;
                        }
                    }
                    //checks before midpoint
                    else if(this.theList[midPoint].id < taskID){
                        highPoint = midPoint;
                        newMid = Math.floor((midPoint - lowBound)/2);
                        if(newMid === midPoint){
                            done = true;
                            return null;
                        }
                        else{
                            midPoint = newMid;
                        }
                    }
                }
            }
        }
    }
    removeTask(taskID: number): Tasks{
        let search: searchResult = this.searchTask(taskID);
        if (search !== null){
            this.theList.splice(search.index,1);
            return search.result;
        }
    }
    sortTasks():void{
        //loop to find lowest
        for(let y = 0; y < this.theList.length-1; y++) {
            let lowest: number = this.theList[y].id;
            let temp: Tasks;
            let initial: number;
            let newPlace: number = y;
            //loop to switch
            for (let i = y; i < this.theList.length; i++) {
                if (this.theList[i].id < lowest) {
                    initial = i;
                    temp = this.theList[i];
                }
            }
            if(initial !== undefined){
                this.theList[initial] = this.theList[newPlace];
                this.theList[newPlace] = temp;
            }
        }
    }
    getNewID(): number{
        this.newID = this.theList[this.theList.length-1].id +1;
        return this.newID;
    }
    sayTasks(): string{
        let result: string = "";
        for (let i = 0; i < this.theList.length; i++){
            result += `${this.theList[i].name} is ${this.theList[i].complete ? "complete": "not complete"} and the ID is: ${this.theList[i].id},`;
        }
        return result;
    }
    completeTask(taskID: number, index: number): void{
        this.theList[index].complete = !this.theList[index].complete;
    }
}

