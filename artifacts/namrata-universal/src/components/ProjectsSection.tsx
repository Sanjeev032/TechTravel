import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, X, Tag, ArrowUpRight } from "lucide-react";
import { useGetProjects } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useMagnetic } from "@/hooks/useMagnetic";

const CATEGORIES = ["All", "Web App", "Mobile App", "E-Commerce", "ERP"];

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string | null;
  featured?: boolean;
};

/** WM-style project card — image fills card, title overlays bottom */
function ProjectCard({
  project,
  onSelect,
  size = "normal",
}: {
  project: Project;
  onSelect: (p: Project) => void;
  size?: "normal" | "featured";
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 20 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0); y.set(0); setHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onHoverStart={() => setHovered(true)}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`group relative wm-card overflow-hidden cursor-pointer ${
        size === "featured" ? "aspect-video" : "aspect-square"
      }`}
      onClick={() => onSelect(project)}
      data-testid={`project-card-${project.id}`}
    >
      {/* Image — zoom on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={hovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        {project.featured && (
          <span className="wm-label px-2.5 py-1 rounded-full bg-[var(--wm-lime)] text-[#080a0e]">
            Featured
          </span>
        )}
      </div>
      <div className="absolute top-4 right-4">
        <span className="wm-label wm-glass px-2.5 py-1 rounded-full text-foreground/80">
          {project.category}
        </span>
      </div>

      {/* Arrow icon — appears on hover */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--wm-lime)] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight size={15} className="text-[#080a0e]" />
      </motion.div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5" style={{ transform: "translateZ(20px)" }}>
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={hovered ? { y: 0, opacity: 1 } : { y: 8, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="wm-label text-[var(--wm-lime)] mb-1"
        >
          View Project
        </motion.div>
        <h3 className="wm-h3 text-white leading-snug mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="wm-label px-2 py-0.5 rounded bg-white/10 text-white/60">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const modalVariant = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 26 } },
  exit: { opacity: 0, scale: 0.94, y: 20, transition: { duration: 0.2 } },
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const { data: projects } = useGetProjects({
    category: activeCategory === "All" ? undefined : activeCategory,
  });

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const filterRef = useRevealAnimation<HTMLDivElement>({ direction: "up", delay: 0.2 });

  const featured = projects?.[0];
  const rest = projects?.slice(1) ?? [];

  return (
    <section id="projects" className="wm-section relative" data-testid="projects-section">
      <div className="wm-separator mb-16" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-[radial-gradient(ellipse,rgba(82,143,129,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">
            Portfolio
          </div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">
            Work That Speaks
          </h2>
        </div>

        {/* Filters */}
        <div ref={filterRef} className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`wm-label px-4 py-2 rounded-full transition-all duration-200 ${
                  active
                    ? "bg-[var(--wm-lime)] text-[#080a0e]"
                    : "wm-glass text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`project-filter-${cat.toLowerCase().replace(/ /g, "-")}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* WM-style editorial grid:
            First card = full width featured
            Rest = 2-column grid of square cards */}
        <div className="space-y-4">
          {featured && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectCard project={featured} onSelect={setSelected} size="featured" />
            </motion.div>
          )}

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {rest.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -16 }}
                  transition={{ duration: 0.38, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={project} onSelect={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            data-testid="project-modal-overlay"
            style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(18px)" }}
          >
            <motion.div
              key="modal"
              variants={modalVariant}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl wm-card overflow-hidden"
              data-testid="project-modal"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  src={selected.imageUrl}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                  data-testid="project-modal-close"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-5">
                  <span className="wm-label wm-glass px-3 py-1 rounded-full text-[var(--wm-lime)]">
                    {selected.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="wm-h3 text-foreground">{selected.title}</h3>
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wm-btn ml-4 shrink-0"
                      data-testid="project-modal-live-link"
                    >
                      <span>Live Site</span>
                      <span className="wm-btn-icon">
                        <ExternalLink size={12} />
                      </span>
                    </a>
                  )}
                </div>
                <p className="wm-body text-muted-foreground mb-5">{selected.description}</p>
                <p className="wm-label text-muted-foreground mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 wm-label wm-glass px-3 py-1.5 rounded-lg text-muted-foreground">
                      <Tag size={10} className="text-[var(--wm-lime)]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
