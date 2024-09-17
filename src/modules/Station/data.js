//
// const stationData = [];
//
// const statuses = ["active", "inactive", "maintenance"];
// const locations = ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Toulouse", "Nantes", "Strasbourg", "Montpellier", "Lille"];
// const baseDate = new Date("2024-08-09T08:30:00Z");
// const connectors=["Hors service","Disponible","Occupe"]
//
// for (let i = 1; i <= 100; i++) {
//     const id = `${i}`;
//     const name = `Station ${i}`;
//     const location = `${locations[Math.floor(Math.random() * locations.length)]}, France`;
//     const status = statuses[Math.floor(Math.random() * statuses.length)];
//     const power = Math.floor(Math.random() * (200 - 10 + 1)) + 10; // Random power between 10kW and 200kW
//     const connector1 = connectors[Math.floor(Math.random() * connectors.length)] ;
//     const connector2 = connectors[Math.floor(Math.random() * connectors.length)] ; // Random connectors between 1 and 10
//
//     const lastCommunication = new Date(baseDate.getTime() - Math.floor(Math.random() * 10000000000)).toLocaleString('fr-FR', {
//         timeZone: 'Indian/Antananarivo', // Madagascar time zone
//         year: 'numeric',
//         month: 'numeric',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         second: 'numeric',
//     });
//     stationData.push({
//         id,
//         name,
//         location,
//         status,
//         power,
//         connector1,
//         connector2,
//         lastCommunication
//     });
// }
//
// export default stationData;

import {useQuery} from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance.js";

export default function Example() {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axiosInstance.get('/cp/read_cp')
    })
    console.log(data)

    return {isPending,error,data};
}