import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

const LanguageList = (props) => {
  const queryClient = useQueryClient();

  const deleteData = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/languages/" + props.language,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error("error adding language");
    }
  };

  const mutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries(["lang"]);
    },
  });

  return (
    <>
      <div className="row ">
        <div className="col-sm-10 ">{props.language}</div>
        <button className="col-sm-2" onClick={mutation.mutate}>
          Delete
        </button>
      </div>
    </>
  );
};

export default LanguageList;
