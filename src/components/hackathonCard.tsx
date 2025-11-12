import Link from "next/link";
import { memo } from "react";
import Card from "./card";

export interface hackathonCardProps {
  name: string;
  description: string;
  url?: string;
}

const HackathonCard = memo(({ name, description, url }: hackathonCardProps) => {
  return (
    <>
      {Boolean(url) ? (
        <Link
          href={`/app/${url}`}
          className="flex max-w-sm flex-col items-center"
          prefetch={false}
        >
          <Card name={name} description={description} url={url} />
        </Link>
      ) : (
        <div className="flex max-w-xs flex-col items-center">
          <Card name={name} description={description} />
        </div>
      )}
    </>
  );
});

HackathonCard.displayName = "HackathonCard";

export default HackathonCard;
