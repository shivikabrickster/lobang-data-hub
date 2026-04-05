export default function Footer() {
  const links = [
    { label: 'Documentation', url: 'https://docs.databricks.com' },
    { label: 'Academy', url: 'https://www.databricks.com/learn' },
    { label: 'AI Dev Kit', url: 'https://github.com/databricks/databricks-ai-dev-kit' },
    { label: 'Community', url: 'https://community.databricks.com/' },
    { label: 'Release Notes', url: 'https://docs.databricks.com/en/release-notes/index.html' },
    { label: 'Blog', url: 'https://www.databricks.com/blog' },
  ];

  return (
    <footer className="relative z-10 bg-db-navy py-14">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-db-red rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <span className="font-semibold text-white text-[15px]">Lobang Data Hub</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/40 hover:text-white/70 no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-white/10 mb-6" />

          <p className="text-[12px] text-white/25">
            Built with care for Singapore Government agencies. Not an official Databricks site.
          </p>
        </div>
      </div>
    </footer>
  );
}
