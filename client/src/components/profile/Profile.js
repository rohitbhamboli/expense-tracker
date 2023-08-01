import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./profile.css";
import Avatar from "../../images/avatar.png";
import { authUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const Profile = () => {
  const navigate = useNavigate();
  const [aboutData, setAboutData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAboutData = async () => {
      setLoading(true);
      try {
        const data = await authUser();
        setLoading(false);
        setAboutData(data);

        if (!data.status === 200) {
          throw new Error(data.error);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching Profile data:", error);
        navigate("/login");
      }
    };

    fetchAboutData();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />

      {loading ? (
        <Spinner />
      ) : (
        <div className="card">
          <div className="avatar">
            <img src={Avatar} alt="dp" />
          </div>
          <div className="card-row">
            <div className="row-1">
              <p>Name</p>
              <p>User ID</p>
              <p>E-Mail</p>
              <p>Phone</p>
              <p>Profession</p>
            </div>
            <div className="row-2">
              <p>{aboutData.name || `-`}</p>
              <p>{aboutData._id || `-`}</p>
              <p>{aboutData.email || `-`}</p>
              <p>{aboutData.phone || `-`}</p>
              <p>{aboutData.profession || `-`}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
