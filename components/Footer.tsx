'use client'

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background glass text-foreground py-6 sm:py-8 relative z-10 bg-gray-700/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand/Intro */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 mb-3 sm:mb-4">
              <Link className="flex items-center gap-2" href="https://gaurav-wankhede.vercel.app/">
                <Image
                  alt="Gaurav Wankhede"
                  loading="lazy"
                  width={32}
                  height={32}
                  className="sm:w-10 sm:h-10"
                  src="/logo.svg"
                />
                <span>FinSolve Technologies</span>
              </Link>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              FinSolve Technologies is a leading provider of financial services, offering a range of products and solutions to help businesses manage their finances effectively.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm">
              <li>
                <Link className="hover:text-[var(--color-primary)] transition-colors" href="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-primary)] transition-colors" href="/login">Login</Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-primary)] transition-colors" href="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
          {/* Techverse AI */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Techverse AI</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm">
              <li>
                <Link className="hover:text-[var(--color-primary)] transition-colors" href="https://gaurav-wankhede.vercel.app/youtube">Techverse YouTube</Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-primary)] transition-colors" href="https://gaurav-wankhede.vercel.app/ai-content-generator">AI Content Generator</Link>
              </li>
              <li>
                <Link className="hover:text-[var(--color-primary)] transition-colors" href="https://gaurav-wankhede.vercel.app/youtube/seo-optimizer">SEO Optimizer</Link>
              </li>
            </ul>
          </div>
          {/* Connect With Me / Socials */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Me</h3>
            <div className="flex flex-wrap gap-4 mt-1 sm:mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--color-primary)]/80 transition-colors"
                title="TECHVERSE YouTube Channel"
                href="https://www.youtube.com/@GauravWankhede-TECHVERSE"
              >
                {/* YouTube Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--color-primary)]/80 transition-colors"
                title="LinkedIn Profile"
                href="https://www.linkedin.com/in/wankhede-gaurav/"
              >
                {/* LinkedIn Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--color-primary)]/80 transition-colors"
                title="GitHub Profile"
                href="https://github.com/Gaurav-Wankhede"
              >
                {/* GitHub Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--color-primary)]/80 transition-colors"
                title="Twitter Profile"
                href="https://x.com/GTechverse16703"
              >
                {/* Twitter Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <Link
                className="text-[var(--foreground)] hover:text-[var(--color-primary)]/80 transition-colors"
                title="Contact Me"
                href="https://gaurav-wankhede.vercel.app/contact"
              >
                {/* Mail Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              </Link>
              <Link
                className="text-[var(--foreground)] hover:text-[var(--color-primary)]/80 transition-colors"
                title="UPSC Journey"
                href="https://gaurav-wankhede.vercel.app/upsc-journey"
              >
                {/* Book Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
              </Link>
            </div>
          </div>
        </div>
        {/* Divider and Copyright */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="h-px w-full bg-border my-4"></div>
          <p className="text-sm">
            © 2024 - {new Date().getFullYear()}{" "}
            <Link className="text-[var(--color-primary)] hover:underline" href="https://gaurav-wankhede.vercel.app/">
              Gaurav Wankhede
            </Link>
            . All rights reserved.
          </p>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
            AI Solutions | TECHVERSE | UPSC Aspirations
          </p>
        </div>
      </div>
    </footer>
  );
}