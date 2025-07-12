function parseTimelines() {
    try {
        const timelinesData = TIMELINES_DATA;
        let timelinesMap = {};
        for (let timeline of timelinesData.timelines) {
            timelinesMap[timeline.id] = timeline;
        }

        // Ensure that each turn contains only s or f phases
        for (let [id, timeline] of Object.entries(timelinesMap)) {
            if (id === undefined) {
                throw new Error('Invalid timeline number');
            }
            const turnsList = timeline.turns;
            for (let turn of turnsList) {
                if (turn.phase !== 'f' && turn.phase !== 's') {
                    throw new Error(`Invalid phase: ${turn.phase}`);
                }
            }
        }

        return timelinesMap;
    } catch (e) {
        console.log(e);
        return null;
    }
}