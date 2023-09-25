import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useDebounce } from '../hooks';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { filterSearch, filterStatus, filterPriority } from '../../redux';
const { Search } = Input;

export default function Filters() {
    const [inputSearch, setInputSearch] = useState('');
    const [status, setStatus] = useState('All');
    const [priority, setPriority] = useState([]);

    const dispatch = useDispatch();

    const debounce = useDebounce(inputSearch, 1000);

    useEffect(() => {
        dispatch(filterSearch(debounce));
    }, [debounce, dispatch]);

    const handleType = (e) => {
        setInputSearch(e.target.value);
    };

    const handleFilterStatus = (e) => {
        setStatus(e.target.value);
        dispatch(filterStatus(e.target.value));
    };

    const handleFilterPriority = (e) => {
        setPriority(e);
        dispatch(filterPriority(e));
    };

    return (
        <Row justify="center">
            <Col span={24}>
                <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
                    Search
                </Typography.Paragraph>
                <Search placeholder="input search text" value={inputSearch} onChange={handleType} />
            </Col>
            <Col sm={24}>
                <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
                    Filter By Status
                </Typography.Paragraph>
                <Radio.Group value={status} onChange={(e) => handleFilterStatus(e)}>
                    <Radio value="All">All</Radio>
                    <Radio value="Completed">Completed</Radio>
                    <Radio value="Todo">To do</Radio>
                </Radio.Group>
            </Col>
            <Col sm={24}>
                <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
                    Filter By Priority
                </Typography.Paragraph>
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    style={{ width: '100%' }}
                    value={priority}
                    onChange={(e) => handleFilterPriority(e)}
                >
                    <Select.Option value="High" label="High">
                        <Tag color="red">High</Tag>
                    </Select.Option>
                    <Select.Option value="Medium" label="Medium">
                        <Tag color="blue">Medium</Tag>
                    </Select.Option>
                    <Select.Option value="Low" label="Low">
                        <Tag color="gray">Low</Tag>
                    </Select.Option>
                </Select>
            </Col>
        </Row>
    );
}
