import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row w-full py-12 lg:py-[120px] px-4 md:px-12 lg:px-[100px] justify-center items-start gap-12 lg:gap-[100px] bg-brand-green">
      <div className="flex flex-col items-start gap-10">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6b3b7d7842f7f72b8f175c8c780b8dc3eb2751d7?width=192"
          alt="Vecteur Logo"
          className="w-24 h-24"
        />
        <div className="text-[#D4DBD3] font-dm-sans text-base leading-none">
          © 2025 Vecteur, Inc.
          <br />
          All rights reserved.
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-[30px] flex-1">
        <div className="flex flex-col items-start gap-5 flex-1">
          <div className="text-[#D4DBD3] font-dm-sans text-[15px] font-semibold leading-none">
            Quick Links
          </div>
          <Link to="/products" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Shop
          </Link>
          <Link to="/shipping-returns" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Shipping & Returns
          </Link>
          <Link to="/about" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex flex-col items-start gap-5 flex-1">
          <div className="text-[#D4DBD3] font-dm-sans text-[15px] font-semibold leading-none">
            Legal
          </div>
          <Link to="/privacy-policy" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link to="/shipping-returns" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Shipping & Returns
          </Link>
          <a href="mailto:support@vecteur.com" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Support
          </a>
        </div>

        <div className="flex flex-col items-start gap-5 flex-1">
          <div className="text-[#D4DBD3] font-dm-sans text-[15px] font-semibold leading-none">
            Stay Connected
          </div>
          <a href="https://instagram.com/vecteur" target="_blank" rel="noopener noreferrer" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Instagram
          </a>
          <a href="https://facebook.com/vecteur" target="_blank" rel="noopener noreferrer" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Facebook
          </a>
          <a href="https://twitter.com/vecteur" target="_blank" rel="noopener noreferrer" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Twitter
          </a>
          <a href="mailto:newsletter@vecteur.com" className="text-[#D4DBD3] font-dm-sans text-base leading-none hover:text-white transition-colors">
            Newsletter
          </a>
        </div>
      </div>
    </footer>
  );
}
