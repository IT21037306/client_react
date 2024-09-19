import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "../../state"; // Adjust the import based on your file structure

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:8090/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Failed to authenticate user");
          }
        })
        .then((resObject) => {
          console.log(resObject.user);
          console.log(resObject.token);

          dispatch(
            setCredentials({ user: resObject.user, token: resObject.token })
          );
          navigate("/user/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
