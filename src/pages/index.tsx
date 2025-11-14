import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import SendProject from "@/components/sendProject";
import { Cancel } from "@/ui/icons";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const clickAudio = new Audio(
      'https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3'
    );
    clickAudio.muted = false;

    const keys = ['one', 'two', 'three'];
    
    keys.forEach(id => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener('pointerdown', () => {
          clickAudio.currentTime = 0;
          clickAudio.play().catch(() => {});
        });
      }
    });
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailValid) {
      setOpen(true);
    }
  };

  return (
    <>
      <style jsx global>{`
        @property --shimmer {
          syntax: "<angle>";
          inherits: false;
          initial-value: 33deg;
        }

        @keyframes shimmer-anim {
          0% {
            --shimmer: 0deg;
          }
          100% {
            --shimmer: 360deg;
          }
        }

        @keyframes shine {
          0% {
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          55% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes shimmer-text {
          0% {
            background-position: 100% center;
          }    
          100% {
            background-position: -100% center;
          }    
        }

        .shimmer-button {
          --inset: 40px;
          --glow-hue: 222deg;
          --shadow-hue: 180deg;
          --spring-easing: linear(
            0, 0.002, 0.01 0.9%, 0.038 1.8%, 0.156, 0.312 5.8%, 0.789 11.1%, 1.015 14.2%,
            1.096, 1.157, 1.199, 1.224 20.3%, 1.231, 1.231, 1.226, 1.214 24.6%,
            1.176 26.9%, 1.057 32.6%, 1.007 35.5%, 0.984, 0.968, 0.956, 0.949 42%,
            0.946 44.1%, 0.95 46.5%, 0.998 57.2%, 1.007, 1.011 63.3%, 1.012 68.3%,
            0.998 84%, 1
          );
          --spring-duration: 1.33s;
          
          color: var(--bg);
          font-weight: 600;
          background-image: linear-gradient(
            315deg,
            #ffc4ec -10%,
            #efdbfd 50%,
            #ffedd6 110%
          );
          padding: .8em 1.4em;
          position: relative;
          isolation: isolate;
          box-shadow: 0 2px 3px 1px hsl(var(--glow-hue) 50% 20% / 50%), inset 0 -10px 20px -10px hsla(var(--shadow-hue),10%,90%,95%);
          border-radius: 0.66em;
          scale: 1;
          transition: all var(--spring-duration) var(--spring-easing);
          border: none;
          cursor: pointer;
        }

        .shimmer-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          scale: 0.95;
        }

        .shimmer-button:hover:not(:active):not(:disabled),
        .shimmer-button.active {
          transition-duration: calc(var(--spring-duration)*0.5);
          scale: 1.2;
          box-shadow: 0 4px 8px -2px hsl(var(--glow-hue) 50% 20% / 50%), inset 0 0 0 transparent;
        }

        .shimmer-button:active:not(:disabled) {
          scale: 1.1;
          transition-duration: calc(var(--spring-duration)*0.5);
        }

        .shimmer-button .shimmer {
          position: absolute;
          inset: calc(var(--inset) * -1);
          border-radius: inherit;
          pointer-events: none;
          mask-image: conic-gradient(
            from var(--shimmer, 0deg),
            transparent 0%,
            transparent 20%,
            black 36%,
            black 45%,
            transparent 50%,
            transparent 70%,
            black 85%,
            black 95%,
            transparent 100%
          );
          mask-size: cover;
          mix-blend-mode: plus-lighter;
          animation: shimmer-anim 1s linear infinite both;
        }

        .shimmer-button:disabled .shimmer {
          animation: none;
        }

        .shimmer-button:hover:not(:disabled) .shimmer::before,
        .shimmer-button:hover:not(:disabled) .shimmer::after,
        .shimmer-button.active .shimmer::before,
        .shimmer-button.active .shimmer::after {
          opacity: 1;
          animation: shine 1.2s ease-in 1 forwards;
        }

        .shimmer-button .shimmer::before,
        .shimmer-button .shimmer::after {
          transition: all 0.5s ease;
          opacity: 0;
          content: "";
          border-radius: inherit;
          position: absolute;
          mix-blend-mode: color;
          inset: var(--inset);
          pointer-events: none;
        }

        .shimmer-button .shimmer::before {
          box-shadow: 0 0 calc(var(--inset) * 0.1)  2px hsl(var(--glow-hue) 20% 95%),
            0 0 calc(var(--inset) * 0.18)  4px hsl(var(--glow-hue) 20% 80%),
            0 0 calc(var(--inset) * 0.33)  4px hsl(var(--glow-hue) 50% 70%),
            0 0 calc(var(--inset) * 0.66) 5px hsl(var(--glow-hue) 100% 70%);
          z-index: -1;
        }

        .shimmer-button .shimmer::after {
          box-shadow: inset 0 0 0 1px hsl(var(--glow-hue) 70% 95%),
            inset 0 0 2px 1px hsl(var(--glow-hue) 100% 80%),
            inset 0 0 5px 2px hsl(var(--glow-hue) 100% 70%);
          z-index: 2;
        }

        .shimmer-button .text {
          color: hsl(222.35deg 15.04% 22.16%);
          background-clip: text;
          background-color: var(--bg);
          background-image: linear-gradient(120deg, transparent, hsla(var(--glow-hue),100%,80%,0.66) 40%, hsla(var(--glow-hue),100%,90%,.9) 50%, transparent 52%);
          background-repeat: no-repeat;
          background-size: 300% 300%;
          background-position: center 200%;
        }

        .shimmer-button:hover:not(:disabled) .text,
        .shimmer-button.active .text {
          animation: shimmer-text .66s ease-in 1 both;
        }

        .email-form {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .email-form input {
          padding: 0.8em 1.4em;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.66em;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          min-width: 280px;
        }

        .email-form input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .email-form input:focus {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.08);
        }

        body {
          overflow: hidden;
        }

        /* Hide scrollbars globally */
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        /* Allow scrollbar only in modal content */
        [role="dialog"] * {
          scrollbar-width: auto;
          -ms-overflow-style: auto;
        }

        [role="dialog"] *::-webkit-scrollbar {
          display: block;
          width: 8px;
        }

        [role="dialog"] *::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        [role="dialog"] *::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        [role="dialog"] *::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        main {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        main h1 {
          letter-spacing: -0.05rem;
          line-height: 1;
        }

        main p {
          opacity: 0.7;
          font-weight: 300;
        }

        section, section > div {
          width: 50ch;
          max-width: calc(100vw - 2rem);
        }

        @media (max-width: 768px) {
          .keypad {
            order: 1;
          }
          section {
            order: 2;
          }
          .email-form {
            flex-direction: column;
          }
          .email-form input {
            min-width: 100%;
          }
        }

        .keypad {
          position: relative;
          aspect-ratio: 400 / 310;
          display: flex;
          place-items: center;
          width: clamp(280px, 35vw, 400px);
          -webkit-tap-highlight-color: transparent;
          transition-property: translate, transform;
          transition-duration: 0.26s;
          transition-timing-function: ease-out;
          transform-style: preserve-3d;
        }

        .key {
          transform-style: preserve-3d;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline: none;
        }

        .key[data-pressed='true'] .key__content,
        .key:active .key__content {
          translate: 0 calc(var(--travel) * 1%);
        }

        .key__content {
          width: 100%;
          display: inline-block;
          height: 100%;
          transition: translate 0.12s ease-out;
          container-type: inline-size;
        }

        .keypad__single .key__text {
          width: 52%;
          height: 62%;
          translate: 45% -16%;
        }

        .key__text {
          height: 46%;
          width: 86%;
          position: absolute;
          font-size: 12cqi;
          z-index: 21;
          top: 5%;
          left: 0;
          color: hsl(0 0% 94%);
          translate: 8% 10%;
          transform: rotateX(36deg) rotateY(45deg) rotateX(-90deg) rotate(0deg);
          text-align: left;
          padding: 1ch;
        }

        .keypad__single {
          position: absolute;
          width: 40.5%;
          left: 54%;
          bottom: 36%;
          height: 46%;
          clip-path: polygon(0 0, 54% 0, 89% 24%, 100% 70%, 54% 100%, 46% 100%, 0 69%, 12% 23%, 47% 0%);
          mask: url(https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86) 50% 50% / 100% 100%;
        }

        .keypad__single.keypad__single--left {
          left: 29.3%;
          bottom: 54.2%;
        }

        .keypad__single .key__text {
          font-size: 18cqi;
        }

        .keypad__single img {
          top: 0;
          opacity: 1;
          width: 96%;
          position: absolute;
          left: 50%;
          translate: -50% 1%;
        }

        .key__mask {
          width: 100%;
          height: 100%;
          display: inline-block;
        }

        .keypad__double {
          position: absolute;
          background: transparent;
          width: 64%;
          height: 65%;
          left: 6%;
          bottom: 17.85%;
          clip-path: polygon(34% 0, 93% 44%, 101% 78%, 71% 100%, 66% 100%, 0 52%, 0 44%, 7% 17%, 30% 0);
          mask: url(https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86) 50% 50% / 100% 100%;
        }

        .keypad__double img {
          top: 0;
          opacity: 1;
          width: 99%;
          position: absolute;
          left: 50%;
          translate: -50% 1%;
        }

        .key img {
          filter: hue-rotate(calc(var(--hue, 0) * 1deg)) saturate(var(--saturate, 1)) brightness(var(--brightness, 1));
        }

        .keypad__base {
          position: absolute;
          bottom: 0;
          width: 100%;
        }

        .key img,
        .keypad__base img {
          transition: translate 0.12s ease-out;
          width: 100%;
        }

        #one {
          --travel: 26;
          --hue: 114;
          --saturate: 1.4;
          --brightness: 1.2;
        }

        #two {
          --travel: 26;
          --hue: 0;
          --saturate: 0;
          --brightness: 1.4;
        }

        #three {
          --travel: 18;
          --hue: 0;
          --saturate: 0;
          --brightness: 0.4;
        }
      `}</style>

      <main>
        <section>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to the Zerobase X Lovable Hackathon</h1>
            <p className="mb-6">
              Submit your project and showcase what you&apos;ve built during the hackathon.
            </p>
            <form className="email-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                required 
                placeholder="sam@zerobase.ca"
                value={email}
                onChange={handleEmailChange}
              />
              <button 
                className="shimmer-button" 
                type="submit"
                disabled={!isEmailValid}
              >
                <span className="text">Submit</span>
                <span className="shimmer"></span>
              </button>
            </form>
          </div>
        </section>
        <div className="keypad">
          <div className="keypad__base">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86" alt="" />
          </div>
          <button 
            id="one" 
            className="key keypad__single keypad__single--left"
            onClick={() => isEmailValid && setOpen(true)}
            disabled={!isEmailValid}
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">ok</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" alt="" />
              </span>
            </span>
          </button>
          <button 
            id="two" 
            className="key keypad__single"
            onClick={() => isEmailValid && setOpen(true)}
            disabled={!isEmailValid}
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">go</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" alt="" />
              </span>
            </span>
          </button>
          <button 
            id="three" 
            className="key keypad__double"
            onClick={() => isEmailValid && setOpen(true)}
            disabled={!isEmailValid}
          >
            <span className="key__mask">
              <span className="key__content">
                <span className="key__text">create.</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86" alt="" />
              </span>
            </span>
          </button>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-midnight bg-opacity-70 data-[state=open]:animate-overlayShow blur-[5px] backdrop-filter backdrop-blur-sm" />
            <Dialog.Content className="fixed top-[50%] left-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-[6px] border border-neutral-800 bg-midnight p-[25px] font-sans opacity-100 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
              <div className="mb-5 flex items-center justify-between">
                <Dialog.Title className="text-xl font-medium">
                  Submit Your Project
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Cancel
                    width={25}
                    className="duration-120 cursor-pointer text-gray-400 transition-all hover:scale-105"
                  />
                </Dialog.Close>
              </div>
              <SendProject prefilledEmail={email} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </main>
    </>
  );
}
