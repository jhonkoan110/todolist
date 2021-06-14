import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Radio, { RadioChangeEvent } from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Tag from 'antd/lib/tag';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { filterTodos } from '../../modules/TodolistModule/actionCreators';
import * as filterValues from './constans';
import styles from './Filter.module.css';

interface Props {
    tags: string[];
    onClick: (filter: string) => void;
    onTagClick: (tag: string) => void;
}

export const Filter: FC<Props> = ({ tags, onClick, onTagClick }) => {
    const [filterValue, setFilterValue] = useState<string>(filterValues.byAlphabet);
    const dispatch = useAppDispatch();

    const handleChange = (e: RadioChangeEvent) => {
        setFilterValue(e.target.value);
    };

    // Сбросить фильтр
    const resetFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        dispatch(filterTodos([]));
    };

    return (
        <Card className={styles.container}>
            <Row justify="space-between">
                <Radio.Group value={filterValue} onChange={handleChange}>
                    <Radio value={filterValues.byAlphabet}>По алфавиту</Radio>
                    <Radio value={filterValues.byAscOrder}>В порядке возрастания</Radio>
                    <Radio value={filterValues.byDescOrder}>В порядке убывания</Radio>
                </Radio.Group>
            </Row>

            <Row style={{ marginTop: '1rem' }}>
                {tags.map((tag) => (
                    <Tag onClick={() => onTagClick(tag)} key={tag} color="cyan">
                        {tag}
                    </Tag>
                ))}
            </Row>

            <Row style={{ marginTop: '1rem' }}>
                <Button onClick={() => onClick(filterValue)}>Отфильтровать</Button>
                <Button type="ghost" style={{ marginLeft: '1rem' }} onClick={resetFilter}>
                    Сбросить теги
                </Button>
            </Row>
        </Card>
    );
};
