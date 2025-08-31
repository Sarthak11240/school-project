import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';

export default function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [status, setStatus] = useState({ type: '', message: '' });

  const onSubmit = async (data) => {
    setStatus({ type: '', message: '' });
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'image') {
          formData.append('image', v[0]);
        } else {
          formData.append(k, v);
        }
      });

      const res = await fetch('/api/addSchool', { method: 'POST', body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to add school');
      setStatus({ type: 'success', message: json.message || 'School added successfully' });
      reset();
    } catch (e) {
      setStatus({ type: 'fail', message: e.message });
    }
  };

  return (
    <div>
      <header className="header">
        <Link href="/">School Admin</Link>
        <nav className="nav">
          <Link href="/showSchools" className="btn" style={{background:'#10b981'}}>Show Schools</Link>
        </nav>
      </header>

      <main className="container">
        <div className="card">
          <h2>Add School</h2>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <label className="label">School Name</label>
            <input className="input" placeholder="e.g., Sunrise Public School" {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })} />
            {errors.name && <div className="error">{errors.name.message}</div>}

            <label className="label">Address</label>
            <input className="input" placeholder="Street, Area" {...register('address', { required: 'Address is required' })} />
            {errors.address && <div className="error">{errors.address.message}</div>}

            <label className="label">City</label>
            <input className="input" placeholder="City" {...register('city', { required: 'City is required' })} />
            {errors.city && <div className="error">{errors.city.message}</div>}

            <label className="label">State</label>
            <input className="input" placeholder="State" {...register('state', { required: 'State is required' })} />
            {errors.state && <div className="error">{errors.state.message}</div>}

            <label className="label">Contact Number</label>
            <input className="input" placeholder="10-digit mobile" {...register('contact', { required: 'Contact is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' } })} />
            {errors.contact && <div className="error">{errors.contact.message}</div>}

            <label className="label">Email</label>
            <input className="input" placeholder="name@example.com" {...register('email_id', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} />
            {errors.email_id && <div className="error">{errors.email_id.message}</div>}

            <label className="label">School Image</label>
            <input className="input" type="file" accept="image/*" {...register('image', { required: 'Image is required' })} />
            {errors.image && <div className="error">{errors.image.message}</div>}

            <button className="btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Submit'}</button>
            {status.message && <div className={`status ${status.type === 'success' ? 'success' : 'fail'}`}>{status.message}</div>}
          </form>
        </div>
      </main>
      <footer className="footer">Images are stored in <code>/public/schoolImages</code></footer>
    </div>
  );
}
