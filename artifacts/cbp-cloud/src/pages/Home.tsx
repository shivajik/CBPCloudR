import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Rocket, Shield, Zap, Globe, HardDrive, LineChart, 
  Terminal, CheckCircle2, ChevronRight, Server, Github, 
  PlayCircle, Code2, Cpu, Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const sharedPlans = [
  {
    name: "Starter",
    desc: "Perfect for side projects and MVPs.",
    price: "₹1999",
    highlight: false,
    badge: null,
    specs: [
      { label: "vCPU", value: "Shared (~1)" },
      { label: "RAM", value: "2 GB" },
      { label: "Disk", value: "20 GB" },
      { label: "Apps", value: "1–2" },
    ],
    features: ["Free SSL", "Shared Database", "Auto Deploy"],
    cta: "Start with Starter",
  },
  {
    name: "Builder",
    desc: "For growing teams shipping faster.",
    price: "₹3499",
    highlight: true,
    badge: "MOST POPULAR",
    specs: [
      { label: "vCPU", value: "Shared (~2)" },
      { label: "RAM", value: "4 GB" },
      { label: "Disk", value: "40 GB" },
      { label: "Apps", value: "3–5" },
    ],
    features: ["Free SSL", "Shared Database", "Daily Backups"],
    cta: "Start with Builder",
  },
  {
    name: "Growth",
    desc: "For scaling startups and active apps.",
    price: "₹5999",
    highlight: false,
    badge: null,
    specs: [
      { label: "vCPU", value: "2 Dedicated" },
      { label: "RAM", value: "8 GB" },
      { label: "Disk", value: "80 GB" },
      { label: "Apps", value: "5–10" },
    ],
    features: ["Free SSL", "Dedicated Database", "Daily Backups"],
    cta: "Start with Growth",
  },
];

const vpsPlans = [
  {
    name: "VPS Basic",
    desc: "Entry VPS for solo founders and APIs.",
    price: "₹2499",
    highlight: false,
    badge: null,
    specs: [
      { label: "vCPU", value: "2" },
      { label: "RAM", value: "4 GB" },
      { label: "Disk", value: "80 GB" },
    ],
    features: ["Full Root Access", "Free SSL", "Priority Network"],
    cta: "Get VPS Basic",
  },
  {
    name: "VPS Standard",
    desc: "More power for production workloads.",
    price: "₹3999",
    highlight: false,
    badge: null,
    specs: [
      { label: "vCPU", value: "4" },
      { label: "RAM", value: "8 GB" },
      { label: "Disk", value: "100 GB" },
    ],
    features: ["Full Root Access", "Free SSL", "Daily Backups"],
    cta: "Get VPS Standard",
  },
  {
    name: "VPS Pro",
    desc: "High-traffic apps and SaaS platforms.",
    price: "₹6999",
    highlight: true,
    badge: "BEST VALUE",
    specs: [
      { label: "vCPU", value: "8" },
      { label: "RAM", value: "16 GB" },
      { label: "Disk", value: "150 GB" },
    ],
    features: ["Full Root Access", "Free SSL", "Daily Backups", "Priority Support"],
    cta: "Get VPS Pro",
  },
  {
    name: "VPS Elite",
    desc: "Enterprise-grade isolation and raw power.",
    price: "₹11999",
    highlight: false,
    badge: null,
    specs: [
      { label: "vCPU", value: "16" },
      { label: "RAM", value: "32 GB" },
      { label: "Disk", value: "200 GB" },
    ],
    features: ["Full Root Access", "Free SSL", "Daily Backups", "Dedicated Support"],
    cta: "Contact Sales",
  },
];

