import { Upload, Button, Form } from 'antd';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';




function OnUpload() {

  const normFile = (e: any) => {
    console.log('Upload event:', e.file);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  return (
    <Form.Item
      name="upload"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <ImgCrop>
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </ImgCrop>
    </Form.Item>
  );
}


export default OnUpload;