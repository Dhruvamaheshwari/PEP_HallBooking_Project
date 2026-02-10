/** @format */

import React, { useContext, useState } from "react";
import MoviContext from "./MoviContext";
import { useNavigate } from "react-router";

const BookHall = () => {
  const { AllData } = useContext(MoviContext);
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  const bookingData = AllData && AllData[0];
  const movie = bookingData?.movie;
  const hall = bookingData?.hall;

  const handleConfirmBooking = () => {
    setIsBooked(true);
  };

  if (!bookingData || !movie || !hall) {
    return (
      <div className="app-shell flex items-center justify-center px-6">
        <div className="text-center card-surface rounded-2xl px-8 py-10 fade-up">
          <p className="text-zinc-500 mb-6">No booking data found</p>
          <button
            className="text-zinc-950 text-sm font-medium hover:text-zinc-700 transition-colors duration-150 cursor-pointer"
            onClick={() => navigate("/")}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="app-shell flex items-center justify-center px-6">
        <div className="text-center max-w-sm card-surface rounded-2xl px-8 py-10 fade-up">
          <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-zinc-200 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-xl font-medium text-zinc-950 mb-2">Confirmed</h1>
          <p className="text-zinc-500 text-sm mb-8">
            {movie.Title} at {hall.name}
            <br />
            {date} · {time}
          </p>
          <button
            className="text-zinc-950 text-sm font-semibold hover:text-zinc-700 transition-colors duration-150 cursor-pointer"
            onClick={() => navigate("/")}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell px-6 py-24">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Side: Movie Info */}
        <div className="w-full lg:w-1/3 fade-up">
          <button
            onClick={() => navigate(-1)}
            className="group text-zinc-400 text-xs font-bold uppercase tracking-widest mb-10 hover:text-zinc-950 transition-all flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-all">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            Back to theatres
          </button>

          <div className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-zinc-300/50 mb-8">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <p className="text-zinc-300 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                {movie.Year} • {movie.Type}
              </p>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {movie.Title}
              </h1>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-zinc-100 shadow-sm">
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              Location
            </p>
            <h2 className="text-xl font-bold text-zinc-950 mb-1">
              {hall.name}
            </h2>
            <p className="text-zinc-500 text-sm">
              {hall.location}, {hall.city}
            </p>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div
          className="flex-1 w-full fade-up"
          style={{ animationDelay: "150ms" }}>
          <div className="card-surface rounded-[2.5rem] p-10 sm:p-12 shadow-2xl shadow-zinc-200/50">
            <h2 className="text-3xl font-bold text-zinc-950 mb-10 tracking-tight">
              Reserve your seats
            </h2>

            <div className="space-y-12 mb-12">
              <div>
                <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-6">
                  Select Performance Date
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full text-2xl font-bold bg-transparent border-b-2 border-zinc-100 py-4 focus:outline-none focus:border-zinc-950 transition-all cursor-pointer"
                  />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] block mb-6">
                  Available Showtimes
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "9:00 AM - 12:00PM",
                    "1:00 PM - 4:00 PM",
                    "5:00 PM : 8:00 PM",
                    "9:00 PM : 12:00 AM",
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`py-6 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
                        time === t ?
                          "bg-zinc-950 text-white border-zinc-950 scale-[1.02] shadow-xl shadow-zinc-900/20"
                        : "bg-white text-zinc-500 border-zinc-50 hover:border-zinc-200 hover:text-zinc-900"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-8 border-t border-zinc-100 mb-10">
              <div>
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Total experience price
                </p>
                <p className="text-4xl font-black text-zinc-950 tracking-tighter">
                  {hall.priceRange}
                </p>
              </div>
              <div className="text-zinc-300">
                <svg
                  className="w-12 h-12"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
            </div>

            <button
              className="w-full py-8 bg-zinc-950 text-white text-xs font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-zinc-800 active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-10 disabled:grayscale shadow-2xl shadow-zinc-900/40"
              onClick={handleConfirmBooking}
              disabled={!date || !time}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHall;
