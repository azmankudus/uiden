import type { ParentComponent } from "solid-js";
import type { NavItem } from "../components/SideNav";
import type { SearchItem } from "../components/SearchBar";
import PublicNav from "../components/PublicNav";

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
      <PublicNav name={props.name} icon={props.icon} slug={props.slug} links={props.links} searchItems={props.searchItems} />
      <div class="pt-[60px] min-h-screen bg-surface-0">{props.children}</div>
    </>
  );
};

export default PublicLayout;
