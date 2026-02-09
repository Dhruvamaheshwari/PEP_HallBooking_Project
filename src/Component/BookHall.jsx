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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-zinc-500 mb-6">No booking data found</p>
          <button
            className="text-white text-sm hover:text-zinc-400 transition-colors duration-150 cursor-pointer"
            onClick={() => navigate("/")}>
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-zinc-800 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
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
          <h1 className="text-xl font-medium text-white mb-2">Confirmed</h1>
          <p className="text-zinc-500 text-sm mb-8">
            {movie.Title} at {hall.name}
            <br />
            {date} · {time}
          </p>
          <button
            className="text-zinc-500 text-sm hover:text-white transition-colors duration-150 cursor-pointer"
            onClick={() => navigate("/")}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-zinc-600 text-sm mb-8 hover:text-white transition-colors duration-150 cursor-pointer flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="flex gap-4 mb-8">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-20 h-28 object-cover rounded-lg"
          />
          <div>
            <h1 className="text-lg font-medium text-white mb-1">
              {movie.Title}
            </h1>
            <p className="text-zinc-600 text-sm mb-2">{movie.Year}</p>
            <p className="text-zinc-500 text-sm">{hall.name}</p>
            <p className="text-zinc-600 text-xs">{hall.city}</p>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div>
            <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-3">
              Date
            </label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-0 py-3  bg-transparent border-b border-zinc-800 text-white focus:outline-none focus:border-zinc-700 transition-colors duration-200  [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                            // className="w-full px-0 py-3 bg-transparent border-b border-zinc-900 text-white focus:outline-none focus:border-zinc-700 transition-colors duration-200 "
            />
            
          </div>
          <div>
            <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-3">
              Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["9:00 AM - 12:00PM", "1:00 PM - 4:00 PM", "5:00 PM : 8:00 PM", "9:00 PM : 12:00 AM"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`py-3 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                    time === t ?
                      "bg-white text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-zinc-900 mb-6">
          <span className="text-zinc-500 text-sm">Price</span>
          <span className="text-white font-medium">{hall.priceRange}</span>
        </div>

        <button
          className="w-full py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleConfirmBooking}
          disabled={!date || !time}>
          Confirm booking
        </button>
      </div>
    </div>
  );
};

export default BookHall;
