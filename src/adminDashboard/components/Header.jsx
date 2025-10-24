import { Moon, Sun, Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function Header({ isDark, onThemeToggle }) {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname.replace('/admin/', '').replace('/admin', '');
    if (!path || path === '/') {
      return "ALL PRODUCTS";
    }
    return path.toUpperCase().replace(/-/g, " ");
  };

  const handleExport = () => {
    alert("Exporting data...");
  };

  return (
    <header className="border-b border-border/50 bg-card/40 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <div className="min-w-0 flex-1 lg:ml-0 ml-12">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            {getPageTitle()}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">18 active campaigns</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
         
          <button
            onClick={onThemeToggle}
            className="p-2.5 hover:bg-muted/60 rounded-lg transition-all duration-200 flex-shrink-0 border border-border/30 hover:border-border shadow-sm"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
