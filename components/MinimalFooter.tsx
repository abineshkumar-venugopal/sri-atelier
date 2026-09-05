import SocialLinks from "@/components/SocialLinks";

export default function MinimalFooter() {
  return (
    <footer className="border-t border-white/6 bg-ink px-6 py-10 md:px-15">
      <div className="flex items-center justify-between text-label text-ash">
        <span>© 2024 Forma Architecture Studio</span>
        <SocialLinks />
      </div>
    </footer>
  );
}
