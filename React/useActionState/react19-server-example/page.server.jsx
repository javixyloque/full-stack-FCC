import ClientForm from "./ClientForm.client";

// Server action: runs on the server, validates input and returns a result object
export async function validateForm(data) {
  'use server';
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  // Simulate server processing
  await new Promise((r) => setTimeout(r, 400));

  return { ok: true, message: `Welcome, ${data.name}!` };
}

export default function Page() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Server Action Form (React 19+ pattern)</h1>
      <ClientForm action={validateForm} />
    </div>
  );
}
