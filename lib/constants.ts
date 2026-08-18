export const siteConfig = {
  name: 'Oak & Code',
  tagline: 'Websites and web apps for local businesses.',
  description:
    'Oak & Code designs and builds fast, clean websites and web apps for local businesses — built by hand, not templated.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oakandcode.in',
  email: 'hello@oakandcode.in',
  phone: '[YOUR PHONE NUMBER]',
  address: 'Vadodara, Gujarat, India',
  workingHours: 'Mon–Sat, 9AM–7PM IST',
  social: {
    instagram: '[YOUR INSTAGRAM URL OR DELETE THIS LINE]',
    linkedin: '[YOUR LINKEDIN URL OR DELETE THIS LINE]',
whatsapp: 'https://wa.me/919173389217',  },
};

export const services = [
  { id: 'website', title: 'Website Development', description: 'Fast, mobile-friendly websites that clearly explain what you do and how to reach you.', icon: 'Globe', href: '/services' },
  { id: 'mobile', title: 'Mobile App Development', description: 'iOS & Android apps built with a clean interface and solid performance.', icon: 'Smartphone', href: '/services' },
  { id: 'uiux', title: 'UI/UX Design', description: 'Interfaces designed around how your actual customers use your product.', icon: 'Palette', href: '/services' },
  { id: 'ecommerce', title: 'E-Commerce Stores', description: 'Online stores with payments, inventory, and order management set up properly.', icon: 'ShoppingCart', href: '/services' },
  { id: 'saas', title: 'Custom Software', description: 'Bookings, dashboards, and internal tools built around your workflow.', icon: 'Code2', href: '/services' },
  { id: 'support', title: 'Maintenance & Support', description: 'Updates, monitoring, and new features after you launch.', icon: 'Shield', href: '/services' },
];

export const whyUsPoints = [
  'You talk directly to the person building your site — no account managers',
  'One fixed price, agreed before we start — no surprise invoices',
  'Typical turnaround of 2–4 weeks depending on scope',
  'Support included after launch — terms agreed per project',
  'Built responsive and tested across real devices',
];

export const processSteps = [
  { step: 1, title: 'Discovery Call', day: 'Day 1', description: 'A free call about your business, goals, and what "done" looks like.' },
  { step: 2, title: 'Strategy & Design', day: 'Week 1', description: 'Wireframes and a design direction you approve before any code is written.' },
  { step: 3, title: 'Development', day: 'Weeks 2–3', description: 'Built with regular preview links so you can watch progress.' },
  { step: 4, title: 'Testing & Launch', day: 'Final week', description: 'Cross-device testing, then a supported launch.' },
  { step: 5, title: 'Support', day: 'Ongoing', description: "Fixes and small updates after you're live — terms agreed per project." },
];

export const budgetOptions = ['₹10,000 – ₹25,000', '₹25,000 – ₹75,000', '₹75,000 – ₹2,00,000', '₹2,00,000+'];
export const timelineOptions = ['ASAP', 'Within 1 month', 'Flexible'];
export const sourceOptions = ['Google Search', 'Instagram', 'LinkedIn', 'Referral', 'WhatsApp', 'Other'];

export const faqSchema = [
  { question: 'How long does it take to build a website?', answer: "Most business websites take 2–4 weeks depending on scope. You'll get a clear timeline after the discovery call." },
  { question: "What happens if I'm not happy with the design?", answer: 'We work through revisions together before final sign-off — you approve the direction at each stage, not just at the end.' },
  { question: "What's included in the price?", answer: 'Design, development, mobile responsiveness, and a set support period after launch. No hidden fees — the quote is the price.' },
  { question: 'Do you work with clients outside Gujarat?', answer: 'Yes — everything runs over calls, WhatsApp, and email.' },
];