"use client";

import { FormEvent, useState } from "react";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  contexto: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    contexto: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Console log the form data
    console.log("Form submitted with data:", formData);

    // Simulate a short delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSubmitted(true);
    setLoading(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        contexto: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-[#7BF542]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-black mb-2">¡Gracias!</h3>
        <p className="text-[#6B6B6B]">
          Hemos recibido tu solicitud. Nos pondremos en contacto contigo dentro
          de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 space-y-6"
    >
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-black mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-gray-300 focus:border-[#7BF542] outline-none py-2 transition-colors text-black placeholder-gray-400"
          placeholder="Tu nombre"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
          Email de empresa *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-gray-300 focus:border-[#7BF542] outline-none py-2 transition-colors text-black placeholder-gray-400"
          placeholder="tu@empresa.com"
        />
      </div>

      {/* Telefono */}
      <div>
        <label htmlFor="telefono" className="block text-sm font-medium text-black mb-2">
          Teléfono *
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-gray-300 focus:border-[#7BF542] outline-none py-2 transition-colors text-black placeholder-gray-400"
          placeholder="+34 XXX XXX XXX"
        />
      </div>

      {/* Contexto */}
      <div>
        <label htmlFor="contexto" className="block text-sm font-medium text-black mb-2">
          Contexto (necesidad, volumen de llamadas diario, etc.) *
        </label>
        <textarea
          id="contexto"
          name="contexto"
          value={formData.contexto}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-transparent border-b border-gray-300 focus:border-[#7BF542] outline-none py-2 transition-colors text-black placeholder-gray-400 resize-none"
          placeholder="Cuéntanos sobre tu empresa y tus necesidades..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#7BF542] text-black font-semibold py-3 px-6 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-8"
      >
        {loading ? "Enviando..." : "Reserva una llamada →"}
      </button>
    </form>
  );
}
