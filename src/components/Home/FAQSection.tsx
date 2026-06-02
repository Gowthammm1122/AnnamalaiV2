import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Who are the promoters and mentors of Dr P. Annamalai IAS Academy?",
      answer: "The Academy is founded and promoted by two retired IAS officers with more than 30 years of distinguished administrative service and deep experience within the Government of Tamil Nadu. Our core mentorship team includes Dr P. Annamalai, IAS., PhD., who focuses on conceptual clarity and disciplined UPSC strategies, and Mr. C. Kamaraj, IAS., who specializes in strategic consistency and descriptive answer writing.",
    },
    {
      question: "What specific examination coaching programs are offered under a single roof?",
      answer: "We run fully integrated, specialized coaching programs covering seven main competitive frameworks: Union Public Service Commission (UPSC), Tamil Nadu Public Service Commission (TNPSC), Banking Services (IBPS/SBI/RBI), Insurance Corporation Recruitment, Railway Recruitment Board (RRB), Staff Selection Commission (SSC), and Tamil Nadu Uniformed Services Recruitment Board (TNUSRB).",
    },
    {
      question: "What makes the academy's infrastructure and study resources unique?",
      answer: "Our academy is situated in a spacious, four-story building featuring vast academic space with all modern facilities gathered under a single roof. In addition to expert, subject-wise experienced faculties, the academy provides excellent custom-prepared notes and printed books that align strictly with the latest updated syllabi.",
    },
    {
      question: "How is the rigorous examination and evaluation test matrix structured?",
      answer: "Consistency is driven through an intensive evaluation matrix consisting of Daily Tests, Weekly Tests, and Monthly Tests, culminating in comprehensive full-length simulated Mock Tests. This structure is designed to guarantee speed, scoring accuracy, and ultimate success for every candidate.",
    },
    {
      question: "What is the location and official contact directory for admissions?",
      answer: "Our campus headquarters is located at Anthony Nagar Main Road, Kolathur, Chennai - 600099. For admissions and direct support from our counseling coordinators, you can call us at 8015390090 or 6383790090, or email us at admin@drpannamalaiiasacademy.com.",
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