import PageHeader from "~/shell/components/ui/PageHeader";
import DataTable from "~/shell/components/ui/DataTable";

const FOLDERS = [
  { path: "\\\\SERVER01\\Marketing", owner: "CORP\\jdoe", permissions: "42 ACEs", size: "247 GB", modified: "2 hr ago" },
  { path: "\\\\SERVER01\\Marketing\\Campaigns", owner: "CORP\\jdoe", permissions: "18 ACEs", size: "83 GB", modified: "1 day ago" },
  { path: "/data/engineering/src", owner: "eng\\devops", permissions: "27 ACEs", size: "512 GB", modified: "30 min ago" },
  { path: "\\\\FS03\\HR\\Employee Records", owner: "CORP\\hradmin", permissions: "56 ACEs", size: "34 GB", modified: "3 days ago" },
  { path: "/mnt/nas/legal/contracts", owner: "legal\\ldirector", permissions: "31 ACEs", size: "18 GB", modified: "1 week ago" },
  { path: "\\\\NAS01\\Backup\\Daily", owner: "CORP\\backupsvc", permissions: "8 ACEs", size: "1.2 TB", modified: "6 hr ago" },
  { path: "\\\\SRV04\\Finance\\Reports", owner: "CORP\\cfo", permissions: "39 ACEs", size: "91 GB", modified: "5 hr ago" },
  { path: "/data/ops/deploy/releases", owner: "ops\\release", permissions: "14 ACEs", size: "156 GB", modified: "12 hr ago" },
  { path: "\\\\DC02\\Projects\\Alpha", owner: "CORP\\pmo", permissions: "22 ACEs", size: "67 GB", modified: "4 hr ago" },
  { path: "/srv/shared/qa/test-data", owner: "qa\\qalead", permissions: "11 ACEs", size: "29 GB", modified: "2 days ago" },
];

const columns = [
  { key: "path", label: "Folder Path" },
  { key: "owner", label: "Owner" },
  { key: "permissions", label: "Permissions" },
  { key: "size", label: "Size" },
  { key: "modified", label: "Last Modified" },
];

export default function Folders() {
  return (
    <div class="max-w-6xl mx-auto page-enter">
      <PageHeader title="Shared Folders" description="Browse all discovered shared folders and their metadata" icon="lucide:folder" />
      <DataTable columns={columns} data={FOLDERS} searchPlaceholder="Search folders..." />
    </div>
  );
}
