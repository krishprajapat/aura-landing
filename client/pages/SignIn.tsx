import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "sonner";

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function SignIn() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success("Signed in successfully!");
      navigate("/account");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex min-h-[calc(100vh-140px)]">
        {/* Left Side - Sign In Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 md:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-4">
                Welcome Back
              </h1>
              <p className="font-dm-sans text-gray-600 leading-relaxed">
                Sign in to your Vecteur account to access your orders, wishlist,
                and exclusive member benefits.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      )}
                      {!showPassword && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-sage focus:ring-brand-sage border-gray-300 rounded"
                  />
                  <span className="ml-2 font-dm-sans text-sm text-gray-700">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-dm-sans text-sm text-brand-sage hover:text-brand-green"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="font-dm-sans text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-brand-sage hover:text-brand-green font-medium"
                >
                  Create one here
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
                  Premium Fashion Awaits
                </h2>
                <p className="font-dm-sans text-lg leading-relaxed max-w-md mx-auto">
                  Join thousands of fashion enthusiasts who trust Vecteur for
                  their wardrobe essentials. Experience luxury, comfort, and
                  style in every piece.
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