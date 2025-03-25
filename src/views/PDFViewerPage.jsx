import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PDFViewerPage = () => {
  const location = useLocation();
  const [pdfUrl, setPdfUrl] = useState("");

  // Parse the query parameter from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pdfPath = urlParams.get("pdfUrl");
    setPdfUrl(pdfPath);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">PDF Viewer</h1>
      {pdfUrl ? (
        <div className="flex justify-center">
          <iframe
            src='/assets/pdfs/TP1.pdf'
            width="100%"
            height="800px"
            frameBorder="0"
            title="PDF Viewer"
            className="border-2 border-gray-300 rounded-md"
          ></iframe>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewerPage;
