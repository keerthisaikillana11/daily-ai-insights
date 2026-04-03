import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";

const EditProfile = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("John Doe");
  const [business, setBusiness] = useState("General Store");

  const handleSave = () => {
    toast({ title: "Profile updated", description: `Name: ${name}, Business: ${business}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-6">{t("editProfile")}</h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-card p-6 shadow-[var(--shadow-card)] space-y-5">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">JD</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 rounded-lg bg-muted border border-border px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-card-foreground mb-1.5 block">Business Name</label>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full h-10 rounded-lg bg-muted border border-border px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full h-10 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
