import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What courses does Dr. P. Annamalai IAS Academy offer?",
      answer: "We offer comprehensive programs for UPSC Civil Services Examination (including Prelims, Mains, and Optional Support), TNPSC Group I & II, and specialized test series/mentorship classes tailored to individual strategy timelines.",
    },
    {
      question: "Is there a hybrid or virtual study model active?",
      answer: "Yes, we offer live-streamed lectures, interactive digital dashboard portals, and post-lecture video archives for candidates who prefer online or hybrid training schedules.",
    },
    {
      question: "What is the process to reserve admission slots?",
      answer: "Interested candidates can apply online using our Admissions Portal, schedule a direct counseling callback session, or write to our Anna Nagar headquarters to confirm seat availability.",
    },
    {
      question: "Are mock examinations included under standard enrollment packages?",
      answer: "Absolutely. All major standard programs automatically include full access to our national simulated mock tests (such as our hallmark AIPMTS), complete optionals feedback grids, and one-on-one evaluations.",
    },
    {
      question: "How do I secure scholarships or fee waivers?",
      answer: "You can register for our state-wide merit exam known as SCAT (Scholarship Cum Admission Test) conducted during June. Top performing aspirants receive tiered waivers or fully sponsored course admission packages.",
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-[120px]">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold text-primary/80 bg-primary-light px-3.5 py-1.5 rounded-full uppercase tracking-[0.35em]">
            ADMISSIONS & INQUIRY HELPDESK
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-dark mt-6 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-primary/40 mx-auto mt-4"></div>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border border-gray-150 rounded-[20px] overflow-hidden bg-white transition-all duration-300 ${isOpen ? 'shadow-md border-primary/20' : 'hover:border-gray-300'}`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-6 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm md:text-base font-semibold text-dark tracking-normal">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-primary-light text-primary' : 'bg-gray-50 text-gray-400'}`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 text-xs md:text-sm text-gray-500 font-light leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
