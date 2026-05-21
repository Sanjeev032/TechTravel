import { Clock, ArrowUpRight } from "lucide-react";
import { useGetBlogs } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";

export default function BlogSection() {
  const { data: blogs } = useGetBlogs();

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const gridRef = useRevealAnimation<HTMLDivElement>({
    childSelector: ".blog-card",
    stagger: { amount: 0.4, from: "start" },
    direction: "up",
    distance: 40,
    start: "top 82%",
  });

  const featured = blogs?.[0];
  const rest = blogs?.slice(1) ?? [];

  return (
    <section id="blog" className="wm-section" data-testid="blog-section">
      <div className="wm-separator mb-16" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div className="max-w-2xl">
            <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">Insights</div>
            <h2 ref={headingRef} className="wm-h2 text-foreground">From the Engineering Desk</h2>
          </div>
          <button className="wm-btn shrink-0">
            <span>View All</span>
            <span className="wm-btn-icon"><ArrowUpRight size={13} strokeWidth={2.5} /></span>
          </button>
        </div>

        <div ref={gridRef} className="space-y-4">
          {/* Featured article — full width */}
          {featured && (
            <article className="blog-card group wm-card overflow-hidden cursor-pointer" data-testid={`blog-card-${featured.id}`}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="wm-label px-3 py-1 rounded-full border border-[rgba(200,250,72,0.2)] text-[var(--wm-lime)] mb-4 inline-block">
                      {featured.category}
                    </span>
                    <h3 className="wm-h3 text-foreground text-xl md:text-2xl mb-3 leading-snug group-hover:text-[var(--wm-lime)] transition-colors">
                      {featured.title}
                    </h3>
                    <p className="wm-body text-muted-foreground leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs wm-label text-muted-foreground mt-6 pt-5 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--wm-lime)]/10 flex items-center justify-center text-[var(--wm-lime)] text-xs font-bold">
                        {featured.author.charAt(0)}
                      </div>
                      {featured.author}
                    </div>
                    <div className="flex items-center gap-1"><Clock size={10} />{featured.readTime}</div>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Grid of rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post) => (
              <article key={post.id} className="blog-card group wm-card overflow-hidden cursor-pointer" data-testid={`blog-card-${post.id}`}>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e]/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="wm-label wm-glass px-2.5 py-1 rounded-full text-[var(--wm-lime)]">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="wm-h3 text-foreground text-sm mb-2 leading-snug group-hover:text-[var(--wm-lime)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="wm-body text-muted-foreground text-xs mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs wm-label text-muted-foreground border-t border-white/5 pt-4">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-1"><Clock size={10} />{post.readTime}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
