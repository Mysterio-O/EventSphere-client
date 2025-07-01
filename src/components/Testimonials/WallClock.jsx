import React, { useEffect, useState } from 'react';

const WallClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const radius = 60;
    const center = radius + 5;
    const hour = time.getHours() % 12;
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const hourDeg = (360 / 12) * hour + (30 / 60) * minute;
    const minuteDeg = (360 / 60) * minute + (6 / 60) * second;
    const secondDeg = (360 / 60) * second;

    return (
        <div className="flex justify-center">
            <svg width={2 * center} height={2 * center}>
                <circle cx={center} cy={center} r={radius} fill="#fbbf24" stroke="#333" strokeWidth="4" />
                {[...Array(12)].map((_, i) => (
                    <text
                        key={i}
                        x={center + radius * 0.85 * Math.sin((i + 1) * Math.PI / 6)}
                        y={center - radius * 0.85 * Math.cos((i + 1) * Math.PI / 6)}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize="10"
                    >
                        {i + 1}
                    </text>
                ))}
                <line x1={center} y1={center} x2={center + radius * 0.5 * Math.sin(Math.PI * hourDeg / 180)} y2={center - radius * 0.5 * Math.cos(Math.PI * hourDeg / 180)} stroke="#000" strokeWidth="4" />
                <line x1={center} y1={center} x2={center + radius * 0.7 * Math.sin(Math.PI * minuteDeg / 180)} y2={center - radius * 0.7 * Math.cos(Math.PI * minuteDeg / 180)} stroke="#000" strokeWidth="2" />
                <line x1={center} y1={center} x2={center + radius * 0.9 * Math.sin(Math.PI * secondDeg / 180)} y2={center - radius * 0.9 * Math.cos(Math.PI * secondDeg / 180)} stroke="red" strokeWidth="1" />
            </svg>
        </div>
    );
};

export default WallClock;
