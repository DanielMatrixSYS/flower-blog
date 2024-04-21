import React, { useState } from "react";
import Title from "../components/Typography/Title";
import Description from "../components/Typography/Description";
import Hint from "../components/Typography/Hint";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

interface FAQItemProps {
  item: { question: string; answer: string };
  index: number;
}

const questions = [
  {
    question: "Hva slags kamera og linse bruker jeg til makrofotografering?",
    answer: "Jeg bruker Canon EOS R med Laowa 100mm f/2.8 macro-linse.",
  },
  {
    question: "Hva slags kamera og linse bruker jeg til fugle- og dyrebildene?",
    answer: "Canon 70D med Tamron 200-600mm linse.",
  },
  {
    question: "Hvordan redigerer jeg bildene mine?",
    answer:
      "Jeg redigerer bildene mine i Adobe Lightroom Classic og Adobe Photoshop.",
  },
  {
    question: "Hvorfor valgte jeg å fokusere på makrofotografi?",
    answer:
      "Jeg elsker å utforske de små detaljene i naturen og se skjønnheten i det som ofte går ubemerket hen.",
  },
  {
    question: "Hvor kan jeg kjøpe bildene dine?",
    answer:
      "Vi ser helst at du kontakter oss via kontaktskjemaet nedenfor, gjerne legg ved telefonnummer om du ønsker det.",
  },
  {
    question: "Hva er ditt favorittmotiv å fotografere?",
    answer: "Jeg elsker å fotografere blomster og insekter.",
  },
];

const FAQItem: React.FC<FAQItemProps> = ({ item, index }) => (
  <div className="flex flex-col items-start">
    {index !== 0 && (
      <hr className="w-full border-neutral-300 dark:border-neutral-700 mb-1" />
    )}

    <Description text={item.question} />
    <Hint text={item.answer} />
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    open(
      `mailto:${formData.email}?subject=Kontakt via nettside&body=${formData.message}`
    );
  };

  return (
    <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="text-neutral-800 dark:text-neutral-400"
        >
          Navn
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-neutral-800 dark:text-neutral-400"
        >
          E-post
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
          required
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="text-neutral-800 dark:text-neutral-400"
        >
          Melding
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:border-blue-700 dark:focus:border-blue-400"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

const Contact = () => (
  <div className="flex flex-col items-start p-4 space-y-4">
    <Title text="La oss slå av en prat!" />
    <Description text="Har du spørsmål eller ønsker å diskutere et prosjekt? Jeg er alltid åpen for å snakke om fotografi." />

    <div className="flex flex-col items-start space-y-4">
      <Title text="Ofte stilte spørsmål" />

      {questions.map((item, index) => (
        <FAQItem key={index} item={item} index={index} />
      ))}
    </div>

    <div className="flex flex-col items-start space-y-2">
      <Title text="Ta kontakt med meg" />

      <Description text="Fyll ut skjemaet nedenfor. Jeg ser frem til å høre fra deg!" />
      <ContactForm />

      <Description text="Eller så kan du nå meg direkte via diverse sosiale medier" />

      <div className="flex flex-row space-x-4">
        <button className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-600">
          <FaFacebook />
        </button>
        <button className="bg-purple-700 text-white p-2 rounded-full hover:bg-purple-600">
          <FaInstagram />
        </button>
      </div>
    </div>
  </div>
);

export default Contact;
