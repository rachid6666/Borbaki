import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Account from "./pages/account/Account";
import Ticket from "./pages/ticket/Ticket";
import Checkout from "./pages/checkout/Checkout";
import Notifications from "./pages/notify/Notifications";
import Bookings from"./pages/bookings/bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="account" element={<Account/>}/>
        <Route path="tickets" element={<Ticket/>}/>
        <Route path="checkout" element={<Checkout/>} />
        <Route path="notifications" element={<Notifications/>} />
        <Route path="bookings" element={<Bookings/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
