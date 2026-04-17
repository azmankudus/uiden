import { For } from "solid-js";
import PageHeader from "~/shell/components/ui/PageHeader";
import CardGrid from "~/shell/components/ui/CardGrid";

const cards = [
  { icon: "lucide:type", label: "Lorem Ipsum", desc: "Generate placeholder text in paragraphs, sentences, or words for design mockups.", href: "/any-gen/private/generators", color: "#3b82f6" },
  { icon: "lucide:hash", label: "UUID/GUID", desc: "Create unique identifiers in UUID v4, v5, or custom formats for database keys.", href: "/any-gen/private/generators", color: "#10b981" },
  { icon: "lucide:users", label: "Random Names", desc: "Generate realistic first and last names from various cultures and regions.", href: "/any-gen/private/generators", color: "#8b5cf6" },
  { icon: "lucide:globe", label: "IP Addresses", desc: "Generate random IPv4 or IPv6 addresses with optional subnet ranges.", href: "/any-gen/private/generators", color: "#f59e0b" },
  { icon: "lucide:mail", label: "Email Addresses", desc: "Create random email addresses with configurable domains and patterns.", href: "/any-gen/private/generators", color: "#ef4444" },
  { icon: "lucide:smartphone", label: "Phone Numbers", desc: "Generate phone numbers in various international formats and country codes.", href: "/any-gen/private/generators", color: "#06b6d4" },
  { icon: "lucide:calendar", label: "Dates", desc: "Generate random dates within ranges, timestamps, or formatted date strings.", href: "/any-gen/private/generators", color: "#ec4899" },
  { icon: "lucide:code", label: "Custom Regex", desc: "Define custom patterns using regex for any specialized text generation needs.", href: "/any-gen/private/generators", color: "#f97316" },
];

export default function GeneratorsPage() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Generators" description="Browse and use text generation tools for various data types." icon="lucide:sparkles" iconColor="#8b5cf6" />
      <CardGrid cards={cards} />
    </div>
  );
}
