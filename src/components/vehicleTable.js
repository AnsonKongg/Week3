import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as types from "../config/ActionTypes";
import * as vehicleAction from "../actions/vehicleAction";
import '../App.css';
import { Table, Button, Form, Input } from 'antd';
const { Search } = Input;
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
    const [search, setSearch] = useState('');
    const [searchList, setSearchList] = useState(null);

    useEffect(() => {
        // When user updated vehicle, cancel Editing mode and refresh searchList
        if (type === types.UPDATE_VEHICLE_FAILED || type === types.UPDATE_VEHICLE_SUCCESS) {
            if(search){
                onSearch(search)
            }
            cancel()
        }
    }, [type]);

    // Table columns
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
    // Merge table columns if they are editable
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
    // Start Editing table row data
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
    // Cancel Editing mode
    const cancel = () => {
        setEditingKey('');
    };
    // Update vehicleList after edited
    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = { ...row, id };
            updateVehicle(newData)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    // Update vehicleList after edited
    const deleteVehicle = (id) => {
        removeVehicle(id)
        if(search){
            onSearch(search)
        }
    };
    // Handle search bar onSearch and refresh searchList for update  actions
    const onSearch = value => {
        const result = vehicleList.filter(vehicle => vehicle.vehicle.match(value))
        setSearchList(result)
        setSearch(value)
    }

    return (
        <div>
            <Search
                placeholder="Enter vehicle name here"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
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
                    dataSource={search ? searchList : vehicleList}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>
    );
}


// Selectors
const mapStateToProps = (state) => ({
    type: state.vehicleReducer.type,
    vehicleList: state.vehicleReducer.vehicleList,
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