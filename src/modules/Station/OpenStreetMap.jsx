import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';

// Importer les icônes
import AvailableIcon from '@/assets/Marker/available.svg';
import UnavailableIcon from '@/assets/Marker/unavailable.svg';
import ChargingIcon from '@/assets/Marker/charging.svg';
import useGetDataNoParams from '@/lib/hoocks/useGetDataNoParams';

// Fonction pour obtenir l'icône en fonction du statut
const getIcon = (status) => {
    let iconUrl;
    
    switch(status) {
        case "Available":
            iconUrl = AvailableIcon;
            break;
        case "Unavailable":
            iconUrl = UnavailableIcon;
            break;
        case "Charging":
            iconUrl = ChargingIcon;
            break;
        default:
            iconUrl = AvailableIcon; // Utiliser une icône par défaut si le statut n'est pas reconnu
            break;
    }

    return L.icon({
        iconUrl: iconUrl,
        iconSize: [40, 80], // Taille de l'icône
        iconAnchor: [40, 122], // Ajustement du point d'ancrage
        popupAnchor: [0, -82], // Position de la popup ajustée
    });
};

function OpenStreetMap() {
    const defaultCenter = [-18.933333, 47.516667];

    const [tileUrl, setTileUrl] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const [coordonate, setCoordonate] = useState(null);
    
    const handleThemeChange = (event) => {
        setTileUrl(event.target.value);
    };
    
    const { data, error, isPending } = useGetDataNoParams("/cp/map_cp/", "repoMap");
    
    useEffect(() => {
        if (data) {
            setCoordonate(data);
        }
    }, [data]);

    if (error) {
        return <p className="text-red-500">Erreur lors du chargement des données.</p>;
    }

    if (isPending) {
        return <p>Chargement en cours...</p>;
    }
    
    return (
        <div className="relative shadow-combined rounded-lg bg-white p-6 z-0 mb-6">
            <div className="mb-4">
                <label>Choisissez un thème :</label>
                <select onChange={handleThemeChange} className="ml-2 p-2 py-2 border bg-white focus:ring-0 rounded-sm focus:outline-none">
                    <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">Standard</option>
                    <option value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">Humanitarian</option>
                    <option value="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png">CyclOSM</option>
                    <option value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">Topographic</option>
                </select>
            </div>

            <MapContainer center={defaultCenter} zoom={13} style={{ height: "350px", width: "100%" }}>
                <TileLayer
                    url={tileUrl}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {coordonate?.map(marker => (
                    <Marker key={marker.id} position={marker.position} icon={getIcon(marker.status)}>
                        <Popup>
                            {marker.status} <br /> {marker.name} <br /> Coordonnées: {marker.position[0]}, {marker.position[1]}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default OpenStreetMap;
