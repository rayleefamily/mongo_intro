"use client";

import { useState, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "error" | "success";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-start"
      noValidate
    >
      <div className="flex-1 text-left">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="輸入您的 Email，訂閱最新優惠資訊"
          aria-invalid={status === "error"}
          className="w-full border border-paper/50 bg-ink/30 px-4 py-3 text-sm text-paper placeholder:text-paper/50 focus:border-paper focus:outline-none"
        />
        {status === "error" && (
          <p className="mt-2 text-xs text-paper">請輸入正確格式的 Email，例如 name@example.com</p>
        )}
        {status === "success" && (
          <p className="mt-2 text-xs text-paper">訂閱成功！之後有最新資訊會寄送到這個信箱。</p>
        )}
      </div>
      <button
        type="submit"
        className="border border-paper/60 px-7 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
      >
        訂閱
      </button>
    </form>
  );
}
