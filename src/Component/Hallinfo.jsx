/** @format */

import React, { useContext } from "react";
import movieHallsData from "../data/movieHalls.json";
import MoviContext from "./MoviContext";
import { useNavigate } from "react-router";

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
    <div className="app-shell px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 fade-up">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Location Selection
          </p>
          <h1 className="text-4xl font-bold text-zinc-950 tracking-tight">
            Select theatre
          </h1>
        </div>

        <div className="space-y-6">
          {movieHalls.map((hall, ind) => (
            <div
              key={hall.id}
              style={{ animationDelay: `${ind * 50}ms` }}
              className="group relative flex items-center justify-between p-8 rounded-[2rem] card-surface hover-lift hover:border-zinc-950 transition-all duration-300 cursor-pointer fade-up"
              onClick={() => HandleBook(ind)}>
              <div className="flex items-center gap-8">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-xl shadow-zinc-200/50">
                  <img
                    src={hall.image}
                    alt={hall.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-zinc-900 mb-2 group-hover:text-black transition-colors">
                    {hall.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <p className="text-zinc-500 text-sm font-medium">
                      {hall.location}, {hall.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-right hidden sm:block">
                  <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Starting from
                  </p>
                  <p className="text-2xl font-bold text-zinc-950 tracking-tight">
                    {hall.priceRange.split("-")[0]}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-lg font-bold">{hall.rating}</span>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">
                    Rating
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all duration-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hallinfo;
