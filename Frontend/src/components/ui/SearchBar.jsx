import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search…", className = "" }) {
  return (
    <div className={`input-icon-wrap ${className}`}>
      <Search />
      <input
        className="input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
      />
    </div>
  );
}
