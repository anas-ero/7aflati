import { Search } from "lucide-react";
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) => {

const categories = ["All", "Tech", "Art", "Music", "Sports", "Education"];
    return (
<div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6 bg-brand-card/50 p-4 rounded-2xl border border-slate-800">
            <div className="relative group w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-accent transition-colors" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-brand-dark border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none w-full transition-all"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? "bg-brand-accent text-brand-dark border-brand-accent"
                      : "bg-brand-dark border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
    );
}
export default SearchBar;