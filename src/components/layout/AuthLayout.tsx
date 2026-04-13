import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1F1F22] p-2 md:p-3">
      <section className="grid h-[92vh] w-full max-w-[1410px] grid-cols-1 gap-8 rounded-[2px] bg-[#F3F3F3] p-4 md:grid-cols-[1.07fr_0.93fr] md:p-5">
        <div className="relative hidden rounded-[10px] md:block">
          <img
            src="/auth-bottom-ring.png"
            alt="Bottom left ring decoration"
            className="pointer-events-none absolute -bottom-5 -left-5 z-0 h-auto w-[240px]"
          />
          <img
            src="/auth-hero-image.jpg"
            alt="Login visual"
            className="z-10 h-full w-full rounded-[10px] object-cover object-center"
          />

          <div className="absolute bottom-11 left-12 z-20 text-white">
            <div className="mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="34" viewBox="0 0 35 34" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M17.0872 0C26.5244 0 34.1749 7.61122 34.1749 17C34.1749 26.3888 26.5244 34 17.0872 34C7.65033 34 0 26.3888 0 17C0 7.61122 7.65033 0 17.0872 0Z" fill="#DB353A" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22.7831 5.31146C25.5249 5.31146 27.7478 7.52292 27.7478 10.2508C27.7478 12.9787 25.5249 15.1901 22.7831 15.1901C20.041 15.1901 17.8184 12.9787 17.8184 10.2508C17.8184 7.52292 20.041 5.31146 22.7831 5.31146Z" fill="white" />
              </svg>
              <p className="text-2xl leading-8 font-bold text-primary-sterling-white">
                SASPMP
              </p>
            </div>
            <p className="max-w-[520px] text-[32px] leading-[42px] font-bold text-primary-sterling-white">
              Sterling Academy Service Providers Management Portal
            </p>
          </div>
        </div>

        <div className="relative flex flex-col px-6 pb-4 pt-14 sm:px-9 md:px-12 md:pt-16 lg:px-16">
          <div className="absolute right-5 top-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#DB353A" />
              <circle cx="43.334" cy="19.3333" r="10" fill="white" />
            </svg>
          </div>
          <div className="my-auto">{children}</div>
          <p className="pt-10 text-base font-normal leading-6 text-neutral-black4">
            Copyright &copy; {currentYear} Sterling Financial HoldCo.
          </p>
        </div>
      </section>
    </main>
  );
}
