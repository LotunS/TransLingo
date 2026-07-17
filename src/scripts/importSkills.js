const skills = require("../data/skills.json");
const { forumIds, getForum } = require("../data/forums");

function getTagId(forum, subclass) {
    const tag = forum.availableTags.find(
        tag => tag.name.toLowerCase() === subclass.toLowerCase()
    );

    return tag?.id;
}

module.exports = async (client) => {

    for (const skill of skills.slice(0, 3)) {

        const forumName = getForum(skill.class);

        if (!forumName) {
            console.log(`Unknown subclass: ${skill.class}`);
            continue;
        }

        const forum = await client.channels.fetch(forumIds[forumName]);

        if (!forum) {
            console.log(`Forum not found: ${forumName}`);
            continue;
        }

        const content = [
            `## ${skill.name}`,
            "",
            `**Subclass:** ${skill.class}`,
            `**Type:** ${skill.type}`,
            "",
            "### Description",
            skill.description,
            "",
            "### Keywords",
            ...skill.keywords.map(k => `• ${k}`),
            "",
            skill.icon
        ].join("\n");

        const tagId = getTagId(forum, skill.class);

        if (!tagId) {
            console.log(`No tag found for ${skill.class}`);
            continue;
        }

        await forum.threads.create({
            name: skill.name,
            appliedTags: [tagId],
            message: {
                content
            }
        });

        console.log(`Created ${skill.name}`);

        // Avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log("Finished.");
};