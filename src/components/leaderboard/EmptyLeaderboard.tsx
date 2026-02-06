export function EmptyLeaderboard() {
  return (
    <section className="relative mx-auto mb-16 w-full max-w-5xl px-4">
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden bg-[#0f1322] shadow-2xl ring-1 ring-[#526197]/20">
          {/* Top highlight */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#526197]/60 to-transparent z-20" />
          
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 rounded-full bg-[#526197]/10 border border-[#526197]/20 flex items-center justify-center mb-6">
              <svg 
                className="w-12 h-12 text-[#85C7FF]/40" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              No Rankings Yet
            </h3>
            <p className="text-sm text-[#E8E5FF]/60 text-center max-w-md">
              The leaderboard is empty. Be the first to compete and claim the top spot!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
