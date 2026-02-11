import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"
import Button from "../components/Button"
import Input from "../components/Input"
import AuthLayout from "../pages/AuthLayout"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) return setError(error.message)

    navigate("/dashboard")
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Please enter your details to sign in."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full py-3">
          {loading ? "Signing in…" : "Sign In"}
        </Button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
