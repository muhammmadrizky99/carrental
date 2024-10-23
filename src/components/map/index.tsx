import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import classes from './map.module.css';
import { Container } from '@mantine/core';



export const Map = () => {

    return (
        <Container className={classes.container}>
            <MapContainer
                className={classes.mapContainer}
                center={[-0.9471, 100.4172]}
                zoom={14}
                style={{height:'300px'}}
                
            >

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-0.9471, 100.4172]}>
                    <Popup>
                        Region Name
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    );
};
export default Map;
