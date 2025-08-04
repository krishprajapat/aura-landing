import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    
    // Simulate API call
    setTimeout(() => {
      console.log("Sign in attempt:", formData);
      alert("Sign in successful! (Demo)");
      setIsLoading(false);
      // In a real app, you would handle authentication here
    }, 1000);
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

            {/* Social Sign In */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-dm-sans">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-dm-sans text-gray-500 hover:bg-gray-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-dm-sans text-gray-500 hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
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
