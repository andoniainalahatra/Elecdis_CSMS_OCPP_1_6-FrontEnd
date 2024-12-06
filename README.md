comande avec docker :

- docker-compose down
- docker-compose up --build

Localement :

- npm install
- npm run dev


# Tests des endpoints OCPP

## Test de Set Charging Profile

Endpoint : `POST /set_charging_profile/{charge_point_id}`

Exemple de payload :
{
    "connector_id": 1,
    "cs_charging_profiles": {
        "chargingProfileId": 1,
        "stackLevel": 0,
        "chargingProfilePurpose": "TxDefaultProfile",
        "chargingProfileKind": "Absolute",
        "chargingSchedule": {
            "duration": 86400,
            "startSchedule": "2024-03-20T10:00:00Z",
            "chargingRateUnit": "A",
            "chargingSchedulePeriod": [
                {"startPeriod": 0, "limit": 16.0}
            ]
        }
    }
}
