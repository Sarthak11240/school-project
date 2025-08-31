import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header className="header">
        <a href="/">School Admin</a>
        <nav className="nav">
          <Link href="/addSchool" className="btn">Add School</Link>
          <Link href="/showSchools" className="btn" style={{background:'#10b981'}}>Show Schools</Link>
        </nav>
      </header>

      <main className="container">
        <div className="card">
          <h1>Welcome 👋</h1>
          <p>This mini-project lets you add schools and view them like an e‑commerce catalog.</p>
          <ul>
            <li><span className="badge">1</span> Go to <strong>Add School</strong> to insert records.</li>
            <li><span className="badge">2</span> Go to <strong>Show Schools</strong> to browse the catalog.</li>
          </ul>
          <p style={{marginTop:12}}>API health check: <a href="/api/getSchools" target="_blank" rel="noreferrer">/api/getSchools</a></p>
        </div>
      </main>

      <footer className="footer">Built with Next.js + MySQL</footer>
    </div>
  );
}
