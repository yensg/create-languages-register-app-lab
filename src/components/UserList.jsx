import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import UserLanguageList from "./UserLanguageList";
import UpdateModal from "./UpdateModal";
import Overlay from "./UpdateModal";

const UserList = (props) => {
  const queryClient = useQueryClient();
  const [newUserLanguage, setNewUserLanguage] = useState("");
  const [updateModal, setUpdateModal] = useState(false);

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

  const getUserLanguages = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: props.id }),
      }
    );
    if (!res.ok) {
      throw new Error("error getting data");
    }
    return await res.json();
  };

  // why i cant get the each user's languages out? id 7 has 2, but the rest should be empty
  const query = useQuery({
    queryKey: ["userLanguages", props.id], // need the 2nd parameters? Previous one we use state to change part of the url under loading spinner
    queryFn: getUserLanguages,
  });

  const addNewUserLanguage = (event) => {
    setNewUserLanguage(event.target.value);
  };

  // why i cant add any normal languages? And why after updating the total language then can add to user?
  const addUserLanguage = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER + "/lab/users/languages",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: props.id,
          language: newUserLanguage,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("error getting data");
    }
  };

  const mutation2 = useMutation({
    mutationFn: addUserLanguage,
    onSuccess: () => {
      setNewUserLanguage("");
      queryClient.invalidateQueries(["userLanguages"]);
    },
  });

  const changeUpdateModalState = () => {
    setUpdateModal(!updateModal);
  };

  return (
    <>
      {/* {updateModal && ( //like that doesnt re-render the screen why?
        <UpdateModal id={props.id} setUpdateModal={setUpdateModal} />
      )} */}
      {updateModal && <Overlay id={props.id} setUpdateModal={setUpdateModal} />}
      <div className="container container border border-primary">
        <div className="row">
          <div className="container">
            {/* {props.id} */}
            {/* {JSON.stringify(query)} */}
            <label className="col-sm-8">User: {props.name}</label>
            <button className="col-sm-2" onClick={changeUpdateModalState}>
              Update
            </button>
            <button className="col-sm-2" onClick={mutation.mutate}>
              Delete
            </button>
          </div>
          <div className="container">
            <label className="col-sm-2">New Language</label>
            <input
              className="col-sm-8"
              type="text"
              placeholder="New Language"
              onChange={addNewUserLanguage}
              value={newUserLanguage}
            ></input>
            {/* {newUserLanguage} */}
            <button className="col-sm-2" onClick={mutation2.mutate}>
              Submit
            </button>

            {query.isSuccess &&
              query.data.map((eachLanguage, idx) => {
                return (
                  <UserLanguageList
                    key={idx}
                    id={props.id}
                    eachLanguage={eachLanguage}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
