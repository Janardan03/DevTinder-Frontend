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

  if(!feed) return;

  if(feed.length <= 0) return <h1 className="flex justify-center my-10">No new users found!!!</h1>

  return (
    <div className="flex justify-center my-10">
      <UserCard key={feed[0]._id} user={feed[0]}/>
    </div>
  );
}

export default Feed;