import React, { useRef, useEffect, useState, useMemo } from "react";


export default function App() {
  const [videoDevicesList, setVideoDevices] = useState([]);
  const [myvalue, setMyvalue] = useState("")
  const videoRef=useRef(null)

  useEffect(() => {
    // navigator.mediaDevices.enumerateDevices().then(gotDevices)

    if (true) {
      (async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoInput = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setVideoDevices(videoInput);
      })();
    }
  }, []);
 const groupIds = useMemo(() => {
    let $groupIds = [];
    videoDevicesList.forEach((device) =>{
      $groupIds.push (
        <div key={`${device.groupId}`}>{device.groupId}</div>
      )
    } )
    return $groupIds
  },[videoDevicesList]) 

  const Lables = useMemo(() => {
    let $Lables = [];
    videoDevicesList.forEach((device) =>{
      $Lables.push (
        <div key={`${device.label}`}>{device.label}</div>
      )
    } )
    return $Lables
  },[videoDevicesList]) 

  const handleChange=(event)=>{
    setMyvalue(event.target.value)

  }


  const getVideo=()=>{
    if (myvalue !=="") {
      navigator.mediaDevices.getUserMedia({
        video:{width:520, height:250},
      })
      .then(stream=>{
        let video =videoRef.current
        video.srcObject=stream
        video.play()
      })
      .catch(err=>{
        console.error(err)
      })
    }

  }


  const handleStop=()=>{
    let video =videoRef.current
    const stream = video.srcObject
    const tracks = stream.getTracks()
    tracks.forEach((track) => {
      track.stop();
    });
    video.srcObject=null
    setMyvalue("")
  }

  const handleStart=()=>{
    getVideo()
  }



  
  return (
    <div>
      {JSON.stringify(videoDevicesList)}
      {typeof videoDevicesList}

      <h1>Loop</h1>
      {groupIds}
      

      <br />
      <ul>
        {Lables.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>


      <br />

      <form>
      <select value={myvalue} onChange={handleChange}>
        <option></option>
        <option>
          {Lables.map(item => (
          <li key={item}>{item}</li>
          ))}
        </option>
      </select>
      <input type="submit" value="Select Camera" />
      </form>
      <h1> selected camera:  {myvalue} </h1>
      <br />
      <button id="start-button" onClick={handleStart}>Start Camera</button>
      <br />
      
      <div ><video ref={videoRef}></video></div>

      <button id="stop-button" onClick={handleStop}>Stop Camera</button>

      
    </div>
    
    
  )};