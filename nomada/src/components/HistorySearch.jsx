import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Image } from 'antd';
import { useSelector } from 'react-redux'
import { DeleteOutlined } from "@ant-design/icons";
const movieDbImg = process.env.REACT_APP_API_MOVIEDB_IMG;

function HistorySearch() {
  const data = useSelector(state => state.whoIs.historySearch)
  
  function removeItem(item) {
    console.log(item)
  }

  return (
  <List
      itemLayout="horizontal"
      locale={{ emptyText: "No existen registros" }}
      dataSource={data}
      renderItem={item => (
      <List.Item        
        actions={[<DeleteOutlined className="deleteIcon" key={ item.data.id } onClick={()=> removeItem(item.data.id) } />] }>        
          <List.Item.Meta
            avatar={<Image preview={ false } height={60} src={ `${movieDbImg}w200${item.data.profile_path}` }/>}
          title={<Link to={item.title}>{item.title}</Link> }
          description={"Trabajos: " + item.data.known_for.map(mn=>` ${mn.original_title}`)}
        />
      </List.Item>
    )}
  />
);
}
export default HistorySearch 