import { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ArrowUpRight, Github, Linkedin, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetContact, useSubmitContact } from "@workspace/api-client-react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { useTextReveal } from "@/hooks/useTextReveal";
import { useMagnetic } from "@/hooks/useMagnetic";

const ICON_MAP: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Mail, Phone, MapPin, Clock, Github, Linkedin, User
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof formSchema>;

const inputCls = "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[rgba(200,250,72,0.4)] focus:ring-1 focus:ring-[rgba(200,250,72,0.15)] transition-all wm-body text-sm";

export default function ContactSection() {
  const { data: contact } = useGetContact();
  const mutation = useSubmitContact();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ data: { ...data, phone: data.phone || null } });
  };

  const labelRef = useRevealAnimation<HTMLDivElement>({ direction: "up" });
  const headingRef = useTextReveal<HTMLHeadingElement>({ type: "words" });
  const leftRef = useRevealAnimation<HTMLDivElement>({ direction: "left", start: "top 82%" });
  const rightRef = useRevealAnimation<HTMLDivElement>({ direction: "right", delay: 0.15, start: "top 82%" });
  const submitRef = useMagnetic<HTMLButtonElement>({ strength: 0.15 });

  const success = mutation.isSuccess;

  return (
    <section id="contact" className="wm-section relative" data-testid="contact-section">
      <div className="wm-separator mb-16" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_20%_80%,rgba(82,143,129,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div ref={labelRef} className="wm-section-label wm-label text-muted-foreground mb-5">
            {contact?.sectionTag ?? "Let's Build Together"}
          </div>
          <h2 ref={headingRef} className="wm-h2 text-foreground">
            {contact?.title ?? "Start Your Project"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <div ref={leftRef} className="space-y-4">
            {contact?.infos?.map((info, i) => {
              const Icon = ICON_MAP[info.icon] ?? Mail;
              return (
                <div key={i} className="wm-card p-5 flex items-center gap-4" data-testid={`contact-info-${i}`}>
                  <div className="w-10 h-10 rounded-xl border border-[rgba(200,250,72,0.2)] bg-[rgba(200,250,72,0.06)] flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[var(--wm-lime)]" />
                  </div>
                  <div>
                    <p className="wm-label text-muted-foreground mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="wm-body text-sm text-foreground hover:text-[var(--wm-lime)] transition-colors">{info.value}</a>
                    ) : (
                      <p className="wm-body text-sm text-foreground">{info.value}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Status indicator */}
            <div className="wm-card p-6">
              <h4 className="wm-h3 text-sm text-foreground mb-2">Response Time</h4>
              <p className="wm-body text-xs text-muted-foreground mb-4">We typically respond within 4 business hours. For urgent projects, call us directly.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--wm-lime)] animate-pulse" />
                <span className="wm-label text-[var(--wm-lime)]">Currently accepting new projects</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={rightRef} className="wm-card p-6 md:p-8">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 gap-4"
                data-testid="contact-success"
              >
                <div className="w-14 h-14 rounded-full border border-[var(--wm-lime)]/30 bg-[var(--wm-lime)]/10 flex items-center justify-center mb-2">
                  <CheckCircle size={28} className="text-[var(--wm-lime)]" />
                </div>
                <h3 className="wm-h3 text-foreground">Message Sent!</h3>
                <p className="wm-body text-muted-foreground text-sm max-w-xs">
                  {mutation.data?.message ?? "Thank you for reaching out. We'll get back to you shortly."}
                </p>
                <button
                  onClick={() => { mutation.reset(); form.reset(); }}
                  className="mt-4 wm-btn"
                >
                  <span>Send Another</span>
                  <span className="wm-btn-icon"><ArrowUpRight size={12} /></span>
                </button>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="wm-label text-muted-foreground mb-1.5 block">Full Name *</label>
                    <input {...form.register("name")} placeholder="John Doe" className={inputCls} data-testid="input-name" />
                    {form.formState.errors.name && <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="wm-label text-muted-foreground mb-1.5 block">Email *</label>
                    <input {...form.register("email")} type="email" placeholder="john@company.com" className={inputCls} data-testid="input-email" />
                    {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="wm-label text-muted-foreground mb-1.5 block">Phone</label>
                    <input {...form.register("phone")} type="tel" placeholder="+91 98765 43210" className={inputCls} data-testid="input-phone" />
                  </div>
                  <div>
                    <label className="wm-label text-muted-foreground mb-1.5 block">Subject *</label>
                    <input {...form.register("subject")} placeholder="Project Discussion" className={inputCls} data-testid="input-subject" />
                    {form.formState.errors.subject && <p className="text-xs text-destructive mt-1">{form.formState.errors.subject.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="wm-label text-muted-foreground mb-1.5 block">Message *</label>
                  <textarea {...form.register("message")} rows={5} placeholder="Tell us about your project, timeline, and goals..." className={`${inputCls} resize-none`} data-testid="input-message" />
                  {form.formState.errors.message && <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>}
                </div>

                <button
                  ref={submitRef}
                  type="submit"
                  disabled={mutation.isPending}
                  className="wm-btn w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "var(--wm-lime)", borderColor: "var(--wm-lime)", color: "#080a0e" }}
                  data-testid="button-submit"
                >
                  {mutation.isPending ? (
                    <div className="w-4 h-4 rounded-full border-2 border-[#080a0e]/30 border-t-[#080a0e] animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  <span>{mutation.isPending ? "Sending..." : "Send Message"}</span>
                </button>

                {mutation.isError && (
                  <p className="text-xs text-destructive text-center" data-testid="contact-error">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
