// ✅ ✅ No "use client" here!

import React from 'react';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-2">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <h2 className="text-lg text-gray-700">{params.id}</h2>
    </div>
  );
};

export default Page;
