import React from 'react';

const SERVICES = [
    { id: '01', name: 'Security Audit', price: '90', desc: 'Vulnerability Scan • Risk Assessment • Report' },
    { id: '02', name: 'Penetration Test', price: '100', desc: 'Simulated Attack • Exploit Testing • Findings' },
    { id: '03', name: 'Data Protection', price: '70', desc: 'Encryption Setup • Backup Strategy • Compliance' },
    { id: '04', name: 'Full Security Suite', price: '150', desc: 'Audit • Pentest • Monitoring • Hardening' },
    { id: '05', name: 'Identity Protection', price: '80', desc: '2FA Setup • Access Control • Account Security' },
    { id: '06', name: 'Enterprise Shield', price: '200', desc: 'Advanced Defense • Threat Detection • Premium Support' },
];

export const ServiceMenu = () => {
    return (
        <div className="w-full min-h-screen bg-[#0055FF] text-[#FFFFFF] relative overflow-hidden flex flex-col items-center py-12 md:py-20 px-4 md:px-10 border-t-8 border-[#FFFFFF]">

            {/* Background Texture Pattern (CSS Dots) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {/* Header */}
            <div className="w-full max-w-6xl mb-10 md:mb-16 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-[#FFFFFF] pb-4 gap-4">
                <h2 className="font-display font-bold text-6xl md:text-9xl tracking-tighter uppercase leading-[0.8]">
                    Service<br />List
                </h2>
                <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-end items-end md:items-end border-t-2 md:border-t-0 border-[#FFFFFF]/20 pt-2 md:pt-0">
                    <span className="font-display font-bold text-lg md:text-xl tracking-widest uppercase block mb-1">Currency: PLN</span>
                    <span className="font-body font-bold text-xs md:text-sm tracking-wider uppercase block opacity-80">Inclusive of VAT</span>
                </div>
            </div>

            {/* The Menu Grid */}
            <div className="w-full max-w-6xl grid grid-cols-1 gap-3 md:gap-4 relative z-10">
                {SERVICES.map((service, index) => (
                    <div key={service.id} className="group relative w-full min-h-[5rem] md:h-32 perspective-1000">

                        {/* Visual Container */}
                        <div className="relative w-full h-full bg-[#FFFFFF] text-[#0055FF] flex items-center justify-between px-4 md:px-12 py-4 md:py-0
                                    transition-all duration-300 ease-out transform origin-center
                                    group-hover:scale-[1.02] group-hover:bg-[#111111] group-hover:text-[#FFFFFF] 
                                    shadow-[4px_4px_0px_rgba(31,11,5,0.3)] md:shadow-[8px_8px_0px_rgba(31,11,5,0.3)]">

                            {/* Left: ID & Name */}
                            <div className="flex items-center gap-3 md:gap-12 flex-1 mr-2">
                                <span className="font-display font-bold text-xl md:text-3xl opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
                                    {service.id}
                                </span>
                                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-6xl uppercase tracking-tight leading-none break-words">
                                    {service.name}
                                </h3>
                            </div>

                            {/* Right: Price */}
                            <div className="relative shrink-0">
                                <span className="font-display font-bold text-3xl md:text-6xl tracking-tighter group-hover:blur-[2px] transition-all duration-300">
                                    {service.price}
                                </span>
                            </div>

                            {/* Hover Description Reveal (Slide In) */}
                            <div className="absolute inset-0 bg-[#0055FF] text-[#FFFFFF] flex items-center justify-center 
                                        transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                                        overflow-hidden pointer-events-none z-20">
                                <div className="w-full h-full border-2 md:border-4 border-[#FFFFFF] flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-10 py-2 gap-1 md:gap-4">
                                    <span className="font-display font-bold text-lg md:text-2xl uppercase tracking-widest hidden md:block">{service.name}</span>
                                    <span className="font-body font-bold text-xs sm:text-sm md:text-xl uppercase tracking-wider text-center">{service.desc}</span>
                                    <span className="font-display font-bold text-2xl md:text-3xl hidden md:block">{service.price}</span>
                                </div>
                            </div>

                            {/* Decorative 'Cut' Lines - Hidden on mobile to reduce noise */}
                            <div className="hidden md:block absolute top-0 left-4 w-[2px] h-4 bg-[#0055FF] group-hover:bg-[#FFFFFF]"></div>
                            <div className="hidden md:block absolute bottom-0 left-4 w-[2px] h-4 bg-[#0055FF] group-hover:bg-[#FFFFFF]"></div>
                            <div className="hidden md:block absolute top-0 right-4 w-[2px] h-4 bg-[#0055FF] group-hover:bg-[#FFFFFF]"></div>
                            <div className="hidden md:block absolute bottom-0 right-4 w-[2px] h-4 bg-[#0055FF] group-hover:bg-[#FFFFFF]"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="w-full max-w-6xl mt-10 md:mt-16 text-center md:text-left font-body uppercase tracking-widest text-xs md:text-sm opacity-80 border-t-2 border-[#FFFFFF] pt-4 md:pt-6 flex flex-col md:flex-row justify-between gap-2">
                <span>All systems monitored & secured 24/7</span>
                <span>Global • Remote Operations</span>
            </div>

        </div>
    );
};