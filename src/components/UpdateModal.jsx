import styles from "./UpdateModal.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactDOM from "react-dom";
// why no need client?

const UpdateModal = (props) => {
  const queryClient = useQueryClient();
  const [updateUser, setUpdateUser] = useState("");

  const updateUserServer = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lab/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: props.id,
        name: updateUser,
      }),
    });
    if (!res.ok) {
      throw new Error("error adding user");
    }
  };

  const mutation = useMutation({
    mutationFn: updateUserServer,
    onSuccess: () => {
      setUpdateUser(""), queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className="container">
          <div className="row">
            <label className="col-sm-4">User:</label>
            <input
              className="col-sm-6"
              type="text"
              placeholder="Change name"
              onChange={(event) => setUpdateUser(event.target.value)}
              value={updateUser}
            ></input>
            {updateUser}
            <button className="col-sm-2" onClick={mutation.mutate}>
              Update
            </button>
          </div>
          <div className="row">
            <div className="col-sm-10"></div>
            <button
              className="col-sm-2"
              onClick={() => {
                props.setUpdateModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default UpdateModal;

const Overlay = (props) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <UpdateModal id={props.id} setUpdateModal={props.setUpdateModal} />,
        document.querySelector("#modal-root")
      )}
    </div>
  );
};

export default Overlay;
