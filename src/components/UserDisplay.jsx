import React, { useState } from "react";
import UserList from "./UserList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UserDisplay = () => {
  const queryClient = useQueryClient();
  const [newUser, setNewUser] = useState("");

  // Fetch data
  const getData = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users");
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  // Log users useQuery's run under queryKey
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getData,
  });

  const AddNewUser = (event) => setNewUser(event.target.value);

  const addUser = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newUser,
        // age: 0,
        // country: "", // Qn 1: why error? how to do the optional?
      }),
    });
    if (!res.ok) {
      throw new Error("error adding user");
    }
  };

  // All these functions are not invokved until event trigger
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      setNewUser(""), queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["userLanguages"]);
    },
  });

  return (
    <>
      <div className="container border border-danger">
        <label className="col-sm-2">New User</label>
        <input
          className="col-sm-8"
          type="text"
          placeholder="New User"
          onChange={AddNewUser}
          value={newUser}
        ></input>
        <button className="col-sm-2" onClick={mutation.mutate}>
          Add
        </button>
      </div>
      {query.isSuccess && //as long as we use query, we must use this? yes we need to use this. mutation no need? need via the onSuccess
        query.data.map((user, id) => {
          return (
            <UserList key={user.id} id={user.id} name={user.name}></UserList>
          );
        })}
    </>
  );
};

export default UserDisplay;
