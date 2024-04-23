import React from 'react';

interface SignatureProps {
  text: string;
}

const Signature: React.FC<SignatureProps> = ({ text }) => {
  return (
    <div className="signature">
      <p className="text-lg italic text-gray-600">{text}</p>
    </div>
  );
};

export default Signature;
