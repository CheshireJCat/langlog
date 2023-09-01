import React, {useState} from 'react';
import {Modal} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';

const Help: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <QuestionCircleOutlined onClick={showModal} />
      <Modal title="提示" open={isModalOpen} footer={null} onCancel={hideModal}>
        <p>游戏结束条件 1：狼人全部死亡、狼人以外的人全部死亡</p>
        <p>游戏结束条件 2：神职人员全部死亡，且狼人数 = 平民数</p>
        <p>本工具使用了本地缓存，请使用浏览器运行，不受刷新影响</p>
      </Modal>
    </>
  );
};

export default Help;
