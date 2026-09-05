export default function MinimalFooter() {
  return (
    <footer className="border-t border-white/6 bg-ink px-6 py-10 md:px-15">
      <div className="flex items-center justify-between text-label text-ash">
        <span>© 2024 Forma Architecture Studio</span>
        <div className="flex gap-5">
          {["Instagram", "Behance", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-label uppercase tracking-[0.1em] text-ash transition-colors duration-300 hover:text-brass"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
