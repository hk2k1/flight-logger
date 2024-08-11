import { getFlightLogs, createFlightLog } from "@/lib/actions/flightlog.action";

export default async function FlightLogs() {
  const flightLogs = await getFlightLogs();

  return (
    <div>
      <h1>Flight Logs</h1>
      {flightLogs.map((log) => (
        <div key={log._id}>
          {log.flightID} - {log.tailNumber}
        </div>
      ))}
      {/* You would typically put your form here */}
    </div>
  );
}
