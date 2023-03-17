import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetailIdRaza, cleanDetail } from "../../Redux/actions";
import { Link } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state)=>state)
  let cleanId = id.substring(1, id.length);

  useEffect(() => {
    try {
      dispatch(getDetailIdRaza(cleanId));
    } catch (error) {
      window.alert(error.message);
    }
    return () => {
      dispatch(cleanDetail());
    };
  }, [cleanId, dispatch]);

  return <div>
  
  <h1>{state?.dogDetail?.name}</h1>
  <img src={state?.dogDetail?.image?state.dogDetail.image:"https://opengameart.org/sites/default/files/wolf_tail.gif"} alt="" />
  <h2>{state?.dogDetail?.height}</h2>
  <h2>{state?.dogDetail?.weight}</h2>
  <span>{state?.dogDetail?.temperament?state.dogDetail.temperament:state.dogDetail.temperaments}</span>
  <h3>{state?.dogDetail?.lifeSpan}</h3>
  
  <Link to={"/Home"}>
  <button>Back</button>
  </Link>
  
  </div>;
};

export default DetailPage;
