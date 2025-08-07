// src/app/profile/[id]/page.tsx

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>ID: {params.id}</p>
    </div>
  );
};

export default Page;
