import { useState } from "react";
import { Bell, Search, User, Shield, ChevronDown } from "lucide-react";

// --- Local UI Component Definitions ---
// The following components are defined locally to resolve the import error.
// They mimic the styling and props of the original UI library components.

const Button = ({ variant, size, className, children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50";
  
  const variantStyles = {
    ghost: "hover:bg-muted/50",
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
  };

  const sizeStyles = {
    sm: "h-9 px-3",
  };

  const finalClassName = `${baseStyle} ${variantStyles[variant] || ''} ${sizeStyles[size] || ''} ${className || ''}`;

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ variant, className, children, ...props }) => {
  const baseStyle = "inline-flex items-center rounded-full border text-xs font-semibold transition-colors";
  
  const variantStyles = {
    destructive: "border-transparent bg-destructive text-destructive-foreground",
    default: "border-transparent bg-primary text-primary-foreground",
  };

  const finalClassName = `${baseStyle} ${variantStyles[variant] || ''} ${className || ''}`;
  
  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};


export function DashboardHeader() {
  const [currentRole, setCurrentRole] = useState("Analyst");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const roles = ["Analyst", "Senior Analyst", "Chief Compliance Officer"];

  const handleRoleChange = (role) => {
    setCurrentRole(role);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Unified Compliance Platform</h1>
          <p className="text-sm text-muted-foreground">Real-time surveillance and federated analytics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cases, accounts..."
              className="pl-10 pr-4 py-2 w-64 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Alert Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>

          {/* Security Status */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-success/10 border border-success/20">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm text-success font-medium">Secure</span>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{currentRole}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <div className="py-1" role="none">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">Change Role</div>
                  {roles.map((role) => (
                    <a
                      key={role}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRoleChange(role);
                      }}
                      className="text-foreground block px-4 py-2 text-sm hover:bg-muted"
                      role="menuitem"
                    >
                      {role}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

