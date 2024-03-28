"use client";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import gsap from "gsap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCV = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-xl w-full">
        <button onClick={onClose} className="float-right font-bold">
          X
        </button>
        <iframe
          src="CV.pdf"
          frameBorder="0"
          style={{ width: "100%", height: "80vh" }}></iframe>
      </div>
    </div>
  );
};

export default function Home() {
  function validate(formData) {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "L'email est requis.";
    tempErrors.message = formData.message ? "" : "Le message est requis.";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "L'email est invalide.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).every((x) => !tempErrors[x]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      email: event.target.email.value,
      message: event.target.message.value,
    };

    const response = await fetch("https://127.0.0.1:8000/api/send-email ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success("Email envoyé avec succès !");
    } else {
      toast.error("Échec de l'envoi de l'email.");
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
  useEffect(() => {
    gsap.to(".animate-name", {
      duration: 1,
      y: -20,
      opacity: 1,
      ease: "power3.out",
    });
  }, []);

  const technologies = [
    { name: "React", src: "/react.svg" },
    { name: "Symfony", src: "/symfony.svg" },
    { name: "AdonisJS", src: "/adonis.png" },
    { name: "WordPress", src: "/wp.webp" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex space-x-4">
              <button
                onClick={() => scrollToSection("home")}
                className="py-2 px-3 text-gray-700 hover:text-gray-900">
                Accueil
              </button>
              <button
                onClick={() => scrollToSection("technologies")}
                className="py-2 px-3 text-gray-700 hover:text-gray-900">
                Technologies
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="py-2 px-3 text-gray-700 hover:text-gray-900">
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="home"
        className="flex flex-col items-center justify-center min-h-screen bg-white pt-20">
        <div className="w-40 h-40 mb-6">
          <Image
            src="/simon1.jpg"
            alt="De Boe Simon"
            className="rounded-full"
            width={160}
            height={160}
            layout="responsive"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-2 animate-name">
            De Boe Simon
          </h1>
          <p className="text-lg lg:text-2xl">Développeur Full stack</p>
        </div>
        <div className="flex space-x-4 justify-center items-center mt-4">
          <a
            href="https://github.com/SimonDB0"
            target="_blank"
            rel="noopener noreferrer">
            <Image src="/github.png" alt="GitHub" width={40} height={40} />
          </a>
          <a
            href="https://www.linkedin.com/in/simon-de-boe/"
            target="_blank"
            rel="noopener noreferrer">
            <Image src="/linkedin.png" alt="LinkedIn" width={40} height={40} />
          </a>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-slate-950 text-white rounded hover:bg-blue-700">
            Voir mon CV
          </button>
        </div>
      </div>

      <div
        id="technologies"
        className="bg-gray-200 min-h-screen flex flex-col items-center justify-center py-10 pt-20">
        <h2 className="text-3xl font-bold mb-6">Technologies Utilisées</h2>
        <div className="flex flex-wrap justify-center items-center gap-10">
          {technologies.map((tech, index) => (
            <div key={index} className="text-center">
              <Image src={tech.src} alt={tech.name} width={80} height={80} />
              <p className="text-xl mt-2">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        id="contact"
        className="bg-white min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="bg-white shadow-xl rounded-lg px-10 py-8 mb-10 max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-6">Contactez-moi</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-800 text-lg font-semibold mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="form-input w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-800 text-lg font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="form-textarea w-full px-3 py-2 border rounded"></textarea>
            </div>
            <div className="text-right">
              <button
                className="bg-slate-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                type="submit">
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>

      <ModalCV isOpen={isModalOpen} onClose={handleCloseModal} />
      <ToastContainer />
    </>
  );
}
