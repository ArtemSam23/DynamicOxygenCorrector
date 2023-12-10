import { interpolationPoints as points } from './settings.js';


function linearInterpolation(p, point1, point2) {
    const ratio = (p - point1.p) / (point2.p - point1.p);
    return point1.q + ratio * (point2.q - point1.q);
}


export function getEstimatedOxygen(p) {
    if (p < points[0].p) {
        return linearInterpolation(p, points[0], points[1]);
    }

    if (p > points[points.length - 1].p) {
        return linearInterpolation(p, points[points.length - 2], points[points.length - 1]);
    }

    for (let i = 0; i < points.length - 1; i++) {
        if (p >= points[i].p && p <= points[i + 1].p) {
            return linearInterpolation(p, points[i], points[i + 1]);
        }
    }
}
