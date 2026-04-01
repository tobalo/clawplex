export function Footer() {
  const links = [
    { href: "/community", label: "Community" },
    {
      href: "https://discord.gg/q8kEquTu3z",
      label: "Discord",
      external: true,
    },
    {
      href: "https://github.com/tylerdotai/clawplex",
      label: "GitHub",
      external: true,
    },
    { href: "https://openclaw.ai", label: "OpenClaw", external: true },
  ];

  return (
    <footer className="border-t border-claw-border bg-claw-void px-5 md:px-8 py-10">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center bg-claw-orange">
              <span className="font-display text-sm text-claw-void">C</span>
            </div>
            <span className="font-display text-lg tracking-wider text-claw-text">
              CLAWPLEX
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-claw-dim">
            Built in DFW. Run on local metal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 md:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="font-mono text-xs uppercase tracking-widest text-claw-dim hover:text-claw-muted transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
