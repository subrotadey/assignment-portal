'use client'

import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-2">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <h2 className="text-lg text-gray-700">{params.id}</h2>
    </div>
  );
};

export default Page;
