"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
// Correctly import ONLY BentoGrid and BentoGridItem
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconBoxAlignTopLeft } from "@tabler/icons-react";
import { supabase } from "@/utils/supabase/client";

export interface App {
  id: number;
  name: string;
  dir: string; // URL or identifier
  desc: string;
  created_at: string;
  img_dir: string; // Filename like 'logo.png', 'dashboard.jpg'
  [key: string]: any;
}

interface Item {
  id: number;
  title: string;
  description: string;
  header: string; // e.g., formatted date
  icon: React.ReactNode;
  img: string; // Filename passed to BentoGridItem
  url: string; // Link URL
}

// Simple Skeleton for loading state within a grid item
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse"></div>
);

export function AppsBentoGrid() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Optional: Error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error on new fetch
      try {
        const { data, error: dbError } = await supabase
          .from("apps")
          .select("id, name, dir, created_at, img_dir, desc")
          .order("created_at", { ascending: false });

        if (dbError) {
          console.error("Error fetching apps:", dbError);
          setError("Failed to load apps. Please try again later.");
        } else if (data) {
          setApps(data as App[]);
        }
      } catch (err) {
        console.error("Unexpected error fetching apps:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Map data only when apps array is populated
  const bentoGridItems: Item[] = apps.map((app) => ({
    id: app.id,
    title: app.name,
    img: app.img_dir, // Pass the filename from DB -> 'img' prop
    description: app.desc, // Example description
    header: `Added: ${new Date(app.created_at).toLocaleDateString()}`, // Example header
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />, // Example icon usage (add where needed in Item)
    url: app.dir.startsWith("http") ? app.dir : `/applist/${app.dir}`, // Ensure URL is absolute
  }));

  return (
    <div>
      {/* Loading State */}
      {loading && (
        <BentoGrid className="max-w-4xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            // Render BentoGridItem with Skeleton inside header prop for loading
            <BentoGridItem key={`skeleton-${i}`} header={<Skeleton />} />
          ))}
        </BentoGrid>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-10 text-red-500">{error}</div>
      )}

      {/* Success State - Data Loaded */}
      {!loading && !error && apps.length > 0 && (
        <BentoGrid className="max-w-4xl w-[80vw] mx-auto">
          {bentoGridItems.map((item, i) => (
            <a
              key={item.id} // Use unique ID from data
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("block", (i + 1) % 3 === 0 ? "md:col-span-2" : "")}
              aria-label={`View details for ${item.title}`}
            >
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={item.header}
                img={item.img}
              />
            </a>
          ))}
        </BentoGrid>
      )}

      {/* Empty State */}
      {!loading && !error && apps.length === 0 && (
        <div className="text-center py-10">No applications found.</div>
      )}
    </div>
  );
}
