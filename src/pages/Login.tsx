import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import { supabase } from "../lib/supabase"

const LoginPage = () => {
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("user")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (isLogin) {
      // LOGIN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setLoading(false)

      if (error) {
        setError(error.message)
        return
      }

      navigate("/dashboard")
    } else {
      // SIGNUP
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            requested_role: role, // intent, NOT authority
          },
        },
      })

      setLoading(false)

      if (error) {
        setError(error.message)
        return
      }

      // user created, profile will be handled server-side
      navigate("/dashboard")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="flex w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Left side stays unchanged */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop"
            alt="Event Crowd"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-900 bg-opacity-60 flex flex-col justify-end p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Event Horizon</h2>
            <p className="text-lg text-indigo-100">
              "The best way to predict the future is to create it."
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {isLogin
                ? "Please enter your details to sign in."
                : "Join our community today."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

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

            {!isLogin && (
              <div>
                <label className="block mb-2 text-sm font-medium">
                  I want to…
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <option value="user">Attend events</option>
                  <option value="organizer">Organize events</option>
                </select>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button type="submit" className="w-full py-3">
              {loading
                ? "Please wait…"
                : isLogin
                ? "Sign In"
                : "Sign Up"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-semibold text-indigo-600"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
