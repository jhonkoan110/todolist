import { ITodo, TodosAction, TodosState } from './types';

export enum TodosActionTypes {
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    COMPLETE_TODO = 'COMPLETE_TODO',
    CHANGE_TODO = 'CHANGE_TODO',
    SET_IS_EDIT = 'SET_IS_EDIT',
    SET_FILTERED_TODOS = 'SET_FILTERED_TODOS',
}

const initialState: TodosState = {
    todos: [
        {
            id: 1,
            title: 'яяяяя хлеб',
            completed: false,
            isEdit: false,
            tag: 'еда',
            priotity: 'low',
        },
        { id: 2, title: 'фффф', completed: false, isEdit: false, tag: 'еда', priotity: 'high' },
        {
            id: 3,
            title: 'Починить машину',
            completed: false,
            isEdit: false,
            tag: 'авто',
            priotity: 'med',
        },
        {
            id: 4,
            title: 'Сделать на ReactTS тудулист',
            completed: false,
            isEdit: false,
            tag: 'IT',
            priotity: 'low',
        },
    ] as ITodo[],
    filteredTodos: [] as ITodo[],
};

export const todolistReducer = (state = initialState, action: TodosAction) => {
    switch (action.type) {
        case TodosActionTypes.ADD_TODO: {
            const todo: ITodo = action.payload;
            const newTodos: ITodo[] = [...state.todos];
            newTodos.push(todo);

            return { ...state, todos: newTodos };
        }

        case TodosActionTypes.DELETE_TODO: {
            const newTodos: ITodo[] = state.todos.filter((t) => t.id !== action.payload.id);
            const newFilteredTodos: ITodo[] = state.filteredTodos.filter(
                (t) => t.id !== action.payload.id,
            );

            return { ...state, todos: newTodos, filteredTodos: newFilteredTodos };
        }

        case TodosActionTypes.COMPLETE_TODO: {
            const newTodos: ITodo[] = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    t.completed = !t.completed;
                }

                return t;
            });

            return { ...state, todos: newTodos };
        }

        case TodosActionTypes.CHANGE_TODO: {
            const newTodos: ITodo[] = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    t = action.payload;
                }

                return t;
            });

            return { ...state, todos: newTodos };
        }

        case TodosActionTypes.SET_IS_EDIT: {
            const newTodos: ITodo[] = state.todos.map((t) => {
                if (t.id === action.payload.id) {
                    t.isEdit = action.payload.isEdit;
                }

                return t;
            });

            return { ...state, todos: newTodos };
        }

        case TodosActionTypes.SET_FILTERED_TODOS: {
            return { ...state, filteredTodos: action.payload };
        }

        default:
            return state;
    }
};
