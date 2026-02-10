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
  const api = import.meta.env.VITE_MOVI_API;
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
        <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 py-16 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 fade-up">
        <div>
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-[0.2em] mb-2">
            Cinema Experience
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-950 tracking-tight reveal-text">
            NOW SHOWING
          </h1>
        </div>
        <span className="text-zinc-400 text-sm font-medium mb-1">
          {movie.length} premium titles
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {movie.map((val, ind) => (
          <div
            onClick={() => HandleHall(ind)}
            onMouseEnter={() => setHoveredIndex(ind)}
            onMouseLeave={() => setHoveredIndex(null)}
            key={ind}
            style={{ animationDelay: `${ind * 100}ms` }}
            className={`group flex flex-col sm:flex-row gap-8 p-8 rounded-3xl cursor-pointer card-surface fade-up hover-lift ${
              hoveredIndex === ind ? "border-zinc-900 bg-white" : ""
            }`}>
            <div className="relative flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl shadow-zinc-200/50">
              <img
                src={
                  val.Poster !== "N/A" ?
                    val.Poster
                  : "https://via.placeholder.com/200x300/f4f4f5/71717a?text=No+Image"
                }
                alt={val.Title}
                className={`w-full sm:w-48 h-72 sm:h-64 object-cover transition-transform duration-700 ease-out ${
                  hoveredIndex === ind ? "scale-110" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex-1 flex flex-col justify-center py-2">
              <div className="mb-6">
                <h3
                  className={`text-2xl sm:text-3xl font-bold mb-3 leading-tight transition-colors duration-300 ${
                    hoveredIndex === ind ? "text-black" : "text-zinc-800"
                  }`}>
                  {val.Title}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-zinc-100 rounded-full text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                    {val.Year}
                  </span>
                  <span className="px-3 py-1 bg-zinc-100 rounded-full text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                    {val.Type}
                  </span>
                </div>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-2">
                Experience {val.Title} in stunning 4K laser projection with
                immersive Dolby Atmos sound at our flagship locations.
              </p>

              <div
                className={`flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  hoveredIndex === ind ?
                    "text-black translate-x-2"
                  : "text-zinc-400"
                }`}>
                <span>reserve experience</span>
                <div className="w-12 h-[1px] bg-current" />
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
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
