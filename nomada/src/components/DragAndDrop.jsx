import React from 'react';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const whoIsUrl = process.env.REACT_APP_API_WHOIS_URL
const whoIsKey = process.env.REACT_APP_API_WHOIS_KEY

const props = {
  name: 'file',
  multiple: false,
  accept:".jpg,.png",
  action: whoIsUrl, 
  headers: { "nomada": whoIsKey },  
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      //console.log(info.file, info.fileList);      
    }
    if (status === 'done') {        
      if (info.file.response.error.length) {
        message.error(`${info.file.response.error}.`);
      } else {
        message.success(`Es ${info.file.response.actorName} !!`);
      }      
    } else if (status === 'error') {
      message.error(`${info.file.name} error de subida.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function DragAndDrop(){
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Selecciona o arrastra una foto</p>
      <p className="ant-upload-hint">
        En caso detectemos una persona del cine en tu foto te diremos quién es y dónde trabajó
      </p>
    </Dragger>
  )
}