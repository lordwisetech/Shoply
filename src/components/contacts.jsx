import React, { useState } from "react";
import { Link } from "react-router";
import Footer from "./Footer.jsx"; // Adjust path if Footer is in another folder

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    // Process form submission
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 4 seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      {/* Top Banner / Breadcrumb Header */}
      <div
        className="container-fluid py-5 text-center bg-dark"
        style={{
          marginTop: "100px",
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white display-6 fw-bold">Contact Us</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ color: "#81c408" }}
            >
              Home
            </Link>
          </li>
          <li className="breadcrumb-item text-white active" aria-current="page">
            Contact
          </li>
        </ol>
      </div>

      {/* Contact Section Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                  <h1 className="text-primary">Get in touch</h1>
                  <p className="text-muted">
                    Have questions about our products, orders, or services? Send us a
                    message and our team will get back to you right away!
                  </p>
                </div>
              </div>

              {/* Google Maps iFrame */}
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    className="rounded w-100"
                    style={{ height: "400px", border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Store Location"
                  ></iframe>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-lg-7">
                {submitted && (
                  <div className="alert alert-success fw-bold text-center mb-4">
                    <i className="fas fa-check-circle me-2"></i>
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-100 form-control border-0 mb-4"
                    rows="5"
                    cols="10"
                    placeholder="Your Message"
                    required
                  ></textarea>
                  <button
                    className="w-100 btn form-control border-secondary py-3 bg-white text-primary fw-bold"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Info Sidebar */}
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white shadow-sm">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">123 Street New York, USA</p>
                  </div>
                </div>

                <div className="d-flex p-4 rounded mb-4 bg-white shadow-sm">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">info@example.com</p>
                  </div>
                </div>

                <div className="d-flex p-4 rounded bg-white shadow-sm">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section End */}

      <Footer />
    </>
  );
}