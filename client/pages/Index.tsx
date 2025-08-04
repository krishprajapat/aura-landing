import Header from "../components/Header";
import Footer from "../components/Footer";
import heroimage from "../assets/11.png";
import secimg from "../assets/12.png";
import thirdimg from "../assets/13.png";
import four from "../assets/14.png";
import five from "../assets/15.png";
import six from "../assets/16.png";
import seven from "../assets/17.png";
import eight from "../assets/18.png";
import nine from "../assets/19.png";
import ten from "../assets/20.png";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section
        className="flex w-full min-h-[400px] md:min-h-[600px] lg:h-[1143px] px-4 md:px-12 lg:px-[159px] pt-8 md:pt-24 lg:pt-[316px] pb-8 md:pb-12 lg:pb-[58px] bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${heroimage})`,
        }}
      >
        <div className="flex flex-col justify-between lg:justify-end items-start gap-12 lg:gap-[308px] max-w-full lg:max-w-[450px]">
          <div className="flex flex-col gap-6 lg:gap-10">
            <div className="text-[#605A53] font-dm-sans text-sm md:text-base leading-[19.2px]">
              Discover the Latest Fashion Trends
            </div>
            <h1 className="text-[#28292A] font-anonymous text-4xl md:text-5xl lg:text-[66px] font-bold leading-tight lg:leading-[58px] max-w-full lg:max-w-[293px]">
              Welcome to Our Modern Clothing Store
            </h1>
            <p className="text-[#645B53] font-dm-sans text-base md:text-lg lg:text-[19px] leading-relaxed lg:leading-[30.333px] max-w-full lg:max-w-[450px]">
              Explore our collection of stylish and high-quality clothing,
              perfect for your everyday wardrobe. Browse our selection of
              jackets, shirts, pants, and more to find the perfect pieces that
              suit your personal style
            </p>
            <button className="flex w-full max-w-[216px] h-14 lg:h-16 px-8 lg:px-[53px] py-4 lg:py-[19px] justify-center items-center rounded-[64px] bg-[#2D372F] hover:bg-[#3D473F] transition-colors">
              <span className="text-[#BCC2C1] text-center font-dm-sans text-sm lg:text-[13px] font-semibold">
                Shop Now
              </span>
            </button>
          </div>
          <div className="max-w-full lg:max-w-[358px]">
            <p className="text-[#675F5C] font-dm-sans text-sm md:text-base leading-relaxed lg:leading-[22px]">
              Experience the exceptional craftsmanship and attention to detail
              in our clothing, designed to provide both comfort and
              fashion-forward appeal
            </p>
          </div>
        </div>
      </section>

      {/* Elevate Your Style Section */}
      <section
        className="flex w-full min-h-[350px] md:min-h-[500px] lg:h-[817px] px-4 md:px-12 lg:px-[194px] py-8 md:py-24 lg:py-[204.5px] justify-center lg:justify-end items-center bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${secimg})`,
        }}
      >
        <div className="w-full max-w-[441px] flex flex-col gap-6 lg:gap-8">
          <h2 className="text-[#363533] font-anonymous text-3xl md:text-4xl lg:text-[50px] font-bold leading-tight lg:leading-[57px]">
            Elevate Your Style
          </h2>
          <div className="text-[#8A8681] font-dm-sans text-sm md:text-base leading-[19.2px]">
            Embrace the Versatility of Our Apparel
          </div>
          <p className="text-[#767171] font-dm-sans text-base md:text-lg lg:text-[18px] leading-relaxed lg:leading-[30.333px]">
            Discover the perfect balance of comfort and style in our carefully
            curated collection. From casual everyday wear to sophisticated
            evening looks, we have something for every occasion
          </p>
          <button className="flex w-full max-w-[225px] h-14 lg:h-[63px] px-8 lg:px-12 py-4 lg:py-[19px] justify-center items-center rounded-[63px] bg-[#2D372F] hover:bg-[#3D473F] transition-colors">
            <span className="text-[#B2B9B1] text-center font-dm-sans text-sm lg:text-[13px] font-semibold">
              Explore Our Collection
            </span>
          </button>
        </div>
      </section>

      {/* Elevate Your Wardrobe Section */}
      <section
        className="flex w-full min-h-[350px] md:min-h-[500px] lg:h-[696px] px-4 md:px-12 lg:px-[158px] py-8 md:py-24 lg:py-[168.5px] items-center bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${thirdimg})`,
        }}
      >
        <div className="w-full max-w-[470px] flex flex-col gap-4 lg:gap-6">
          <div className="text-[#656F66] font-dm-sans text-sm lg:text-[15px] leading-[18px]">
            Find Your Perfect Fit
          </div>
          <h2 className="text-[#234338] font-anonymous text-3xl md:text-4xl lg:text-[52px] font-bold leading-tight lg:leading-[62.4px]">
            Elevate Your Wardrobe
          </h2>
          <div className="text-[#5A645F] font-dm-sans text-base lg:text-[17px] leading-[20.4px]">
            Step into Style
          </div>
          <p className="text-[#38413D] font-dm-sans text-base md:text-lg lg:text-[18px] leading-relaxed lg:leading-[30.333px]">
            Discover the perfect combination of comfort and fashion in our
            selection of high-quality clothing. Elevate your everyday look with
            our thoughtfully designed pieces that seamlessly blend form and
            function
          </p>
          <button className="flex w-full max-w-[186px] h-12 px-6 py-3 justify-center items-center rounded-[48px] bg-[#124032] hover:bg-[#1A5042] transition-colors">
            <span className="text-[#BABBB0] text-center font-dm-sans text-sm lg:text-base font-semibold">
              Shop Now
            </span>
          </button>
        </div>
      </section>

      {/* Crafted for Comfort Section */}
      <section className="flex w-full px-4 md:px-12 lg:px-40 py-12 md:py-24 lg:py-[137px] justify-center items-center bg-brand-warm-beige">
        <div className="flex w-full max-w-[1120px] flex-col justify-center items-start gap-8 lg:gap-[50px]">
          <div className="flex w-full flex-col items-center gap-4">
            <h2 className="text-brand-light-green font-anonymous text-3xl md:text-4xl lg:text-[61px] font-bold leading-tight lg:leading-[73.2px] text-center">
              Crafted for Comfort
            </h2>
            <p className="text-[#A09D99] font-dm-sans text-base md:text-lg lg:text-[21px] leading-relaxed lg:leading-[28px] text-center max-w-full lg:max-w-[977px]">
              Elevate your style with our carefully curated collection of modern
              and versatile clothing. Discover pieces that not only look great
              but also provide unparalleled comfort and quality
            </p>
          </div>
          <div className="flex w-full flex-col md:flex-row justify-center items-start gap-6 lg:gap-[42px]">
            <img
              src={four}
              alt="Fashion Item 1"
              className="w-full md:w-1/2 lg:w-[539px] h-[400px] md:h-[500px] lg:h-[652px] object-cover"
            />
            <img
              src={five}
              alt="Fashion Item 2"
              className="w-full md:w-1/2 lg:w-[539px] h-[400px] md:h-[500px] lg:h-[652px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Product Gallery Section */}
      <section className="flex w-full px-4 md:px-12 lg:px-40 py-6 justify-center items-center bg-brand-warm-beige">
        <div className="flex w-full max-w-[1119px] flex-col md:flex-row justify-center items-start gap-6 lg:gap-[39px]">
          <div className="flex flex-col items-center gap-[18px] w-full md:w-1/3">
            <img
              src={six}
              alt="Versatile Style"
              className="w-full max-w-[344px] h-[250px] md:h-[280px] lg:h-[321px] object-cover rounded-[11px]"
            />
            <div className="text-[#94928A] text-center font-dm-sans text-lg lg:text-xl">
              Versatile Style
            </div>
          </div>
          <div className="flex flex-col items-center gap-[18px] w-full md:w-1/3">
            <img
              src={seven}
              alt="Timeless Elegance"
              className="w-full max-w-[344px] h-[250px] md:h-[280px] lg:h-[321px] object-cover rounded-[11px]"
            />
            <div className="text-[#94928A] text-center font-dm-sans text-lg lg:text-xl">
              Timeless Elegance
            </div>
          </div>
          <div className="flex flex-col items-center gap-[18px] w-full md:w-1/3">
            <img
              src={eight}
              alt="Effortless Sophistication"
              className="w-full max-w-[344px] h-[250px] md:h-[280px] lg:h-[321px] object-cover rounded-[11px]"
            />
            <div className="text-[#94928A] text-center font-dm-sans text-lg lg:text-xl">
              Effortless Sophistication
            </div>
          </div>
        </div>
      </section>

      {/* Refined Aesthetics Section */}
      <section className="flex flex-col lg:flex-row w-full min-h-[800px] lg:h-[1064px] px-4 md:px-12 lg:px-[156px] py-12 md:py-24 lg:py-[116px] justify-center items-center gap-8 lg:gap-[100px] bg-brand-brown">
        <div className="w-full lg:w-[464px] flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
          <div className="text-[#41261C] font-dm-sans text-lg lg:text-xl leading-6">
            Elevate Your Everyday
          </div>
          <h2 className="text-[#372B24] font-anonymous text-3xl md:text-4xl lg:text-[63px] font-bold leading-tight lg:leading-[75.6px]">
            Refined Aesthetics
          </h2>
          <div className="text-[#3F2419] font-dm-sans text-lg lg:text-xl leading-6">
            Exceptional Quality
          </div>
          <p className="text-[#F6E2D3] font-dm-sans text-base md:text-lg lg:text-[18px] leading-relaxed lg:leading-[31.333px]">
            Discover the perfect balance of style and comfort in our carefully
            curated collection of modern clothing. Elevate your wardrobe with
            our thoughtfully designed pieces that seamlessly blend form and
            function
          </p>
          <button className="flex w-full max-w-[216px] h-14 lg:h-[62px] px-6 lg:px-[30px] py-3 lg:py-4 justify-center items-center rounded-[62px] bg-[#242223] hover:bg-[#343233] transition-colors">
            <span className="text-[#C0BDBB] text-center font-dm-sans text-lg lg:text-xl font-semibold">
              Shop Now
            </span>
          </button>
        </div>
        <img
          src={nine}
          alt="Refined Fashion"
          className="w-full lg:w-[562px] h-[400px] md:h-[600px] lg:h-[832px] object-cover order-1 lg:order-2"
        />
      </section>

      {/* Final CTA Section */}
      <section className="w-full min-h-[150px] lg:h-[203px] bg-brand-beige flex flex-col lg:flex-row items-center justify-between px-4 md:px-12 lg:px-[155px] py-8 lg:py-0 gap-6 lg:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-8 text-center md:text-left">
          <img
            src={ten}
            alt="Icon"
            className="w-[38px] h-[39px] flex-shrink-0"
          />
          <div className="text-[#8C8886] font-dm-sans text-base md:text-lg lg:text-xl leading-relaxed lg:leading-[25px] max-w-full lg:max-w-[412px]">
            Explore our collection of high-quality clothing that combines
            exceptional craftsmanship with on-trend designs, creating the
            perfect fusion of style and comfort
          </div>
        </div>
        <div className="text-[#AB9F9E] font-dm-sans text-base lg:text-[19px] leading-[22.8px] hidden lg:block">
          Connect with Us
        </div>
        <button className="flex w-full max-w-[240px] h-12 lg:h-[59px] px-6 lg:px-[30px] py-3 lg:py-[16.5px] justify-center items-center bg-[#252425] hover:bg-[#353435] transition-colors">
          <span className="text-[#DBD8D3] text-center font-dm-sans text-base lg:text-[17px] font-semibold">
            Learn More
          </span>
        </button>
      </section>

      <Footer />
    </div>
  );
}
