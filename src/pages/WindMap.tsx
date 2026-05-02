import { windLocations } from "@/data/mockData";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Wind, Navigation, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function WindMap() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {windLocations.map((loc) => (
          <div
            key={loc.id}
            className={`glass-card rounded-xl p-4 border-l-4 ${
              loc.riskLevel === "Critical" ? "border-l-status-red" :
              loc.riskLevel === "Warning" ? "border-l-status-orange" :
              "border-l-status-green"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground text-sm">{loc.name}</h3>
              <StatusBadge level={loc.riskLevel} />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${
                loc.riskLevel === "Critical" ? "status-red" :
                loc.riskLevel === "Warning" ? "status-orange" :
                "status-green"
              }`}>
                {loc.speed}
              </span>
              <span className="text-sm text-muted-foreground">m/s</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Updated {loc.lastUpdated}</p>
          </div>
        ))}
      </div>

      {/* Map + Detail panel */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map placeholder */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 min-h-[500px] relative overflow-hidden">
          <h3 className="text-sm font-semibold text-foreground mb-3">Karnataka Wind Monitoring Map</h3>
          <div className="absolute inset-0 mt-10 bg-secondary/20 rounded-b-2xl">
            {/* Stylized Karnataka map background */}
            <svg viewBox="0 0 400 500" className="w-full h-full opacity-20" fill="none" stroke="hsl(var(--muted-foreground))">
              <path d="M200,50 L280,80 L320,140 L350,200 L340,280 L300,350 L250,400 L200,450 L150,420 L100,370 L70,300 L60,220 L80,150 L120,90 Z" strokeWidth="2" />
            </svg>

            {/* Location markers */}
            {windLocations.map((loc) => {
              const x = ((loc.lng - 74.5) / 3) * 100;
              const y = ((16.5 - loc.lat) / 4) * 100;
              return (
                <div
                  key={loc.id}
                  className="absolute group"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-card ${
                      loc.riskLevel === "Critical" ? "bg-status-red pulse-red" :
                      loc.riskLevel === "Warning" ? "bg-status-orange" :
                      "bg-status-green"
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 glass-card rounded-lg p-3 min-w-[180px] text-xs">
                    <p className="font-semibold text-foreground">{loc.name}</p>
                    <p className="text-muted-foreground">Speed: {loc.speed} m/s</p>
                    <p className="text-muted-foreground">Risk: {loc.riskLevel}</p>
                    <p className="text-muted-foreground">Updated: {loc.lastUpdated}</p>
                    <p className="text-muted-foreground">6hr forecast: {loc.forecast6h} m/s</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-1 font-medium">{loc.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right detail panel */}
        <div className="space-y-4">
          {windLocations.map((loc) => (
            <div key={loc.id} className="glass-card rounded-xl p-4 space-y-3">
              <h4 className="font-semibold text-foreground text-sm">{loc.name}</h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Wind @ 10m</p>
                  <p className="font-mono font-bold text-foreground">{loc.speed} m/s</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Wind @ 100m</p>
                  <p className="font-mono font-bold text-foreground">{loc.speed100m} m/s</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Navigation className="w-3.5 h-3.5" style={{ transform: `rotate(${loc.direction}deg)` }} />
                  {loc.directionLabel}
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  loc.trend === "Rising" ? "bg-status-red-soft status-red" :
                  loc.trend === "Falling" ? "bg-status-green-soft status-green" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {loc.trend === "Rising" ? <TrendingUp className="w-3 h-3" /> :
                   loc.trend === "Falling" ? <TrendingDown className="w-3 h-3" /> :
                   <Minus className="w-3 h-3" />}
                  {loc.trend}
                </span>
              </div>

              {/* Risk score bar */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      loc.riskScore >= 7 ? "bg-status-red" :
                      loc.riskScore >= 4 ? "bg-status-orange" :
                      "bg-status-green"
                    }`}
                    style={{ width: `${loc.riskScore * 10}%` }}
                  />
                </div>
                <p className="text-right text-[10px] text-muted-foreground mt-0.5">{loc.riskScore}/10</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
