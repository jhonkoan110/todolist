import CheckCircleTwoTone from '@ant-design/icons/lib/icons/CheckCircleTwoTone';
import CloseCircleTwoTone from '@ant-design/icons/lib/icons/CloseCircleTwoTone';
import AutoComplete from 'antd/lib/auto-complete';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Divider from 'antd/lib/divider';
import Input from 'antd/lib/input';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Select from 'antd/lib/select';
import Typography from 'antd/lib/typography';
import { Option } from 'antd/lib/mentions';
import React, { FC, useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeTodo, setIsEdit } from '../../modules/TodolistModule/actionCreators';
import { ITodo, Priority } from '../../modules/TodolistModule/types';
import styles from './EditBlock.module.css';

interface Props {
    todo: ITodo;
    tags: string[];
}

export const EditBlock: FC<Props> = ({ todo, tags }) => {
    const [title, setTitle] = useState<string>(todo.title);
    const [isValid, setIsValid] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const priorities: Priority[] = useMemo(() => {
        return ['low', 'med', 'high'];
    }, []);

    const [priority, setPriority] = useState<Priority>(todo.priotity);
    const [tag, setTag] = useState<string>(todo.tag);

    const hangleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const cancelClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(setIsEdit({ ...todo, isEdit: false }));

        setIsValid(true);
        setTitle(todo.title);
        setPriority(todo.priotity);
        setTag(todo.tag);
    };

    const submitClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const changedTodo: ITodo = { ...todo, title, priotity: priority, tag };

        dispatch(changeTodo(changedTodo));
        dispatch(setIsEdit({ ...todo, isEdit: false }));
    };

    const checkValid = useCallback(() => {
        if (priorities && tag && title) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [priorities, tag, title]);

    useEffect(() => {
        checkValid();
    }, [checkValid, isValid]);

    if (todo.isEdit) {
        return (
            <>
                <Layout className={styles.container}>
                    <Row justify="center">
                        <Typography>Редактирование</Typography>
                    </Row>

                    <Row justify="space-between" style={{ margin: '1rem' }}>
                        <Col span={13}>
                            <Input
                                className={`${isValid ? '' : styles['validation-error']}`}
                                type="text"
                                size="middle"
                                value={title}
                                onChange={hangleChange}
                                placeholder="Описание задачи"
                            />
                            {!title && (
                                <Typography.Text type="danger">
                                    Поле не должно быть пустым
                                </Typography.Text>
                            )}
                        </Col>
                        <Col span={5} style={{ margin: '0 1rem' }}>
                            <Select
                                className={priority ? '' : styles['validation-error']}
                                value={priority}
                                placeholder="Выберите приоритет"
                                size="middle"
                                style={{ width: '100%' }}
                                onChange={(value) => {
                                    setPriority(value);
                                }}>
                                {priorities.map((p) => (
                                    <Option key={p} value={p}>
                                        {p}
                                    </Option>
                                ))}
                            </Select>
                            {!priority && (
                                <Typography.Text type="danger">
                                    Поле не должно быть пустым
                                </Typography.Text>
                            )}
                        </Col>
                        <Col span={5}>
                            <AutoComplete
                                value={tag}
                                className={tag ? '' : styles['validation-error']}
                                style={{ width: '100%' }}
                                size="middle"
                                placeholder="Выберите или придумайте тэг"
                                options={tags.map((t) => ({ value: t }))}
                                onSelect={(value) => setTag(value)}
                                onChange={(value) => setTag(value)}
                                filterOption={(inputValue, option) =>
                                    option?.value
                                        .toUpperCase()
                                        .indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                            {!tag && (
                                <Typography.Text type="danger">
                                    Поле не должно быть пустым
                                </Typography.Text>
                            )}
                        </Col>
                    </Row>

                    <Row className={styles['input-row']}></Row>

                    <Row className={styles.row} justify="center">
                        <Button
                            shape="circle"
                            icon={<CheckCircleTwoTone twoToneColor="#5bff62" />}
                            onClick={submitClickHandler}
                            disabled={!isValid}
                        />
                        <Button
                            onClick={cancelClickHandler}
                            shape="circle"
                            className={styles['close-button']}
                            icon={<CloseCircleTwoTone twoToneColor="red" />}
                        />
                    </Row>
                </Layout>
                <Divider style={{ marginBottom: '0' }} />
            </>
        );
    }

    return null;
};
