import React, { useEffect, useState } from "react";
import { Row, Col, Skeleton, List, Image, Tag, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
const movieDbImg = process.env.REACT_APP_API_MOVIEDB_IMG;

function ActorDetails() {
  const details = useSelector((state) => state.whoIs.actorDetails);
  const params = useParams();
  const [initLoading, setInitLoading] = useState(false);
  const historySearch = useSelector(state => state.whoIs.historySearch)
  const navigate = useNavigate()
  useEffect(() => {    
    if (!historySearch.find(hs => String(hs.data.id) === params.id)) {
      navigate("/")
    }    
  }, [params, historySearch,navigate]);
  return (
    <>
      <Col style={{ padding: "5px", textAlign: "center" }} xs={10} sm={8} md={6}><Link to="/">
        <Button style={{width:"100%", minWidth:"100px", maxWidth:"170px"}} type="primary" icon={<ArrowLeftOutlined />}>
          Regresar
        </Button>
      </Link></Col>  
             
      
    <Row style={{backgroundColor:"#fafafa"}}>
      <Col xs={24} sm={8} md={6}>
        <Row>
          <Col style={{display:"flex", justifyContent:"center", padding:"5px", height:"100%"}} xs={10} sm={24}>
            <Image
              style={{
                minWidth: "100px",
                maxHeight: "250px",                
          minHeight:"150px"}}
              src={`${movieDbImg}w500${details.profile_path}`}
            />
          </Col>
          <Col style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, padding:"5px"}} xs={14} sm={24}>
            <h3>{details.name}</h3>
            <Tag color="gold">{details.gender === 2 ? "Masculino" : "Femenino"}</Tag>
            <Tag color="gold"> Popularidad: { details.popularity }</Tag>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={16} md={18}>
        {/* <h3>Películas:</h3> */}
        <List
          loading={initLoading}
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
            hideOnSinglePage: true,
          }}
          dataSource={details.known_for}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Image
                      height={150}
                      src={`${movieDbImg}w500${item.poster_path}`}
                    />
                  }
                  title={
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingRight:"10px"
                      }}
                    >
                      <h3>{item.original_title}</h3>
                      <h4>{item.vote_average}</h4>
                    </Row>
                  }
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Col>
      </Row>
      </>
  );
}

export default ActorDetails;
