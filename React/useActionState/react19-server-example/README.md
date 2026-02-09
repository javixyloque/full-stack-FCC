Example: useActionState pattern with Server Actions (React 19+ / Next.js App Router style)

What this shows
- `page.server.jsx` exports a server action `validateForm` (uses `'use server'`) and renders the client form.
- `ClientForm.client.jsx` is a client component that receives the server action as a prop and uses a local `useActionState` hook to call it, track `isPending` and store the returned state.

Notes
- This example follows the server-actions pattern promoted for React+Next.js App Router (experimental concepts may vary across runtimes).
- To run this example you should use a framework that supports server actions (Next.js App Router experimental builds or an equivalent React 19 runtime).

How it maps to your course code
- Course snippet that uses `useActionState(submitForm, { message: '' })` is conceptually the same: a hook that wraps a server action and exposes `[state, trigger, isPending]`.
