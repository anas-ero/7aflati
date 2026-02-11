import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../pages/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          requested_role: role,
        },
      },
    });

    setLoading(false);

    if (error) return setError(error.message);

    navigate("/dashboard");
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join our community today.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div>
          <label className="block mb-2 font-medium text-gray-900">I want to…</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
          >
            <option value="user">Attend events</option>
            <option value="organizer">Organize events</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full py-3">
          {loading ? "Creating account…" : "Sign Up"}
        </Button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
