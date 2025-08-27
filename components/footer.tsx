import React from "react";

export interface FooterProps {
  text: string;
}

const Footer = ({ text }: FooterProps) => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        {text}
      </div>
    </footer>
  );
};

export default Footer;
