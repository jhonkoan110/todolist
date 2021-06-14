import { combineReducers, compose, createStore } from "redux";
import { todolistReducer } from "./modules/TodolistModule/reducer";

const rootReducer = combineReducers({
    todoList: todolistReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatchType = typeof store.dispatch;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());