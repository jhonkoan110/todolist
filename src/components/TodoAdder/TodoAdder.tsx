import React, { FC } from 'react';
import AutoComplete from 'antd/lib/auto-complete';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Select from 'antd/lib/select';
import Typography from 'antd/lib/typography';
import { Priority } from '../../modules/TodolistModule/types';
import styles from './TodoAdder.module.css';

interface Props {
    title: string;
    isValid: boolean;
    tags: string[];
    priority: Priority;
    tag: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAdd: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onPriorityChange: (priority: Priority) => void;
    onTagChange: (tag: string) => void;
    onTagSelect: (tag: string) => void;
}

export const TodoAdder: FC<Props> = ({
    title,
    isValid,
    tags,
    priority,
    tag,
    onChange,
    onAdd,
    onPriorityChange,
    onTagChange,
    onTagSelect,
}) => {
    const priorities: Priority[] = ['low', 'med', 'high'];
    const Option = Select.Option;

    return (
        <Card className={styles.container}>
            <Row justify="space-between">
                <Col span={13}>
                    <Input
                        className={title ? '' : styles['validation-error']}
                        placeholder="Что нужно сделать?"
                        value={title}
                        onChange={onChange}
                        size="large"
                    />
                    {!title && (
                        <Typography.Text type="danger">Поле не должно быть пустым</Typography.Text>
                    )}
                </Col>
                <Col span={5} style={{ margin: '0 1rem' }}>
                    <Select
                        className={priority ? '' : styles['validation-error']}
                        value={priority}
                        placeholder="Выберите приоритет"
                        size="large"
                        style={{ width: '100%' }}
                        onChange={onPriorityChange}>
                        {priorities.map((p, i) => (
                            <Option key={i} value={i}>
                                {p}
                            </Option>
                        ))}
                    </Select>
                    {!priority && (
                        <Typography.Text type="danger">Поле не должно быть пустым</Typography.Text>
                    )}
                </Col>
                <Col span={5}>
                    <AutoComplete
                        value={tag}
                        className={tag ? '' : styles['validation-error']}
                        style={{ width: '100%' }}
                        size="large"
                        placeholder="Выберите или придумайте тэг"
                        options={tags.map((t) => ({ value: t }))}
                        onSelect={onTagSelect}
                        onChange={onTagChange}
                        filterOption={(inputValue, option) =>
                            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    />
                    {!tag && (
                        <Typography.Text type="danger">Поле не должно быть пустым</Typography.Text>
                    )}
                </Col>
                <Row style={{ marginTop: '1rem', width: '100%' }}>
                    <Button
                        className={styles['add-button']}
                        type="primary"
                        block
                        size="large"
                        onClick={onAdd}
                        disabled={!isValid}>
                        Добавить
                    </Button>
                </Row>
            </Row>
        </Card>
    );
};
