import { useEffect, useState } from "react";
import { Calendar, Clock, Trophy, Users, Code, Gamepad2, Palette, Brain, Bug, Rocket, ChevronDown, Sparkles, MapPin, Star } from "lucide-react";

const schedule = {
  "Day 1": [
    { 
      time: "9:00 AM", 
      title: "Inauguration Ceremony", 
      description: "Grand opening with distinguished guests and welcome address.",
      category: "ceremony",
      icon: Trophy,
      duration: "1.5 hrs"
    },
    { 
      time: "10:30 AM", 
      title: "Startup Idea Pitch", 
      description: "Teams present innovative startup concepts to expert judges.",
      category: "competition",
      icon: Users,
      duration: "1.5 hrs"
    },
    { 
      time: "12:00 PM", 
      title: "Code Clash Championship", 
      description: "Intense coding competition with algorithmic challenges.",
      category: "technical",
      icon: Code,
      duration: "2 hrs"
    },
    { 
      time: "2:00 PM", 
      title: "Gaming Arena", 
      description: "Competitive LAN gaming tournament featuring CS and Valorant.",
      category: "gaming",
      icon: Gamepad2,
      duration: "2 hrs"
    },
    { 
      time: "4:00 PM", 
      title: "Talent Showcase", 
      description: "Platform for students to display creative talents.",
      category: "entertainment",
      icon: Palette,
      duration: "2 hrs"
    }
  ],
  "Day 2": [
    { 
      time: "10:00 AM", 
      title: "Tech Knowledge Quiz", 
      description: "Mind-bending technology quiz across various domains.",
      category: "competition",
      icon: Brain,
      duration: "1.5 hrs"
    },
    { 
      time: "11:30 AM", 
      title: "Debugging Battle", 
      description: "Fast-paced competition to identify and fix code bugs.",
      category: "technical",
      icon: Bug,
      duration: "1.5 hrs"
    },
    { 
      time: "1:00 PM", 
      title: "Innovation Project Expo", 
      description: "Students demonstrate cutting-edge tech projects.",
      category: "showcase",
      icon: Rocket,
      duration: "2 hrs"
    },
    { 
      time: "3:00 PM", 
      title: "UI/UX Design Challenge", 
      description: "Creative design competition focusing on user experience.",
      category: "design",
      icon: Palette,
      duration: "2 hrs"
    },
    { 
      time: "5:00 PM", 
      title: "Grand Award Ceremony", 
      description: "Celebration with prize distribution and closing remarks.",
      category: "ceremony",
      icon: Trophy,
      duration: "1 hr"
    }
  ]
};

const categoryColors = {
  ceremony: { primary: "from-amber-400 to-orange-500", secondary: "from-amber-500/20 to-orange-500/20", text: "text-amber-400", bg: "bg-amber-500/10" },
  competition: { primary: "from-red-400 to-pink-500", secondary: "from-red-500/20 to-pink-500/20", text: "text-red-400", bg: "bg-red-500/10" },
  technical: { primary: "from-blue-400 to-cyan-500", secondary: "from-blue-500/20 to-cyan-500/20", text: "text-blue-400", bg: "bg-blue-500/10" },
  gaming: { primary: "from-green-400 to-emerald-500", secondary: "from-green-500/20 to-emerald-500/20", text: "text-green-400", bg: "bg-green-500/10" },
  entertainment: { primary: "from-purple-400 to-indigo-500", secondary: "from-purple-500/20 to-indigo-500/20", text: "text-purple-400", bg: "bg-purple-500/10" },
  showcase: { primary: "from-teal-400 to-cyan-500", secondary: "from-teal-500/20 to-cyan-500/20", text: "text-teal-400", bg: "bg-teal-500/10" },
  design: { primary: "from-pink-400 to-rose-500", secondary: "from-pink-500/20 to-rose-500/20", text: "text-pink-400", bg: "bg-pink-500/10" }
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState("Day 1");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const eventDate = new Date("2025-11-12T09:00:00");
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;
      if (distance < 0) return setCountdown("Event Started! 🚀");

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        setCountdown(`${days} days, ${hrs} hours left`);
      } else {
        setCountdown(`${hrs}h ${mins}m left`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-0 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50 mb-8">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">November 12-13, 2025</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            CrossRoad Fest
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Two days of innovation, competition, and celebration
          </p>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
            <Clock className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">{countdown}</span>
          </div>
        </div>
      </div>

      {/* Day Selector */}
      <div className="relative z-0 flex justify-center gap-4 px-6 mb-16">
        {Object.keys(schedule).map((day) => (
          <button
            key={day}
            onClick={() => {
              setActiveDay(day);
              setExpandedIndex(null);
            }}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              activeDay === day
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative z-0 max-w-6xl mx-auto px-6 pb-20">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>
          
          <div className="space-y-12">
            {schedule[activeDay].map((event, index) => {
              const IconComponent = event.icon;
              const isExpanded = expandedIndex === index;
              const colors = categoryColors[event.category];
              
              return (
                <div key={index} className="relative flex items-start gap-8">
                  {/* Timeline Node */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${colors.primary} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                        <IconComponent className={`w-7 h-7 ${colors.text}`} />
                      </div>
                    </div>
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.primary} opacity-20 animate-pulse`}></div>
                  </div>

                  {/* Event Card */}
                  <div className="flex-1 max-w-2xl">
                    <div className={`bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800 hover:border-slate-700 transition-all duration-300 overflow-hidden group ${isExpanded ? 'shadow-2xl' : 'hover:shadow-xl'}`}>
                      {/* Card Header */}
                      <div className="p-8 pb-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{event.time}</div>
                            <div className="text-slate-500 text-sm">{event.duration}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border border-current/20`}>
                            {event.category}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                          {event.title}
                        </h3>
                        
                        <p className="text-slate-400 leading-relaxed mb-6">
                          {isExpanded ? event.description : `${event.description.slice(0, 120)}...`}
                        </p>
                        
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : index)}
                          className={`inline-flex items-center gap-2 ${colors.text} hover:text-white text-sm font-semibold transition-colors duration-200`}
                        >
                          <span>{isExpanded ? "Show Less" : "Learn More"}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-8 pb-8 border-t border-slate-800">
                          <div className="pt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-white mb-3">Event Details</h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                  {event.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                  <MapPin className="w-4 h-4" />
                                  <span>Main Auditorium</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-white mb-3">Quick Info</h4>
                                <div className="space-y-3">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Duration:</span>
                                    <span className="text-slate-300">{event.duration}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Category:</span>
                                    <span className={`capitalize ${colors.text}`}>{event.category}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Day:</span>
                                    <span className="text-slate-300">{activeDay}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    <span className="text-slate-300">Featured Event</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Hover Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${colors.secondary} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-0 text-center py-12 border-t border-slate-800/50">
        <div className="inline-flex items-center gap-2 text-slate-400">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="font-medium">May the best innovator win!</span>
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>
      </div>
    </div>
  );
}