
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords don't match");
    }

    if (!formData.acceptTerms) {
      return toast.error("Please accept the terms and conditions");
    }

    setIsLoading(true);
    
    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      await signup(formData.email, formData.password, displayName);
      toast.success("Account created successfully!");
      navigate("/account");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex min-h-[calc(100vh-140px)]">
        {/* Left Side - Sign Up Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 md:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-4">
                Join Vecteur
              </h1>
              <p className="font-dm-sans text-gray-600 leading-relaxed">
                Create your account to access exclusive collections and member benefits.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans pr-12"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      ) : (
                        <>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans"
                  placeholder="Confirm password"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-brand-sage focus:ring-brand-sage border-gray-300 rounded mt-1"
                />
                <label className="ml-2 font-dm-sans text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="/terms" className="text-brand-sage hover:text-brand-green">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-brand-sage hover:text-brand-green">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-dm-sans text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-brand-sage hover:text-brand-green font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Branding */}
        <div className="hidden lg:flex lg:flex-1 lg:relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/1e077b59a283703cf2ecd0e87a6eb53471308487?width=800')",
            }}
          >
            <div className="absolute inset-0 bg-brand-sage bg-opacity-80 flex items-center justify-center">
              <div className="text-center text-white px-8">
                <h2 className="font-anonymous text-4xl font-bold mb-6">
                  Start Your Fashion Journey
                </h2>
                <p className="font-dm-sans text-lg leading-relaxed max-w-md mx-auto">
                  Discover curated collections and enjoy exclusive member benefits with your new Vecteur account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
