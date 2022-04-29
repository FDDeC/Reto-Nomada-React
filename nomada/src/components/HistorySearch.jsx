import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { List, Avatar, Button, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { DeleteOutlined } from "@ant-design/icons";
import { deleteHistoryItem } from "../features/whoIs/whoIsSlice";
const movieDbImg = process.env.REACT_APP_API_MOVIEDB_IMG;

function HistorySearch() {
  const data = useSelector(state => state.whoIs.historySearch)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function removeItem(id) {
    dispatch(deleteHistoryItem(id))
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
            onClick={()=>navigate(`/actor/${item.data.id}`)}
            avatar={<Image preview={ false } height={80} src={ `${movieDbImg}w200${item.data.profile_path}` }/>}
          title={<Link to={`/actor/${item.data.id}`}>{item.title}</Link> }
          description={"Trabajos: " + item.data.known_for.map(mn=>` ${mn.original_title}`)}
        />
      </List.Item>
    )}
  />
);
}
export default HistorySearch 