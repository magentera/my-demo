import { Subject } from "rxjs/Rx";
import { TodoItem } from "./types";

export const FruitSubject = new Subject<string>();
export const TodoSubject = new Subject<TodoItem>();
