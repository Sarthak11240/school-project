import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/getSchools');
        const json = await res.json();
        setSchools(Array.isArray(json) ? json : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <header className="header">
        <Link href="/">School Admin</Link>
        <nav className="nav">
          <Link href="/addSchool" className="btn">Add School</Link>
        </nav>
      </header>

      <main className="container">
        <h2 style={{margin:'8px 0 16px'}}>Schools</h2>
        {loading ? <p>Loading...</p> : null}
        <div className="grid">
          {schools.map(s => (
            <div key={s.id} className="card">
              <img className="responsive" src={`/schoolImages/${s.image}`} alt={s.name} />
              <h3 style={{marginTop:8}}>{s.name}</h3>
              <p style={{color:'#4b5563', margin:'4px 0'}}>{s.address}</p>
              <p style={{color:'#4b5563', margin:'4px 0'}}>{s.city}</p>
            </div>
          ))}
          {!loading && schools.length === 0 && (
            <p>No schools found. Try adding one from the Add School page.</p>
          )}
        </div>
      </main>

      <footer className="footer">Showing name, address, city, and image.</footer>
    </div>
  );
}
