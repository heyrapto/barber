import React, { useState } from 'react';
import { ArrowCircleRight } from './Icons';

const ITEMS = [
    { id: '01', title: 'RAZOR', subtitle: 'SHARP', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=988&auto=format&fit=crop' },
    { id: '02', title: 'FADE', subtitle: 'CLEAN', img: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=987&auto=format&fit=crop' },
    { id: '03', title: 'BEARD', subtitle: 'SCULPT', img: 'https://images.unsplash.com/photo-1605497787907-66a1ca8a11bb?q=80&w=987&auto=format&fit=crop' },
    { id: '04', title: 'STYLE', subtitle: 'FINISH', img: 'https://images.unsplash.com/photo-1536520002442-39764a41e987?q=80&w=987&auto=format&fit=crop' },
];

export const ImageShowcase = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-[75vh] bg-[#111] border-t-8 border-[#FF6600] relative overflow-hidden flex flex-col md:flex-row p-0 md:p-0">
        
        {/* DECORATIVE HEADER */}
        <div className="absolute top-4 left-6 z-30 pointer-events-none mix-blend-difference">
            <h3 className="font-display font-bold text-[#F5F5F5] text-sm tracking-[0.4em] uppercase">
                Selection
            </h3>
        </div>

        {ITEMS.map((item, index) => {
            const isHovered = hoverIndex === index;
            const isAnyHovered = hoverIndex !== null;
            
            return (
                <div 
                    key={item.id}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className={`
                        relative h-full flex-1
                        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                        overflow-hidden cursor-pointer group border-r border-[#FF6600]/20 last:border-0
                        /* Diagonal Cut Logic */
                        md:transform md:-skew-x-12 md:origin-bottom
                        /* Hover Expansion */
                        ${isHovered ? 'md:flex-[3.5]' : 'md:flex-[1]'}
                        ${!isHovered && isAnyHovered ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'}
                    `}
                    style={{
                        marginRight: '-1px' // Prevent pixel gaps due to skew
                    }}
                >
                    {/* COUNTER-SKEW CONTAINER to keep content upright */}
                    <div className="absolute inset-[-20%] w-[140%] h-[140%] md:transform md:skew-x-12 md:origin-bottom">
                        
                        {/* IMAGE LAYER */}
                        <div className="absolute inset-0 bg-[#1F0B05]">
                            <img 
                                src={item.img} 
                                alt={item.title}
                                className={`
                                    w-full h-full object-cover transition-transform duration-1000 ease-out
                                    ${isHovered ? 'scale-100' : 'scale-125'}
                                `} 
                            />
                            {/* Orange tint overlay that fades on hover */}
                            <div className={`absolute inset-0 bg-[#FF6600] mix-blend-multiply transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-40'}`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                        </div>

                        {/* CONTENT LAYER */}
                        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 z-10">
                            
                            {/* Top Number */}
                            <div className="flex justify-between items-start">
                                <span className={`
                                    font-display font-bold text-6xl text-transparent stroke-text
                                    transition-all duration-500
                                    ${isHovered ? 'translate-y-0 opacity-100 text-[#FF6600]' : '-translate-y-4 opacity-50'}
                                `} style={{ WebkitTextStroke: '1px #FF6600' }}>
                                    {item.id}
                                </span>
                                <ArrowCircleRight className={`w-8 h-8 text-[#FF6600] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                            </div>

                            {/* Bottom Text */}
                            <div className="relative">
                                {/* Default Title (Visible when idle) */}
                                <h2 className={`
                                    font-display font-bold text-5xl md:text-7xl text-[#F5F5F5] uppercase tracking-tighter
                                    transition-all duration-500 origin-left
                                    ${isHovered ? 'opacity-0 translate-y-8 blur-sm' : 'opacity-100 translate-y-0 blur-0'}
                                `}>
                                    {item.title}
                                </h2>

                                {/* Hover Expanded Title (Visible when hovered) */}
                                <div className={`
                                    absolute bottom-0 left-0 w-full
                                    transition-all duration-500
                                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}
                                `}>
                                    <h2 className="font-display font-bold text-7xl md:text-9xl text-[#FF6600] uppercase tracking-tighter leading-[0.8]">
                                        {item.title}
                                    </h2>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="h-1 w-16 bg-[#F5F5F5]"></div>
                                        <span className="font-body font-bold text-[#F5F5F5] text-lg tracking-[0.5em] uppercase">
                                            {item.subtitle}
                                        </span>
                                    </div>
                                    
                                    {/* Kinetic Marquee Effect on Hover */}
                                    <div className="absolute -bottom-20 left-0 whitespace-nowrap opacity-10 pointer-events-none">
                                        <span className="font-display font-bold text-[8rem] text-white leading-none">
                                            {item.title} {item.title} {item.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Vertical Divider Line (Visual fix for skew edges) */}
                    <div className="absolute top-0 right-0 w-[1px] h-full bg-[#FF6600]/30 z-20"></div>
                </div>
            );
        })}
    </div>
  );
};