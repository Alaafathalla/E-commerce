import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
// swap with your own image/
import faqImg from "../../assets/faq.png";
import { Helmet } from "react-helmet";


<Helmet>
        <title>FAQ page</title>
        <meta name="description" content="faq"/>
        <meta property="og:title" content="الصفحة الرئيسية" />
      </Helmet>
const faqs = [
  {
    q: "What Facilities Does Your Hotel Have?",
    a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptate doloribus eos sunt labore ea enim voluptatem, sequi voluptas rem doloremque architecto.",
  },
  {
    q: "How Do I Book A Room For My Vacation?",
    a: "You can book through our website, mobile app, or by calling our support line 24/7.",
  },
  {
    q: "How are we best among others?",
    a: "We source the freshest produce, maintain strict QC standards, and deliver fast.",
  },
  {
    q: "Is There Any Fitness Center In Your Hotel?",
    a: "Yes—modern gym, free weights, and classes every morning.",
  },
  {
    q: "What Type Of Room Service Do You Offer?",
    a: "24/7 room service with seasonal menu and healthy choices.",
  },
  {
    q: "What Facilities Does Your Hotel Have?",
    a: "Pool, spa, concierge, kids’ corner, co-working lounge, and airport shuttle.",
  },
  {
    q: "How Do I Book A Room For My Vacation?",
    a: "Pick dates, choose room, add extras, pay securely—done!",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left px-4 py-3"
      >
        <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100">
          {item.q}
        </span>
        <ChevronDown
          className={`shrink-0 transition-transform duration-200 text-gray-500 dark:text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-sm text-start text-gray-600 dark:text-gray-300 leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Image */}
        <div className="w-full">
          <img
            src={faqImg}
            alt="Fresh vegetables"
            className="w-full h-[340px] sm:h-[420px]  object-cover rounded-xl border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Right Accordion */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
