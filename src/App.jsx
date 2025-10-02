import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialWords } from "./data/initialWords";
import NewWords from "./pages/NewWords";
import DailyReview from "./pages/DailyReview";
import FlashcardNew from "./pages/FlashCardNew";
import AllWords from "./pages/Allwords";
import Statistics from "./pages/Statistics";

/* ---------- Bottom Nav (mobil) ---------- */
const navItems = [
  { to: "/", label: "Yangi", icon: "➕" },
  { to: "/flashcard-new", label:"Flash", icon: "🃏" },
  { to: "/daily", label: "Takror", icon: "🔁" },
  { to: "/all", label: "Barcha", icon: "📚" },
  { to: "/stats", label: "Stat", icon: "📊" },
];

function BottomNav() {
  const loc = useLocation();
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50">
      {navItems.map(({ to, label, icon }) => (
        <Link
          key={to}
          to={to}
          className={`flex flex-col items-center text-xs px-2 py-1 rounded ${
            loc.pathname === to ? "text-purple-700 font-semibold" : "text-gray-500"
          }`}
        >
          <span className="text-lg">{icon}</span>
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}

/* ---------- Desktop Top Nav (oldingidek) ---------- */
function TopNav() {
  return (
    <nav className="hidden md:flex bg-white shadow px-4 py-3 gap-4 justify-center">
      <Link className="text-purple-700 font-semibold" to="/">Yangi</Link>
      <Link className="text-purple-700 font-semibold" to="/flashcard-new">Flash (Yangi)</Link>
      <Link className="text-purple-700 font-semibold" to="/daily">Takrorlash</Link>
      <Link className="text-purple-700 font-semibold" to="/all">Barcha</Link>
      <Link className="text-purple-700 font-semibold" to="/stats">Statistika</Link>
      <button
        onClick={() => {
          localStorage.removeItem("words");
          location.reload();
        }}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
      >
        🔄
      </button>
    </nav>
  );
}

/* ---------- Asosiy App ---------- */
export default function App() {
  const [words, setWords] = useLocalStorage("words", initialWords);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 pb-20 md:pb-0">
        <TopNav />
        <Routes>
          <Route path="/" element={<NewWords words={words} setWords={setWords} />} />
          <Route path="/flashcard-new" element={<FlashcardNew words={words} setWords={setWords} />} />
          <Route path="/daily" element={<DailyReview words={words} setWords={setWords} />} />
          <Route path="/all" element={<AllWords words={words} />} />
          <Route path="/stats" element={<Statistics words={words} />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}