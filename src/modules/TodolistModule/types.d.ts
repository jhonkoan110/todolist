import { addTodo, deleteTodo } from './actionCreators';
import { TodosActionTypes } from './reducer';

export type Priority = 'high' | 'med' | 'low' | undefined;

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
    isEdit?: boolean;
    priotity: Priority;
    tag: string;
}

interface TodosState {
    todos: ITodo[];
    filteredTodos: ITodo[];
}

type IDispatch = (args: TodosAction) => TodosAction;

interface AddTodoAction {
    type: TodosActionTypes.ADD_TODO;
    payload: ITodo;
}

interface DeleteTodoAction {
    type: TodosActionTypes.DELETE_TODO;
    payload: ITodo;
}

interface CompleteTodoAction {
    type: TodosActionTypes.COMPLETE_TODO;
    payload: ITodo;
}

interface ChangeTodoAction {
    type: TodosActionTypes.CHANGE_TODO;
    payload: ITodo;
}

interface SetIsEditAction {
    type: TodosActionTypes.SET_IS_EDIT;
    payload: ITodo;
}

interface SetFilteredTodos {
    type: TodosActionTypes.SET_FILTERED_TODOS;
    payload: ITodo[];
}

type TodosAction =
    | AddTodoAction
    | DeleteTodoAction
    | CompleteTodoAction
    | ChangeTodoAction
    | SetIsEditAction
    | SetFilteredTodos;
