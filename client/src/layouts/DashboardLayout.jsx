import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-column">
                <Header />
                <div className="p-4 overflow-auto">{children}</div>
            </div>
        </div>
    );
}