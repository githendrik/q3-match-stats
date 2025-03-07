export function secondsToDuration(inputSeconds: number): string {
    const seconds = inputSeconds % 60;
    const minutes = Math.floor(inputSeconds / 60) % 60;
    const hours = Math.floor(inputSeconds / 3600);

    let results = [];

    if (hours > 0) {
        results.push(`${hours}h`);
    }
    if (minutes > 0) {
        results.push(`${minutes}m`);
    }
    if (seconds > 0) {
        results.push(`${seconds}s`);
    }

    return results.join(' ');
}
