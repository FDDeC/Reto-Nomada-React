import React, { useEffect } from "react";
import { Row, Col, Skeleton, List, Image, Tag, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { setActorDetails } from "../features/whoIs/whoIsSlice";
const movieDbImg = process.env.REACT_APP_API_MOVIEDB_IMG;

function ActorDetails() {
  const details = useSelector((state) => state.whoIs.actorDetails);
  const dispatch = useDispatch();
  const params = useParams();  
  const historySearch = useSelector(state => state.whoIs.historySearch)
  const navigate = useNavigate()
  useEffect(() => {    
    if (!historySearch.find(hs => String(hs.data.id) === params.id)) {
      navigate("/")
    } else {
      if (params.id !== String(details.id)) {
        dispatch(setActorDetails(parseInt(params.id)))
      }
    }    
  }, [params, historySearch, navigate, details, dispatch]);

  function formatDate(dateString) {
    let dateObject = new Date(dateString);
    return dateObject.toLocaleString("es-AR", {
    timeZone: 'UTC',
    hour12: false, dateStyle:"long"
    });   
  }

  return (
    <>
      <Col style={{ padding: "5px", textAlign: "center" }} xs={10} sm={8} md={6}><Link to="/">
        <Button style={{width:"100%", minWidth:"100px", maxWidth:"230px"}} type="primary" icon={<ArrowLeftOutlined />}>
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
                maxHeight: "350px",                
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
      <Col style={{padding:"5px"}} xs={24} sm={16} md={18}>
        {/* <h3>Películas:</h3> */}
        <List
          //loading={initLoading}
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
                      paddingRight: "10px"
                    }}
                  >
                    <h2>{item.original_title}</h2>
                    <h4>Pt. {item.vote_average}/10</h4>
                  </Row>
                }
                description={<><p>{item.overview}</p><p><b>Fecha de estreno:{formatDate(item.release_date)}</b></p></>}
                />
              
            </List.Item>
          )}
        />
      </Col>
      </Row>
      </>
  );
}

export default ActorDetails;
