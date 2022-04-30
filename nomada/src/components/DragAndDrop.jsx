import React, { useState } from "react";
import HistorySearch from './HistorySearch';
import "antd/dist/antd.css";
import { Upload, message, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHistoryItem, setActorDetails } from "../features/whoIs/whoIsSlice";
const { Dragger } = Upload;
const whoIsUrl = process.env.REACT_APP_API_WHOIS_URL;
const whoIsKey = process.env.REACT_APP_API_WHOIS_KEY;
const movieDbUrl = process.env.REACT_APP_API_MOVIEDB_PERSON;
//const movieDbImg = process.env.REACT_APP_API_MOVIEDB_IMG;
const movieDbKey = process.env.REACT_APP_API_MOVIEDB_KEY;

async function getActorDetails(data) {
  try {
    const response = await fetch(`${movieDbUrl}?api_key=${movieDbKey}&language=es-AR&query=${encodeURI(data.file.response.actorName)}`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url    
  });
  return response.json(); // parses JSON response into native JavaScript objects    
  } catch (error) {
    console.log(error)
    return {error:error}
  }  
}

function DragAndDrop() {
  const dispatch = useDispatch();
  const historySearch = useSelector((state) => state.whoIs.historySearch);
  const [working, setWorking] = useState(false);
  const navigate = useNavigate()

  async function getActorData(info) {
    try {      
      const actorDetails = await getActorDetails(info);
      let history = {
        title: info.file.response.actorName,
        data: actorDetails.results[0],
        //img: info.file
      }
      dispatch(addHistoryItem(history))
      setWorking(false);
      navigate(`/actor/${actorDetails.results[0].id}`)
      message.destroy()
    } catch (error) {
      console.log(info, error);
    }
  }
 
  const props = {
    name: "file",
    disabled: working,
    multiple: false,
    accept: ".jpg,.png",
    action: whoIsUrl,
    showUploadList: false,
    headers: { nomada: whoIsKey },
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {        
        setWorking(true);        
      }
      if (status === "done") {
        if (info.file.response.error.length) {
          setWorking(false)
          message.error(`${info.file.response.error}.`);
        } else {
          let checkHistory = historySearch.find((i) => i.title === info.file.response.actorName)
          if (checkHistory) {             
            setWorking(false);
            dispatch(setActorDetails(checkHistory.data.id))
            navigate(`/actor/${checkHistory.data.id}`)
          } else {
            message.success(
              `Detectamos a ${info.file.response.actorName}! , obteniendo datos, aguarde...`
            );
            getActorData(info);
          }
        }
      } else if (status === "error") {
        setWorking(false)
        message.error(`${info.file.name} error de subida.`);
      }
    },
    onRemove(e) {      
      //console.log("Removing", e);
      message.destroy()
    },
    onDrop(e) {
      setWorking(true)
      //console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
    <Dragger {...props}>
      {working ? (
        <Spin tip="Procesando..." />
      ) : (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Selecciona o arrastra una foto</p>
        </>
      )}
      <p className="ant-upload-hint">
        En caso detectemos una persona del cine en la foto te diremos quién es y cuales fueron sus trabajos
      </p>
    </Dragger>
      <HistorySearch />
      {/* <ActorDetails /> */}
      </>

  );
}

export default DragAndDrop;