function PlanCard({ plan, index }: { plan: typeof sharedPlans[0]; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1 } },
      }}
      className={`rounded-3xl flex flex-col relative ${
        plan.highlight
          ? "border-2 border-primary bg-card shadow-2xl shadow-primary/20 md:-translate-y-4"
          : "border border-border bg-card"
      } p-8`}
    >
      {plan.badge && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {plan.badge}
        </div>
      )}
      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
      <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6 bg-accent/50 rounded-xl p-4">
        {plan.specs.map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
            <span className="font-semibold text-sm">{s.value}</span>
          </div>
        ))}
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {plan.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        data-testid={`btn-plan-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
        className={`w-full ${plan.highlight ? "bg-primary hover:bg-primary/90" : ""}`}
        variant={plan.highlight ? "default" : "outline"}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}

function PricingSection() {
  const [tab, setTab] = useState<"shared" | "vps">("shared");
  const plans = tab === "shared" ? sharedPlans : vpsPlans;

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground text-lg">No surprise bills. Choose the power you need, upgrade anytime.</p>
      </div>

      {/* Tab switcher */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-accent border border-border rounded-2xl p-1 gap-1" data-testid="pricing-tab-switcher">
          <button
            data-testid="tab-shared"
            onClick={() => setTab("shared")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              tab === "shared"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Shared Hosting
          </button>
          <button
            data-testid="tab-vps"
            onClick={() => setTab("vps")}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              tab === "vps"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            VPS Hosting
          </button>
        </div>
      </div>

      <motion.div
        key={tab}
        className={`grid gap-8 ${
          tab === "shared" ? "md:grid-cols-3 max-w-5xl" : "md:grid-cols-2 lg:grid-cols-4 max-w-6xl"
        } mx-auto`}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} plan={plan} index={i} />
        ))}
      </motion.div>

      <p className="text-center text-muted-foreground text-sm mt-10">
        All plans include India-hosted infrastructure, free SSL, and auto-deploy from Git.
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          
          <motion.div 
            className="relative z-10 text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-8 text-sm font-medium">
              <svg viewBox="0 0 512 512" className="w-4 h-4 rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <path fill="#f93" d="M0 0h512v170.7H0z"/>
                <path fill="#fff" d="M0 170.7h512v170.6H0z"/>
                <path fill="#128807" d="M0 341.3h512V512H0z"/>
                <circle cx="256" cy="256" r="75" fill="#000080"/>
                <circle cx="256" cy="256" r="60" fill="#fff"/>
                <path fill="#000080" d="M256 196l4.6 60h-9.2zM256 316l-4.6-60h9.2zM196 256l60-4.6v9.2zM316 256l-60 4.6v-9.2z"/>
              </svg>
              <span>India-Based Cloud Infrastructure</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Deploy Your App in Seconds — <br className="hidden md:block" />
              <span className="text-gradient">On India-Based Cloud</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Git push → Live app. No DevOps. No AWS complexity. Full control. 
              Get the simplicity of a PaaS with the power of a VPS.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Start Deploying Now
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 font-semibold rounded-full border-border hover:bg-accent">
                Book Demo
              </Button>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> India-hosted (low latency)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Instant deploy (Node, Python, PHP)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Built-in SSL & Security</div>
            </motion.div>
          </motion.div>
        </section>

        {/* Trust / Social Proof */}
        <section className="py-10 border-y border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-8">Trusted by developers building SaaS, APIs, and internal tools</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale">
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Terminal className="w-6 h-6" /> DevSync</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Database className="w-6 h-6" /> DataFlow</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Cpu className="w-6 h-6" /> NexaCore</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Globe className="w-6 h-6" /> WebScale</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl"><Code2 className="w-6 h-6" /> CodeBase</div>
            </div>
          </div>
        </section>

        {/* Problem -> Solution */}
        <section id="solution" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">The Problem with Modern Cloud</h2>
              <ul className="space-y-4">
                <li className="flex gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive-foreground/80">
                  <span className="text-destructive font-bold mt-1">✗</span>
                  <p><strong>Complex AWS Setup:</strong> Hours wasted configuring VPCs, IAM roles, and load balancers instead of writing code.</p>
                </li>
                <li className="flex gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive-foreground/80">
                  <span className="text-destructive font-bold mt-1">✗</span>
                  <p><strong>High Latency:</strong> Standard PaaS providers host in US/Europe, slowing down your Indian users.</p>
                </li>
                <li className="flex gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive-foreground/80">
                  <span className="text-destructive font-bold mt-1">✗</span>
                  <p><strong>Unpredictable Bills:</strong> Usage-based pricing models that spike randomly at the end of the month.</p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">The CBP Cloud Solution</h2>
              <div className="p-8 rounded-2xl bg-card border border-primary/20 shadow-[0_0_40px_rgba(0,102,255,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px]"></div>
                <ul className="space-y-6 relative z-10">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><Zap className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-semibold text-lg">Deploy in Seconds</h4>
                      <p className="text-muted-foreground text-sm mt-1">Connect your Git repo, click deploy, and you're live. We handle the build and deployment pipeline.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><Globe className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-semibold text-lg">India-Hosted Infrastructure</h4>
                      <p className="text-muted-foreground text-sm mt-1">Servers located in Mumbai. Guaranteeing single-digit latency for Indian users and data compliance.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0"><LineChart className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-semibold text-lg">Flat, Predictable Pricing</h4>
                      <p className="text-muted-foreground text-sm mt-1">Know exactly what you'll pay every month. No surprise bills, no complex calculators.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-card/30 border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From Code to Production in 3 Steps</h2>
              <p className="text-muted-foreground text-lg">Stop wrestling with servers. Experience true "push to deploy" simplicity.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <Github className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Connect Repo</h3>
                <p className="text-muted-foreground">Link your GitHub, GitLab, or Bitbucket account and select the repository you want to deploy.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center relative"
              >
                <div className="hidden md:block absolute top-1/2 -left-4 w-8 border-t border-dashed border-border"></div>
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-border"></div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Terminal className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Select Environment</h3>
                <p className="text-muted-foreground">We auto-detect Node, Python, PHP, or Dockerfiles. Tweak env vars if needed, and you're set.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-card border border-border flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Click Deploy</h3>
                <p className="text-muted-foreground">Hit deploy and watch your app go live on a custom subdomain with auto-configured SSL.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Scale</h2>
            <p className="text-muted-foreground text-lg">Enterprise-grade infrastructure packed into a beautiful, simple dashboard.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Instant Deploy", desc: "Push to your main branch and watch CBP Cloud automatically build and deploy your application." },
              { icon: Server, title: "Docker Powered", desc: "Bring your own Dockerfile to deploy absolutely any stack, language, or framework." },
              { icon: HardDrive, title: "Managed Databases", desc: "One-click MySQL, PostgreSQL, and Redis databases with automated daily backups." },
              { icon: Shield, title: "Security Built-in", desc: "Free automated SSL certificates, DDoS protection, and customizable firewall rules." },
              { icon: LineChart, title: "Deep Monitoring", desc: "Real-time metrics for CPU, RAM, Network, and application logs right in your dashboard." },
              { icon: Globe, title: "India Hosting", desc: "Mumbai-based datacenters ensuring your app loads instantly for your primary user base." }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <feat.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section id="compare" className="py-24 bg-card/50 border-y border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why CBP Cloud Wins</h2>
              <p className="text-muted-foreground text-lg">Stop paying the AWS complexity tax or the foreign-cloud latency penalty.</p>
            </div>
            
            <div className="overflow-x-auto rounded-2xl border border-border bg-background shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-card">
                    <th className="p-4 border-b border-border font-semibold w-1/3">Feature</th>
                    <th className="p-4 border-b border-border font-bold text-primary w-1/6">CBP Cloud</th>
                    <th className="p-4 border-b border-border font-semibold text-muted-foreground w-1/6">Railway</th>
                    <th className="p-4 border-b border-border font-semibold text-muted-foreground w-1/6">Render</th>
                    <th className="p-4 border-b border-border font-semibold text-muted-foreground w-1/6">AWS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      feature: "India Hosting",
                      cbp: { label: "Native (India)", type: "good" },
                      r:   { label: "Limited / No region", type: "bad" },
                      ren: { label: "Limited / No region", type: "bad" },
                      aws: { label: "Available (India regions)", type: "partial" },
                    },
                    {
                      feature: "Instant Deploy",
                      cbp: { label: "Yes", type: "good" },
                      r:   { label: "Yes", type: "good" },
                      ren: { label: "Yes", type: "good" },
                      aws: { label: "No (manual setup)", type: "bad" },
                    },
                    {
                      feature: "Easy Setup",
                      cbp: { label: "Very Easy", type: "good" },
                      r:   { label: "Easy", type: "partial" },
                      ren: { label: "Easy", type: "partial" },
                      aws: { label: "Complex", type: "bad" },
                    },
                    {
                      feature: "Pricing",
                      cbp: { label: "Predictable", type: "good" },
                      r:   { label: "Usage-based", type: "partial" },
                      ren: { label: "Moderate", type: "partial" },
                      aws: { label: "Complex / variable", type: "bad" },
                    },
                    {
                      feature: "Support",
                      cbp: { label: "Direct (India-based)", type: "good" },
                      r:   { label: "Limited", type: "bad" },
                      ren: { label: "Limited", type: "bad" },
                      aws: { label: "Ticket-based", type: "partial" },
                    },
                    {
                      feature: "No DevOps Needed",
                      cbp: { label: "Yes", type: "good" },
                      r:   { label: "Mostly", type: "partial" },
                      ren: { label: "Mostly", type: "partial" },
                      aws: { label: "No", type: "bad" },
                    },
                  ].map((row, i) => {
                    const cellClass = (type: string) =>
                      type === "good"
                        ? "text-emerald-400 font-semibold"
                        : type === "bad"
                        ? "text-red-400"
                        : "text-amber-400";
                    return (
                      <tr key={i} className={`hover:bg-accent/50 transition-colors ${i % 2 === 0 ? "" : "bg-accent/20"}`}>
                        <td className="p-4 font-medium text-foreground">{row.feature}</td>
                        <td className={`p-4 ${cellClass(row.cbp.type)}`}>{row.cbp.label}</td>
                        <td className={`p-4 ${cellClass(row.r.type)}`}>{row.r.label}</td>
                        <td className={`p-4 ${cellClass(row.ren.type)}`}>{row.ren.label}</td>
                        <td className={`p-4 ${cellClass(row.aws.type)}`}>{row.aws.label}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* Use Cases */}
        <section className="py-24 bg-accent border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-12 text-muted-foreground">Built for modern developer workflows</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['SaaS Products', 'Backend APIs', 'Internal Tools', 'AI Applications', 'Client Projects'].map((useCase, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-background border border-border text-foreground font-medium shadow-sm">
                  {useCase}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">Is this like AWS?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                No, CBP Cloud is much simpler. While AWS gives you raw building blocks that require extensive configuration, we provide a streamlined Platform-as-a-Service experience. You just push your code, and we handle the server provisioning, networking, SSL, and load balancing automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">Can I deploy any app?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes! We have native auto-build support for Node.js, Python, and PHP applications. If you're using another language or require a highly custom environment, you can deploy literally anything using a Dockerfile.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">Is it scalable?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Absolutely. Start small with our Starter plan and upgrade to Growth or Dedicated VPS instances seamlessly as your traffic grows. No migrations or downtime required when upgrading within our ecosystem.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-border rounded-lg bg-card px-4">
              <AccordionTrigger className="hover:no-underline font-semibold text-lg py-4">Do you provide backups?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes, automated backups are included. Growth and Dedicated plans include automated daily backups for your managed databases, ensuring your data is always safe and recoverable.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to deploy your app?</h2>
            <p className="text-xl text-muted-foreground mb-10">Join thousands of Indian developers shipping faster on CBP Cloud.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
                Start Now <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full bg-background/50 backdrop-blur-sm">
                Talk to us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
