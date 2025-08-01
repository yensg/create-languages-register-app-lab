import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const UserLanguageList = (props) => {
  const queryClient = useQueryClient();

  const deleteUserLanguage = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: props.id,
          language: props.eachLanguage,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };
  const mutation = useMutation({
    mutationFn: deleteUserLanguage,
    onSucess: () => {
      queryClient.invalidateQueries(["userLanguages"]);
    },
  });

  return (
    <>
      <label className="col-sm-10">{props.eachLanguage}</label>
      <button className="col-sm-2" onClick={mutation.mutate}>
        Delete
      </button>
    </>
  );
};

export default UserLanguageList;
