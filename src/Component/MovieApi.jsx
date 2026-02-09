/** @format */

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import MoviContext from "./MoviContext";

const MovieApi = () => {
  const { movie, setMovie, ClickInd, setCLickInd } = useContext(MoviContext);
  const nav = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = import.meta.env.VITE_MOVI_API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.omdbapi.com/?apikey=${api}=Avengers`)
      .then((data) => {
        setMovie(data.data.Search);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function HandleHall(ind) {
    setCLickInd(ind);
    nav("/hall");
  }

  if (loading) {
    return (
      <div className="px-6 py-24 flex justify-center">
        <div className="w-6 h-6 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium text-white">Now showing</h1>
        <span className="text-zinc-600 text-sm">{movie.length} movies</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {movie.map((val, ind) => (
          <div
            onClick={() => HandleHall(ind)}
            onMouseEnter={() => setHoveredIndex(ind)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={ind}
            className={`group flex gap-5 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
              hoveredIndex === ind ?
                "bg-zinc-900/80 border-zinc-800 scale-[1.02]"
              : "bg-zinc-900/30 border-zinc-900 hover:border-zinc-800"
            }`}>
            <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={
                  val.Poster !== "N/A" ?
                    val.Poster
                  : "https://via.placeholder.com/80x120/18181b/52525b?text=No+Image"
                }
                alt={val.Title}
                className={`w-32 h-44 object-cover transition-all duration-300 ${
                  hoveredIndex === ind ? "scale-105" : ""
                }`}
              />
            </div>

            <div className="flex-1 min-w-0 py-2">
              <h3
                className={`text-lg font-medium mb-3 line-clamp-2 transition-colors duration-150 ${
                  hoveredIndex === ind ? "text-white" : "text-zinc-300"
                }`}>
                {val.Title}
              </h3>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-sm">Year</span>
                  <span className="text-zinc-400 text-sm">{val.Year}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-sm">Type</span>
                  <span className="text-zinc-400 text-sm capitalize">
                    {val.Type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-zinc-600 text-sm">IMDB</span>
                  <span className="text-zinc-500 text-sm font-mono">
                    {val.imdbID}
                  </span>
                </div>
              </div>

              <div
                className={`mt-4 flex items-center gap-1.5 text-sm transition-all duration-200 ${
                  hoveredIndex === ind ?
                    "text-zinc-400 translate-x-1"
                  : "text-zinc-600"
                }`}>
                <span>Book tickets</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieApi;
