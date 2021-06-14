import { TodosActionTypes } from './reducer';
import { ITodo, TodosAction } from './types';

export const addTodo = (todo: ITodo): TodosAction => ({
    type: TodosActionTypes.ADD_TODO,
    payload: todo,
});

export const deleteTodo = (todo: ITodo): TodosAction => ({
    type: TodosActionTypes.DELETE_TODO,
    payload: todo,
});

export const completeTodo = (todo: ITodo): TodosAction => ({
    type: TodosActionTypes.COMPLETE_TODO,
    payload: todo,
});

export const changeTodo = (todo: ITodo): TodosAction => ({
    type: TodosActionTypes.CHANGE_TODO,
    payload: todo,
});

export const setIsEdit = (todo: ITodo): TodosAction => ({
    type: TodosActionTypes.SET_IS_EDIT,
    payload: todo,
});

export const filterTodos = (todos: ITodo[]): TodosAction => ({
    type: TodosActionTypes.SET_FILTERED_TODOS,
    payload: todos,
});
