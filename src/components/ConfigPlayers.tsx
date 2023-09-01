import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Modal, Drawer, Space, Form, Input} from 'antd';
import {getAllPlayers, storeAllPlayers} from '../config/players';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {CheckboxValueType} from 'antd/es/checkbox/Group';
import {CloseOutlined, ReloadOutlined, PlusOutlined} from '@ant-design/icons';

const ConfigPlayers: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (checkPlayer: string[]) => void;
}> = ({open, onClose, onSave}) => {
  const [all, setAll] = useState(getAllPlayers());
  const [checkedList, setCheckedList] = useState(
    all.filter(item => item.check).map(({name}) => name)
  );
  const options = all.map(item => item.name);

  const checkAll = options.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < options.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options : []);
  };

  const deleteItem = (value: string) => {
    setAll(all.filter(item => item.name !== value));
  };

  const reset = () => {
    Modal.confirm({
      icon: null,
      content: '确定要重置数据吗？（重置已添加、已删除玩家）',
      onOk() {
        setAll(getAllPlayers());
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAdd = ({username}: any) => {
    setAll([...all, {name: username, check: true}]);
    setIsModalOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    storeAllPlayers(
      all.map(item => ({
        ...item,
        check: checkedList.includes(item.name)
      }))
    );
    onSave(checkedList);
  };

  useEffect(() => {
    setCheckedList(all.filter(item => item.check).map(({name}) => name));
  }, [all]);

  return (
    <>
      <Drawer
        destroyOnClose
        maskClosable={false}
        title="选择玩家"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={handleSave}>
              确定
            </Button>
          </Space>
        }
      >
        <div className="flex-col">
          <div className="flex-row">
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
              className="mr-auto"
            >
              全选
            </Checkbox>
            <Button icon={<ReloadOutlined />} onClick={() => reset()} />
            <Button icon={<PlusOutlined />} onClick={showModal} />
          </div>
          <Checkbox.Group
            value={checkedList}
            onChange={onChange}
            className="flex-1"
          >
            {options.map(item => {
              return (
                <div
                  className="flex-row"
                  key={item}
                  style={{lineHeight: '32px', height: '32px', width: '100%'}}
                >
                  <Checkbox style={{width: '100%'}} value={item}>
                    {item}
                  </Checkbox>
                  <CloseOutlined
                    className="ml-auto"
                    onClick={() => deleteItem(item)}
                  />
                </div>
              );
            })}
          </Checkbox.Group>
        </div>
      </Drawer>
      <Modal
        title="增加玩家"
        open={isModalOpen}
        onCancel={handleAddCancel}
        destroyOnClose
        footer={null}
      >
        <Form
          autoComplete="off"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          onFinish={handleAdd}
        >
          <Form.Item
            label="玩家名"
            name="username"
            rules={[
              {required: true, message: '请输入玩家名称!'},
              () => ({
                validator(_, value) {
                  if (value && options.includes(value)) {
                    return Promise.reject(new Error('已有此玩家!'));
                  }
                  return Promise.resolve();
                }
              })
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{offset: 18}}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ConfigPlayers;
