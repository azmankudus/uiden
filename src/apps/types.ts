import type { Component } from "solid-js";
import type { NavItem } from "~/shell/components/SideNav";
import type { SearchItem } from "~/shell/components/SearchBar";

export interface AppConfig {
  slug: string;
  name: string;
  icon: string;
  defaultRoute: "public" | "private";
  nav: NavItem[];
  publicNav: NavItem[];
  search: {
    public: SearchItem[];
    private: SearchItem[];
  };
}
