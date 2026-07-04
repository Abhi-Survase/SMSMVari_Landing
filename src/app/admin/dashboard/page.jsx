// app/admin/dashboard/page.jsx
// ─── Admin Dashboard — client component (auth guard + interactive UI)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle,
  LogOut,
  CalendarClock,
  ImageIcon,
  LayoutDashboard,
  Trash2,
  XCircle,
  Plus,
  MapPin,
  Calendar,
  Tag,
} from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// ── Helpers ─────────────────────────────────────────────────────────────────

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isTokenValid(token) {
  const payload = decodeJwt(token);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
}

function authHeaders() {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

const CATEGORY_OPTIONS = [
  "Tribal Health Camp",
  "Aarogyawari",
  "Disaster Relief",
  "School Health Programme",
  "Community Camp",
  "Other",
];

const STATUS_OPTIONS = ["LIVE", "UPCOMING", "COMPLETED"];

// ── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    LIVE: "bg-green-500 text-white",
    UPCOMING: "bg-blue-500 text-white",
    COMPLETED: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${map[status] ?? map.COMPLETED}`}
    >
      {status === "LIVE" && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white mr-1 animate-pulse" />
      )}
      {status}
    </span>
  );
}

// ── Events Panel ─────────────────────────────────────────────────────────────

function EventsPanel() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState(null); // {type: "success"|"error", text}
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "",
    description: "",
    status: "UPCOMING",
  });

  const flash = (type, text) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 4000);
  };

  // TODO: confirm GET events endpoint path with backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/events`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      // TODO: confirm response shape — assuming data is array or data.events
      setEvents(Array.isArray(data) ? data : (data.events ?? []));
    } catch {
      flash("error", "Failed to load events. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // TODO: confirm POST event endpoint path and request body shape with backend
  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/events`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      flash("success", "Event created successfully.");
      setForm({
        title: "",
        date: "",
        location: "",
        category: "",
        description: "",
        status: "UPCOMING",
      });
      setShowForm(false);
      fetchEvents();
    } catch {
      flash("error", "Failed to create event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // TODO: confirm DELETE event endpoint path with backend
  const handleDelete = async (id) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/v1/events/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      flash("success", "Event deleted.");
      fetchEvents();
    } catch {
      flash("error", "Failed to delete event.");
    }
  };

  // TODO: confirm PATCH/close event endpoint path with backend
  const handleClose = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/events/${id}/close`, {
        method: "PATCH",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      flash("success", "Event marked as completed.");
      fetchEvents();
    } catch {
      flash("error", "Failed to close event.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-black text-secondary uppercase tracking-tight">
            Events
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create, manage, and close medical camps and events.
          </p>
        </div>
        <Button
          onClick={() => setShowForm((v) => !v)}
          size="sm"
          className="uppercase font-bold tracking-wide gap-2"
        >
          <Plus size={16} />
          {showForm ? "Cancel" : "New Event"}
        </Button>
      </div>

      {/* Flash message */}
      {actionMsg && (
        <Alert
          className={
            actionMsg.type === "success"
              ? "border-green-500 text-green-700 bg-green-50"
              : ""
          }
          variant={actionMsg.type === "error" ? "destructive" : "default"}
        >
          {actionMsg.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{actionMsg.text}</AlertDescription>
        </Alert>
      )}

      {/* Create Event Form */}
      {showForm && (
        <Card className="border-2 border-primary/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold uppercase tracking-tight text-primary">
              New Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Monthly Devbandh Health Camp"
                    required
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Devbandh, Mokhada Taluka"
                    required
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  placeholder="Brief description of the camp or event…"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="uppercase font-bold tracking-wide"
                >
                  {submitting ? "Creating…" : "Create Event"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 space-y-2.5">
                    {/* Badge row */}
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-12 rounded-full bg-muted" />
                      <div className="h-4 w-24 rounded-full bg-muted" />
                    </div>
                    {/* Title */}
                    <div className="h-5 w-2/3 rounded bg-muted" />
                    {/* Date + location */}
                    <div className="flex gap-3">
                      <div className="h-3.5 w-28 rounded bg-muted" />
                      <div className="h-3.5 w-36 rounded bg-muted" />
                    </div>
                    {/* Description lines */}
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                  </div>
                  {/* Action buttons */}
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <div className="h-8 w-16 rounded bg-muted" />
                    <div className="h-8 w-16 rounded bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
          <CalendarClock
            size={36}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-muted-foreground font-medium">No events yet.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first event using the button above.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <Card
              key={event.id ?? event.uuid}
              className={`transition-opacity ${
                event.status === "COMPLETED" ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusBadge status={event.status} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-secondary text-base mt-1 leading-snug">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {event.location}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-xs text-foreground/70 mt-2 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                  {event.status !== "COMPLETED" && (
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                        onClick={() => handleClose(event.id ?? event.uuid)}
                      >
                        <XCircle size={13} />
                        Close
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive/30"
                        onClick={() => handleDelete(event.id ?? event.uuid)}
                      >
                        <Trash2 size={13} />
                        Delete
                      </Button>
                    </div>
                  )}
                  {event.status === "COMPLETED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive/30 shrink-0"
                      onClick={() => handleDelete(event.id ?? event.uuid)}
                    >
                      <Trash2 size={13} />
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Gallery Panel ─────────────────────────────────────────────────────────────

function GalleryPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-black text-secondary uppercase tracking-tight">
          Gallery
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload and manage photos for the gallery page.
        </p>
      </div>
      <div className="border-2 border-dashed border-border rounded-xl py-24 flex flex-col items-center justify-center text-center gap-3">
        <ImageIcon size={40} className="text-muted-foreground" />
        <p className="font-bold text-foreground/70">Gallery management</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Photo upload and management will be available here in a future update.
        </p>
      </div>
    </div>
  );
}

// ── Overview Panel ────────────────────────────────────────────────────────────

function OverviewPanel({ user }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-black text-secondary uppercase tracking-tight">
          Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage events and gallery content for the SMSM Vari website.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-t-4 border-t-primary">
          <CardContent className="p-6">
            <CalendarClock className="text-primary mb-3" size={28} />
            <h3 className="font-heading font-black text-secondary uppercase tracking-tight mb-1">
              Events
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              Create live camp events, manage upcoming ones, and close completed
              camps.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-4 uppercase font-bold text-xs tracking-wide"
              onClick={() => {}}
            >
              Go to Events →
            </Button>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-muted-foreground/30">
          <CardContent className="p-6">
            <ImageIcon className="text-muted-foreground mb-3" size={28} />
            <h3 className="font-heading font-black text-secondary uppercase tracking-tight mb-1">
              Gallery
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              Photo management coming soon. You'll be able to upload and
              organise gallery photos from here.
            </p>
            <Badge
              variant="outline"
              className="mt-4 text-[10px] uppercase tracking-wider"
            >
              Coming Soon
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activePanel, setActivePanel] = useState("overview");

  // Auth guard — redirect to login if token missing or expired
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token || !isTokenValid(token)) {
      router.replace("/admin");
      return;
    }
    // Prefer stored user object, fall back to JWT payload
    try {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : decodeJwt(token));
    } catch {
      setUser(decodeJwt(token));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.replace("/admin");
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: CalendarClock },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top bar */}
      <header className="bg-card border-b-2 border-primary sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-black text-primary uppercase tracking-tight">
              SMSM Vari
            </span>
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-widest hidden sm:block">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-muted-foreground font-medium hidden sm:block">
                {user.fullName ?? user.email}
              </span>
            )}
            <Button
              size="sm"
              variant="outline"
              className="gap-2 uppercase font-bold text-xs tracking-wide"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 gap-8">
        {/* Sidebar nav */}
        <aside className="w-48 shrink-0 hidden md:flex flex-col gap-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePanel(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all text-left ${
                activePanel === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </aside>

        {/* Mobile tab bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePanel(id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                activePanel === id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {activePanel === "overview" && <OverviewPanel user={user} />}
          {activePanel === "events" && <EventsPanel />}
          {activePanel === "gallery" && <GalleryPanel />}
        </main>
      </div>
    </div>
  );
}
