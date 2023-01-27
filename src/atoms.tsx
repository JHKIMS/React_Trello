import { atom, selector } from "recoil";
import { NumberLiteralType } from "typescript";

export interface IToDo{
    id: number;
    text: string;
}

interface IToDoState{
    [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        doing:  [],
        done: [],
    },
})