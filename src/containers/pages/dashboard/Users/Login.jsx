import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El email no es válido.";
    if (!formData.contrasena.trim())
      newErrors.contrasena = "La contraseña es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Realizar la solicitud POST a la API
        const response = await fetch(
          "http://localhost:8080/api/sesiones/iniciar-sesion",
          {
            method: "POST", // Cambiar a POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email.trim(),
              contrasena: formData.contrasena.trim(),
            }),
          }
        );

        if (response.ok) {
          const responseBody = await response.json();
          localStorage.setItem("usuario", JSON.stringify(responseBody));
          setSuccessMessage("Sesión iniciada con éxito.");
          // Si es necesario, redirigir a otra página después de un tiempo
          setTimeout(() => {
            window.location.href = "/"; // Redirigir al dashboard, por ejemplo
          }, 2000); // Espera 2 segundos para redirigir
        } else {
          const responseBody = await response.json();
          alert(
            responseBody.message ||
              "Error: Verifica tus credenciales e intenta nuevamente."
          );
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

        {/* Mensaje de éxito al iniciar sesión */}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 mb-4 text-center rounded">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="contrasena"
            className="block text-gray-700 font-bold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.contrasena ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.contrasena && (
            <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>

        <div className="mt-4 text-center">
          <Link to="/recoverpassword" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
