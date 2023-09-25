import { Row, Tag, Checkbox, Button, Modal, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { cancel } from '../../redux';

const priorityColorMapping = {
    High: 'red',
    Medium: 'blue',
    Low: 'gray',
};

export default function Todo({ name, priority, getCheckBox, index, completed, handleDel, handleEdit, id }) {
    const [checked, setChecked] = useState(completed);
    const [inputEdit, setInputEdit] = useState(name);

    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const dispatch = useDispatch();

    const toggleCheckbox = () => {
        setChecked(!checked);
        getCheckBox(id);
    };

    const handleEditTODO = () => {
        let data = {
            index: id,
            text: inputEdit,
        };
        handleEdit(data);

        dispatch(cancel());
        setModalText('Updating...');
        setTimeout(() => {
            setOpen(false);
            setModalText('');
        }, 1500);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOpenEdit = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        handleDel(index);
        setModalText('Deleting...');
        setTimeout(() => {
            setOpen(false);
            setModalText('');
        }, 2000);
    };

    const handleTypeEdit = (e) => {
        setInputEdit(e.target.value);
    };

    return (
        <Row
            justify="space-between"
            style={{
                marginBottom: 3,
                ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
            }}
        >
            <Checkbox checked={checked} onChange={toggleCheckbox}>
                {name}
            </Checkbox>
            <Tag color={priorityColorMapping[priority]} style={{ marginBottom: '5px' }}>
                {priority}{' '}
                <span style={{ cursor: 'pointer', fontSize: '15px' }} onClick={handleOpenEdit}>
                    {' '}
                    &times;
                </span>
            </Tag>
            <Modal
                title="Edit"
                open={open}
                onCancel={handleCancel}
                footer={() => (
                    <>
                        <Button onClick={handleDelete}>Delete</Button>
                        <Button onClick={handleEditTODO}>Update</Button>
                    </>
                )}
            >
                {modalText ? <p>{modalText}</p> : <Input value={inputEdit} onChange={(e) => handleTypeEdit(e)} />}
            </Modal>
        </Row>
    );
}
