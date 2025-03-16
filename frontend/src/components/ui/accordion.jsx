import React, { useState } from "react";

// Accordion Component
export function Accordion({ children }) {
  return <div className="border border-gray-300 rounded">{children}</div>;
}

// Accordion Item
export function AccordionItem({ children }) {
  return <div className="border-b">{children}</div>;
}

// Accordion Trigger
export function AccordionTrigger({ title, onClick }) {
  return (
    <button onClick={onClick} className="w-full p-4 text-left font-medium bg-gray-100 hover:bg-gray-200">
      {title}
    </button>
  );
}

// Accordion Content (✅ Fix for your error)
export function AccordionContent({ children, isOpen }) {
  return isOpen ? <div className="p-4">{children}</div> : null;
}
