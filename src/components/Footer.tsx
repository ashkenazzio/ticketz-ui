export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-sans text-2xl font-bold tracking-tight">ticketz<span className="text-lime">.</span></div>
            <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            </div>
            <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Ticketz Inc.
            </div>
        </div>
    </footer>
  );
}
