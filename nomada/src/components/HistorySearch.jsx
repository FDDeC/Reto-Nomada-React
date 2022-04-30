import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { List, Image, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { CloseOutlined } from "@ant-design/icons";
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
      style={{marginTop:"10px"}}
      grid={{
      gutter: 16,
      xs:1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 2,
      xxl: 2
      }}      
      locale={{ emptyText: "No existen registros" }}
      dataSource={data}      
      renderItem={item => (
      <List.Item>        
          <List.Item.Meta            
            avatar={<Image onClick={() => navigate(`/actor/${item.data.id}`)} preview={false} height={80} src={`${movieDbImg}w200${item.data.profile_path}`} />}
            title={<Row style={{ display: "flex", justifyContent: "space-between", paddingRight: "20px" }}><Link to={`/actor/${item.data.id}`}>{item.title}</Link><CloseOutlined className="deleteIcon" key={item.data.id} onClick={() => removeItem(item.data.id)} /></Row>}
            description={<p onClick={() => navigate(`/actor/${item.data.id}`)}>{"Trabajos: " + item.data.known_for.map(mn => ` ${mn.original_title}`)}</p>}
        />
      </List.Item>
    )}
  />
);
}
export default HistorySearch 