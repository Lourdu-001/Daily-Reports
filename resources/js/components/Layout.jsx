import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto mt-14 md:mt-0d dark:text-white">
                {children}
            </main>
        </div>
    );
}