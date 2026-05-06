import React from "react";
import { Wine, Award, Star, Users, Briefcase, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const VintnerLanding = () => {
  const wines = [
    {
      id: 1,
      name: "Grand Cru Éclat",
      vintage: "2018",
      region: "Bordeaux, France",
      notes:
        "A profound expression of Cabernet Sauvignon, with notes of blackcurrant, cedar, and a hint of truffle. Velvety tannins and a lingering finish.",
    },
    {
      id: 2,
      name: "Terra Nova Reserve",
      vintage: "2020",
      region: "Napa Valley, USA",
      notes:
        "Rich and opulent Chardonnay, showcasing ripe pear, toasted almond, and a delicate minerality. Aged gracefully in French oak.",
    },
    {
      id: 3,
      name: "Solstice Syrah",
      vintage: "2019",
      region: "Barossa Valley, Australia",
      notes:
        "Intense and spicy Syrah, bursting with dark berries, white pepper, and smoked meat. A powerful wine with a long, savory finish.",
    },
    {
      id: 4,
      name: "Pétales de Rosé",
      vintage: "2022",
      region: "Provence, France",
      notes:
        "Delicate and refreshing rosé, with aromas of wild strawberry, rose petals, and a crisp, dry palate. Perfect for a summer evening.",
    },
  ];

  const benefits = [
    {
      icon: <Award className="h-6 w-6 text-amber-500" />,
      title: "Curated Selections",
      description: "Hand-picked, award-winning wines delivered to your door.",
    },
    {
      icon: <Star className="h-6 w-6 text-amber-500" />,
      title: "Exclusive Access",
      description: "Early access to limited releases and rare vintages.",
    },
    {
      icon: <Users className="h-6 w-6 text-amber-500" />,
      title: "Sommelier Consults",
      description: "Personalized recommendations from our expert sommeliers.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-amber-500" />,
      title: "Private Events",
      description: "Invitations to exclusive tastings and cellar tours.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-screen bg-stone-950 text-stone-200 font-serif antialiased selection:bg-amber-600 selection:text-stone-950">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="relative z-50 py-6 px-4 sm:px-6 lg:px-8 border-b border-stone-800"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <a
            href="#"
            className="text-2xl font-bold text-amber-600 tracking-widest uppercase"
          >
            Vintner's Cellar
          </a>
          <div className="hidden md:flex space-x-8">
            {[
              "Our Story",
              "Collections",
              "Tasting Notes",
              "Membership",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-stone-300 hover:text-amber-500 transition-colors text-lg"
              >
                {item}
              </a>
            ))}
          </div>
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-stone-300 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </nav>
      </motion.header>

      <section className="relative overflow-hidden py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 to-stone-900 opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-600 mb-6 leading-tight"
          >
            Discover Exquisite Vintages, Curated for You
          </motion.h1>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-stone-300 mb-10 max-w-3xl mx-auto"
          >
            Experience the world's finest wines, hand-selected by our master
            sommeliers and delivered to your cellar.
          </motion.p>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-amber-600 text-stone-950 rounded-full hover:bg-amber-700 transition-colors shadow-lg"
            >
              Explore Collections
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4"
          >
            <Wine className="h-48 w-48 md:h-64 md:w-64 text-amber-500 opacity-20" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base font-semibold text-amber-600 tracking-widest uppercase mb-4"
        >
          Our Collections
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-stone-100 mb-16 max-w-3xl mx-auto leading-tight"
        >
          A Taste of Excellence from Around the Globe
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {wines.map((wine) => (
            <motion.div
              key={wine.id}
              variants={fadeIn}
              className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:border-amber-700 transition-all duration-300 flex flex-col items-start text-left"
            >
              <Wine className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-2xl font-semibold text-amber-500 mb-2">
                {wine.name}
              </h3>
              <p className="text-stone-400 text-sm mb-1">
                {wine.vintage} | {wine.region}
              </p>
              <p className="text-stone-300 text-base flex-grow mb-4">
                {wine.notes}
              </p>
              <a
                href="#"
                className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors font-medium"
              >
                View Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 text-center bg-stone-900 border-t border-b border-stone-800">
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base font-semibold text-amber-600 tracking-widest uppercase mb-4"
        >
          Why Choose Us
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-stone-100 mb-16 max-w-3xl mx-auto leading-tight"
        >
          Unrivaled Service for the Discerning Connoisseur
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-stone-950 border border-stone-800 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:border-amber-700 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-stone-100 mb-2">
                {benefit.title}
              </h3>
              <p className="text-stone-300 text-base">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-6 leading-tight">
            Ready to Elevate Your Wine Experience?
          </h2>
          <p className="text-xl text-stone-300 mb-10">
            Join our exclusive membership today and unlock a world of premium
            wines and personalized service.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center px-10 py-4 text-xl font-semibold bg-amber-600 text-stone-950 rounded-full hover:bg-amber-700 transition-colors shadow-lg"
          >
            Become a Member
            <ChevronRight className="ml-2 h-6 w-6" />
          </button>
        </motion.div>
      </section>

      <footer className="bg-stone-900 border-t border-stone-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <a
              href="#"
              className="text-2xl font-bold text-amber-600 tracking-widest uppercase"
            >
              Vintner's Cellar
            </a>
            <p className="text-stone-500 text-sm mt-2">
              &copy; {new Date().getFullYear()} Vintner's Cellar. All rights
              reserved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-stone-400">
            <a href="#" className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default VintnerLanding;
