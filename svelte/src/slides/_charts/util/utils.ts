export function likertEmoji(level: number) {
    switch(level) {
        case 1: return '😠';
        case 2: return '🙁';
        case 3: return '😐';
        case 4: return '🙂';
        case 5: return '😀';
        default: return '🥶';
    }
}

export function likertToColor(level: number) {
    switch(level) {
        case 1: return 'red';
        case 2: return 'orange';
        case 3: return 'yellow';
        case 4: return 'lightgreen';
        case 5: return 'green';
        default: return 'white';
    }
}