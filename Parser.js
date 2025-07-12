function parseTimelines() {
    try {
        const timelines = TIMELINES_DATA;
        const allTurns = timelines.timelines.flatMap(timeline => timeline.turns);

        const turnsByNumber = {};
        for (const turn of allTurns) {
            if (!turnsByNumber[turn.number]) {
                turnsByNumber[turn.number] = [];
            }
            turnsByNumber[turn.number].push(turn.phase);

            for (const [number, phase] of Object.entries(turnsByNumber)) {
                const fastCount = phase.filter(phase => phase === FAST).length;
                const slowCount = phase.filter(phase => phase === SLOW).length;

                // TODO: Make sure turns always have monotonically-increasing numbers

                const invalidPhases = phases.filter(phase => phase !== FAST && phase !== SLOW);
                if (invalidPhases.length > 0) {
                    throw new Error(`Invalid phases: ${invalidPhases.join(', ')}`);
                }

                if (fastCount > 1 || slowCount > 1) {
                    throw new Error(`Turn ${number} has multiple phases: ${phases.join(', ')}`);
                }
            }
        }

        console.log(timelines);
        return timelines;
    } catch (e) {
        console.log(e);
        return null;
    }
}