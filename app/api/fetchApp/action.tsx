"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { supabase } from "@/utils/supabase/client"; // Import your Supabase client

// Define the type for your app data. This is crucial for type safety!
// Adjust the types to match your Supabase table schema.
export interface App {
  id: number; // Assuming your table has an ID column
  name: string; // The app name
  dir: string; // (or url, depending on your table) The app directory/URL
  created_at: string; // The timestamp (ISO string)
  [key: string]: any; // Allows other columns
}

interface Item {
  title: string;
  description: string;
  header: string;
  icon: React.ReactNode;
  url: string;
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export function AppsBentoGrid() {
  const [apps, setApps] = useState<App[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("apps")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching apps:", error);
        } else {
          setApps(data as App[]);
        }
      } catch (err) {
        console.error("Unexpected error fetching apps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const bentoGridItems: Item[] = apps.map((app) => ({
    title: app.name,
    description: app.dir, // Or some other relevant info
    header: new Date(app.created_at).toLocaleDateString(), // or other relevant column
    icon: <IconBoxAlignTopLeft size={32} />, // You can choose appropriate icons
    url: app.dir, // Assuming this is the URL you want to link to
  }));

  return (
    <div>
      {loading ? (
        <BentoGrid className="max-w-4xl mx-auto">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </BentoGrid>
      ) : (
        <BentoGrid className="max-w-4xl mx-auto">
          {bentoGridItems.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full" // Make the link fill the BentoGridItem
              >
                {item.title}
              </a>
            </BentoGridItem>
          ))}
        </BentoGrid>
      )}
    </div>
  );
}
