import React, { useState } from "react";

const faqData = [
  {
    question: "What is EC-PARTAGE?",
    answer: "EC-PARTAGE is a platform that helps Moroccan students by sharing knowledge, concours materials, and educational resources.",
  },
  {
    question: "How can I access past concours exams?",
    answer: "You can browse and download past concours exams directly from our 'Concours' page.",
  },
  {
    question: "Is EC-PARTAGE free to use?",
    answer: "Yes, EC-PARTAGE is completely free for students looking for study materials and exam resources.",
  },
  {
    question: "How do I contribute to EC-PARTAGE?",
    answer: "You can share your own study materials or concours experiences by contacting us through the 'Contact Us' page.",
  },
  {
    question: "How can I join your group?",
    answer: (
      <>
        You can join our WhatsApp group where we share all the latest news and concours updates.  
        Click here to join:  
        <a
          href="https://chat.whatsapp.com/your-group-link" // Replace with your actual WhatsApp group link
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-semibold hover:underline"
        >
          Join WhatsApp Group
        </a>
      </>
    ),
  },
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6">
        Frequently Asked Questions
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a question..."
        className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full text-left p-3 sm:p-4 font-medium text-base sm:text-lg flex justify-between items-center hover:text-blue-700"
                onClick={() => toggleQuestion(index)}
              >
                {faq.question}
                <span className="text-blue-700 text-lg sm:text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="p-3 sm:p-4 text-gray-600 bg-blue-100 rounded-md">
                  {faq.answer}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default FaqPage;
