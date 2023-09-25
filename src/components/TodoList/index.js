import { Col, Row, Space, Button, Select, Tag, Input } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { add, del, edit, updateStatus, todoListRemainSelector } from '../../redux';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    const [inputValue, setInputValue] = useState('');
    const [priority, setPriority] = useState('Medium');

    const ref = useRef();
    const dispatch = useDispatch();
    const list = useSelector(todoListRemainSelector);
    console.log(list);

    // Handle ADD TODO
    const handleAddTodo = () => {
        if (inputValue !== '') {
            dispatch(
                add({
                    id: uuidv4(),
                    name: inputValue,
                    priority: priority,
                    completed: false,
                }),
            );
            setPriority('Medium');
            setInputValue('');
            ref.current.focus();
        }
    };

    // Handle Typing
    const handleType = (e) => {
        setInputValue(e.target.value);
    };

    // Handle Priority
    const handlePriority = (e) => {
        setPriority(e);
    };

    // Handle get status
    const getCheckBox = (value) => {
        dispatch(updateStatus(value));
    };

    // Handle Del
    const handleDel = (value) => {
        dispatch(del(value));
    };

    const handleEdit = (value) => {
        console.log(value);
        dispatch(edit(value));
    };

    return (
        <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
                {list &&
                    list.map((item, index) => (
                        <Todo
                            key={item.id}
                            getCheckBox={getCheckBox}
                            id={item.id}
                            index={index}
                            name={item.name}
                            priority={item.priority}
                            completed={item.completed}
                            handleDel={handleDel}
                            handleEdit={handleEdit}
                        />
                    ))}
            </Col>
            <Col span={24}>
                <Space.Compact style={{ display: 'flex' }}>
                    <Input ref={ref} value={inputValue} onChange={(e) => handleType(e)} />
                    <Select defaultValue="Medium" value={priority} onChange={(e) => handlePriority(e)}>
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
                    <Button type="primary" onClick={handleAddTodo}>
                        Add
                    </Button>
                </Space.Compact>
            </Col>
        </Row>
    );
}
