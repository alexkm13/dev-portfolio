import Link from "next/link";
import NowPlaying from "@/components/now-playing";

const skills = [
  "javascript", "react", "node.js", "python", "css", "html", "postgresql", "redis", "docker",
  "aws", "git", "java"
];

const experience = [
  {
    title: "Backend Engineer",
    company: "EDGE10",
    period: "2026 - present",
  }
];

const education = [
  {
    title: "BA in Computer Science and Mathematics",
    school: "Boston University",
    period: "2021 - 2026",
  }
];

export default function Home() {
  return (
    <>
      <div className="min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-2xl mx-auto px-6 py-20">
        {/* Greeting */}
        <p className="text-[var(--muted-foreground)] mb-4">
          hi, i&apos;m alex.
        </p>

        {/* Main title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6">
          software engineer.
        </h1>

        {/* Tagline */}
        <p className="text-[var(--muted-foreground)] text-lg mb-12">
          located in boston, massachusetts.
        </p>

        {/* Bio */}
        <section className="mb-12">
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
            i enjoy building beautiful, clean, and accessible software. i focus on creating 
            intuitive user experiences and writing clean, maintainable code.      
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed mb-4">
            i also love solving problems and building projects on the side. (reach out if you'd like to build with me!)
          </p>
          <p className="text-[var(--muted-foreground)] leading-relaxed">
            when i&apos;m not coding, you&apos;ll find me exploring cafes, running,
            listening to music, playing sports, or contributing to open source.
          </p>
        </section>

        {/* Now Playing */}
        <section className="mb-12">
          <p className="text-xs text-[var(--muted-foreground)] mb-3">currently listening:</p>
          <NowPlaying />
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.title}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[var(--foreground)] font-medium">
                    {exp.title}
                  </h3>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {exp.company}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.title}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[var(--foreground)] font-medium">
                    {edu.title}
                  </h3>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {edu.school}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            connect
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a 
              href="https://github.com/alexkm13" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>github</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a 
              href="https://twitter.com/alstjra" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>twitter</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>linkedin</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a 
              href="mailto:alexkim9133@gmail.com"
              className="social-link"
            >
              <span>email</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <Link 
              href="/resume.pdf"
              className="social-link"
            >
              <span>resume</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <hr className="my-12" />
        </div>
      </div>
    </>
  );
}
