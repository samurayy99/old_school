"use client";

import DottedMap from "dotted-map";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface Point {
  lat: number;
  lng: number;
  label?: string;
}

interface Hub extends Point {
  name: string;
}

interface Connection {
  start: Hub;
  end: Hub;
}

interface WorldMapProps {
  hubs?: Hub[];
  connections?: Connection[];
  epicenter?: Hub;
  hubColor?: string;
  epicenterColor?: string;
  connectionColor?: string;
  showBackgroundOnly?: boolean;
  showConnectionsOnly?: boolean;
  showEpicenterOnly?: boolean;
}

const zugEpicenter: Hub = {
    name: "Zug, Switzerland",
    lat: 47.1662,
    lng: 8.5155,
    label: "Crypto Valley"
};

const globalHubs: Hub[] = [
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Hong Kong", lat: 22.3964, lng: 114.1095 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
];

const globalConnections: Connection[] = [
  { start: globalHubs[0], end: globalHubs[1] }, // NY to Madrid
  { start: globalHubs[1], end: globalHubs[2] }, // Madrid to Istanbul
  { start: globalHubs[2], end: globalHubs[3] }, // Istanbul to Dubai
  { start: globalHubs[3], end: globalHubs[4] }, // Dubai to Singapore
  { start: globalHubs[4], end: globalHubs[5] }, // Singapore to Hong Kong
  { start: globalHubs[5], end: globalHubs[6] }, // Hong Kong to Tokyo
  { start: globalHubs[6], end: globalHubs[0] }, // Tokyo back to NY (closing the loop)
  // Connect to Zug
  { start: globalHubs[0], end: zugEpicenter },
  { start: globalHubs[6], end: zugEpicenter },
  // Add more for density
];

export function WorldMap({
  hubs = globalHubs,
  connections = globalConnections,
  epicenter = zugEpicenter,
  hubColor = "#3a7ca5", // blueprint-blue
  epicenterColor = "#D4AF37", // accent-gold
  connectionColor = "#3a7ca5a0", // more visible blueprint-blue
  showBackgroundOnly = false,
  showConnectionsOnly = false,
  showEpicenterOnly = false,
}: WorldMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a placeholder on the server and initial client render to avoid hydration mismatch
  if (!isMounted) {
    return <div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-sans" />;
  }

  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.6,
    color: theme === "dark" ? "#ffffff60" : "#00000060",
    shape: "circle",
    backgroundColor: "transparent",
  });

  const projectPoint = (lat: number, lng: number) => {
    // Mercator projection with better centering for Europe
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Conditional rendering logic
  if (showBackgroundOnly) {
    return (
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map background"
        draggable={false}
      />
    );
  }

  if (showConnectionsOnly) {
    return (
      <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none">
        <defs>
          <radialGradient id="epicenter-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: epicenterColor, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: epicenterColor, stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        {connections.map((conn, i) => {
          const startPoint = projectPoint(conn.start.lat, conn.start.lng);
          const endPoint = projectPoint(conn.end.lat, conn.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke={connectionColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
    );
  }

  if (showEpicenterOnly) {
    return (
      <svg viewBox="0 0 800 400" className="w-full h-full absolute inset-0 pointer-events-none select-none">
        <defs>
          <radialGradient id="epicenter-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: epicenterColor, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: epicenterColor, stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        {(() => {
          const { x, y } = projectPoint(epicenter.lat, epicenter.lng);
          return (
            <g>
              <motion.circle
                cx={x}
                cy={y}
                r="20"
                fill="url(#epicenter-glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "backOut" }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="8"
                fill={epicenterColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="4"
                fill="#ffffff"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
              />
            </g>
          );
        })()}
      </svg>
    );
  }

  // Full render if no specific prop is set
  return (
    <div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        draggable={false}
      />
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <radialGradient id="epicenter-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: epicenterColor, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: epicenterColor, stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        {/* Connection Lines */}
        {connections.map((conn, i) => {
          const startPoint = projectPoint(conn.start.lat, conn.start.lng);
          const endPoint = projectPoint(conn.end.lat, conn.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke={connectionColor}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeInOut" }}
            />
          );
        })}

        {/* Hub Points */}
        {hubs.map((hub, i) => {
           const { x, y } = projectPoint(hub.lat, hub.lng);
           return (
            <motion.circle
                key={`hub-${i}`}
                cx={x}
                cy={y}
                r={3}
                fill={hubColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
            />
           )
        })}

        {/* Epicenter Point: Zug */}
        {(() => {
            const { x, y } = projectPoint(epicenter.lat, epicenter.lng);
            return (
                <g>
                    <motion.circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill="url(#epicenter-glow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "backOut" }}
                    />
                    <motion.circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={epicenterColor}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
                    />
                    <motion.circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#ffffff"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
                    />
                </g>
            )
        })()}

      </svg>
    </div>
  );
} 