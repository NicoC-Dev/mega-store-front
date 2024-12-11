import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    contrasena: "",
    contrasenaRepetida: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellido.trim())
      newErrors.apellido = "El apellido es obligatorio.";
    if (!formData.telefono.trim())
      newErrors.telefono = "El teléfono es obligatorio.";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El email no es válido.";
    if (!formData.contrasena.trim())
      newErrors.contrasena = "La contraseña es obligatoria.";
    if (formData.contrasena.length < 6)
      newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
    if (formData.contrasena !== formData.contrasenaRepetida) {
      newErrors.contrasenaRepetida = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/usuarios/registrar_usuario",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: formData.nombre,
              apellido: formData.apellido,
              telefono: formData.telefono,
              email: formData.email,
              contrasena: formData.contrasena,
              contrasenaRepetida: formData.contrasenaRepetida, // Asegúrate de incluir esto
            }),
          }
        );

        const responseBody = await response.json();
        if (!response.ok) {
          console.error("Error en la respuesta:", responseBody);
          alert(
            `Error: ${
              responseBody.message || "No se pudo registrar el usuario"
            }`
          );
          return;
        }

        console.log("Usuario registrado:", responseBody);
        alert("Registro exitoso");

        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          contrasena: "",
          contrasenaRepetida: "", // Resetear también este campo
        });
        setErrors({});
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Ocurrió un error, por favor intenta nuevamente.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Registro de Usuario
        </h2>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label
              htmlFor={key}
              className="block text-gray-700 font-bold mb-2 capitalize"
            >
              {key === "contrasenaRepetida" ? "Confirmar Contraseña" : key}
            </label>
            <input
              type={
                key.includes("contrasena")
                  ? "password"
                  : key === "email"
                  ? "email"
                  : "text"
              }
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors[key] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[key] && (
              <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Registrarse
        </button>

        {/* Enlace de navegación al login */}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
