import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const DUMMY_OTP = "1234";

  const sendOtp = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setInfo(`OTP sent to ${phone}`);
      setStep("otp");
    }, 1000);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (otp === DUMMY_OTP) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userPhone", phone);
        navigate("/dashboard");
      } else {
        setError("Invalid OTP. Try 1234.");
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* ---------- LEFT PANEL ---------- */}
      <div className="hidden md:flex md:w-1/2 bg-muted/30 flex-col items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#FF9500" />
              <text x="20" y="26" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">
                C
              </text>
            </svg>
            <h2 className="text-3xl font-bold text-foreground">Campaign Waala</h2>
          </div>

          <div className="mb-8 w-64 mx-auto">
            <img
              src="https://leads.freelancerwaala.com/new_year.gif"
              alt="Campaign Illustration"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-4 text-left">Welcome to Campaign Waala!</h3>
          <p className="text-muted-foreground leading-relaxed">
            Ready to transform leads into success? Dive into your daily tasks and celebrate your victories!
          </p>
        </div>
      </div>

      {/* ---------- RIGHT PANEL ---------- */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Register</h1>
            {info && <p className="text-sm text-muted-foreground mt-2">{info}</p>}
          </div>

          {step === "phone" ? (
            <form onSubmit={sendOtp} className="bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border">
              {error && <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">{error}</div>}

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary bg-background text-foreground font-medium placeholder:text-muted-foreground"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">You will receive a 4-digit OTP.</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:opacity-90 transition"
              >
                {isLoading ? "SENDING OTP..." : "SEND OTP"}
              </button>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/" className="font-medium text-primary hover:opacity-80 transition">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border">
              {error && <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">{error}</div>}

              <div className="text-center">
                <p className="font-semibold text-foreground mb-2">Enter your OTP</p>
                <div className="flex justify-center gap-3">
                  {[...Array(4)].map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      value={otp[i] || ""}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = otp.split("");
                        newOtp[i] = val;
                        setOtp(newOtp.join(""));
                      }}
                      className="w-12 h-12 text-center text-lg font-bold text-foreground border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:opacity-90 transition"
              >
                {isLoading ? "VERIFYING..." : "VERIFY OTP"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Didn't get the OTP?{" "}
                <button type="button" onClick={() => setInfo(`OTP re-sent to ${phone}`)} className="font-semibold text-primary hover:opacity-80 transition">
                  Resend OTP
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
