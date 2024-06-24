"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface FAQItemProps {
  question: string;
  answer: string;
  isLast: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={ " text-primaryText"}
    >
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">{question}</h2>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <div className="pb-4">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const faqs = [];
  for (let i = 1; i < 7; i++) {
    faqs.push({
      question: t("faq:q" + i),
      answer: t("faq:a" + i),
    });
  }

  return (
    <div className="lg:max-w-2xl lg:mx-auto p-6 bg-white shadow-md rounded-lg">
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isLast={index >= faqs.length - 1}
        />
      ))}
    </div>
  );
};

export default FAQ;
