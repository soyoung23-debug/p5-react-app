import { Routes, Route } from "react-router";
import { Homepage } from "./pages/Homepage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { CheckLocation } from "./pages/CheckLocation";
import { Search } from "./components/Search";
import { SavedCities } from "./pages/SavedCities";
import { StationDetail } from "./pages/StationDetail";
import { NotFound } from "./pages/NotFound";


function App() {

  return (
    <>
      
      <hr />

      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checklocation" element={<CheckLocation />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved-cities" element={<SavedCities />}  />
        <Route path="/station/:uid" element={<StationDetail />} />

        <Route path="*" element={<NotFound />} />

      </Routes>


      
    </>
  )
}

export default App
