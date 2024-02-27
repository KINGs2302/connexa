import React from 'react'
import { Alert, Space, Spin } from "antd";

export default function Loader() {
  return (
    <div className='loader'>
      <Space>
        <Spin tip="Loding......" size="large">
          <div className="content" />
        </Spin>
      </Space>
    </div>
  );
}
