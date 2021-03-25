const COLORS = [
    '--c-option-1',
    '--c-option-2',
    '--c-option-3',
    '--c-option-4',
    '--c-option-5',
    '--c-option-6',
    '--c-option-7',
    '--c-option-8',
];

export function getColorForOutcome(outcomeId: number, isScalar = false) {
    if (isScalar && outcomeId === 0) {
        return COLORS[1];
    }

    if (isScalar && outcomeId === 1) {
        return COLORS[0];
    }


    return COLORS[outcomeId];
}
