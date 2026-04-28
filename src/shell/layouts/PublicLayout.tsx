import type { ParentComponent } from "solid-js";
import type { NavItem } from "../components/SideNav";
import type { SearchItem } from "../components/SearchBar";
import TopNav from "../components/TopNav";

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
      <TopNav
        name={props.name}
        slug={props.slug}
        link={`/${props.slug}/public`}
        links={props.links}
        searchItems={props.searchItems}
        appHome={`/${props.slug}/public`}
      />
      <div class="pt-[60px] min-h-screen bg-surface-0">{props.children}</div>
    </>
  );
};

export default PublicLayout;
