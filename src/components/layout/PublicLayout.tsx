import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { initialSettings } from "@/lib/db/initial-data";
import { InstituteSettings } from "@/types";

export default function PublicLayout({
  children,
  settings = initialSettings,
}: {
  children: React.ReactNode;
  settings?: InstituteSettings;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar settings={settings.announcementBar} />
      <Navbar instituteName={settings.name} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
