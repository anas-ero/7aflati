import React from "react"

export default function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Left */}
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

        {/* Right */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
