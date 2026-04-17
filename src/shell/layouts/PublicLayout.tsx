import type { ParentComponent } from "solid-js";
import type { NavItem } from "../components/SideNav";
import type { SearchItem } from "../components/SearchBar";
import AppHeader from "../components/AppHeader";

interface PublicLayoutProps {
  name: string;
  icon: string;
  slug: string;
  links: NavItem[];
  searchItems: SearchItem[];
}

const PublicLayout: ParentComponent<PublicLayoutProps> = (props) => {
  return (
    <>
      <AppHeader
        name={props.name}
        icon={props.icon}
        link={`/${props.slug}/public`}
        links={props.links}
        searchItems={props.searchItems}
        variant="public"
      />
      <div class="pt-[60px] min-h-screen bg-surface-0">{props.children}</div>
    </>
  );
};

export default PublicLayout;
