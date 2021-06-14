import Card from 'antd/lib/card';
import Layout from 'antd/lib/layout';
import PageHeader from 'antd/lib/page-header';
import { TodolistModule } from './modules';
import { FC } from 'react';
import './App.css';

const App: FC = () => {
    return (
        <Layout className="layout">
            <Card style={{ marginBottom: '1rem' }}>
                <PageHeader style={{ padding: 0 }} title="Тудулист" subTitle="Пробник" />
            </Card>
            <TodolistModule />
        </Layout>
    );
};

export default App;
