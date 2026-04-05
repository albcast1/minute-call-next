"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="accordion-item border border-[#E0DCD6] rounded-[16px] overflow-hidden"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className={`accordion-header w-full flex items-center justify-between px-6 py-4 text-left font-semibold transition-all ${
              expandedIndex === index
                ? "bg-[#7BF542] text-black"
                : "bg-[#F7F5F2] text-black hover:bg-[#f0ebe4]"
            }`}
          >
            <span className="pr-4">{item.question}</span>
            <svg
              className={`w-5 h-5 flex-shrink-0 transition-transform ${
                expandedIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {expandedIndex === index && (
            <div className="accordion-content bg-white px-6 py-4 border-t border-[#E0DCD6] animate-slideDown">
              <p className="text-[#6B6B6B] leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
