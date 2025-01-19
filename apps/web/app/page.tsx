"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PencilRuler, Users, Share2, Sparkles } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const features = [
    {
      icon: <PencilRuler className="h-6 w-6" />,
      title: "Intuitive Drawing Tools",
      description:
        "Create diagrams and sketches with our easy-to-use drawing tools",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time, anywhere in the world",
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Easy Sharing",
      description: "Share your drawings instantly with a simple link",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Smart Features",
      description: "Intelligent shape recognition and automatic alignment",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Whiteboard of the Future
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create beautiful hand-drawn diagrams, wireframes, and illustrations
            with the power of modern technology.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Try Excalidraw Now
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Preview Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-16"
        >
          <img
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=2000&q=80"
            alt="Excalidraw Preview"
            className="rounded-lg shadow-2xl w-full"
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16" 
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Excalidraw?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of hand-drawn aesthetics and digital
            precision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-6 rounded-lg bg-card shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <div className="bg-card rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams and individuals who use Excalidraw to bring
            their ideas to life.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Drawing Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
