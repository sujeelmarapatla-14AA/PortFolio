import { footer, name } from "@/data/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-300/80 bg-[#dedede]/40 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-black">
            © {currentYear} {name}. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {footer.builtWith}
          </p>
        </div>
        <ul className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-600">
          {footer.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:text-[#ff3b11] transition-colors focus-ring rounded-md px-2 py-1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}