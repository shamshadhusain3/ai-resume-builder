import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/component/custom/Header";
import {
  ArrowRight,
  FileText,
  Sparkles,
  Cpu,
  LineChart,
  Layers,
  Lightbulb,
  Zap,
  Rocket,
  Quote,
  Star,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  // Main refs
  const mainRef = useRef(null);

  // Hero section refs
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const mockupRef = useRef(null);
  const floatingIconRef = useRef(null);

  // Features section refs
  const featuresSectionRef = useRef(null);
  const featuresTitleRef = useRef(null);
  const featuresRefs = useRef([]);

  // Testimonials section refs
  const testimonialsSectionRef = useRef(null);
  const testimonialsTitleRef = useRef(null);
  const testimonialsRefs = useRef([]);

  // CTA section refs
  const ctaSectionRef = useRef(null);
  const ctaContentRef = useRef(null);
  const ctaMockupRef = useRef(null);
  const benefitRefs = useRef([]);
  const circleRef = useRef(null);

  // Custom cursor refs
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Features data
  const features = [
    {
      icon: <Cpu />,
      title: "AI-Powered Content",
      description: "Our AI analyzes job descriptions and suggests tailored content for your resume.",
    },
    {
      icon: <LineChart />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems with our optimization tools.",
    },
    {
      icon: <Layers />,
      title: "Multiple Templates",
      description: "Choose from dozens of professionally designed templates for any industry.",
    },
    {
      icon: <FileText />,
      title: "Real-Time Editing",
      description: "Edit your resume in real-time and see changes instantly with our intuitive editor.",
    },
    {
      icon: <Lightbulb />,
      title: "Smart Suggestions",
      description: "Get intelligent suggestions for skills, achievements, and keywords to include.",
    },
    {
      icon: <Zap />,
      title: "Instant Download",
      description: "Download your resume in multiple formats including PDF, DOCX, and TXT.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      content:
        "This AI resume builder helped me land interviews at top tech companies. The AI suggestions were spot-on for my industry!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Sarah Williams",
      role: "Marketing Director",
      content:
        "I was skeptical about AI writing my resume, but the results were incredible. Received compliments on my resume format and content.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content:
        "The ATS optimization feature is a game-changer. My interview callback rate increased by 60% after using this platform.",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  // Benefits data
  const benefits = [
    "AI-powered resume content generation",
    "ATS-friendly templates",
    "Real-time editing and preview",
    "Multiple export formats",
    "Keyword optimization",
    "24/7 customer support",
  ];

  // Mouse move handler
  const onMouseMove = (e) => {
    // Animate cursor to follow mouse with slight delay
    gsap.to(cursorRef.current, {
      x: e.clientX - 16,
      y: e.clientY - 16,
      duration: 0.3,
      ease: "power2.out",
    });

    // Animate dot to follow mouse instantly
    gsap.to(cursorDotRef.current, {
      x: e.clientX - 4,
      y: e.clientY - 4,
      duration: 0.1,
    });
  };

  // Hover effect for interactive elements
  const onMouseEnter = () => {
    gsap.to(cursorRef.current, {
      width: 64,
      height: 64,
      backgroundColor: "rgba(147, 51, 234, 0.2)",
      duration: 0.3,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cursorRef.current, {
      width: 32,
      height: 32,
      backgroundColor: "rgba(147, 51, 234, 0.1)",
      duration: 0.3,
    });
  };

  useEffect(() => {
    // Initialize background animations
    const tl = gsap.timeline();

    tl.fromTo(".bg-gradient", { opacity: 0 }, { opacity: 0.3, duration: 1.5, ease: "power2.out" });

    // Initialize scroll animations
    const sections = gsap.utils.toArray(".animate-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Hero animations
    gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });

    gsap.fromTo(
      descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
    );

    gsap.fromTo(
      mockupRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Floating icon animation
    gsap.to(floatingIconRef.current, {
      y: -10,
      rotation: 5,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Pulse animation for elements in mockup
    gsap.to(".pulse-element", {
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.2,
    });

    // Features section animations
    gsap.fromTo(
      featuresTitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: featuresTitleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Feature cards animation
    featuresRefs.current.forEach((feature, index) => {
      if (feature) {
        gsap.fromTo(
          feature,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: feature,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Testimonials section animations
    gsap.fromTo(
      testimonialsTitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: testimonialsTitleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Testimonial cards animation
    testimonialsRefs.current.forEach((testimonial, index) => {
      if (testimonial) {
        gsap.fromTo(
          testimonial,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: testimonial,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // CTA section animations
    gsap.fromTo(
      circleRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ctaContentRef.current,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaContentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ctaMockupRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ctaMockupRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Benefits list animation
    benefitRefs.current.forEach((benefit, index) => {
      if (benefit) {
        gsap.fromTo(
          benefit,
          { x: -10, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: benefit,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Rotating circles animation
    const circles = document.querySelectorAll(".rotating-circle");
    circles.forEach((circle, index) => {
      gsap.to(circle, {
        rotation: index % 2 === 0 ? 360 : -360,
        duration: 20 + index * 5,
        repeat: -1,
        ease: "none",
      });
    });

    // Custom cursor setup
    if (cursorRef.current && cursorDotRef.current) {
      // Initial setup
      gsap.set(cursorRef.current, {
        width: 32,
        height: 32,
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "multiply",
        border: "2px solid rgba(147, 51, 234, 0.3)",
      });

      gsap.set(cursorDotRef.current, {
        width: 8,
        height: 8,
        backgroundColor: "rgba(147, 51, 234, 0.5)",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10000,
        pointerEvents: "none",
      });

      // Add event listeners
      document.addEventListener("mousemove", onMouseMove);

      // Add hover effect to all interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });

      // Check if device is mobile
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        cursorRef.current.style.display = "none";
        cursorDotRef.current.style.display = "none";
      }
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Clean up event listeners for cursor
      document.removeEventListener("mousemove", onMouseMove);

      const interactiveElements = document.querySelectorAll('a, button, [role="button"]');

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Custom Cursor */}
      <div ref={cursorRef}></div>
      <div ref={cursorDotRef}></div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/[0.2] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-br from-indigo-100/50 via-purple-100/50 to-pink-100/50 blur-3xl opacity-0 bg-gradient" />

      <div className="absolute z-10 top-0 left-0 right-0">
        {/* Header */}
        <Header />
      </div>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden animate-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100/80 px-3 py-1 text-sm text-purple-700 backdrop-blur-md self-start">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>AI-Powered Resume Builder</span>
                </div>

                <h1
                  ref={titleRef}
                  className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-700"
                >
                  Build Your Future with AI Resume Magic
                </h1>

                <p ref={descRef} className="text-lg text-gray-700 max-w-md">
                  Create professional, ATS-friendly resumes in minutes with our AI-powered platform. Stand out from the
                  competition and land your dream job.
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-2">
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium">
                    <Link to="/dashboard" className="flex items-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </button>
                  <button className="border border-purple-300 text-gray-800 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium">
                    <FileText className="mr-2 h-4 w-4 inline-block" /> View Templates
                  </button>
                </div>
              </div>

              <div ref={mockupRef} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-indigo-200/50 rounded-3xl blur-xl" />
                <div className="relative bg-white/90 backdrop-blur-sm border border-purple-100 rounded-3xl p-6 shadow-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-t-3xl" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-xs text-gray-500">AI Resume Builder</div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-6 w-3/4 bg-gray-200 rounded pulse-element" />
                      <div className="h-6 w-1/2 bg-gray-200 rounded pulse-element" />
                      <div className="h-24 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg mt-4" />
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="h-16 bg-gray-200/70 rounded-lg pulse-element" />
                        <div className="h-16 bg-gray-200/70 rounded-lg pulse-element" />
                      </div>
                      <div className="h-12 w-1/3 bg-purple-200 rounded-lg mt-4 mx-auto pulse-element" />
                    </div>
                  </div>
                </div>

                <div
                  ref={floatingIconRef}
                  className="absolute -top-6 -right-6 h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresSectionRef} className="py-20 relative animate-section">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
          <div className="container mx-auto px-4 md:px-6 relative">
            <div ref={featuresTitleRef} className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-purple-200 bg-purple-100/80 px-3 py-1 text-sm text-purple-700 backdrop-blur-md mb-4">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-700 mb-4">
                Supercharge Your Job Search
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Our AI-powered platform offers everything you need to create professional, attention-grabbing resumes
                that help you stand out from the competition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} ref={(el) => (featuresRefs.current[index] = el)} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white shadow-sm border border-purple-100/80 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-md">
                    <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg w-fit mb-4 feature-icon">
                      <div className="text-purple-700">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                <div className="bg-white rounded-full px-6 py-2 flex items-center">
                  <Rocket className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="text-gray-800 font-medium">Ready to boost your career? Try it now!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsSectionRef} className="py-20 relative animate-section">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
          <div className="container mx-auto px-4 md:px-6 relative">
            <div ref={testimonialsTitleRef} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-700 mb-4">
                Success Stories
              </h2>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Hear from professionals who transformed their job search with our AI resume builder.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} ref={(el) => (testimonialsRefs.current[index] = el)} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-indigo-200/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-white shadow-sm border border-purple-100/80 rounded-xl p-6 h-full transition-all duration-300 hover:shadow-md">
                    <div className="absolute -top-4 -right-4 quote-icon">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Quote className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full blur-sm" />
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-white relative"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">"{testimonial.content}"</p>

                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaSectionRef} className="py-20 relative animate-section">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />

          <div
            ref={circleRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(147,51,234,0.05)_0%,rgba(255,255,255,0)_50%)]"
          />

          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-5xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-white/90 backdrop-blur-xl shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div ref={ctaContentRef}>
                      <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-700 mb-4">
                        Ready to Transform Your Job Search?
                      </h2>

                      <p className="text-gray-700 mb-6">
                        Join thousands of professionals who have accelerated their careers with our AI-powered resume
                        builder.
                      </p>

                      <ul className="space-y-3 mb-8">
                        {benefits.map((benefit, index) => (
                          <li
                            key={index}
                            ref={(el) => (benefitRefs.current[index] = el)}
                            className="flex items-center text-gray-700"
                          >
                            <CheckCircle className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium">
                        <Link to="/dashboard" className="flex items-center">
                          Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </button>
                    </div>

                    <div ref={ctaMockupRef} className="relative">
                      <div className="relative bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 backdrop-blur-sm border border-purple-200/50 shadow-sm">
                        <div className="space-y-4">
                          <div className="h-6 w-3/4 bg-white/70 rounded pulse-element" />
                          <div className="h-6 w-1/2 bg-white/70 rounded pulse-element" />
                          <div className="h-32 bg-gradient-to-r from-purple-200/70 to-indigo-200/70 rounded-lg mt-4" />
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="h-16 bg-white/50 rounded-lg pulse-element" />
                            <div className="h-16 bg-white/50 rounded-lg pulse-element" />
                          </div>
                          <div className="h-10 w-1/3 bg-purple-300/70 rounded-lg mt-4 mx-auto pulse-element" />
                        </div>

                        <div className="absolute -top-4 -left-4 h-20 w-20 rotating-circle">
                          <div className="h-full w-full rounded-full border-2 border-t-purple-500 border-r-indigo-500 border-b-transparent border-l-transparent opacity-30" />
                        </div>

                        <div className="absolute -bottom-4 -right-4 h-16 w-16 rotating-circle">
                          <div className="h-full w-full rounded-full border-2 border-t-transparent border-r-purple-500 border-b-indigo-500 border-l-transparent opacity-30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
