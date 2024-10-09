import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function OpenStreetMap() {

    // Liste des marqueurs avec les coordonnées
    const markers = [
        { id: 1, name: 'Analakely', position: [-18.91368, 47.525657] },
        { id: 2, name: 'Ambatobe', position: [-18.894796, 47.555209] },
        { id: 3, name: 'Ankatso', position: [-18.907938, 47.519394] },
        { id: 4, name: 'Ivandry', position: [-18.885963, 47.53742] },
    ];

    const defaultCenter = [-18.933333, 47.516667]; // Coordonnées par défaut pour Antananarivo

    // Etat pour stocker le style de la carte sélectionné
    const [tileUrl, setTileUrl] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Fonction pour gérer le changement de thème
    const handleThemeChange = (event) => {
        setTileUrl(event.target.value);
    };

    return (
        <div className="relative z-0 mb-6">
            <div className="mb-4">
                {/* Sélection du thème de la carte */}
                <label>Choisissez un thème :</label>
                <select onChange={handleThemeChange} className="ml-2 p-2  py-2 border bg-white focus:ring-0 focus:outline-none focus-visible:ring-white focus:ring-offset-0">
                    <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">Standard</option>
                    <option value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">Humanitarian</option>
                    <option value="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png">CyclOSM</option>
                    <option value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">Topographic</option>
                </select>
            </div>

            <MapContainer center={defaultCenter} zoom={13} style={{ height: "400px", width: "100%" }}>
                {/* TileLayer dynamique basé sur le choix de l'utilisateur */}
                <TileLayer
                    url={tileUrl}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Ajout des marqueurs sur la carte */}
                {markers.map(marker => (
                    <Marker key={marker.id} position={marker.position}>
                        <Popup>
                            {marker.name} <br /> Coordonnées: {marker.position[0]}, {marker.position[1]}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default OpenStreetMap;
