import React, { useState } from "react";
import LanguageList from "./LanguageList";
// import useFetchLanguage from "../hook/useFetchLanguage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const LanguageDisplay = () => {
  const [newLang, setNewLang] = useState("");
  const queryClient = useQueryClient();

  // Fetch data
  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  // Log lang useQuery's run under queryKey
  const query = useQuery({
    queryKey: ["lang"],
    queryFn: getData,
  });

  // Update newLang useState via input
  const addNewLang = (event) => {
    setNewLang(event.target.value);
  };

  // Transmit data to server and update the new lang. Not via argument but by global scope.
  const addData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: newLang,
      }),
    });
    if (!res.ok) {
      throw new Error("error adding language");
    }
  };

  // To refresh the display by invalidate lang useQuery batch and rerun again.
  const mutation = useMutation({
    mutationFn: addData,
    onSuccess: () => {
      setNewLang("");
      queryClient.invalidateQueries(["lang"]);
    },
  });

  return (
    <>
      <div className="container border border-danger">
        <div className="row">
          <label className="col-sm-2">New Language</label>
          <input
            className="col-sm-8"
            type="text"
            placeholder="New Language"
            onChange={addNewLang}
            value={newLang}
          ></input>
          <button className="col-sm-2" onClick={mutation.mutate}>
            Add
          </button>
        </div>
      </div>
      <div className="container border border-success">
        {query.isSuccess && //res.json
          query.data.map((item, idx) => {
            return <LanguageList key={idx} language={item.language} />;
          })}
      </div>
    </>
  );
};

export default LanguageDisplay;
