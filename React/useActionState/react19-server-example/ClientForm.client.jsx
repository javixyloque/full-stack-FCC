'use client'

import React, { useState } from 'react';

// Client-side helper hook that wraps a server action and tracks state + pending
export function useActionState(action, initialState) {
  const [state, setState] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  const trigger = async (payload) => {
    setIsPending(true);
    try {
      // calling the `action` will invoke the server action when used in Next.js App Router
      const result = await action(payload);
      setState(result);
      return result;
    } finally {
      setIsPending(false);
    }
  };

  return [state, trigger, isPending];
}

export default function ClientForm({ action }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [state, submit, isPending] = useActionState(action, { ok: false, errors: null, message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // call server action through the hook
    await submit(form);
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} />
        </label>
        <button type="submit" disabled={isPending}>{isPending ? 'Validating...' : 'Submit'}</button>
      </form>

      <div style={{ marginTop: 12 }}>
        {state?.errors && (
          <div style={{ color: 'crimson' }}>
            <h4>Errors</h4>
            <ul>
              {Object.entries(state.errors).map(([k, v]) => (
                <li key={k}>{k}: {v}</li>
              ))}
            </ul>
          </div>
        )}

        {state?.ok && (
          <div style={{ color: 'green' }}>{state.message}</div>
        )}
      </div>
    </div>
  );
}
