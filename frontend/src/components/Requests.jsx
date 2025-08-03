import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect,  } from "react";
import Error from "./Error";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
        await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err){
        // console.log(err);
        <Error/>
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err){
        // console.log(err);
        <Error/>
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="font-bold  text-3xl flex justify-center my-5"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold  text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto "
          >
            <div className="flex ">
            <div className="w-auto">
              <img
                alt="photo"
                className="md:size-20 size-12 object-cover rounded-full"
                src={photoUrl}
              />
            </div>
            
            <div className="text-left mx-4 w-auto">
              <h2 className="font-bold text-lg md:text-xl">
                {(firstName + " " + lastName).length>15?firstName:firstName+" "+lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <span className="overflow-x-scroll">{about}</span>
            </div>
            </div>
            <div>
            <div className=" flex md:flex-row flex-col">
              <button
                className="btn btn-primary  my-2 md:my-0 w-auto"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary ml-2 w-auto"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  
  );
};
export default Requests;