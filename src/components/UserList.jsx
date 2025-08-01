import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const UserList = (props) => {
  const queryClient = useQueryClient();

  const deleteUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
      }),
    });
    if (!res.ok) {
      throw new Error("error getting data");
    }
  };

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <>
      <div className="row">
        <label className="col-sm-8">User: {props.name}</label>
        <button className="col-sm-2">Update</button>
        <button className="col-sm-2" onClick={mutation.mutate}>
          Delete
        </button>
      </div>
    </>
  );
};

export default UserList;
