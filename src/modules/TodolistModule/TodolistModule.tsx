import Button from 'antd/lib/button';
import Content from 'antd/lib/layout/layout';
import Modal from 'antd/lib/modal';
import Typography from 'antd/lib/typography';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Filter, TodoAdder, Todolist } from '../../components';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppStateType } from '../../store';
import { addTodo, completeTodo, deleteTodo, filterTodos, setIsEdit } from './actionCreators';
import { ITodo, Priority } from './types';
import * as filterValues from '../../components/Filter/constans';
import { useEffect } from 'react';
import { useCallback } from 'react';
interface Props {}

export const TodolistModule: FC<Props> = () => {
    const dispatch = useAppDispatch();
    const todos: ITodo[] = useSelector((state: AppStateType) => state.todoList.todos);
    const filteredTodos: ITodo[] = useSelector(
        (state: AppStateType) => state.todoList.filteredTodos,
    );

    const [newTodoTitle, setNewTodoTitle] = useState<string>('');
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [todoToDelete, setTodoToDelete] = useState<ITodo>({
        id: 0,
        title: '',
        completed: false,
        priotity: 'low',
        tag: '',
    });
    const [isValid, setIsValid] = useState<boolean>(false);
    const [newPriority, setNewPriority] = useState<Priority>(undefined);
    const [newTag, setNewTag] = useState<string>('');

    const checkValid = useCallback(() => {
        if (newPriority && newTag && newTodoTitle) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [newPriority, newTag, newTodoTitle]);

    useEffect(() => {
        checkValid();
    }, [checkValid, isValid]);

    // Обработка инпута
    const newTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const prioritySelectChangeHandler = (value: Priority) => {
        setNewPriority(value);
    };

    const tagAutocompleteChangeHandler = (value: string) => {
        setNewTag(value);
    };

    const tagAutocompleteSelectHandler = (value: string) => {
        setNewTag(value);
    };

    // Добавить todo
    const addTodoButtonHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const newTodo: ITodo = {
            id: todos.length + 1,
            title: newTodoTitle,
            completed: false,
            priotity: newPriority,
            tag: newTag,
        };

        setNewTodoTitle('');
        setNewTag('');
        tagAutocompleteSelectHandler('');
        setNewPriority(undefined);
        setIsValid(false);

        dispatch(addTodo(newTodo));
    };

    // Открыть модалку с удалением todo
    const deleteIconClickHandler = (todo: ITodo) => {
        setTodoToDelete(todo);
        setIsOpenDeleteModal(true);
    };

    // Удалить todo
    const deleteTodoHandler = () => {
        dispatch(deleteTodo(todoToDelete));
        setIsOpenDeleteModal(false);
        setTodoToDelete({
            id: 0,
            title: '',
            completed: false,
            priotity: 'low',
            tag: '',
        });
    };

    // Завершить todo
    const completeTodoHandler = (todo: ITodo) => {
        dispatch(setIsEdit({ ...todo, isEdit: false }));
        dispatch(completeTodo(todo));
    };

    // Обработка "отфильтровать"
    const filterHandler = (filter: string) => {
        switch (filter) {
            case filterValues.byAlphabet: {
                const newTodos = todos.sort((a: ITodo, b: ITodo) => {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                    return 0;
                });

                dispatch(filterTodos(newTodos));
                dispatch(setIsEdit(todoToDelete));

                break;
            }

            case filterValues.byAscOrder: {
                const newTodos = todos.sort((a: ITodo, b: ITodo) => {
                    if (a.id > b.id) return 1;
                    if (a.id < b.id) return -1;
                    return 0;
                });

                dispatch(filterTodos(newTodos));
                dispatch(setIsEdit(todoToDelete));

                break;
            }

            case filterValues.byDescOrder: {
                const newTodos = todos.sort((a: ITodo, b: ITodo) => {
                    if (a.id > b.id) return -1;
                    if (a.id < b.id) return 1;
                    return 0;
                });

                dispatch(filterTodos(newTodos));
                dispatch(setIsEdit(todoToDelete));

                break;
            }
        }
    };

    // Фильтр по тегам
    const onTagClickHandler = (tag: string) => {
        const newTodos: ITodo[] = todos.filter((t) => t.tag === tag);

        dispatch(filterTodos(newTodos));
    };

    return (
        <Content>
            <Typography.Title level={5} style={{ paddingLeft: '2rem' }}>
                Новая задача
            </Typography.Title>
            <TodoAdder
                isValid={isValid}
                title={newTodoTitle}
                tags={Array.from(new Set(todos.map((t) => t.tag)))}
                priority={newPriority}
                tag={newTag}
                onChange={newTitleChangeHandler}
                onAdd={addTodoButtonHandler}
                onPriorityChange={prioritySelectChangeHandler}
                onTagChange={tagAutocompleteChangeHandler}
                onTagSelect={tagAutocompleteSelectHandler}
            />

            <Typography.Title level={5} style={{ paddingLeft: '2rem' }}>
                Фильтр
            </Typography.Title>
            <Filter
                tags={Array.from(new Set(todos.map((t) => t.tag)))}
                onClick={filterHandler}
                onTagClick={onTagClickHandler}
            />

            <Typography.Title level={5} style={{ paddingLeft: '2rem' }}>
                Список задач
            </Typography.Title>
            <Todolist
                todos={filteredTodos.length ? filteredTodos : todos}
                onDeleteClick={deleteIconClickHandler}
                onCompleteClick={completeTodoHandler}
            />
            {isOpenDeleteModal && (
                <Modal
                    title="Удаление задачи"
                    visible={isOpenDeleteModal}
                    onCancel={() => setIsOpenDeleteModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setIsOpenDeleteModal(false)}>
                            Отменить
                        </Button>,
                        <Button key="submit" type="primary" onClick={deleteTodoHandler}>
                            Да
                        </Button>,
                    ]}>
                    Вы действительно хотите удалить задачу "{todoToDelete.title}" ?
                </Modal>
            )}
        </Content>
    );
};
