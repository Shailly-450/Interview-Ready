import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side: Image/Branding */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center overflow-hidden">
        {/* Background image */}
        <img
          src="/welcome.png"
          alt="Welcome visual"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" style={{ zIndex: 2 }}></div>
        {/* Centered text */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-8">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Welcome to Interview-Ready</h1>
          <p className="mb-8 drop-shadow-lg">
            Be ready for your next interview with Interview-Ready.
          </p>
        </div>
      </div>

      {/* Right Side: Clerk SignIn */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md z-10">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                card: "shadow-lg border-0",
                headerTitle: "text-2xl font-bold",
                headerSubtitle: "text-gray-600",
              },
            }}
            afterSignInUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  );
} 