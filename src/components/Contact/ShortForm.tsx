"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { email };
    try {
      const response = await fetch("/api/contact", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="bg-secondaryBg text-secondaryText p-8 rounded-lg shadow-lg">
      <h5 className="text-center mb-4">{t("hero:email_to_early_access")}.</h5>
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          {/* <label className="block text-gray-300 mb-2" htmlFor="email">
          </label> */}
          <input
            id="email"
            type="email"
            placeholder={`${t("enter_email")}`}
            className="w-full p-2 pr-20 border border-gray-700 rounded text-primaryText"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 py-1 px-4 bg-gradient-to-r from-[#F54EA2] to-[#FF7676] text-primaryText rounded-r 
 font-semibold  h-full border border-gray-700 rounded-none	"
            >
            {t("send")}
          </button>
        </div>
      </form>
      {isSubmitted && !isError && (
        <p className="mt-4 text-green-500">{t("message_success")}</p>
      )}
      {isError && <p className="mt-4 text-red-500">{t("message_error")}</p>}
    </div>
  );
};

export default ContactForm;
