import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

const useFetchLanguage = () => {
  const queryClient = useQueryClient();
  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  const query = useQuery({
    queryKey: ["lang"],
    queryFn: getData, //immediately runs?
  });

  const addData = async (addLang) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: addLang,
      }),
    });
    if (!res.ok) {
      throw new Error("error adding language");
    }
  };

  const deleteData = async (deleteLang) => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages", {
      method: "DEL",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: deleteLang,
      }),
    });
    if (!res.ok) {
      throw new Error("error adding language");
    }
  };

  return [query, queryClient, addData, deleteData];
};

export default useFetchLanguage;
