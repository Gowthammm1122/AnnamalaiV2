import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Calendar, ChevronRight, X, Download, CheckCircle2, ArrowRight, FileText, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface ResourceItem {
  id: string;
  title: string;
  category: "syllabus" | "pyqs" | "current-affairs" | "optional-lit";
  date: string;
  badge: string;
  description: string;
  format: string;
  size: string;
  downloadUrl: string;
  features: string[];
}

const ResourcesHero = () => {
  return (
    <div className="relative pt-36 pb-16 w-full overflow-hidden bg-[#FAFBFD] border-b border-gray-150/70">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/3 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-slate-400/3 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px"
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px] relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <span className="text-[10px] font-bold text-blue-700 bg-white border border-gray-150/60 px-4 py-1.5 rounded-full uppercase tracking-[0.45em] shadow-sm inline-block">
            ACADEMIC RESOURCE CENTRE
          </span>
          
          <h1 className="text-4xl md:text-5xl font-display font-medium text-dark tracking-tight leading-tight">
            Downloadable Study <br/>
            Materials & <span className="italic font-normal font-serif text-[#1e40af]">Strategic Guides</span>
          </h1>
          
          <p className="text-gray-500 font-light text-sm max-w-xl mx-auto leading-relaxed">
            Gain a decisive edge with our highly structured micro-syllabus maps, verified previous year papers (PYQs), curated current affairs digests, and optional guides.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ResourcesContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "syllabus" | "pyqs" | "current-affairs" | "optional-lit">("all");

  const SHOW_CARDS = true; // Set to true to restore the interactive search, category filters, and cards

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && ["syllabus", "pyqs", "current-affairs", "optional-lit"].includes(tab)) {
      setSelectedCategory(tab as any);
    } else {
      setSelectedCategory("all");
    }
  }, [location.search]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const resourceItems: ResourceItem[] = [
    {
      id: "upsc-current-affairs",
      title: "UPSC Current Affairs Digest",
      category: "current-affairs",
      date: "Daily, Weekly & Monthly",
      badge: "UPSC",
      description: "Access our comprehensive Daily, Weekly, and Monthly current affairs compilations curated specifically for the UPSC Civil Services Examination.",
      format: "Google Drive Folder",
      size: "Shared Folder",
      downloadUrl: "https://drive.google.com/drive/folders/1e_PcuYoFS6ShagBnqYrkOVn9JlxcIQt9?usp=sharing",
      features: [
        "Daily news analysis of high-yield editorial topics",
        "Weekly current affairs compilations",
        "Monthly comprehensive digests mapping Prelims & Mains themes"
      ]
    },
    {
      id: "tnpsc-current-affairs",
      title: "TNPSC Current Affairs Digest",
      category: "current-affairs",
      date: "Daily, Weekly & Monthly",
      badge: "TNPSC",
      description: "Access our comprehensive Daily, Weekly, and Monthly current affairs compilations curated specifically for the TNPSC Group Examinations.",
      format: "Google Drive Folder",
      size: "Shared Folder",
      downloadUrl: "https://drive.google.com/drive/folders/13HV0rUUc5DEL_aHQmoUK1a2fl0YiqUgx?usp=sharing",
      features: [
        "Daily regional & national news updates for Group exams",
        "Weekly summaries of crucial state administration schemes",
        "Monthly bilingual compilations of current affairs"
      ]
    }
  ];

  const filteredResources = resourceItems.filter((evt) => {
    const matchesCategory = selectedCategory === "all" || evt.category === selectedCategory;
    const matchesKeyword = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           evt.badge.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesKeyword;
  });

  const closeOverlay = () => {
    setSelectedResource(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        
        {SHOW_CARDS ? (
          <>
            {/* Category Selector and Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-12 border-b border-gray-150">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {(["all", "syllabus", "pyqs", "current-affairs", "optional-lit"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer border ${
                      selectedCategory === cat
                        ? "bg-[#1E40AF] text-white border-transparent shadow-sm"
                        : "bg-gray-50 text-gray-400 border-gray-150 hover:bg-gray-100 hover:text-dark"
                    }`}
                  >
                    {cat === "all" ? "All Materials" : cat === "syllabus" ? "Syllabus Maps" : cat === "pyqs" ? "PYQs & Mocks" : cat === "current-affairs" ? "Current Affairs" : "Optional Subjects"}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs pl-8 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E40AF] text-dark placeholder-gray-400 bg-[#FAFBFD]"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Dynamic Resources Grid */}
            {filteredResources.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-gray-400 font-light text-sm">No matching resources found. Please try another search term.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
                {filteredResources.map((res) => (
                  <motion.div
                    key={res.id}
                    layoutId={`card-container-${res.id}`}
                    onClick={() => setSelectedResource(res)}
                    className="group flex flex-col justify-between p-6 rounded-3xl border border-gray-150 bg-white hover:border-[#1E40AF]/40 hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold text-[#1E40AF] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                          {res.badge}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-[#1e4fc0]/60" />
                          {res.size}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-md font-display font-medium text-dark leading-snug group-hover:text-[#1E40AF] transition-colors duration-200">
                          {res.title}
                        </h3>
                        <p className="text-gray-400 font-light text-xs line-clamp-3 leading-relaxed">
                          {res.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-light flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500/80" />
                        {res.date}
                      </span>
                      <span className="text-[10px] font-bold text-[#1E40AF] tracking-widest uppercase flex items-center gap-1">
                        Details
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-md p-8 rounded-3xl border border-gray-150 bg-gradient-to-br from-white to-[#FAFBFD] shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-[#1e40af]" />
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1E40AF] mx-auto mb-6">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-display font-semibold text-dark mb-3">
                Resources Coming Soon
              </h3>
              <p className="text-gray-400 font-light text-xs leading-relaxed mb-6">
                We are currently compiling the latest current affairs digests, micro-syllabus maps, solved question papers, and study guides. Check back soon!
              </p>
              <button
                type="button"
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto cursor-pointer group"
              >
                Get Notified
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}

        {/* Quick Contact Link Callout */}
        <div className="mt-16 p-6 rounded-2xl border border-blue-100/60 bg-blue-50/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-900 font-light text-left">
            💡 <strong>Need more materials or live coaching guidance?</strong> Connect with our academic counselors directly to receive dedicated offline program brochures.
          </p>
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-6 py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1"
          >
            Connect Now
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Resource Details Overlay (Modal) */}
      {selectedResource && (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-dark/40 backdrop-blur-sm transition-opacity"
            onClick={closeOverlay}
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative w-full max-w-2xl transform overflow-hidden rounded-[28px] bg-white p-6 md:p-8 text-left shadow-xl transition-all border border-gray-150 z-10"
            >
              
              {/* Close Button */}
              <button
                type="button"
                onClick={closeOverlay}
                className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-dark transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-bold text-[#1E40AF] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
                    {selectedResource.badge}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-dark leading-snug">
                    {selectedResource.title}
                  </h3>
                  <p className="text-gray-400 font-light text-xs mt-1 leading-relaxed">
                    Category: <span className="text-dark font-medium capitalize">{selectedResource.category.replace("-", " ")}</span> &bull; Format: <span className="text-dark font-medium">{selectedResource.format}</span>
                  </p>
                </div>

                <div className="border-t border-b border-gray-150 py-4 grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex gap-2.5 items-start">
                    <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Publication Date</p>
                      <p className="text-dark font-semibold">{selectedResource.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">File Format & Size</p>
                      <p className="text-dark font-semibold">{selectedResource.format} ({selectedResource.size})</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-dark uppercase tracking-wider">What is included in this reference</h4>
                  <ul className="space-y-2 text-xs text-gray-500 font-light pl-0 list-none">
                    {selectedResource.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2 items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Button Section inside modal overlay */}
                <div className="pt-6 border-t border-gray-150 flex flex-col items-center gap-4">
                  <p className="text-xs text-gray-500 font-light text-center">
                    Click the button below to view the materials. It will direct you to the secure resource folder.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.open(selectedResource.downloadUrl, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full py-3 bg-[#1E40AF] hover:bg-blue-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    View Materials
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
};

const Resources = () => {
  return (
    <>
      <ResourcesHero />
      <ResourcesContent />
    </>
  );
};

export default Resources;
