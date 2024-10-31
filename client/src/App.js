import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import MessengerPage from "./pages/MessengerPage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact Component={MainPage} />
          <Route path="/messenger" Component={MessengerPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
