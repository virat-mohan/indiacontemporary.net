import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary">Post not found.</p>
        <Link to="/blog" className="text-accent underline font-sans">
          Back to the journal
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} /> The Journal
        </Link>

        <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4">
          {post.date} &middot; {post.readTime}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink-primary tracking-tight leading-tight mb-10">
          {post.title}
        </h1>

        <div className="artwork-tilt aspect-[16/9] overflow-hidden bg-[#EBE7DF] mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-6">
          {post.body.map((para, i) => (
            <p
              key={i}
              className="text-base text-ink-secondary font-sans font-light leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
