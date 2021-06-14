import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Checkbox from 'antd/lib/checkbox';
import List from 'antd/lib/list';
import Typography from 'antd/lib/typography';
import { FC } from 'react';
import { ITodo } from '../../modules/TodolistModule/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './Todolist.module.css';
import { EditBlock } from '../EditBlock';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsEdit } from '../../modules/TodolistModule/actionCreators';
import { PriorityColors } from '../../modules/TodolistModule/constants';

interface TodolistComponentProps {
    todos: ITodo[];
    onDeleteClick: (todo: ITodo) => void;
    onCompleteClick: (todo: ITodo) => void;
}

export const Todolist: FC<TodolistComponentProps> = ({ todos, onDeleteClick, onCompleteClick }) => {
    const dispatch = useAppDispatch();

    const editButtonHandler = (todo: ITodo) => {
        const newTodo: ITodo = { ...todo, isEdit: true };

        dispatch(setIsEdit(newTodo));
    };

    return (
        <Card className={styles.container}>
            <List
                size="large"
                bordered
                dataSource={todos}
                renderItem={(todo: ITodo) => {
                    return (
                        <>
                            <List.Item className={todo.completed ? styles.completed : ''}>
                                <List.Item.Meta title={todo.id + '  ' + todo.title} />
                                {!todo.completed && (
                                    <Typography.Text
                                        style={{
                                            color:
                                                todo.priotity === 'low'
                                                    ? PriorityColors.LOW
                                                    : todo.priotity === 'med'
                                                    ? PriorityColors.MED
                                                    : PriorityColors.HIGH,
                                        }}>
                                        {todo.priotity}
                                    </Typography.Text>
                                )}
                                <Checkbox
                                    style={{ marginLeft: '1rem' }}
                                    checked={todo.completed}
                                    onChange={() => onCompleteClick(todo)}
                                />
                                <Button
                                    onClick={() => editButtonHandler(todo)}
                                    className={styles.button}
                                    type="primary"
                                    icon={<EditOutlined />}
                                    shape="circle"
                                    disabled={todo.completed}
                                />
                                <Button
                                    className={styles.button}
                                    icon={<DeleteOutlined />}
                                    shape="circle"
                                    danger
                                    onClick={() => onDeleteClick(todo)}
                                />
                            </List.Item>
                            <EditBlock
                                todo={todo}
                                tags={Array.from(new Set(todos.map((t) => t.tag)))}
                            />
                        </>
                    );
                }}
            />
        </Card>
    );
};
