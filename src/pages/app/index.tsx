import { useState } from "react";
import Head from "next/head";
import { api } from "@/trpc/api";

interface Hackathon {
  id: string;
  name: string;
  url: string;
  description?: string | null;
  creatorId: string;
  updatedAt: Date | any;
  is_finished: boolean;
  verified: boolean;
}

import { Input, Tip, Tooltip } from "@/ui";
import { ArrowDown } from "@/ui/icons";
import Up from "@/animations/up";
import Down from "@/animations/down";

import CreateNew from "@/components/createNew";
import EnterKey from "@/components/enterKey";
import HackathonCard from "@/components/hackathonCard";
import Loading from "@/components/loading";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = api.hackathon.allHackathons.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const hasHackathons = data?.hackathon && data.hackathon.length > 0;
  const hasParticipations = data?.participants && data.participants.length > 0;
  const isEmpty = !hasHackathons && !hasParticipations;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Empty state - show centered welcome
  if (isEmpty) {
    return (
      <>
        <Head>
          <title>Dashboard - Zerobase</title>
        </Head>
        <div className="flex h-screen flex-col items-center justify-center px-6">
          <Up>
            <h1 className="mb-4 text-3xl font-medium">Welcome</h1>
          </Up>
          <Up delay={0.1}>
            <p className="mb-8 text-center text-xl text-neutral-300">
              You don&apos;t have any hackathons yet. Get started now!
            </p>
          </Up>
          <Up delay={0.2}>
            <div className="flex items-center space-x-3">
              <CreateNew />
              <EnterKey />
            </div>
          </Up>
        </div>
      </>
    );
  }

  // Has data - show dashboard layout
  return (
    <>
      <Head>
        <title>Dashboard - Zerobase</title>
      </Head>
      <div className="mt-16 flex w-full flex-wrap items-center justify-between gap-2 border-b border-neutral-800 px-6 py-4 sm:flex-nowrap sm:gap-0">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <EnterKey />
          <CreateNew />
        </div>
      </div>
      <div className="mx-auto mb-16 mt-8 max-w-6xl px-6 md:px-0">
        {hasHackathons && (
          <div className="border-b border-neutral-800 pb-6">
            <h1 className="mb-4 text-2xl font-medium">Hackathons</h1>
            <Input
              value={search}
              placeholder="Search..."
              onChange={handleSearch}
            />
            <div className="container mx-auto mt-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data?.hackathon
                  .sort(
                    (a: any, b: any) => b.updatedAt.getTime() - a.updatedAt.getTime(),
                  )
                  .map(
                    (hackathon: Hackathon) =>
                      hackathon.name.includes(search) && (
                        <HackathonCard
                          key={hackathon.id}
                          name={hackathon.name}
                          description={hackathon.description || ""}
                          url={hackathon.url}
                        />
                      ),
                  )}
              </div>
            </div>
          </div>
        )}

        {hasParticipations && (
          <>
            <h1 className="mb-4 mt-5 text-2xl font-medium">Participations</h1>
            <div className="container mx-auto mt-4">
              <div className="flex flex-col space-y-3">
                {data?.participants.map((participant: any) => (
                  <div
                    key={participant.id}
                    className="flex w-full flex-col justify-between rounded-md bg-neutral-800/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="mb-1 text-xl">{participant.title}</p>
                      <Tooltip text="The hackathon administrators can mark each project as 'reviewed', here you will see if they have seen your project.">
                        <p className="mb-1 cursor-help text-xl">
                          {participant.is_reviewed ? (
                            <span className="text-md text-green-500">
                              Reviewed
                            </span>
                          ) : (
                            <span className="text-yellow-500">Pending</span>
                          )}
                        </p>
                      </Tooltip>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-400">
                      <p>
                        Hackathon: {participant.hackathon_name} (
                        {participant.hackathon_url})
                      </p>
                      <span>|</span>
                      <p>
                        Submitted:{" "}
                        {new Date(participant.updatedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: '2-digit'
                        }).replace(/(\d+)/, (match) => {
                          const day = parseInt(match);
                          const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                                       day === 2 || day === 22 ? 'nd' :
                                       day === 3 || day === 23 ? 'rd' : 'th';
                          return `${day}${suffix}`;
                        }).replace(/(\d{2})$/, "'$1")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {error && (
          <Tip>
            <p className="text-red-500">
              Error: {error.data?.code} - {error.message}
            </p>
          </Tip>
        )}
      </div>
    </>
  );
};

export default Dashboard;
