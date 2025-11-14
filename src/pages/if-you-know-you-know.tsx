import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { api } from "@/trpc/api";
import { ExternalLink } from "@/ui";
import { ArrowRight, Sparkles } from "@/ui/icons";
import Loading from "@/components/loading";
import AIChat from "@/components/AIChat";
import { createAvatar } from "@dicebear/core";
import { avataaars } from "@dicebear/collection";

export default function Wall() {
  const { data, isLoading } = api.participation.allParticipations.useQuery();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  const getAvatarUrl = (seed: string) => {
    const avatar = createAvatar(avataaars, {
      seed,
      size: 48,
    });
    return avatar.toDataUri();
  };

  return (
    <>
      <Head>
        <title>Wall - Project Showcase</title>
      </Head>

      <style jsx global>{`
        /* Hide scrollbars on wall page */
        body, html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        body::-webkit-scrollbar,
        html::-webkit-scrollbar {
          display: none;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          grid-gap: 32px;
          position: relative;
          z-index: 1;
        }

        .project-card {
          background-color: var(--background-color);
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.05), 0px 8px 15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1);
          padding: 56px 16px 16px 16px;
          border-radius: 15px;
          cursor: pointer;
          position: relative;
          transition: box-shadow .25s;
        }

        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 15px;
          background-color: rgba(255, 255, 255, .015);
        }

        .project-card .avatar-icon {
          z-index: 2;
          position: relative;
          display: table;
          padding: 8px;
        }

        .project-card .avatar-icon::after {
          content: '';
          position: absolute;
          inset: 4.5px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(2px);
          transition: background-color .25s, border-color .25s;
        }

        .project-card .avatar-icon img {
          position: relative;
          z-index: 1;
          display: block;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          transform: translateZ(0);
          transition: transform .25s;
        }

        .project-card h4 {
          z-index: 2;
          position: relative;
          margin: 12px 0 4px 0;
          font-family: inherit;
          font-weight: 600;
          font-size: 16px;
          line-height: 1.4;
          color: #FFFFFF;
        }

        .project-card p {
          z-index: 2;
          position: relative;
          margin: 0 0 8px 0;
          font-size: 14px;
          line-height: 1.7;
          color: #A1A1AA;
        }

        .project-card .shine {
          border-radius: inherit;
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          opacity: 0;
          transition: opacity .5s;
        }

        .project-card .shine:before {
          content: '';
          width: 150%;
          padding-bottom: 150%;
          border-radius: 50%;
          position: absolute;
          left: 50%;
          bottom: 55%;
          filter: blur(35px);
          opacity: 0.1;
          transform: translateX(-50%);
          background-image: conic-gradient(from 205deg at 50% 50%, rgba(16, 185, 129, 0) 0deg, #10B981 25deg, rgba(52, 211, 153, 0.18) 295deg, rgba(16, 185, 129, 0) 360deg);
        }

        .project-card .background {
          border-radius: inherit;
          position: absolute;
          inset: 0;
          overflow: hidden;
          -webkit-mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
          mask-image: radial-gradient(circle at 60% 5%, black 0%, black 15%, transparent 60%);
        }

        .project-card .background .tiles {
          opacity: 0;
          transition: opacity .25s;
        }

        .project-card .background .tile {
          position: absolute;
          background-color: rgba(16, 185, 129, 0.05);
          animation-duration: 8s;
          animation-iteration-count: infinite;
          opacity: 0;
        }

        @keyframes tile {
          0%, 12.5%, 100% {
            opacity: 1;
          }
          25%, 82.5% {
            opacity: 0;
          }
        }

        .project-card:hover {
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.04), 0px 15px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .project-card:hover .avatar-icon::after {
          background-color: rgba(52, 211, 153, 0.1);
          border-color: rgba(52, 211, 153, 0.2);
        }

        .project-card:hover .shine {
          opacity: 1;
        }

        .project-card:hover .background .tiles {
          opacity: 1;
          transition-delay: .25s;
        }

        .project-card:hover .background .tile {
          animation-name: tile;
        }

        .project-link {
          z-index: 2;
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #60A5FA;
          font-size: 14px;
          text-decoration: none;
          transition: color .25s;
        }

        .project-link:hover {
          color: #93C5FD;
        }

        .ai-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 50;
        }

        .ai-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.6);
        }

        .ai-fab svg {
          color: white;
          width: 28px;
          height: 28px;
        }

        @media (max-width: 768px) {
          .ai-fab {
            width: 56px;
            height: 56px;
            bottom: 20px;
            right: 20px;
          }

          .ai-fab svg {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>

      <div className="min-h-screen px-6 py-8 mt-20">
        <div className="mx-auto max-w-7xl">
          {!data || data.length === 0 ? (
            <div className="flex h-[60vh] items-center justify-center">
              <p className="text-xl text-neutral-400">
                No projects yet. Be the first to submit!
              </p>
            </div>
          ) : (
            <div className="card-grid">
              {data.map((project) => (
                <div key={project.id} className="project-card">
                  <span className="avatar-icon">
                    <Image
                      src={getAvatarUrl(project.id)}
                      width={48}
                      height={48}
                      alt={project.name}
                    />
                  </span>
                  <h4>{project.title}</h4>
                  <p className="text-neutral-400">{project.oneLiner}</p>
                  <p className="text-neutral-300 text-sm mb-4">by {project.name}</p>
                  <p className="text-neutral-300 text-sm mb-4">{project.results}</p>
                  <ExternalLink href={project.link} className="project-link">
                    <span>View Project</span>
                    <ArrowRight width={14} />
                  </ExternalLink>
                  <div className="shine"></div>
                  <div className="background">
                    <div className="tiles">
                      <div className="tile" style={{ top: 0, left: 0, height: '10%', width: '22.5%' }}></div>
                      <div className="tile" style={{ top: 0, left: '22.5%', height: '10%', width: '27.5%', animationDelay: '-6s' }}></div>
                      <div className="tile" style={{ top: 0, left: '50%', height: '10%', width: '27.5%', animationDelay: '-4s' }}></div>
                      <div className="tile" style={{ top: 0, left: '77.5%', height: '10%', width: '22.5%', animationDelay: '-2s' }}></div>
                      <div className="tile" style={{ top: '10%', left: 0, height: '22.5%', width: '22.5%', animationDelay: '-4s' }}></div>
                      <div className="tile" style={{ top: '10%', left: '22.5%', height: '22.5%', width: '27.5%', animationDelay: '-2s' }}></div>
                      <div className="tile" style={{ top: '10%', left: '50%', height: '22.5%', width: '27.5%' }}></div>
                      <div className="tile" style={{ top: '10%', left: '77.5%', height: '22.5%', width: '22.5%', animationDelay: '-4s' }}></div>
                      <div className="tile" style={{ top: '32.5%', left: '50%', height: '22.5%', width: '27.5%', animationDelay: '-6s' }}></div>
                      <div className="tile" style={{ top: '32.5%', left: '77.5%', height: '22.5%', width: '22.5%', animationDelay: '-2s' }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button 
        className="ai-fab"
        onClick={() => setIsChatOpen(true)}
        aria-label="Open AI Assistant"
      >
        <Sparkles />
      </button>

      <AIChat 
        projects={data || []} 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
}
