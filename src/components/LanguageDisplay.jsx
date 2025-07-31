import React, { useState } from "react";
import LanguageList from "./LanguageList";
import useFetchLanguage from "../hook/useFetchLanguage";
import { useMutation } from "@tanstack/react-query";

const LanguageDisplay = () => {
  const [query, queryClient, addData, deleteData] = useFetchLanguage();
  const [newLang, setNewLang] = useState("");

  const addNewLang = (event) => {
    setNewLang(event.target.value);
  };

  const submitNewLang = () => {
    addData(newLang);
    setNewLang("");
    queryClient.invalidateQueries(["lang"]);
  };

  const deleteLang = (item) => {
    deleteData(item);
    queryClient.invalidateQueries(["lang"]);
  };
  // why cant delete?

  // When is my fetch ran? upon using query?
  // why query.isSuccess will resolve the promise?

  return (
    <>
      <div className="container border border-danger">
        <label className="col-sm-2">New Language</label>
        <input
          className="col-sm-8"
          type="text"
          placeholder="New Language"
          onChange={addNewLang}
          value={newLang}
        ></input>
        <button className="col-sm-2" onClick={submitNewLang}>
          Add
        </button>
        {newLang}
      </div>
      <div className="container border border-success">
        {query.isSuccess &&
          query.data.map((item, idx) => {
            return (
              <LanguageList
                deleteLang={deleteLang}
                key={idx}
                language={item.language}
              />
            );
          })}
        {/* {JSON.stringify(query)} */}
      </div>
    </>
  );
};

export default LanguageDisplay;
