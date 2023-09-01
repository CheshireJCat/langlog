import React, {useState} from 'react';
import {
  Button,
  Modal,
  Drawer,
  Space,
  Form,
  Input,
  InputNumber,
  ColorPicker,
  notification
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import {getAllRoles, storeAllRoles} from '../config/roles';
import {getPlayers} from '../config/players';

const ConfigRoles: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (role: Role[]) => void;
}> = ({open, onClose, onSave}) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState(getAllRoles());

  const reset = () => {
    Modal.confirm({
      icon: null,
      content: '确定要重置数据吗？（重置已添加、已删除玩家）',
      onOk() {
        setRoles(getAllRoles());
        form.setFieldValue('roles', getAllRoles());
      }
    });
  };

  const players = getPlayers();

  const onFinish = (values: any) => {
    let countAll = 0;
    let countWolf = 0;
    let countPeople = 0;
    const data = values.roles;
    data.forEach((item: Role) => {
      if (item.shortText === '狼') {
        countWolf += item.count;
      } else if (item.shortText === '民') {
        countPeople += item.count;
      }
      countAll += item.count;
      if (typeof item.color !== 'string') {
        item.color = (item.color as any).toHexString();
      }
    });
    if (!data.length) {
      notification.error({
        message: '角色不能为空，可按重置按钮重置'
      });
      return;
    } else if (countWolf <= 0 || countPeople <= 0) {
      notification.error({
        message: '狼人或村民不能为0'
      });
      return;
    }

    if (countAll !== players.length) {
      notification.error({
        message: '角色数量 与 玩家人数不符'
      });
      return;
    }

    storeAllRoles(data);
    onSave(data.filter((item: any) => item.count > 0));
  };

  return (
    <>
      <Drawer
        destroyOnClose
        maskClosable={false}
        title={`角色配置 / 玩家数（${players.length}）`}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => reset()} />
            <Button type="primary" onClick={() => form.submit()}>
              确定
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="configRoles"
          autoComplete="off"
          initialValues={{roles}}
          onFinish={onFinish}
          onFinishFailed={() =>
            notification.error({message: '出错啦，检查检查'})
          }
        >
          <Form.List name="roles">
            {(fields, {add, remove}) => {
              return (
                <>
                  {fields.map(({key, name, ...restField}) => {
                    const disabled =
                      form.getFieldValue('roles')[name]?.disabledEdit;
                    return (
                      <Space
                        key={key}
                        style={{display: 'flex', marginBottom: 8}}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'text']}
                          rules={[{required: true, message: '不可为空'}]}
                        >
                          <Input placeholder="角色身份" disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          style={{
                            width: 50
                          }}
                          name={[name, 'shortText']}
                          rules={[{required: true, message: '填一下'}]}
                        >
                          <Input placeholder="简称" disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'count']}
                          rules={[{required: true, message: '填一下'}]}
                        >
                          <InputNumber min={0} max={10} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'color']}
                          rules={[{required: true, message: '选下'}]}
                        >
                          <ColorPicker
                            format="hex"
                            disabled={disabled}
                            style={{
                              position: 'relative',
                              top: '7px'
                            }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          className={disabled ? 'disabled-icon' : ''}
                          onClick={() => !disabled && remove(name)}
                        />
                      </Space>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      增加角色
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Form>
      </Drawer>
    </>
  );
};

export default ConfigRoles;
