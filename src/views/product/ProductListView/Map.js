import React, { useState, useCallback, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
// import './lib/Map.css';
import { useHistory } from 'react-router-dom';
const GoogleMapExample = withGoogleMap((props) => {
  const [selectedCenter, setSelectedCenter] = useState(false);
  const [selectedCenter1, setSelectedCenter1] = useState(false);
  const [map, setMap] = useState(null);
  const mapRef = React.useRef();
  const [selectedId, setSelectedId] = useState(-1);
  let history = useHistory();

  return (
    <GoogleMap
      // ref={mapRef}
      ref={(map) => {
        const bounds = new window.google.maps.LatLngBounds();
        props.mapData.map((x) => {
          bounds.extend(
            new window.google.maps.LatLng(x.location.lat, x.location.lng)
          );
        });
        map && map.fitBounds(bounds);
      }}
      defaultCenter={{ lat: 17.351101, lng: 78.406708 }}
      defaultZoom={10}
    >
      {props.mapData.map((item, index) => {
        let link = '';
        if (item.clr != 1) {
          link = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        } else {
          link = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        }
        return (
          <Marker
            key={index}
            icon={{
              url: link // url
            }}
            position={item.location}
            style={{
              backgroundColor: '#0000ff',
              fillColor: '#0000ff',
              strokeColor: '0000ff'
            }}
            onMouseOver={() => {
              setSelectedCenter(true);
              setSelectedId(index);
            }}
            onClick={() => {
              history.push(`/app/devicedetails/${item.name}`);
            }}
          >
            {' '}
            {selectedCenter && selectedId == index && (
              <InfoWindow>
                <span>{item.name}</span>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
      
    </GoogleMap>
  );
});
const Map = ({ location, zoomLevel, mapData }) => {
  console.log('window inner height: ', window.innerHeight);
  return (
    <div className="map">
      <GoogleMapExample
        containerElement={<div style={{ height: 100, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        isMarkerShown
        mapData={mapData}
      />
    </div>
  );
};
export default Map;
