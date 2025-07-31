import React from "react";

const LanguageList = (props) => {
  return (
    <>
      <div className="row ">
        <div className="col-sm-10 ">{props.language}</div>
        <button
          className="col-sm-2"
          onClick={() => props.deleteLang(props.language)}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default LanguageList;
