import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as types from "../config/ActionTypes";
import * as vehicleAction from "../actions/vehicleAction";
import '../App.css';
import { Table, Button, Form, Input } from 'antd';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const VehicleTable = (props) => {
    const { type, vehicleList, updateVehicle, removeVehicle } = props;
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        if (type === types.UPDATE_VEHICLE_FAILED || type === types.UPDATE_VEHICLE_SUCCESS) {
            cancel()
        }
    }, [type]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Vehicle',
            dataIndex: 'vehicle',
            editable: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            editable: true,
        },
        {
            title: 'Fuel',
            dataIndex: 'fuel',
            editable: true,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            width: "20%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button
                            style={{ marginRight: 8 }}
                            onClick={() => save(record.id)}
                        >
                            Save
                        </Button>
                        <Button onClick={() => cancel()}>
                            Cancel
                        </Button>
                    </span>
                ) : (
                    <span>
                        <Button
                            style={{ marginRight: 8 }}
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Button>
                        <Button onClick={() => deleteVehicle(record.id)}>
                            Delete
                        </Button>
                    </span>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const isEditing = (record) => record.id === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            vehicle: '',
            type: '',
            fuel: '',
            color: '',
            ...record,
        });
        setEditingKey(record.id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = {...row, id};
            updateVehicle(newData)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const deleteVehicle = (id) => {
        removeVehicle(id)
    };

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                rowKey='id'
                columns={mergedColumns}
                dataSource={vehicleList}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}


// Selectors
const mapStateToProps = (state) => ({
    type: state.vehicleReducer.type,
    vehicleList: state.vehicleReducer.vehicleList
});

// Dispatch actions
const mapDispatchToProps = {
    updateVehicle: vehicleAction.updateVehicle,
    removeVehicle: vehicleAction.removeVehicle,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleTable);