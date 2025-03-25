import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConcoursPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Static list of concours (PDFs) with availability status
  const concoursList = [
    {
      id: 1,
      title: "CNC A",
      date: "2020/2021",
      pdfUrl: "https://drive.google.com/file/d/1fjrLdx7c5PAuh7MuGQVkWBFvSk0tkpB0/view",
      isAvailable: true,
    },
    {
      id: 2,
      title: "CNC B",
      date: "2021/2022",
      pdfUrl: "https://drive.google.com/file/d/1fjrLdx7c5PAuh7MuGQVkWBFvSk0tkpB0/view",
      isAvailable: true,
    },
    {
      id: 3,
      title: "CNC C",
      date: "2022/2023",
      pdfUrl: "https://drive.google.com/file/d/1fjrLdx7c5PAuh7MuGQVkWBFvSk0tkpB0/view",
      isAvailable: true,
    },
    {
      id: 4,
      title: "CNC A",
      date: "2023/2024",
      pdfUrl: "https://drive.google.com/file/d/1fjrLdx7c5PAuh7MuGQVkWBFvSk0tkpB0/view",
      isAvailable: true,
    },
    {
      id: 5,
      title: "CNC D",
      date: "2024/2025",
      pdfUrl: "https://drive.google.com/file/d/1fjrLdx7c5PAuh7MuGQVkWBFvSk0tkpB0/view",
      isAvailable: true,
    },
  ];

  const filteredConcours = concoursList.filter((concours) =>
    concours.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    concours.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenPdf = (url) => {
    try {
      // Open the Google Drive URL directly in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error opening PDF:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">Concours List</h1>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search Concours"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-1/2 border-2 border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredConcours.length === 0 ? (
          <p className="text-center text-lg text-gray-500">No concours found</p>
        ) : (
          filteredConcours.map((concours) => (
            <div
              key={concours.id}
              className={`border-2 p-4 rounded-lg shadow-md ${
                concours.isAvailable ? "bg-green-100" : "bg-gray-100"
              } transition-colors duration-300`}
            >
              <h2 className="font-semibold text-xl text-blue-600">{concours.title}</h2>
              <p className="text-sm text-gray-500">{concours.date}</p>
              <button
                onClick={() => handleOpenPdf(concours.pdfUrl)}
                className={`mt-4 px-4 py-2 rounded-full ${
                  concours.isAvailable ? "bg-green-500" : "bg-gray-400"
                } text-white`}
                disabled={!concours.isAvailable}
              >
                {concours.isAvailable ? "Open PDF" : "Not Available"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConcoursPage;
