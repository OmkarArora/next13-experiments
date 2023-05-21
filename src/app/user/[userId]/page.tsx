import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata, ResolvingMetadata } from "next";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PageProps {
  params: { userId: number };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
      <div style={{ width: 200, height: 500 }}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-orange-900">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Acc 2</AccordionTrigger>
            <AccordionContent>
              <div style={{ width: 100, height: 100, background: "red" }} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div style={{ width: 200, height: 500 }}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Acc 2</AccordionTrigger>
            <AccordionContent>
              <div style={{ width: 100, height: 100, background: "red" }} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
