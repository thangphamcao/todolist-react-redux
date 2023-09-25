import { Row, Tag, Checkbox, Button, Modal, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { del, edit, cancel } from '../../redux';

const priorityColorMapping = {
    High: 'red',
    Medium: 'blue',
    Low: 'gray',
};

export default function Todo({ name, priority, getCheckBox, index, completed }) {
    const [checked, setChecked] = useState(completed);
    const [inputEdit, setInputEdit] = useState(name);

    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const dispatch = useDispatch();

    const toggleCheckbox = () => {
        setChecked(!checked);
        getCheckBox(index);
    };

    const handleEditTODO = () => {
        dispatch(
            edit({
                index: index,
                text: inputEdit,
            }),
        );
        setModalText('Updating...');
        setTimeout(() => {
            setOpen(false);
            setModalText('');
        }, 2000);
    };
    const handleCancel = () => {
        dispatch(cancel());
        setOpen(false);
    };

    const handleOpenEdit = () => {
        setOpen(true);
    };

    const handleDelete = () => {
        dispatch(del(index));
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
