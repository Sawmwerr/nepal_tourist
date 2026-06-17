export const metadata = {
  title: "Admin Dashboard · Nepal",
};

export default function AdminDashboardPage() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl md:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4a843]">Phase 3</p>
        <h2 className="mt-3 text-2xl font-bold text-white">Admin auth is ready</h2>
        <p className="mt-4 leading-7 text-white/65">
          This protected dashboard confirms Supabase Auth, profile role checks, and admin-only access are wired. The bookings table and status controls come in Phase 4.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white">Next phase</h3>
        <ul className="mt-4 space-y-3 text-sm text-white/65">
          <li>• List booking requests</li>
          <li>• View customer contact details</li>
          <li>• Update booking status</li>
          <li>• Add admin notes</li>
        </ul>
      </div>
    </section>
  );
}
