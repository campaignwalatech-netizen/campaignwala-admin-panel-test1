import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back to Login
        </button>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground">
              Enter your phone number and we'll send you a reset code
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
                Reset code sent to {phone}
              </div>
              <Link
                to="/login"
                className="block w-full text-center bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg transition hover:opacity-90"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-background text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 hover:opacity-90"
              >
                {isLoading ? "SENDING..." : "SEND RESET CODE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
