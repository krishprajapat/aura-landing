import Header from "../components/Header";
import Footer from "../components/Footer";
import img1 from "../assets/17.png"
import img2 from "../assets/18.png"
import img3 from "../assets/16.png"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] lg:h-[600px] bg-gradient-to-r from-brand-sage to-brand-green flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="font-anonymous text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About Vecteur
          </h1>
          <p className="font-dm-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional fashion experiences through timeless design and
            uncompromising quality
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 px-4 md:px-12 lg:px-40 bg-brand-warm-beige">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-anonymous text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-brown mb-8">
                Our Story
              </h2>
              <div className="space-y-6 font-dm-sans text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Founded in 2020, Vecteur emerged from a simple belief: that
                  exceptional clothing should seamlessly blend timeless elegance
                  with contemporary comfort. Our journey began when our
                  founders, passionate about both fashion and craftsmanship,
                  recognized a gap in the market for truly sophisticated yet
                  wearable pieces.
                </p>
                <p className="text-lg">
                  From our studio in the heart of the fashion district, we
                  carefully curate and design each piece with meticulous
                  attention to detail. Every garment tells a story of quality,
                  from the finest fabrics sourced globally to the skilled
                  artisans who bring our designs to life.
                </p>
                <p className="text-lg">
                  Today, Vecteur stands as a testament to the power of
                  thoughtful design, serving discerning customers who appreciate
                  the finer things in life while demanding versatility in their
                  wardrobe choices.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={img1}
                alt="Our Craftsmanship"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-24 px-4 md:px-12 lg:px-40">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-anonymous text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-brown text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-brand-sage rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green transition-colors">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
                Quality First
              </h3>
              <p className="font-dm-sans text-gray-600 leading-relaxed">
                We never compromise on quality. Every material is carefully
                selected and every stitch is perfectly placed to ensure
                longevity and comfort.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-brand-sage rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green transition-colors">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
                Sustainable Fashion
              </h3>
              <p className="font-dm-sans text-gray-600 leading-relaxed">
                We believe in responsible fashion. Our pieces are designed to
                last, reducing waste and promoting a more sustainable approach
                to style.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-brand-sage rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green transition-colors">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-4">
                Customer Centric
              </h3>
              <p className="font-dm-sans text-gray-600 leading-relaxed">
                Your satisfaction is our priority. We listen to our customers
                and continuously evolve to meet your needs and exceed
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 px-4 md:px-12 lg:px-40 bg-brand-warm-beige">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-anonymous text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark-brown text-center mb-16">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-40 h-40 bg-brand-sage rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src={img2}
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-2">
                Sarah Chen
              </h3>
              <p className="font-dm-sans text-brand-green font-medium mb-3">
                Creative Director
              </p>
              <p className="font-dm-sans text-gray-600 text-sm leading-relaxed">
                With over 15 years in fashion design, Sarah brings visionary
                leadership and an eye for timeless elegance to every collection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-brand-sage rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src={img3}
                  alt="Marcus Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-2">
                Marcus Rodriguez
              </h3>
              <p className="font-dm-sans text-brand-green font-medium mb-3">
                Head of Production
              </p>
              <p className="font-dm-sans text-gray-600 text-sm leading-relaxed">
                Marcus ensures every piece meets our exacting standards,
                overseeing quality control and sustainable manufacturing
                processes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-brand-sage rounded-full mx-auto mb-6 overflow-hidden">
                <img
                  src={img1}
                  alt="Emma Thompson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-anonymous text-xl font-bold text-brand-dark-brown mb-2">
                Emma Thompson
              </h3>
              <p className="font-dm-sans text-brand-green font-medium mb-3">
                Customer Experience Lead
              </p>
              <p className="font-dm-sans text-gray-600 text-sm leading-relaxed">
                Emma leads our customer-first approach, ensuring every
                interaction with Vecteur exceeds expectations and builds lasting
                relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-4 md:px-12 lg:px-40 bg-brand-sage">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-anonymous text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            Join the Vecteur Family
          </h2>
          <p className="font-dm-sans text-lg text-[#D4DBD3] leading-relaxed mb-10 max-w-2xl mx-auto">
            Experience the difference that thoughtful design and exceptional
            craftsmanship can make in your wardrobe. Discover pieces that will
            become treasured staples for years to come.
          </p>
          <button className="inline-flex px-8 py-4 bg-white text-brand-sage font-dm-sans font-semibold rounded-full hover:bg-gray-100 transition-colors">
            Shop Our Collection
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}