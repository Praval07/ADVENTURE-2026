import React from 'react';
import { Camera, Film, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const photos = [
    {
      title: 'Cinematic Camera Production',
      caption: 'Student crew setting up professional lighting for a local bakery ad shoot',
      image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80',
      category: 'On Set',
    },
    {
      title: 'Storyboarding & Brainstorming',
      caption: 'Refining the 60-second narrative hook in the campus makerspace',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
      category: 'Ideation',
    },
    {
      title: 'Artisan Heritage Craft',
      caption: 'Documenting regional brass handicrafts for the Traditional Business track',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      category: 'Documentary',
    },
    {
      title: 'Post-Production & Audio Sync',
      caption: 'Editing crisp dialogue, sound effects, and color grading in studio',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      category: 'Editing',
    },
    {
      title: 'Live Pitching & Screening',
      caption: 'Finalists presenting their commercial impact to external venture judges',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      category: 'Grand Finale',
    },
    {
      title: 'Team Collaboration',
      caption: 'Cross-functional engineering and design teams testing camera rigs',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      category: 'Teamwork',
    },
  ];

  return (
    <section className="py-24 bg-[#090b0e] text-white relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff5b26]/10 px-3.5 py-1 text-xs font-bold text-[#ff5b26] border border-[#ff5b26]/20 mb-4">
            <Camera className="h-3.5 w-3.5" />
            <span>VISUAL CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
            Behind The Lens & On Stage
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            A glimpse into the adrenaline, craft, and creativity driving student filmmakers and startup innovators.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#ff5b26]/50"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-zinc-300 border border-white/10">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-white group-hover:text-[#ff5b26] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
