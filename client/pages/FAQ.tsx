import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unworn items in their original condition with tags attached. Items must be returned in their original packaging. Sale items are final sale and cannot be returned. To initiate a return, please contact our customer service team or visit our returns portal on your account page.",
    category: "Returns & Exchanges",
  },
  {
    id: 2,
    question: "How do I determine my size?",
    answer:
      "We provide detailed size charts for each product category. You can find the size guide by clicking on the 'Size Guide' link on any product page. We recommend measuring yourself and comparing to our charts rather than relying on standard sizing, as fit can vary between brands. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
    category: "Sizing",
  },
  {
    id: 3,
    question: "What shipping options do you offer?",
    answer:
      "We offer several shipping options: Standard shipping (5-7 business days) for $8.95, Express shipping (2-3 business days) for $15.95, and Overnight shipping (1 business day) for $25.95. Free standard shipping is available on orders over $150. International shipping is available to select countries with rates calculated at checkout.",
    category: "Shipping",
  },
  {
    id: 4,
    question: "How do I care for my Vecteur garments?",
    answer:
      "Each garment comes with specific care instructions on the label. Generally, we recommend dry cleaning for our wool and structured pieces, and gentle machine washing for cotton and casual items. Always check the care label first. For specific care questions about your items, feel free to contact our customer service team.",
    category: "Product Care",
  },
  {
    id: 5,
    question: "Do you offer alterations?",
    answer:
      "Yes! We offer complimentary basic alterations (hemming, sleeve adjustments) on full-price items purchased in our showroom. For online purchases, we can recommend trusted tailors in your area. More extensive alterations may incur additional charges, which will be discussed before any work begins.",
    category: "Alterations",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Klarna for buy-now-pay-later options. For orders over $1,000, we also accept bank transfers. All transactions are processed securely using industry-standard encryption.",
    category: "Payment",
  },
  {
    id: 7,
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or directly on the carrier's website. You can also log into your account on our website to view real-time order status and tracking information.",
    category: "Shipping",
  },
  {
    id: 8,
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer both physical and digital gift cards in various denominations from $50 to $1,000. Digital gift cards are delivered instantly via email, while physical gift cards are beautifully packaged and shipped within 2-3 business days. Gift cards never expire and can be used online or in our showroom.",
    category: "Gift Cards",
  },
  {
    id: 9,
    question: "What is your exchange policy?",
    answer:
      "Exchanges are available within 30 days of purchase for unworn items with tags attached. You can exchange for a different size or color of the same item, or receive store credit for the full value to use on different items. Shipping costs for exchanges are covered by us for the first exchange per order.",
    category: "Returns & Exchanges",
  },
  {
    id: 10,
    question: "Do you offer wholesale or bulk pricing?",
    answer:
      "Yes, we offer wholesale pricing for qualified retailers and bulk pricing for corporate clients. Minimum order quantities and eligibility requirements apply. Please contact our wholesale team at wholesale@vecteur.com for more information about our trade programs and pricing structure.",
    category: "Wholesale",
  },
  {
    id: 11,
    question: "How often do you release new collections?",
    answer:
      "We release new collections seasonally - typically 4 times per year for Spring, Summer, Fall, and Winter. We also occasionally release limited capsule collections throughout the year. To stay updated on new releases, subscribe to our newsletter or follow us on social media.",
    category: "Products",
  },
  {
    id: 12,
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be cancelled or modified within 2 hours of placement, as we process orders quickly to ensure fast delivery. After this window, we may not be able to make changes. Please contact customer service immediately if you need to make changes to your order.",
    category: "Orders",
  },
];

const categories = [
  "All",
  "Returns & Exchanges",
  "Sizing",
  "Shipping",
  "Product Care",
  "Payment",
  "Orders",
  "Products",
  "Wholesale",
  "Gift Cards",
  "Alterations",
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-brand-sage to-brand-green flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="font-anonymous text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-dm-sans text-sm md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our products, shipping,
            returns, and more.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 md:py-8 px-4 md:px-12 lg:px-40 bg-brand-warm-beige">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6 md:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 md:px-6 py-3 md:py-4 pl-10 md:pl-12 border border-gray-300 rounded-full font-dm-sans text-sm md:text-lg focus:ring-brand-sage focus:border-brand-sage"
              />
              <svg
                className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-4 py-2 rounded-full font-dm-sans text-xs md:text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-brand-sage text-white"
                    : "bg-white text-brand-sage hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 md:py-16 lg:py-24 px-4 md:px-12 lg:px-40">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-dm-sans text-base md:text-lg text-gray-600">
                No questions found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpanded(faq.id)}
                    className="w-full px-4 md:px-6 py-4 md:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <span className="inline-block px-2 md:px-3 py-1 bg-brand-sage text-white text-xs font-dm-sans font-medium rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="font-anonymous text-base md:text-lg lg:text-xl font-bold text-brand-dark-brown leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 text-brand-sage transition-transform flex-shrink-0 ${
                        expandedItems.includes(faq.id) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {expandedItems.includes(faq.id) && (
                    <div className="px-4 md:px-6 py-4 md:py-5 bg-gray-50 border-t border-gray-200">
                      <p className="font-dm-sans text-sm md:text-base text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 px-4 md:px-12 lg:px-40 bg-brand-sage">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anonymous text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Still Have Questions?
          </h2>
          <p className="font-dm-sans text-lg text-[#D4DBD3] leading-relaxed mb-10 max-w-2xl mx-auto">
            Our customer service team is here to help. Reach out to us and we'll
            get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex px-8 py-4 bg-white text-brand-sage font-dm-sans font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@vecteur.com"
              className="inline-flex px-8 py-4 border-2 border-white text-white font-dm-sans font-semibold rounded-full hover:bg-white hover:text-brand-sage transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
