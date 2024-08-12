
const stationData = [];

const statuses = ["active", "inactive", "maintenance"];
const locations = ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Toulouse", "Nantes", "Strasbourg", "Montpellier", "Lille"];
const baseDate = new Date("2024-08-09T08:30:00Z");

for (let i = 1; i <= 100; i++) {
    const id = `stati
    on${i}`;
    const name = `Station ${i}`;
    const location = `${locations[Math.floor(Math.random() * locations.length)]}, France`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const power = Math.floor(Math.random() * (200 - 10 + 1)) + 10; // Random power between 10kW and 200kW
    const connectors = Math.floor(Math.random() * 10) + 1; // Random connectors between 1 and 10
    const lastCommunication = new Date(baseDate.getTime() - Math.floor(Math.random() * 10000000000)).toISOString(); // Random date in the past

    stationData.push({
        id,
        name,
        location,
        status,
        power,
        connectors,
        lastCommunication
    });
}

export default stationData;