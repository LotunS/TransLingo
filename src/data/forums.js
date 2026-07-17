module.exports = {
    forumIds: {
        Sage: "1527611286542880788",
        Sorcerer: "1527620152408014989",
        Duelist: "1527620185719050280",
        Knight: "1527620217306615941"
    },

    getForum(subclass) {
        const map = {
            Sage: "Sage",
            Arcanist: "Sage",
            Dominator: "Sage",
            Prophet: "Sage",

            Sorcerer: "Sorcerer",
            Archmage: "Sorcerer",
            Destroyer: "Sorcerer",
            Magister: "Sorcerer",

            Duelist: "Duelist",
            Berserker: "Duelist",
            Conqueror: "Duelist",
            Ravager: "Duelist",

            Knight: "Knight",
            Paladin: "Knight",
            Guardian: "Knight",
            Templar: "Knight"
        };

        return map[subclass] ?? null;
    }
};