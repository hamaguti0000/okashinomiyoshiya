"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdminBar from "./AdminBar";
import Header from "./Header";

export default function PublicChrome() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const [isAdmin, setIsAdmin] = useState(() => false);

  useEffect(() => {
    let ignore = false;

    if (isAdminPage) {
      document.documentElement.removeAttribute("data-admin");
      return;
    }

    fetch("/api/admin/session", {
      credentials: "same-origin",
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : { authenticated: false }))
      .then((data: { authenticated?: boolean }) => {
        if (!ignore) setIsAdmin(Boolean(data.authenticated));
      })
      .catch(() => {
        if (!ignore) setIsAdmin(false);
      });

    return () => {
      ignore = true;
    };
  }, [isAdminPage, pathname]);

  useEffect(() => {
    if (isAdmin) {
      document.documentElement.dataset.admin = "true";
    } else {
      document.documentElement.removeAttribute("data-admin");
    }
  }, [isAdmin]);

  return (
    <>
      {isAdmin && <AdminBar />}
      <Header adminBarActive={isAdmin} />
    </>
  );
}
