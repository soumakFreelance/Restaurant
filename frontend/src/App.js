import './App.css';
import Home from './Screener/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './Screener/Login';
import Signup from './Screener/Signup';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from './Screener/MyOrder';
import { AuthProvider } from './Authentication/AuthContext';
import PrivateRoute from './Authentication/PrivateRoute';

function App() {
  return (
    <>
      <CartProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route
                path="/MyOrder"
                element={<PrivateRoute element={<MyOrder />} />}
              />
              {/* <Route
                path="/Home"
                element={<PrivateRoute element={<Home />} />}
              /> */}
            </Routes>
          </Router>
        </AuthProvider>
      </CartProvider>
    </>
  );
}

export default App;
