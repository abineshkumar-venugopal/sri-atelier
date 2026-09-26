import SocialLinks from "@/components/SocialLinks";

export default function MinimalFooter() {
  return (
    <footer className="border-t border-fog bg-mist px-6 py-10 md:px-15">
      <div className="flex items-center justify-between text-[0.85rem] text-ash">
        <span>Copyright © {new Date().getFullYear()} Sri Atelier | All rights reserved.</span>
        <SocialLinks />
      </div>
    </footer>
  );
}
