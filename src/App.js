import "./App.css"
import React, {useEffect, useState} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import AddNotes from './AddNotes/AddNotes';
import SearchNotes from './SearchNotes/SearchNotes';
import { v4 as uuidv4 } from 'uuid';

const mapData = [
  {
    id: 1,
    position: {
      lat: -27.7957911,
      lng: 153.072371,
    },
    notes: [
      {
        username: 'nick',
        note: "shopping"
      },
      {
        username: 'john',
        note: "playground"
      }
    ]
  },
  {
    id: 2,
    position: {
      lat: -27.4957922,
      lng: 153.073372,
    },
    notes: [
      {
        username: 'emily',
        note: "food"
      }
    ]
  },
  {
    id: 3,
    position: {
      lat: -27.6758933,
      lng: 153.012373,
    },
    notes: [
      {
        username: 'tom',
        note: "learning"
      }
    ]
  },
  {
    id: 4,
    position: {
      lat: -27.6957933,
      lng: 153.052383,
    },
    notes: [
      {
        username: 'jerry',
        note: "running"
      }
    ]
  },
  {
    id: 5,
    position: {
      lat: -27.4967933,
      lng: 153.012673,
    },
    notes: [
      {
        username: 'zhangsan3',
        note: "okmabuzhidaop"
      }
    ]
  },
]


function App(props) {
  const [center, setCenter] = useState({lat: 0, lng: 0})
  const [marker, setMarker] = useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  })
  const [data, setData] = useState([])
  const [markerNotes, setMarkerNotes] = useState([])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      })
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
    setData(mapData)
  }, [])

  const onMarkerClick = id => (props, marker, e) => {
    const result = data.find(item => item.id === id)
    if(result){
      setMarkerNotes(result.notes)
      setMarker({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    }
  }

  const onMapClicked = (props) => {
    if (marker.showingInfoWindow) {
      setMarker({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  const handelSearchNotesResults = terms => {
    let searchedArray = []
    for (let i = 0; i < mapData.length; i++) {
      let notesArray = []
      for (let j = 0; j < mapData[i].notes.length; j++) {
        if (mapData[i].notes[j].username.includes(terms) || mapData[i].notes[j].note.includes(terms)) {
          notesArray.push(mapData[i].notes[j])
        }
      }
      if (notesArray.length > 0) {
        searchedArray.push({...mapData[i], notes: notesArray})
      }
    }
    setData(searchedArray)
  }

  const handleAddNotesToCurrentPosition = (note) => {
    const resultId = mapData.find((item) => {
      return item.position.lat === center.lat && item.position.lng === center.lng
    })
    if (resultId) {
      resultId.notes.push(note)
      setData([...mapData])
    } else {
      mapData.push({id: uuidv4(), position: {...center}, notes: [{...note}]})
      setData([...mapData])
    }
  }

  return (
    <div className='app'>
      <h3>MyCommunityLandmark</h3>
      <div className='header'>
        <SearchNotes handelSearchNotesResults={handelSearchNotesResults}/>
        <AddNotes handleAddNotesToCurrentPosition={handleAddNotesToCurrentPosition}/>
      </div>
      {
        center.lat && center.lng ?
          <Map
            google={props.google}
            zoom={12}
            initialCenter={center}
            onClick={onMapClicked}
          >
            <InfoWindow
              marker={marker.activeMarker}
              visible={marker.showingInfoWindow}
              onClose={onMapClicked}
            >
              <div>
                {markerNotes.map((note) => {
                  return (
                    <div key={note.username + note.note}>
                      <p>{note.note + "   ---" + note.username}</p>
                    </div>
                  )
                })}
              </div>
            </InfoWindow>
            <Marker
              onClick={onMarkerClick(0)}
              position={center}/>
            {
              data.map((item) => {
                return (
                  <Marker
                    key={item.id}
                    onClick={onMarkerClick(item.id)}
                    position={item.position}/>
                )
              })
            }
          </Map> :
          null
      }
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCP2bxmAzmK5Z-59jr4PUTTjUQx5lmQA6M"
})(App)
