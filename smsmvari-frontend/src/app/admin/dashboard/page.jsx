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
  Pencil,
  Eye,
  EyeOff,
  ExternalLink,
  Plus,
  MapPin,
  Calendar,
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

// DELETE / PATCH-toggle calls send no body, so skip the JSON content-type header.
function authHeadersNoBody() {
  const token = localStorage.getItem("accessToken");
  return { Authorization: `Bearer ${token}` };
}

function formatDateRange(startDate, endDate) {
  if (!startDate) return "";
  const opts = { day: "numeric", month: "short", year: "numeric" };
  const start = new Date(`${startDate}T00:00:00`).toLocaleDateString(
    "en-IN",
    opts
  );
  if (!endDate || endDate === startDate) return start;
  const end = new Date(`${endDate}T00:00:00`).toLocaleDateString(
    "en-IN",
    opts
  );
  return `${start} – ${end}`;
}

const CATEGORY_SUGGESTIONS = [
  "Health",
  "Tribal Health Camp",
  "Aarogyawari",
  "Disaster Relief",
  "School Health Programme",
  "Community Camp",
];

const STATUS_OPTIONS = ["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  tagLine: "",
  location: "",
  startDate: "",
  endDate: "",
  status: "UPCOMING",
  published: true,
};

// ── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const key = (status ?? "").toUpperCase();
  const map = {
    ONGOING: "bg-green-500 text-white",
    LIVE: "bg-green-500 text-white",
    UPCOMING: "bg-blue-500 text-white",
    PAST: "bg-muted text-muted-foreground",
    COMPLETED: "bg-muted text-muted-foreground",
    CANCELLED: "bg-destructive text-destructive-foreground",
  };
  return (
    <span
      className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${map[key] ?? "bg-muted text-muted-foreground"}`}
    >
      {(key === "ONGOING" || key === "LIVE") && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white mr-1 animate-pulse" />
      )}
      {status ?? "UNKNOWN"}
    </span>
  );
}

function PublishedBadge({ published }) {
  return published ? (
    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 border border-green-300 bg-green-50 rounded-full px-2 py-0.5">
      <Eye size={11} />
      Published
    </span>
  ) : (
    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5">
      <EyeOff size={11} />
      Draft
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
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null); // null = create mode, object = edit mode
  const [form, setForm] = useState(EMPTY_FORM);

  const flash = (type, text) => {
    setActionMsg({ type, text });
    setTimeout(() => setActionMsg(null), 4000);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/events`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setEvents(json?.data?.events ?? []);
    } catch {
      flash("error", "Failed to load events. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const openCreateForm = () => {
    setEditingEvent(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEditForm = (event) => {
    setEditingEvent(event);
    setForm({
      title: event.title ?? "",
      description: event.description ?? "",
      category: event.category ?? "",
      tagLine: event.tagLine ?? "",
      location: event.location ?? "",
      startDate: event.startDate ?? "",
      endDate: event.endDate ?? "",
      status: event.status ?? "UPCOMING",
      published: event.published ?? true,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const isEdit = Boolean(editingEvent);
    const url = isEdit
      ? `${BASE_URL}/api/admin/events/${editingEvent.uuid}`
      : `${BASE_URL}/api/admin/events`;

    // status is only editable once an event exists — omit it on create so
    // we don't send a field the backend doesn't expect from the POST body.
    const { status, ...createPayload } = form;
    const payload = isEdit ? form : createPayload;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      flash("success", isEdit ? "Event updated successfully." : "Event created successfully.");
      closeForm();
      fetchEvents();
    } catch {
      flash("error", isEdit ? "Failed to update event." : "Failed to create event.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (uuid) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    setDeletingId(uuid);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/events/${uuid}`, {
        method: "DELETE",
        headers: authHeadersNoBody(),
      });
      if (!res.ok) throw new Error();
      flash("success", "Event deleted.");
      fetchEvents();
    } catch {
      flash("error", "Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublished = async (uuid) => {
    setTogglingId(uuid);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/events/${uuid}/published`, {
        method: "PATCH",
        headers: authHeadersNoBody(),
      });
      if (!res.ok) throw new Error();
      fetchEvents();
    } catch {
      flash("error", "Failed to update publish status.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-black text-secondary uppercase tracking-tight flex items-center gap-2">
            Events
            <a
              href="/activities"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View events on the live site"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create, edit, publish, and delete medical camps and events.
          </p>
        </div>
        <Button
          onClick={showForm ? closeForm : openCreateForm}
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

      {/* Create / Edit Event Form */}
      {showForm && (
        <Card className="border-2 border-primary/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-bold uppercase tracking-tight text-primary">
              {editingEvent ? "Edit Event" : "New Event"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    list="category-suggestions"
                    placeholder="Health"
                    required
                    value={form.category}
                    onChange={handleChange}
                  />
                  <datalist id="category-suggestions">
                    {CATEGORY_SUGGESTIONS.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tagLine">Tag Line</Label>
                  <Input
                    id="tagLine"
                    name="tagLine"
                    placeholder="Your health, our priority"
                    value={form.tagLine}
                    onChange={handleChange}
                  />
                </div>
                {editingEvent && (
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
                          {s.charAt(0) + s.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      required
                      value={form.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      required
                      value={form.endDate}
                      onChange={handleChange}
                    />
                  </div>
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

              <label
                htmlFor="published"
                className="flex items-center gap-2 text-sm font-medium cursor-pointer w-fit"
              >
                <input
                  id="published"
                  name="published"
                  type="checkbox"
                  checked={form.published}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-input accent-primary"
                />
                Publish immediately
              </label>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="uppercase font-bold tracking-wide"
                >
                  {submitting
                    ? editingEvent
                      ? "Saving…"
                      : "Creating…"
                    : editingEvent
                      ? "Save Changes"
                      : "Create Event"}
                </Button>
                <Button type="button" variant="outline" onClick={closeForm}>
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
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-12 rounded-full bg-muted" />
                      <div className="h-4 w-24 rounded-full bg-muted" />
                    </div>
                    <div className="h-5 w-2/3 rounded bg-muted" />
                    <div className="flex gap-3">
                      <div className="h-3.5 w-28 rounded bg-muted" />
                      <div className="h-3.5 w-36 rounded bg-muted" />
                    </div>
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                  </div>
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
              key={event.uuid}
              className={`transition-opacity ${
                !event.published ? "opacity-60" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <StatusBadge status={event.status} />
                      <PublishedBadge published={event.published} />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-secondary text-base mt-1 leading-snug">
                      {event.title}
                    </h3>
                    {event.tagLine && (
                      <p className="text-xs text-primary font-semibold italic mt-0.5">
                        {event.tagLine}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDateRange(event.startDate, event.endDate)}
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
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5"
                      onClick={() => openEditForm(event)}
                    >
                      <Pencil size={13} />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={togglingId === event.uuid}
                      className="text-xs gap-1.5 text-muted-foreground hover:text-foreground"
                      onClick={() => handleTogglePublished(event.uuid)}
                    >
                      {event.published ? (
                        <EyeOff size={13} />
                      ) : (
                        <Eye size={13} />
                      )}
                      {togglingId === event.uuid
                        ? "…"
                        : event.published
                          ? "Unpublish"
                          : "Publish"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={deletingId === event.uuid}
                      className="text-xs gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive/30"
                      onClick={() => handleDelete(event.uuid)}
                    >
                      <Trash2 size={13} />
                      {deletingId === event.uuid ? "…" : "Delete"}
                    </Button>
                  </div>
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

function OverviewPanel({ user, onNavigate }) {
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
              onClick={() => onNavigate("events")}
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
          {activePanel === "overview" && (
            <OverviewPanel user={user} onNavigate={setActivePanel} />
          )}
          {activePanel === "events" && <EventsPanel />}
          {activePanel === "gallery" && <GalleryPanel />}
        </main>
      </div>
    </div>
  );
}
