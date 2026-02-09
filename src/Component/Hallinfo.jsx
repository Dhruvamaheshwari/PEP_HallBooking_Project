/** @format */

import React, { useContext } from "react";
import movieHallsData from "../data/movieHalls.json";
import MoviContext from "./MoviContext";
import { Link, useNavigate } from "react-router";

const Hallinfo = () => {
  const { movieHalls } = movieHallsData;
  const { ClickInd, movie, setHallInd, setAllData } = useContext(MoviContext);
  const nav = useNavigate();

  function HandleBook(ind) {
    setHallInd(movieHalls[ind]);
    setAllData([{ movie: movie[ClickInd], hall: movieHalls[ind] }]);
    nav("/book");
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-medium text-white mb-8">Select theatre</h1>
        <div className="space-y-3">
          {movieHalls.map((hall, ind) => (
            <div
              key={hall.id}
              className="group flex items-center justify-between p-4 rounded-lg border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/50 transition-all duration-150 cursor-pointer"
              onClick={() => HandleBook(ind)}>
              <div className="flex items-center gap-4">
                <img
                  src={hall.image}
                  alt={hall.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-white font-medium mb-1 group-hover:text-zinc-300 transition-colors duration-150">
                    {hall.name}
                  </h2>
                  <p className="text-zinc-600 text-sm">
                    {hall.location}, {hall.city}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-zinc-500 text-xs mb-1">
                    {hall.totalScreens} screens
                  </p>
                  <p className="text-white text-sm font-medium">
                    {hall.priceRange}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-zinc-600">
                  <span className="text-sm">{hall.rating}</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <svg
                  className="w-5 h-5 text-zinc-700 group-hover:text-zinc-500 group-hover:translate-x-1 transition-all duration-150"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hallinfo;
