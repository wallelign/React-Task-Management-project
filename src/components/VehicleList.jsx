import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function VehicleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch current month's Vehicle data
  const fetchVehicleData = async () => {
    const response = await fetch("http://localhost:5000/api/vehicle");
    if (!response.ok) {
      throw new Error("Failed to fetch Vehicle data");
    }
    return response.json();
  };

  const {
    data: Vehicles = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["VehicleData"],
    queryFn: fetchVehicleData,
  });

  const filteredVehicles = Vehicles.filter((Vehicle) => {
    const status = Vehicle.status || "";
    const name = Vehicle.name || "";
    return (
      status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  return (
    <>
      <h1 className="font-sans font-semibold text-xl ml-6 mt-2">Vehicles</h1>
      <div className="flex justify-between items-center mt-4 mx-4">
        <input
          type="text"
          placeholder="Search by source or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <div>
          <a
            href="vehicle/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Add Vehicle
          </a>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : error ? (
        <p className="text-center mt-4 text-red-500">Error fetching data</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((Vehicle) => (
                <tr
                  key={Vehicle._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {Vehicle.date &&
                      new Date(Vehicle.date).toLocaleDateString()}
                  </th>
                  <td className="px-6 py-4">{Vehicle.name}</td>
                  <td className="px-6 py-4">{Vehicle.status}</td>
                  <td className="px-6 py-4">
                    {Vehicle.updatedAt &&
                      new Date(Vehicle.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4 self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default VehicleList;
