import Sidebar from './Sidebar';

export default function Layout({ children, bgCover }) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
            <Sidebar />
            <main style={{ backgroundImage: `url(${bgCover})`, backgroundPosition: "bottom" }} className={`bg-cover bg-no-repeat flex-1 p-8 overflow-y-auto dark:text-white`}>
                {children}
            </main>
        </div>
    ); 
}