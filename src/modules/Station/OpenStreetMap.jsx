import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';

// Importer les icônes
import AvailableIcon from '@/assets/Marker/available.svg';
import UnavailableIcon from '@/assets/Marker/unavailable.svg';
import ChargingIcon from '@/assets/Marker/charging.svg';

// Définir des icônes personnalisées pour chaque statut
const getIcon = (statut) => {
    const iconUrls = {
        Available: AvailableIcon,
        Unavailable: UnavailableIcon,
        Charging: ChargingIcon,
    };
    
    return L.icon({
        iconUrl: iconUrls[statut],
        iconSize: [80, 122], // Augmentation de la taille de l'icône
        iconAnchor: [25, 82], // Point d'ancrage ajusté en fonction de la taille
        popupAnchor: [0, -82], // Position de la popup ajustée
    });
};

function OpenStreetMap() {

    const markers = [
        { id: 1, name: 'Analakely', position: [-18.91368, 47.525657], statut: "Available" },
        { id: 2, name: 'Ambatobe', position: [-18.894796, 47.555209], statut: "Unavailable" },
        { id: 3, name: 'Ankatso', position: [-18.907938, 47.519394], statut: "Charging" },
        { id: 4, name: 'Ivandry', position: [-18.885963, 47.53742], statut: "Available" },
    ];

    const defaultCenter = [-18.933333, 47.516667];

    const [tileUrl, setTileUrl] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    const handleThemeChange = (event) => {
        setTileUrl(event.target.value);
    };

    return (
        <div className="relative shadow-combined rounded-lg bg-white p-6 z-0 mb-6">
            <div className="mb-4">
                {/* Sélection du thème de la carte */}
                <label>Choisissez un thème :</label>
                <select onChange={handleThemeChange} className="ml-2 p-2  py-2 border bg-white focus:ring-0 rounded-sm focus:outline-none focus-visible:ring-white focus:ring-offset-0">
                    <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">Standard</option>
                    <option value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">Humanitarian</option>
                    <option value="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png">CyclOSM</option>
                    <option value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">Topographic</option>
                </select>
            </div>

            <MapContainer center={defaultCenter} zoom={13} style={{ height: "400px", width: "100%", borderRadius: "10px" }}>
                <TileLayer
                    url={tileUrl}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map(marker => (
                    <Marker key={marker.id} position={marker.position} icon={getIcon(marker.statut)}>
                        <Popup>
                        {marker.statut} <br /> {marker.name} <br /> Coordonnées: {marker.position[0]}, {marker.position[1]}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default OpenStreetMap;
