// app/(home)/join/JoinForm.jsx
// ─── Client component — Google Form embed
// TODO: when the custom /api/v1/join backend endpoint is ready, swap this
//       iframe out for the original custom form in git history.
"use client";

export default function JoinForm() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfY2DQDHmRWbTpnZWLphNa26JDLCyUq4nxVt06TCD3uZUwlpA/viewform?embedded=true"
        width="100%"
        height="1258"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Join Sahyadri Manav Seva Manch — Volunteer Sign-Up"
        className="block"
      >
        Loading…
      </iframe>
    </div>
  );
}
