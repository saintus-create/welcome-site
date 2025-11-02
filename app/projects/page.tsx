import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Redis } from "@upstash/redis";
import { Eye, ArrowRight } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project) => project.slug === "unkey")!;
  const top2 = allProjects.find((project) => project.slug === "planetfall")!;
  const top3 = allProjects.find((project) => project.slug === "highstorm")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto lg:mx-0 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Projects
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            A collection of work spanning development, design, and innovation.
          </p>
        </div>

        {/* Featured Projects - Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Eye className="w-4 h-4" />
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0,
                    )}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>Coming Soon</span>
                    )}
                  </div>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-display mb-4">
                  {featured.title}
                </h2>
                
                <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                  {featured.description}
                </p>
                
                <div className="absolute bottom-8 right-8">
                  <div className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </article>
            </Link>
          </Card>

          <Card>
            <Link href={`/projects/${top2.slug}`}>
              <article className="relative w-full h-full p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Eye className="w-4 h-4" />
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[top2.slug] ?? 0,
                    )}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {top2.date ? (
                      <time dateTime={new Date(top2.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(top2.date))}
                      </time>
                    ) : (
                      <span>Coming Soon</span>
                    )}
                  </div>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-white font-display mb-4">
                  {top2.title}
                </h2>
                
                <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                  {top2.description}
                </p>
                
                <div className="absolute bottom-8 right-8">
                  <div className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </article>
            </Link>
          </Card>
        </div>

        {/* Additional Projects - Same Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {sorted.slice(0, 2).map((project) => (
            <Card key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <article className="relative w-full h-full p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Eye className="w-4 h-4" />
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        views[project.slug] ?? 0,
                      )}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {project.date ? (
                        <time dateTime={new Date(project.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(project.date))}
                        </time>
                      ) : (
                        <span>Coming Soon</span>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold text-white font-display mb-4">
                    {project.title}
                  </h2>
                  
                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <div className="absolute bottom-8 right-8">
                    <div className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </article>
              </Link>
            </Card>
          ))}
        </div>

        {/* Full-width Call to Action Section */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl p-12 lg:p-16 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Want to collaborate?
          </h3>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            I'm always interested in discussing new projects and opportunities.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-white text-zinc-900 px-8 py-3 rounded-full font-semibold hover:bg-zinc-100 transition-colors"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Remaining Projects */}
        {sorted.length > 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16">
            {sorted.slice(2).map((project) => (
              <Card key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <article className="relative w-full h-full p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-zinc-300">
                        <Eye className="w-4 h-4" />
                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                          views[project.slug] ?? 0,
                        )}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {project.date ? (
                          <time dateTime={new Date(project.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(project.date))}
                          </time>
                        ) : (
                          <span>Coming Soon</span>
                        )}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-white font-display mb-4">
                      {project.title}
                    </h2>
                    
                    <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    
                    <div className="absolute bottom-8 right-8">
                      <div className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </article>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
