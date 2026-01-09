'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Users, MapPin } from 'lucide-react';

export function GlobalSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={`
        w-full max-w-4xl bg-white rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center
        transition-all duration-300 ease-out
        ${isFocused ? 'scale-[1.02] ring-4 ring-white/30' : ''}
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Location */}
      <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 relative group cursor-pointer">
        <div className="flex items-center gap-3 mb-1">
          <MapPin className="w-4 h-4 text-reetdach-400" />
          <span className="text-xs font-medium text-reetdach-500 uppercase tracking-wider">Ort</span>
        </div>
        <div className="text-reetdach-900 font-serif text-lg">Ganz Sylt</div>
        <div className="absolute inset-0 bg-sand-50/0 group-hover:bg-sand-50/50 transition-colors rounded-xl -m-2" />
      </div>

      {/* Dates */}
      <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 relative group cursor-pointer">
        <div className="flex items-center gap-3 mb-1">
          <Calendar className="w-4 h-4 text-reetdach-400" />
          <span className="text-xs font-medium text-reetdach-500 uppercase tracking-wider">Reisezeitraum</span>
        </div>
        <div className="text-reetdach-400 font-serif text-lg">Beliebig</div>
        <div className="absolute inset-0 bg-sand-50/0 group-hover:bg-sand-50/50 transition-colors rounded-xl -m-2" />
      </div>

      {/* Guests */}
      <div className="flex-1 w-full md:w-auto px-6 py-3 relative group cursor-pointer">
        <div className="flex items-center gap-3 mb-1">
          <Users className="w-4 h-4 text-reetdach-400" />
          <span className="text-xs font-medium text-reetdach-500 uppercase tracking-wider">Gäste</span>
        </div>
        <div className="text-reetdach-400 font-serif text-lg">2 Gäste</div>
        <div className="absolute inset-0 bg-sand-50/0 group-hover:bg-sand-50/50 transition-colors rounded-xl -m-2" />
      </div>

      {/* Search Button */}
      <button className="w-full md:w-auto bg-nordsee-700 hover:bg-nordsee-800 text-white rounded-full p-4 md:px-8 md:py-4 flex items-center justify-center gap-2 transition-colors duration-300 shadow-lg hover:shadow-xl">
        <Search className="w-5 h-5" />
        <span className="font-medium">Suchen</span>
      </button>
    </motion.div>
  );
}
