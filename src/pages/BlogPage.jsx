import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            The Journal
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-6">
            Notes On Indian Contemporary Art
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light">
            On the artists, the materials, and the market — writing from India
            Contemporary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {blogPosts.map((post, i) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.slug}
              className="group opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="artwork-tilt aspect-[4/3] overflow-hidden bg-[#EBE7DF] mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-3">
                {post.date} &middot; {post.readTime}
              </p>
              <h2 className="font-serif text-xl font-light text-ink-primary mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
