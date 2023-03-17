import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "component/loading/LoadingSkeleton";

const MoviesCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <>
      <div className="movies-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
        <img
          src={tmdbAPI.getImageW500(poster_path)}
          alt="endgame"
          className="w-full h-[250px] object-cover rounded-lg mb-5 "
        />
        <div className="flex flex-col flex-1">
          <h3 className=" text-xl font-bold mb-3">{title}</h3>
          <div className="flex items-center justify-between text-sm opacity-50 mb-10">
            <span>{new Date(release_date).getFullYear()}</span>
            <span>{vote_average}</span>
          </div>
          <Button onClick={() => navigate(`/movies/${id}`)}>Watch now</Button>
        </div>
      </div>
    </>
  );
};
MoviesCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Some thing went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MoviesCard, {
  FallbackComponent,
});
export const MovieCardSkeleton = () => {
  return (
    <>
      <div className="movies-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
        <LoadingSkeleton
          height={"250px"}
          radius={"8px"}
          className={"mb-5"}
        ></LoadingSkeleton>
        <div className="flex flex-col flex-1">
          <h3 className=" text-xl font-bold mb-3">
            <LoadingSkeleton height={"20px"} radius={"4px"}></LoadingSkeleton>
          </h3>
          <div className="flex items-center justify-between text-sm opacity-50 mb-10">
            <span>
              <LoadingSkeleton
                width={"50px"}
                height={"12px"}
                radius={"4px"}
              ></LoadingSkeleton>
            </span>
            <span>
              <LoadingSkeleton
                width={"30px"}
                height={"12px"}
                radius={"4px"}
              ></LoadingSkeleton>
            </span>
          </div>
          <LoadingSkeleton height={"40px"} radius={"8px"}></LoadingSkeleton>
        </div>
      </div>
    </>
  );
};
