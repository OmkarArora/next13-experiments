import { Metadata, ResolvingMetadata } from "next";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PageProps {
  params: { userId: number };
}

export async function generateMetadata(
  { params }: PageProps,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const userId = params.userId;

  // fetch data
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const json = await data.json();

  return {
    title: json.name ?? "User Not Found",
    openGraph: {
      images: [`https://picsum.photos/seed/user${userId}/200/200`],
      title: json.name ?? "User Not Found",
      description: `Company: ${json.company?.name}`,
    },
  };
}

export default async function Page(props: PageProps) {
  //   await delay(10000);
  //   console.log("delayed");
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/users/${props.params.userId}`
  );
  const json = await data.json();
  console.log("HERE", json);

  return (
    <div className="min-h-screen">
      <div>Name: {json.name}</div>
    </div>
  );
}
