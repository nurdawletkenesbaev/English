import React from "react";
import { getTodayISO } from "../utils/spacedRepetition";

export default function Progress({ words }) {
  const today = getTodayISO();
  const due = words.filter(w => w.nextReviewDate === today || !w.nextReviewDate).length;
  const learned = words.filter(w => w.currentDay > 0).length;

  return (
    <div className="mt-4 flex justify-center gap-6 text-sm">
      <div className="bg-white px-4 py-2 rounded-lg shadow">
        🔁 Bugun: <span className="font-bold text-purple-700">{due}</span>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow">
        ✅ O'rganilgan: <span className="font-bold text-green-700">{learned}</span>
      </div>
      <div className="bg-white px-4 py-2 rounded-lg shadow">
        📊 Jami: <span className="font-bold">{words.length}</span>
      </div>
    </div>
  );
}