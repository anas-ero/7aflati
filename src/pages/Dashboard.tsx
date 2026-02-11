export default function Dashboard({ children }: { children?: React.ReactNode }) 
{
 return (<div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2024 Your Company. All rights reserved.
      </footer>
    </div>
 );
}