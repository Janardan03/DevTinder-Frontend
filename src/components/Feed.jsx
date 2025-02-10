import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async () => {

    if(feed) return;
    
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res.data.data));
    
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
  );
}

export default Feed;