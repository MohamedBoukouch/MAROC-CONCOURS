import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; // Social Media Icons
import { AiOutlineMail } from "react-icons/ai"; // Email Icon
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using EmailJS
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your service ID
        "YOUR_TEMPLATE_ID", // Replace with your template ID
        formData,
        "YOUR_USER_ID" // Replace with your user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormStatus("Your message has been sent! Thank you for contacting us.");
        },
        (error) => {
          console.log(error.text);
          setFormStatus("There was an error sending your message. Please try again.");
        }
      );

    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Contact Us</h1>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition">
            Send Message
          </button>
        </div>

        {formStatus && (
          <div className="mt-4 text-green-600 text-center">
            <p>{formStatus}</p>
          </div>
        )}
      </form>

      {/* Social Media Section */}
      <div className="mt-10 text-center">
        <h2 className="text-1.5xl font-bold text-blue-700 mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6">
          {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-800">
            <FaFacebook />
          </a> */}
          <a href="https://www.instagram.com/maroconcours" target="_blank" rel="noopener noreferrer" className="text-2xl text-pink-600 hover:text-pink-800">
            <FaInstagram />
          </a>
          <a href="https://www.x.com/medbkch" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-400 hover:text-blue-600">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/mohamed-boukouch-b889b824a/" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-700 hover:text-blue-900">
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Email Section */}
      <div className="mt-10 text-center">
        <h2 className="text-1xl font-bold text-blue-700 mb-4">Email Us Directly</h2>
        <p className="text-lg text-gray-700">
          If you prefer, you can also email us directly at
          <a href="mailto:your-email@example.com" className="text-blue-600 font-semibold hover:underline ml-1">
            <AiOutlineMail className="inline-block mb-1" /> boukouchmohamed7@gmail.com.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
