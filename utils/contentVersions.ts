export type Content = {
    heroTitle: string;
    heroSubtitle: string;
    heroBackgroundImage: string;
    whyJoinTitle: string;
    whyJoinReasons: Array<{ title: string; description: string }>;
    featuresTitle: string;
    features: Array<{ title: string; description: string }>;
    getStartedTitle: string;
    getStartedSteps: Array<{ title: string; description: string }>;
    seeInActionTitle: string;
    seeInActionDescription: string;
    downloadSampleReportButtonText: string;
    downloadSampleReportNote: string;
    unlockAITitle: string;
    unlockAIDescription: string;
    referFriendButtonText: string;
  };
  
  export const contentVersions: Record<string, Content> = {
    v1: {
      heroTitle: "Get Exclusive Early Access to Ratings Rep Beta",
      heroSubtitle: "Manage your online reputation with AI-driven insights. Join our beta program today!",
      heroBackgroundImage: "http://pages.ratingsrep.com/wp-content/uploads/2017/01/banner-1920x1080.jpg",
      whyJoinTitle: "Why Join the Beta?",
      whyJoinReasons: [
        {
          title: "Early Access to Advanced AI Tools",
          description: "Be the first to use our AI dashboard, which provides actionable insights from reviews across the web."
        },
        {
          title: "Download Detailed Reports",
          description: "Instantly download comprehensive reports on your business's online reputation, ready to share with your team."
        },
        {
          title: "Exclusive Beta Features",
          description: "Access features not available to the public, helping you stay ahead of the competition."
        }
      ],
      featuresTitle: "Powerful Features at Your Fingertips",
      features: [
        { title: "Simple Tracking", description: "Sign in to one site and track all your reviews. Simplify your life." },
        { title: "Score Card", description: "See how you're doing across multiple review sites with a single score." },
        { title: "Measure Competitors", description: "Compare your reviews against competitors. Stay ahead of the game." },
        { title: "Professional Flyers", description: "Get great-looking flyers to give your customers more information." },
        { title: "Easy Review Requesting", description: "Simplify the process of asking customers for reviews." },
        { title: "Instant Feedback", description: "Respond to potential bad reviews before they go public." }
      ],
      getStartedTitle: "How to Get Started",
      getStartedSteps: [
        { title: "Sign Up", description: "Enter your email and business name to join the beta program." },
        { title: "Access Your Dashboard", description: "Explore your personalized dashboard with real-time AI insights." },
        { title: "Refer a Friend", description: "Get one person to sign up for the beta and gain full access to our advanced AI features and downloadable reports." }
      ],
      seeInActionTitle: "See Ratings Rep in Action",
      seeInActionDescription: "Get a glimpse of what Ratings Rep can do for your business. Download a sample report and see the insights our AI provides.",
      downloadSampleReportButtonText: "Download Sample Report",
      downloadSampleReportNote: "Note: Actual reports will be customized to your business's data and needs.",
      unlockAITitle: "Unlock Full AI Access",
      unlockAIDescription: "Want full access to our AI dashboard? It's simple! Refer just one business to join our beta, and you'll unlock all our advanced features. The more you refer, the more you gain!",
      referFriendButtonText: "Refer a Friend and Unlock AI"
    },
    v2: {
      heroTitle: "Empower Your Agency with Ratings Rep Beta",
      heroSubtitle: "Revolutionize reputation management for your clients with our AI-driven platform. Join our agency beta program today!",
      heroBackgroundImage: "http://pages.ratingsrep.com/wp-content/uploads/2017/01/banner-1920x1080.jpg",
      whyJoinTitle: "Why Join Our Agency Beta?",
      whyJoinReasons: [
        {
          title: "Streamline Client Management",
          description: "Manage multiple clients' reputations from a single, intuitive dashboard powered by AI."
        },
        {
          title: "Comprehensive Agency Reports",
          description: "Generate detailed reports for all your clients, showcasing your agency's impact on their online presence."
        },
        {
          title: "Agency-Exclusive Features",
          description: "Access agency-specific tools designed to enhance your service offerings and client satisfaction."
        }
      ],
      featuresTitle: "Agency-Focused Features",
      features: [
        { title: "Multi-Client Dashboard", description: "Manage and monitor all your clients' reputations from a single, unified interface." },
        { title: "White-Label Reports", description: "Create customized, branded reports to showcase your agency's value to clients." },
        { title: "Competitor Analysis", description: "Compare your clients against their competitors across multiple review platforms." },
        { title: "Bulk Review Management", description: "Efficiently handle reviews for multiple clients simultaneously." },
        { title: "Client Onboarding Tools", description: "Streamline the process of adding new clients to your Ratings Rep dashboard." },
        { title: "Agency Insights", description: "Gain valuable insights into your agency's performance and client satisfaction metrics." }
      ],
      getStartedTitle: "How Agencies Can Get Started",
      getStartedSteps: [
        { title: "Sign Up Your Agency", description: "Register your agency for our beta program with your agency details." },
        { title: "Onboard Your Clients", description: "Easily add your clients to the platform and start managing their reputations." },
        { title: "Expand Your Services", description: "Utilize our AI-powered tools to offer enhanced reputation management services to your clients." }
      ],
      seeInActionTitle: "See How Ratings Rep Empowers Agencies",
      seeInActionDescription: "Discover how Ratings Rep can transform your agency's reputation management services. Download a sample agency report to see the comprehensive insights we provide.",
      downloadSampleReportButtonText: "Download Agency Sample Report",
      downloadSampleReportNote: "Note: Agency reports can be customized to highlight your specific services and client needs.",
      unlockAITitle: "Unlock Advanced Agency AI Tools",
      unlockAIDescription: "Want to harness the full power of our AI for your agency? Refer another agency to our beta program and gain access to our most advanced features, designed specifically for scaling agencies.",
      referFriendButtonText: "Refer an Agency and Unlock AI"
    }
  };
  
  export function getVersionFromParams(searchParams: URLSearchParams): string {
    return searchParams.get('version') === 'v2' ? 'v2' : 'v1';
  }