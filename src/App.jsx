import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Header from "./components/Header";
import AddVehicle from "./components/AddVehicle";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="vehicle/add" element={<AddVehicle />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
