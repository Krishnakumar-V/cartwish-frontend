import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address" })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

const LoginPage = () => {
  const [formError, setformError] = useState("");
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const { state } = location;
      window.location = state ? state.form : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setformError(err.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email === "required" && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password === "required" && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="form_submit search_button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
