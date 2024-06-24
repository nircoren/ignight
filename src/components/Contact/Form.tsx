import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email, message };
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
    <div className="lg:max-w-md mx-auto bg-secondaryBg text-secondaryText p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <label className="block mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder={t('enter_name')}
            className="w-full p-2 border border-gray-700 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('enter_email')}
            className="w-full p-2 border border-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            placeholder="What are you saying?"
            className="w-full p-2 border border-gray-700 rounded bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primaryBg text-primaryText py-2 rounded font-semibold "
        >
          {t('send')}
        </button>
      </form>
      {isSubmitted && !isError && (
        <p className="mt-4 text-green-500">{t('message_success')}
</p>
      )}
      {isError && (
        <p className="mt-4 text-red-500">{t('message_error')}</p>
      )}
    </div>
  );
};

export default ContactForm;
