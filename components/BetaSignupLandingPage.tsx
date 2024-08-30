"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CheckIcon } from "@radix-ui/react-icons";

import { contentVersions, getVersionFromParams } from  "../utils/contentVersions";
import { useFadeIn } from "../hooks/useFadeIn";
import { createClient } from '@supabase/supabase-js';
import React from "react";

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yngamsavcpxuzywuauir.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
console.log(supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey!);

export function BetaSignupLandingPage() {
  const searchParams = useSearchParams();
  const version = searchParams ? getVersionFromParams(searchParams) : "default";
  const content = contentVersions[version];

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200; // Adjust this value to control how quickly the header fades to black
      const newOpacity = Math.min(scrollPosition / maxScroll, 1);
      setHeaderOpacity(newOpacity);
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // First, check if the email already exists
      const { data: existingEmails, error: checkError } = await supabase
        .from('Early Access')
        .select('email')
        .eq('email', email)
        .limit(1);

      if (checkError) throw checkError;

      if (existingEmails && existingEmails.length > 0) {
        setSubmitMessage("This email is already signed up for early access.");
        return;
      }

      // If email doesn't exist, insert it
      const { data, error: insertError } = await supabase
        .from('Early Access')
        .insert([{ email: email }])
        .select();

      if (insertError) throw insertError;

      console.log("Inserted data:", data);
      setSubmitMessage("Thank you for signing up for early access!");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setSubmitMessage(`Error: ${error.message}`);
      } else {
        setSubmitMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const fadeRef1 = useFadeIn();
  const fadeRef2 = useFadeIn();
  const fadeRef3 = useFadeIn();
  const fadeRef4 = useFadeIn();
  const fadeRef5 = useFadeIn();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#241a43] to-[#35184c] text-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 flex items-center transition-all duration-300 ${
          isScrolled ? "h-[72px]" : "h-24"
        }`}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${headerOpacity})`,
          boxShadow:
            headerOpacity > 0
              ? `0 2px 4px rgba(0,0,0,${headerOpacity * 0.1})`
              : "none",
        }}
      >
        <Link className="flex items-center justify-center" href="#">
          <img
            src="https://ratingsrep.com/includes/assets/logo-web.svg"
            alt="Ratings Rep Logo"
            className={`transition-all duration-300 ${isScrolled ? "h-11 w-auto" : "h-16 w-auto"}`}
          />
        </Link>
      </header>

      <main className={`flex-1 ${isScrolled ? "pt-20" : "pt-24"}`}>
        {/* Hero Section */}
        <section
          className="w-full py-12 md:py-16 lg:py-20 bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url('${content.heroBackgroundImage}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#241a43] to-[#35184c] opacity-90"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Join Our Wait List For
                <span className="block mt-2 text-[#F1C40F]">Ratings Rep Exclusive Access</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Manage your online reputation with AI-driven insights. Be among the first to experience our revolutionary platform
              </p>
              <div className="w-full max-w-md space-y-4 mt-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white text-black flex-grow text-base py-2 px-3 rounded-l-md"
                    />
                    <Button
                      type="submit"
                      className="bg-[#F1C40F] text-black hover:bg-[#E4B80E] text-base py-2 px-4 rounded-r-md"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Join Waitlist"}
                    </Button>
                  </div>
                </form>
                {submitMessage && (
                  <p className="text-sm text-center">{submitMessage}</p>
                )}
                <p className="text-xs text-gray-400 text-center">
                  Be the first to know when we launch. No spam, we promise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section
          ref={fadeRef1}
          className="w-full py-20 md:py-32 bg-black text-white transition-all duration-1000 opacity-0 translate-y-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              {content.whyJoinTitle}
            </h2>
            <div className="grid gap-10 mt-10 md:grid-cols-3">
              {content.whyJoinReasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-gray-900 rounded-lg shadow-md"
                >
                  <CheckIcon className="h-12 w-12 text-[#35184c]" />
                  <h3 className="text-xl font-bold text-center">
                    {reason.title}
                  </h3>
                  <p className="text-gray-300 text-center">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={fadeRef2}
          className="w-full py-20 md:py-32 bg-white text-[#241a43] transition-all duration-1000 opacity-0 translate-y-10"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              {content.featuresTitle}
            </h2>
            <div className="grid gap-10 mt-10 md:grid-cols-3">
              {content.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-gray-100 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-bold text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section
          ref={fadeRef3}
          className="w-full py-20 md:py-32 bg-gradient-to-br from-[#241a43] to-[#35184c] text-white transition-all duration-1000 opacity-0 translate-y-10"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              {content.getStartedTitle}
            </h2>
            <div className="grid gap-10 mt-10 md:grid-cols-3">
              {content.getStartedSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-[#35184c] text-white flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-center">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* See in Action Section */}
        <section
          ref={fadeRef4}
          className="w-full py-20 md:py-32 bg-white text-[#241a43] transition-all duration-1000 opacity-0 translate-y-10"
        >
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              {content.seeInActionTitle}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mb-8">
              {content.seeInActionDescription}
            </p>
            <Button className="bg-[#35184c] text-white hover:bg-[#241a43]">
              {content.downloadSampleReportButtonText}
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              {content.downloadSampleReportNote}
            </p>
          </div>
        </section>

        {/* Unlock AI Section */}
        <section
          ref={fadeRef5}
          className="w-full py-20 md:py-32 bg-black text-white transition-all duration-1000 opacity-0 translate-y-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/path-to-another-image.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="container px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              {content.unlockAITitle}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mb-8">
              {content.unlockAIDescription}
            </p>
            <Button className="bg-[#35184c] text-white hover:bg-[#241a43]">
              {content.referFriendButtonText}
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#241a43] text-white py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2023 Ratings Rep. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 md:mt-0">
              <Link className="text-sm hover:underline" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:underline" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
