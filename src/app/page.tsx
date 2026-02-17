"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Cause = {
  id: string;
  title: string;
  description: string;
  infoUrl: string;
  bankName: string;
  bank: string;
  category: string;
  tags: string[];
  imgUrl: string;
};

export default function Page() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [causes, setCauses] = useState<Cause[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // 🔹 Replace with your real Facebook page
  const ADMIN_FACEBOOK_URL = "https://facebook.com/yourpage";

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data.categories ?? ["All"]))
      .catch(() => setCategories(["All"]));
  }, []);

  useEffect(() => {
    const url =
      currentCategory === "All"
        ? "/api/causes"
        : `/api/causes?category=${encodeURIComponent(currentCategory)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => setCauses(data.causes ?? []))
      .catch(() => setCauses([]));

    document.getElementById("reels")?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentCategory]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("✓ Copied!");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setToast("✓ Copied!");
      } catch {
        setToast("⚠ Copy failed");
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="header-row">
            <div className="brand">Ramadan Giving</div>

            {/* 🔹 Replaced badge with Contact Admin button */}
            <a
              className="badge"
              href={ADMIN_FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact admin on Facebook"
            >
              Contact Admin
            </a>
          </div>

          <div className="categories" role="tablist" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${cat === currentCategory ? "active" : ""}`}
                role="tab"
                aria-selected={cat === currentCategory}
                onClick={() => setCurrentCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="reels" id="reels" aria-label="Donation reels feed">
        {causes.length === 0 ? (
          <div className="empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path d="M8 12h8M12 8v8" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div className="empty-title">No causes found</div>
            <div className="empty-desc">Try selecting a different category</div>
          </div>
        ) : (
          causes.map((c, idx) => (
            <section className="reel" key={c.id}>
              <article className="card">
                <div className="media">
                  <Image
                    src={c.imgUrl}
                    alt={c.title}
                    fill
                    sizes="(max-width: 520px) 100vw, 520px"
                    style={{ objectFit: "cover" }}
                    priority={idx === 0}
                  />

                  <div className="info">
                    <div className="title">{c.title}</div>
                    <div className="desc">{c.description}</div>

                    <div className="info-row">
                      <div className="pills">
                        {(c.tags || []).map((t) => (
                          <span className="pill" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <a
                        className="info-link"
                        href={c.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open info page for ${c.title}`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path
                            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path d="M12 10v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M12 7h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span>Info</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bank">
                  <div className="bank-name">
                    <strong>Bank:</strong> {c.bankName}
                  </div>

                  <div className="bank-row">
                    <div className="bank-value" title="Tap to select">
                      {c.bank}
                    </div>

                    <button
                      className="copy"
                      type="button"
                      onClick={() => copyText(`${c.bankName}\n${c.bank}`)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </article>
            </section>
          ))
        )}
      </main>

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        {toast ?? ""}
      </div>
    </>
  );
}