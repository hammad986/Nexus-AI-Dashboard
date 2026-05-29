export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_transparent_42%),linear-gradient(180deg,_rgba(2,6,23,1),_rgba(15,23,42,1))] text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 lg:px-8">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur lg:block">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                Venture-grade AI intelligence platform
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  Persistent dashboards, team workspaces, and AI that remembers.
                </h1>
                <p className="max-w-xl text-sm leading-7 text-slate-300">
                  Nexus AI turns the existing analytics shell into a collaborative SaaS product with Supabase Auth, workspace-aware data, saved reports, and notification workflows.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Auth</p>
                  <p className="mt-2 text-sm text-slate-200">Protected sign-in, sign-up, and session refresh.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Persistence</p>
                  <p className="mt-2 text-sm text-slate-200">Saved chats, reports, and team notifications.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
