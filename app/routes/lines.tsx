import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { supabase } from "../supabase-client";

type Line = {
  id: number;
  name: string;
  color: string;
  opened_year: number;
  length_m: number | null;
  districts: string | null;
  travel_time_s: number | null;
  created_at: string;
};

type Station = {
  id: number;
  station_name: string;
};

type SelectedStation = {
  id: number;
  name: string;
};

export const loader = async () => {
  const [{ data: lines }, { data: stations }] = await Promise.all([
    supabase.from("lines").select("*"),
    supabase.from("stations").select("*"),
  ]);

  return Response.json({ lines, stations });
};

export default function LinesPage() {
  const { lines, stations } = useLoaderData<{
    lines: Line[];
    stations: Station[];
  }>();

  // console.info("lines: ~~~~~~~", lines);
  // console.info("stations: ~~~~~~~", stations);

  const [station, setStation] = useState("");
  const [selectedStations, setSelectedStations] = useState<SelectedStation[]>(
    []
  );
  const [selectedLineId, setSelectedLineId] = useState<number | null>(null);

  const handleStationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.info(e.target.value);
    setStation(e.target.value);
  };

  const onSubmit = async () => {
    const { data, error } = await supabase
      .from("stations")
      .insert([{ station_name: station }])
      .select();

    console.info("insert: ", data);

    if (error) {
      console.error(
        "Error inserting 'station_name' into 'stations' table. Error message: ",
        error.message
      );
      throw new Response(
        "Failed to insert 'station_name' into 'stations' table",
        {
          status: 500,
        }
      );
    }

    // return Response.json({ lines: data });
  };

  const handleLineSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedLineId(Number(e.target.value));
    console.info(Number(e.target.value));
  };

  const insertSupabaseTable = async (selectedStations: SelectedStation[]) => {
    const payload = selectedStations.map(({ id }) => ({
      line_id: selectedLineId,
      station_id: id,
    }));

    const { data, error } = await supabase
      .from("lines_stations")
      .insert(payload)
      .select();

    console.info("insert: ", data);

    if (error) {
      console.error(
        "Error inserting 'line_id' and 'station_id' into 'lines_stations' table. Error message: ",
        error.message
      );
      throw new Response(
        "Failed to insert 'line_id' and 'station_id' into 'lines_stations' table",
        {
          status: 500,
        }
      );
    }
  };

  const handleSelectedStationsSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;

    const checkedInputs = form.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

    const selectedStations = Array.from(checkedInputs).map((input) => {
      const { value, name } = input as HTMLInputElement;

      return {
        id: Number(value),
        name,
      };
    });

    // console.info("Selected stations:", selectedStations);
    setSelectedStations(selectedStations);

    if (selectedLineId) {
      insertSupabaseTable(selectedStations);
    } else {
      alert("Select a line");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h2 className={'text-red-600'}>Metro Lines</h2>

      <ul style={{ marginTop: 20 }}>
        {lines.map((line) => (
          <li key={line.id} style={{ marginBottom: 15 }}>
            <strong>{line.name}</strong>
            <div>Color: {line.color}</div>
            <div>Opened: {line.opened_year}</div>
            <div>Length: {line.length_m ? line.length_m / 1000 : "N/A"} km</div>
            <div>Districts: {line.districts}</div>
            <div>
              Travel time:
              {line.travel_time_s ? ` ${line.travel_time_s / 60} min` : " N/A"}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <label htmlFor={"station"}>{"Create station"}</label>
        <input
          type={"text"}
          name={"station"}
          id={"station"}
          placeholder={"Khreshchatyk"}
          value={station}
          onChange={handleStationInput}
        />

        <button onClick={onSubmit}>{"Submit"}</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <b>{"Connect your station to the line:"}</b>
        <div style={{ display: "flex", gap: "50px" }}>
          <ul style={{ margin: 0, padding: 0 }}>
            {lines.map(({ id, name }) => (
              <li
                key={id}
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <label>
                  <input
                    type={"radio"}
                    name={"line"}
                    required
                    value={id}
                    onChange={handleLineSelect}
                  />
                  {name}
                </label>
                <p>{`- id: ${id}`}</p>
              </li>
            ))}
          </ul>
          <details>
            <summary>{"Connect your station to the line:"}</summary>
            <form onSubmit={handleSelectedStationsSubmit}>
              <fieldset>
                <ul>
                  {stations.map(({ id, station_name }) => (
                    <li
                      key={id}
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <label htmlFor={station_name}>
                        <input
                          type={"checkbox"}
                          id={station_name}
                          name={station_name}
                          value={id}
                        />
                        {station_name}
                      </label>
                      <p>{`- id: ${id}`}</p>
                    </li>
                  ))}
                </ul>
              </fieldset>
              <button type={"submit"}>{"Confirm"}</button>
            </form>
          </details>
        </div>
      </div>
    </main>
  );
}
