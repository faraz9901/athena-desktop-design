import { useLogout } from '@/features/auth/hooks/useAuth';
import {
    Activity,
    BarChart,
    Bell,
    CreditCard,
    FileText,
    HardHat,
    LayoutDashboard,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    Store
} from 'lucide-react';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { mutate: logoutUser } = useLogout()

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/projects', label: 'Projects', icon: HardHat },
        { path: '/tasks', label: 'Tasks', icon: FileText },
        { path: '/expenses', label: 'Expenses', icon: CreditCard },
        { path: '/chat', label: 'Chat', icon: MessageSquare },
        { path: '/documents', label: 'Documents', icon: FileText },
        { path: '/vendors', label: 'Vendors', icon: Store },
        { path: '/reports', label: 'Reports', icon: BarChart },
        { path: '/activity', label: 'Activity', icon: Activity },
        { path: '/notifications', label: 'Notifications', icon: Bell },
        { path: '/subscription', label: 'Subscription', icon: CreditCard },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col shadow-xl z-20`}
            >
                <div className="px-4 bg-white h-16 flex items-center justify-between border-b border-sidebar-border">
                    <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
                        <div className="bg-primary p-2 rounded-lg">
                            <HardHat className="w-6 h-6 text-primary-foreground" />
                        </div>
                        {isSidebarOpen && <span className="font-bold text-xl tracking-wide">e-Thekedar</span>}
                    </div>
                </div>

                <nav className="flex-1 max-h-[calc(100vh-9.5rem)] overflow-y-auto hide-scrollbar py-4">
                    <ul className="space-y-2 px-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex relative items-center p-3 rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                            } ${!isSidebarOpen && 'justify-center'}`}
                                    >
                                        <Icon className={`w-5 h-5 ${isSidebarOpen && 'mr-3'}`} />
                                        {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-sidebar-border">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full p-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ${!isSidebarOpen && 'justify-center'
                            }`}
                    >
                        <LogOut className={`w-5 h-5 ${isSidebarOpen && 'mr-3'}`} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 shadow-sm z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-muted text-foreground transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-6">
                        <Link to="/notifications" className='relative inline-block rounded-2xl hover:bg-muted p-2 transition-colors'>
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-destructive rounded-full">3</span>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold border border-border">
                                JD
                            </div>
                            <div className="text-sm">
                                <Link to="/profile">
                                    <p className="font-semibold text-foreground hover:underline">John Doe</p>
                                </Link>
                                <p className="text-muted-foreground text-xs">Project Manager</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="h-[calc(100vh-5rem)] hide-scrollbar  overflow-auto px-6 scroll-smooth">
                    <Outlet />
                </div>
            </main>
        </div >
    );
};

export default MainLayout;
