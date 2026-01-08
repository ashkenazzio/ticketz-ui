export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-display text-2xl font-semibold tracking-tighter uppercase">Ticketz<span className="text-lime">.</span></div>
            <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Support</a>
            </div>
            <div className="text-gray-600 text-sm">
                © 2023 Ticketz Inc.
            </div>
        </div>
    </footer>
  );
}
