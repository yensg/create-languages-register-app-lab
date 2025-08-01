import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

// very seldom we need to fetch so many times on the data
// we should make the code as direct as possible. It's clearer.

const useFetchLanguage = () => {
  const queryClient = useQueryClient();
  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  //     const res = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");
  // if (!res.ok) {
  //   throw new Error("error getting data");
  // }
  // const lang = await res.json();

  //  const res2 = await fetch(import.meta.env.VITE_SERVER + "/lab/languages");
  // if (!res.ok) {
  //   throw new Error("error getting data");
  // }
  // const user = await res2.json();

  // return [lang,user]

  const query = useQuery({
    queryKey: ["lang"],
    queryFn: getData,
    //immediately runs?
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

  //   const deleteData = async (deleteLang) => {
  //     const res = await fetch(
  //       import.meta.env.VITE_SERVER + "/lab/languages/" + deleteLang,
  //       {
  //         method: "DELETE",
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error("error adding language");
  //     }
  //   };

  //   return [query, queryClient, addData, deleteData];
  return [query, queryClient, addData];
};

// export default useFetchLanguage;
