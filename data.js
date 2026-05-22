/* Stonetop Character Builder — playbook data
 * Transcribed from the official Stonetop playbooks (by Jeremy Strandberg / Lampblack & Brimstone).
 * For personal/table use.
 */

const RULES = {
  statArray: [2, 1, 1, 0, 0, -1],
  stats: [
    { key: "STR", name: "Strength", debility: "weakened" },
    { key: "DEX", name: "Dexterity", debility: "shaky" },
    { key: "CON", name: "Constitution", debility: "sick" },
    { key: "INT", name: "Intelligence", debility: "stunned" },
    { key: "WIS", name: "Wisdom", debility: "confused" },
    { key: "CHA", name: "Charisma", debility: "scarred" },
  ],
  // Note on stats order: playbooks print STR, DEX, INT, WIS, CON, CHA across the sheet,
  // but the assignment is the same six scores. We present them in the canonical
  // STR/DEX/CON/INT/WIS/CHA order.
  intro:
    "Stonetop is a Powered-by-the-Apocalypse game about the people of a small frontier " +
    "village. To make a character you choose a playbook, give them a name and look, assign " +
    "your stats, pick a background and instinct, choose your starting moves and gear, and " +
    "answer a few questions that tie you to the other heroes and the village.",
  steps: [
    "Playbook",
    "Name & Look",
    "Stats",
    "Background",
    "Instinct",
    "Moves",
    "Gear",
    "Connections",
    "Your Sheet",
  ],
};

const PLAYBOOKS = {
  blessed: {
    id: "blessed",
    name: "The Blessed",
    tagline:
      "Danu, the Great Mother, provides. We need only learn her secrets: the names by which the trees call each other; the mark made with redberry juice to ward off impure spirits; the language of the wolves. A thousand such secrets Danu keeps, to share with only her true children. Her Blessed.",
    blurb:
      "A devout speaker for Danu, the Earth Mother — channeling the power of the wild through a magical sacred pouch.",
    damage: "d6",
    maxHP: 18,
    features: [
      {
        name: "Sacred pouch",
        text:
          "Your sacred pouch (magical) doesn't take up space in your inventory. It can hold up to 3 Stock (sacred herbs, powders, stones, pigments, chalks, clay, and so forth). Each time you gain an even-numbered level, your pouch can hold +1 Stock. When anyone but you looks inside your sacred pouch and touches the materials therein, the Stock is ruined. When you have a few days of downtime in familiar terrain, you may replenish your Stock. When you Forage, you can produce Stock instead of provisions.",
        lines: [
          { prompt: "Your sacred pouch is…", options: ["an heirloom", "made just for you", "your own work"] },
          { prompt: "Made of…", options: ["fur", "drakescale", "leather", "woven", "demonflesh"] },
          { prompt: "Decorated with…", options: ["unadorned", "beadwork", "rich dyes", "runes"] },
        ],
        picks: [
          {
            prompt: "What remarkable trait does it possess? (choose 1)",
            count: 1,
            options: [
              "It cannot be cut, torn, or burned by any natural means.",
              "Unless someone is specifically searching for your pouch, they will ignore its presence.",
              "So long as the pouch is sealed, nothing within can be detected or found by magic, nor can anything within escape or affect the outside world.",
              "Unnatural and unclean creatures cannot bear to touch it.",
            ],
          },
        ],
      },
      {
        name: "The Earth Mother",
        text:
          "Danu has long been revered by all peoples, though not always worshipped or served by priests.",
        lines: [
          {
            prompt: "In Stonetop's Pavilion of the Gods, Danu's shrine is… (choose 1)",
            options: [
              "…loved, well-used, dripping with offerings and petitions.",
              "…little more than a token of respect, for her holy places are anywhere but here.",
              "…given wide berth by most, and approached only with care and propitiation.",
              "…neglected and all but forgotten, except by a few.",
            ],
          },
        ],
        picks: [
          {
            prompt: "What do the folk of Stonetop leave as offerings? (choose 2-3)",
            count: 3,
            options: [
              "fruits of harvest",
              "whisky/spirits",
              "pure rain water",
              "blood/burnt flesh",
              "figurines/effigies",
              "salt/crystals",
              "metal nails/tools",
              "incense/sage bark",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Initiate",
        grantsMove: "Rites of the Land",
        text:
          "Stonetop has long been home to a sacred order, keepers of the old ways and speakers for Danu. You are one such initiate, the most gifted in generations. You gain the Rites of the Land move. There are other initiates in Stonetop, serving the goddess and the village — see the Initiates of Danu insert. Who are they? Choose 2 or 3: Enfys, your acolyte, beloved by birds; Afon, strange and Fae-touched; Gwendyl, your mentor, a talented healer; Olwin, your anointed lover, seer of fates; Seren the Eldest, wise and hard as winter.",
      },
      {
        name: "Raised by Wolves",
        grantsMove: "Trackless Step",
        text:
          "Maybe not by wolves, but you grew up in the wild. Beasts of land and air were your siblings. The sighing wind taught you language. The trees and rocks were your home. Were you one of the Forest Folk? Abandoned or orphaned? Lured into the Wood? Regardless, you get the Trackless Step move (mark it now). Also, when you Forage, you have advantage. Once per session, when your wild ways offend or alienate you from someone, mark XP.",
      },
      {
        name: "Vessel",
        grantsMove: "Danu's Grasp",
        text:
          "A seed of Danu's power has taken root in your soul. Perhaps it has always been there and only recently sprouted, or maybe it was planted in you during some portentous event. Your dreams have been haunted by strange markings and symbols; you feel the mystic power in plants, stones, and soil. Take the Danu's Grasp move (mark it now). Danu's power flows through you, but at great cost: when you would spend 1 Stock from your sacred pouch, you may choose to lose 2d4 HP instead.",
      },
    ],
    instincts: [
      { name: "Delight", text: "To find beauty, in even the ugliest things." },
      { name: "Detachment", text: "To remain unmoved, to be cold as winter." },
      { name: "Nurture", text: "To help others grow, learn, or improve." },
      { name: "Preservation", text: "To protect the natural world." },
      { name: "Reverence", text: "To honor the spirits and give them their due." },
    ],
    appearance: [
      ["fresh-faced", "hale & hearty", "gray & wizened"],
      ["imperious voice", "raspy voice", "soothing voice"],
      ["curvy", "strapping", "rail-thin", "solid", "willowy"],
      ["ceremonial robes", "furs, leather", "work clothes"],
    ],
    startingMovesRule:
      "You start with Spirit Tongue, Call the Spirits, the move from your Background, and 1 move of your choice.",
    defaultMoves: ["Spirit Tongue", "Call the Spirits"],
    chooseMoves: 1,
    moves: [
      { name: "Spirit Tongue", default: true, text: "You can speak with beasts and spirits. You can always ask the GM, \"What spirits are active here?\" and get an honest answer." },
      { name: "Call the Spirits", default: true, req: "Spirit Tongue", text: "When you spend 1 Stock and perform a short rite, the spirit(s) of a place or object manifest and hear you out. What they do next is up to them." },
      { name: "Amulets & Talismans", text: "When you craft a protective charm for someone, spend 1 Stock and name a source of harm (fire, stabbing, etc.). When they would suffer such harm while bearing your charm, roll +INT: on a 10+, they ignore the harm entirely; on a 7-9, they suffer only half the damage or effect; on a 6-, they suffer the harm normally. One can benefit from only 1 charm at a time, and it loses its potency after 1 use." },
      { name: "Barkskin", text: "When you are touching the earth, you have 2 armor. When you mark another with 1 Stock, they gain this benefit so long as the mark remains." },
      { name: "Big Magic", text: "Each time you take this move, choose an additional remarkable trait for your sacred pouch and increase your max Stock by 2." },
      { name: "Danu's Grasp", text: "When you call on the world itself to bind a spirit or a perversion of nature, spend 1 Stock and roll +WIS: on a 7+, roots, vines, and earth pull at them, and they pick 1; on a 10+, as a 7-9, but both apply. — They're restrained, unable to act freely until your focus slips or they tear their way free; They take 2d4 damage (ignores armor). If this brings them to 0 HP, they are pulled into the earth and bound in never-etched stone." },
      { name: "Healer's Arts", text: "When someone Recovers under your care, they recover (extra) HP equal to your WIS. If you also spend 1 Stock, they heal an extra 5 HP and their wounds/injuries are stabilized." },
      { name: "Heed My Words", text: "When you Persuade by talking sense or warning against foolishness, you have advantage." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Into the Lion's Den", text: "When you approach a beast calmly and show no fear, it will not harm you (though it may threaten you and test your nerve). When you lay your hand gently upon a beast, it calms to your touch." },
      { name: "Lightning Rod", text: "When you Defend while touching the earth, you can spend 1 Readiness to intercept a nearby magical attack and redirect it harmlessly into the ground." },
      { name: "Rites of the Land", text: "Once per season, when you oversee the sacred rites, hold 1 Favor. If you also sacrifice 1 Surplus, hold 4 Favor instead. Spend Favor in lieu of Stock, 1-for-1. When you publicly sacrifice something or someone much-loved, either clear a steading debility or gain advantage when the steading next rolls +Fortunes." },
      { name: "Borrow Power", req: "Spirit Tongue", text: "When a spirit or beast loans you power, ask the GM for one of its tags or moves. Store it in your pouch in place of 1 Stock. When you use the borrowed tag or move, roll +WIS: on a 10+, you do it and can use the power again; on a 7-9, you do it, but lose the power." },
      { name: "Trackless Step", text: "When you move through nature with care and patience, you make no sound, leave no trace and can ignore any hindering or treacherous terrain (briars, mire, scree, etc.). When you spend 1 Stock and mark others, they each gain this benefit so long as the mark remains. 1 Stock can mark a number of individuals up to your level +INT." },
      { name: "Veil", text: "When you wrap yourself or another in a subtle veil, spend 1 Stock and choose 1: A type of being you name (including \"people\") will tend to ignore your presence; People will perceive you as someone else, though you must wear something of an individual's in order to impersonate them. When your deception comes under scrutiny, roll +INT: on a 10+, the veil holds, and no one is the wiser; on a 7-9, the veil holds, but there is further scrutiny or a complication (GM's choice)." },
      { name: "Wards & Bindings", text: "When you mark a boundary with sacred signs, spend 1 Stock and describe who or what they affect (using no more words than your stock). Choose whether the affected beings are repelled or trapped by the signs. When your wards or bindings are first tested, roll +INT: on a 10+, they will hold as long as the signs remain unmarred (and the affected creature can do nothing to affect them directly); on a 7-9, they hold for now but may be overcome through might or will." },
      { name: "Wild Soul", req: "level 2+", text: "Each time you take this move, gain a Ranger move of your choice for which you qualify. You can't pick Improved Stat or Superior Stat." },
      { name: "Nature's Wrath", req: "level 6+, Danu's Grasp", text: "Danu's Grasp gains the area tag and can affect any creature. A mortal reduced to 0 HP is subdued or killed (your choice) rather than bound in stone." },
      { name: "Potent Workings", req: "level 6+, Amulets & Talismans", text: "When you craft a protective charm, you may spend 1 additional Stock to choose 1: Name an additional type of harm; On a 10+, the charm retains its potency." },
      { name: "Shared Souls", req: "level 6+, Into the Lion's Den", text: "When you mark a beast with 1 Stock, you can direct its actions and perceive through its senses no matter the distance between you. Treat it as a follower with 3 Loyalty; when you spend its last Loyalty, the effect ends." },
      { name: "Suck the Poison Out", req: "level 6+, Healer's Arts", text: "When you draw a malady from a patient's body, mind, or soul, spend 1 Stock and roll +WIS: on a 10+, you remove the malady and can safely discard it or store it in your sacred pouch (taking the space of 1 Stock) to study or inflict on another; on a 7-9, you remove it, but choose 1: Your patient suffers lingering harm or trauma; You suffer some of the malady's effects; It will be harmful and dangerous to discard." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
      { name: "Voice of the Earth Mother", req: "level 6+, Spirit Tongue", text: "When you speak on behalf of Danu, natural beasts and spirits of the wild respect your authority. All but the most headstrong will do as you command, even against their instincts." },
    ],
    gear: {
      note: "Pick 2, in addition to your sacred pouch.",
      pickCount: 2,
      fixed: [
        { name: "Sacred pouch (magical)", text: "See your playbook feature. Holds up to 3 Stock." },
      ],
      options: [
        { name: "Apiary", text: "beeswax, candles (dose, area, lasts ~1 hr), honey, ◊ bee smokers, ◊ hat & veils, etc." },
        { name: "Collected offerings (3 uses)", text: "Expend a use to produce something valuable to a spirit of the wild. Restore 1 use each season." },
        { name: "Goat herd", text: "milk, cheese, pelts, meat, blood, horn, wool, etc. Each season, 1 in 4 chance of having a bezoar (swallow it to cure poison)." },
        { name: "Herb garden", text: "shears, mortars & pestles, herbs, seeds, remedies, mild poisons, ◊ spades, etc. Each spring, d4 uses of bendis root (reach, area, burns ~1 hr, fumes repel perversions of nature)." },
        { name: "Mastiffs (2-3 followers)", text: "alert, keen-nosed, fierce, overprotective; HP 6, Damage d6 (hand, grabby); Instinct: to bark & threaten; Cost: affection." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, describe your sacred pouch and its remarkable trait. Then tell us about Danu's shrine in Stonetop and how she is worshipped.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Whose heart & soul is entwined with yours? Who taught you the secret ways? Who is beloved by the goddess — your charge to nurture/guide/protect/heal?",
      "Ask your fellow PCs: Which one of you do the spirits whisper of? Which one of you has joined me in a sacred rite? Which of you has made a blood-oath with me? Which one of you doubts the power of Danu?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Arwel", "Blodwen", "Brynmor", "Celyn", "Fflur", "Gwynn", "Tegwen", "Winned"] },
        { name: "Barrier Pass", names: ["Alagh", "Bora", "Chambui", "Enebish", "Jalakai", "Kamala", "Sechen", "Todogen"] },
        { name: "The Steplands (Hillfolk)", names: ["Bejn", "Decla", "Franza", "Irv", "Ivet", "Jak", "Sibl", "Yez"] },
        { name: "The Wild", names: ["Autumn", "Badger", "Big", "Black", "Bloody", "Brave", "Crow", "Cub", "Dark", "Doe", "Fang", "Fierce", "Flower", "Gentle", "Green", "Grim", "Hart", "Leaf", "Little", "Lonely", "Old", "Owl", "Pale", "Pup", "Quick", "Quiet", "Rain", "Red", "Sharp", "Snake", "Snow", "Spring", "Summer", "Tall", "Tree", "Yellow", "White", "Wind", "Winter", "Wolf", "Whisper"] },
      ],
    },
  },

  fox: {
    id: "fox",
    name: "The Fox",
    tagline:
      "The elders tell a story about Fox, who knows lots of tricks, and Hedgehog, who knows one: how to curl up into a ball when there's danger. Fox can't eat Hedgehog when he's all curled up, so in the story Fox goes hungry. But you're not that Fox, and this is no story. You want that Hedgehog? Go get a knife.",
    blurb:
      "A clever, light-fingered trickster and rogue who solves problems with wit, stealth, and a well-placed blade.",
    damage: "d8",
    maxHP: 16,
    features: [
      {
        name: "Tall tales",
        text:
          "Someone like you gets into all sorts of trouble, whether you mean to or not. Mix and match the following to come up with a couple of your more memorable adventures.",
        picks: [
          {
            prompt: "There was that time that you… (choose 1 per tale)",
            count: 2,
            options: [
              "…got lost in (the Great Wood / the Flats / the Steplands / Ferrier's Fen / the Foothills / the Huffel Peaks)",
              "…were on watch when the crinwin raided",
              "…dared each other to explore the Ruined Tower",
              "…managed to rile up a small band of Hillfolk",
              "…braved the Labyrinth, just a little",
              "…stole that crazy old man's book",
              "…went poking about the old Barrow Mounds",
            ],
          },
          {
            prompt: "And you ended up… (choose 1 or 2 per tale)",
            count: 2,
            options: [
              "…running for your life from ____",
              "…landing a well-placed blow",
              "…interrupting a strange, creepy gathering",
              "…stumbling on a beast, bigger'n anything",
              "…with a sack full of treasure",
              "…getting ____ to fight them for you",
              "…face to face with a ghost/Fae/demon",
              "…finding those strange old runes",
              "…getting to know that fine-looking fellow/lady/person/couple",
            ],
          },
          {
            prompt: "But all you've got left to show for it is… (choose 1)",
            count: 1,
            options: [
              "…a story no one believes.",
              "…a nasty scar, wanna see?",
              "…the occasional nightmare.",
              "…this map with runes no one can read.",
              "…this key that opens who-knows-what.",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "The Natural",
        text:
          "You grew up around here, and always picked things up quickly. Reading and numbers, sure, but more. Hide and seek. Throwing stones. Climbing. Fighting. Whatever you tried, you were good at it — as good as anyone else, if not better. Sure, you've got a reputation for bending the rules and playing dirty. But why play if you don't play to win? And who do they come to when there's a problem needs solving? You. When you Seek Insight, you may roll +INT instead of +WIS and add \"What opportunity does no one else see?\" to the list of possible questions.",
      },
      {
        name: "A Life of Crime",
        text:
          "You're new to Stonetop, having left behind a… colorful past. How did you get into that life? Why and how did you get out? Who and what did you leave behind? Regardless, these people have taken you in. Time to lead an honest life, right? You start with either Burgle or Light Fingers (your choice) as an extra move, and either burglar tools or a hidden stash (your choice) as an additional special possession. Go mark them now.",
      },
      {
        name: "The Prodigal Returned",
        text:
          "You left long ago, travelling far and living by your wits. Why did you leave? What deeds do you boast of, and which do you regret? You always longed to return to Stonetop, and return you have. You're a bit of a celebrity now, and you've got friends (or close enough) strewn about the known world. When you declare that you know someone outside of Stonetop, someone who can help, name them and roll +CHA: on a 10+, yeah, they can help (tell us why they're willing); on a 7-9, they can help but pick 1 from the list; on a 6-, the GM chooses 1 and then some. — They still hold a grudge; They're going to need something from you first; They swore off this sort of thing long ago; You can't exactly, y'know, trust them.",
      },
    ],
    instincts: [
      { name: "Conscience", text: "To feel guilty, to try to do right." },
      { name: "Freedom", text: "To chafe against rules, expectations, obligations." },
      { name: "Comfort", text: "To enjoy yourself and avoid hardship." },
      { name: "Prestige", text: "To impress others, to build a name for yourself." },
      { name: "Trickery", text: "To deceive, misdirect, outthink." },
    ],
    appearance: [
      ["young pup", "\"responsible\" adult", "cagey old-timer"],
      ["a pleasant voice", "sharp & nasally", "well-spoken"],
      ["lithe", "heavyset", "gangly", "like a whippin' stick"],
      ["a light step", "a brisk stride", "more like a strut"],
    ],
    startingMovesRule:
      "You start with Ambush OR Skill at Arms; Danger Sense OR Perceptive; and 1 move of your choice.",
    defaultMoves: [],
    moveChoiceGroups: [
      { count: 1, options: ["Ambush", "Skill at Arms"] },
      { count: 1, options: ["Danger Sense", "Perceptive"] },
    ],
    chooseMoves: 1,
    moves: [
      { name: "All in the Wrist", text: "Any knife or dagger gets the thrown tag in your hands. Also, you keep a few iron throwing blades (near) on you; they don't take up space in your inventory. Reset your ammo whenever you Outfit." },
      { name: "Ambush", text: "When you get the drop on a nearby foe, you can deal your damage or opt to roll +DEX: on a 10+, deal your damage and pick 2; on a 7-9, deal damage and pick 1: Deal +1d4 damage; Stop them from making noise/raising an alarm; Slip away before they can react; Create an opportunity — you or an ally gains advantage on the next move to act on it." },
      { name: "Burgle", text: "When you sneak off on your own into a dangerous place, roll +INT: on a 7+, you make it back, and the GM says where you got to and what you learned. Then, on a 10+, also pick 2; on a 7-9, also pick 1: You got away clean, rousing no suspicion; You swiped something valuable (GM's choice); You set something up to exploit on your return; Ask a Seek Insight question about what you saw. On a 6-, you either make it back but with trouble in tow, or you're missing in action (your call)." },
      { name: "Catlike", text: "When you carry a light load and act with care, you move silently. When you hide in shadows or darkness, you remain unseen until you draw attention to yourself, move positions, or attack." },
      { name: "Danger Sense", text: "You can always ask the GM, \"Is there an ambush or trap here?\" If they say \"yes,\" roll +INT: on a 10+, ask the GM both of the questions below; on a 7-9, ask 1; either way, gain advantage on your next roll to act on the answer(s). — What will trigger the ambush or trap? What will happen once it's triggered? On a 6-, don't mark XP; you know there's a trap or ambush, but nothing bad happens just yet." },
      { name: "Free Running", text: "When you carry a light load and move with speed and grace, gain advantage on any move to surmount or bypass a physical obstacle." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Irresistible", text: "When you interact with someone, you can ask their player if they find you attractive and get an honest answer (usually \"yes\"). When you Persuade by using your considerable charms as leverage, you have advantage." },
      { name: "Laugh at Danger", text: "When you are about to roll +CON and you make a joke about the adversity you face, you can roll +CHA instead." },
      { name: "Light Fingers", text: "When you perform sleight of hand on an unwary mark, you succeed and no one's the wiser. If you're being watched, roll +DEX: on a 10+, you succeed and no one's the wiser; on a 7-9, you succeed OR no one's the wiser (your choice)." },
      { name: "Perceptive", text: "When you Seek Insight, you may ask 1 additional question. Even on a 6-, you can ask 1 question (though you might not like how you learn the answer)." },
      { name: "Rapier Wit", text: "When you pierce an NPC's pride with a well-placed quip, they must do 1 (their choice): Attack, doing +1d4 damage if they hit but giving you advantage on your next roll against them; Stoop to your level and respond in kind; Spend a few moments fuming, sputtering, or controlling their temper." },
      { name: "Skill at Arms", text: "When you wield a weapon with speed and grace, roll +DEX to Clash (instead of +STR)." },
      { name: "Parry & Riposte", req: "Skill at Arms", text: "When you Defend with a weapon that you can wield quickly, you can spend 1 Readiness to both halve an attack's effects/damage and strike back at the attacker (deal your damage with disadvantage), instead of spending 1 Readiness for each." },
      { name: "Silvertongued", text: "When you use words to avoid suspicion or trouble, roll +CHA: on a 10+, hold 3 Nerve; on a 7-9, hold 1 Nerve. You may spend Nerve, 1-for-1, to: Move about or maneuver unchallenged; Withstand direct scrutiny or questioning; Direct suspicion or attention elsewhere." },
      { name: "Under Your Skin", text: "When you engage an NPC in conversation, you can ask the GM 1 of these and get an honest answer: What are they expecting me to do? What, in general, are they trying to hide? What do they want to happen?" },
      { name: "Dabbler", req: "level 2+", text: "Each time you take this move, choose a move from the Heavy, Marshal, Ranger, or Seeker playbooks for which you otherwise qualify. (You can't take Improved Stat or Superior Stat.)" },
      { name: "Battle Dancer", req: "level 6+, Skill at Arms", text: "When you roll +DEX to Clash, on a 12+ deal your damage, avoid your enemy's attack, and impress/embarrass/overawe your foes." },
      { name: "Cheap Shot", req: "level 6+, Ambush", text: "When you Ambush with a hand weapon, you have advantage on your damage roll." },
      { name: "Eye on the Door", req: "level 6+", text: "When you and your allies need to get out of here, name your escape route and roll +INT: on a 10+, you're gone; on a 7-9, you can stay or go, but if you go, it costs you — the GM will tell you what (or who) you leave behind or take with you." },
      { name: "Pants on Fire", req: "level 6+", text: "When you Defy Danger, Persuade, or Interfere by being deceitful, you have advantage. When another move (like Seek Insight) allows a player to ask you a question, you can opt not to answer." },
      { name: "Second Intent", req: "level 6+, Parry & Riposte, Ambush", text: "When you Defend and spend 1 Readiness to Parry & Riposte, also pick 1 option from the Ambush list." },
      { name: "Slippery", req: "level 6+", text: "When you roll to escape being caught or controlled, treat a 6- as a 7-9. On a 12+, say how you turn the tables or use the circumstances to your advantage." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
    ],
    gear: {
      note: "Pick 2.",
      pickCount: 2,
      fixed: [],
      options: [
        { name: "Burglar's kit", text: "picks, files, snippers, wire, ◊ prybars, ◊ hacksaws, ◊ a lantern (4 hours, close, area), ◊ a grappling hook, etc." },
        { name: "Carpenter's tools", text: "chisels, files, nails, pitch, ◊ prybars, ◊ saws, ◊ firkins, barrels, etc." },
        { name: "Distillery", text: "skins of fine whisky (2 uses, grants advantage to Persuade), copper tubes, malt, ◊ firkins, stills, barrels, etc." },
        { name: "Hidden stash (3 uses)", text: "each use produces valuables worth a purse of silvers (Value 2)." },
        { name: "Mummer's kit", text: "juggling balls, whirlybird seeds, motley, ribbons, bells, ◊ puppets, ◊ a fiddle, etc." },
        { name: "Scribe's tools", text: "parchment, ink, pigments, vials, quills, ◊ a notebook, etc." },
        { name: "Tannery (or access to it)", text: "hides, scrapers, thick gloves, ◊ a boiled leather cuirass (1 armor), etc." },
        { name: "Trade contacts", text: "small amounts of salt, glass, silk, spice, medicinal herbs, pigments, ivory, etc." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, tell us your tall tales. Feel free to embellish and exaggerate to the other players, but always answer the GM truthfully.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Who holds the reins to your heart? Whose respect means the world to you? To whom do you owe a debt that cannot be repaid?",
      "Ask your fellow PCs: Which one of you joined me in my latest hijinx? Which one of you brings your problems to me? Which one of you saved my bacon, mor'n once? Which one of you trusts me not one bit?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Bran", "Carwyn", "Delyth", "Elin", "Fion", "Geral", "Mair", "Rannon", "Vaughn", "Wynn"] },
        { name: "Barrier Pass", names: ["Anarba", "Batu", "Bugadai", "Hujaghur", "Jigur", "Kete", "Sarantuya", "Tebengri"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Comyna", "Crevan", "Fitz", "Greagir", "Maired", "Nainsi", "Naiclas", "Saraid"] },
        { name: "Lygos or some other point south", names: ["Amit", "Baz", "Dafna", "Mahsa", "Parviz", "Sanaz", "Tzofiya", "Yaniv"] },
      ],
    },
  },

  heavy: {
    id: "heavy",
    name: "The Heavy",
    tagline:
      "These are good people. Hard-working, honest. They look out for each other. But sometimes, looking out for each other ain't enough. Sometimes, good people need someone to stick up for them. Someone who's not afraid to get a little bloody. To get heavy. Yeah, someone like you.",
    blurb:
      "A dangerous, battle-hardened protector who solves problems with strength, grit, and overwhelming force.",
    damage: "d10",
    maxHP: 20,
    features: [
      {
        name: "A history of violence",
        text: "Everyone here has a story about you — and a few things they'd rather not discuss.",
        picks: [
          {
            prompt: "Just about everyone here talks about the time you… (pick 1 or 2)",
            count: 2,
            options: [
              "…drove off a thunder drake that got too close to town.",
              "…killed that hagr in the Foothills.",
              "…slew a dozen crinwin in one battle.",
              "…tossed those adventurers out of town.",
              "…bested Ivan, the scariest bandit in Brennan's gang, the Claws.",
              "…dragged yourself (and another?) into town, bleeding from a dozen wounds.",
              "…were struck by lightning and woke up covered in these marks.",
            ],
          },
          {
            prompt: "But folks are less keen to discuss… (pick 1 or 2)",
            count: 2,
            options: [
              "…the look in your eye when you spilled all that blood.",
              "…those hard cases who showed up looking for you.",
              "…the shouting matches between you and your love.",
              "…the time you spent as one of Brennan's Claws.",
              "…what happened to Urbgen, even if he did have it coming.",
              "…your uncontrollable seizures, where you claw those weird marks in the dirt.",
            ],
          },
          {
            prompt: "What keeps you up at night? (pick 1 or 2)",
            count: 2,
            options: [
              "That thrice-damned temper of yours.",
              "The worry that someone's coming after you.",
              "The feeling that the crinwin are getting bolder.",
              "Wondering what Brennan's up to, now that he's the marshal of Marshedge.",
              "Dark visions of things moving in the earth, restless, whispering, and hungry.",
              "The question of who'll look after your family when you get yourself killed.",
              "The worry that they'll all learn the truth about you, sooner or later.",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Sheriff",
        text:
          "You keep order in Stonetop and protect it from outside threats. It might not be anything official, but everyone knows you've got a cool head and the weight to back up your words. When you bark an order or warning, roll +CHA: on a 7+, they must choose 1: Do what you say; Dig in/take cover/flee; Attack you. On a 10+, you can sense which one they're about to do and act first if you like; gain advantage if you do.",
      },
      {
        name: "Blood-Soaked Past",
        text:
          "You left behind a life of violence and a name mothers used to scare their children. For whatever reason, the people of Stonetop took you (back?) in and treat you like one of their own. When you Persuade using violence or threats against someone who knows your black reputation, you can roll +STR instead of +CHA. Also, if you take the Formidable move, you can choose to roll +CON instead of +CHA. When you fight to kill without mercy or hesitation, you deal +1d4 damage.",
      },
      {
        name: "Storm-Marked",
        text:
          "You've been touched by Tor (Rain-maker, Thunderhead, Slayer-of-Beasts!) and bear runic markings similar to those etched into the Stone. When did the marks manifest? Are they a symbol of your strength, speed, and courage? Or their source? You start with the Storm Markings major arcanum. Mark one of the boxes on the front of the Storm Markings sheet, and describe the time you were struck by lightning and walked away unharmed.",
      },
    ],
    instincts: [
      { name: "Peace", text: "To avoid (further) bloodshed or violence." },
      { name: "Pride", text: "To maintain your dignity, to demand respect." },
      { name: "Recklessness", text: "To act without thought to the consequences." },
      { name: "Trouble", text: "To stick your nose in where it's unwelcome." },
      { name: "Violence", text: "To solve problems by force." },
    ],
    appearance: [
      ["young & brash", "in my prime", "old & leathery"],
      ["gravelly voice", "hearty voice", "soft-spoken"],
      ["giant frame", "just ripped", "stocky", "wiry"],
      ["distinctive scars", "oft-broken nose", "missing bits"],
    ],
    startingMovesRule:
      "You start with Dangerous, Hard to Kill, and either Armored OR Uncanny Reflexes.",
    defaultMoves: ["Dangerous", "Hard to Kill"],
    moveChoiceGroups: [{ count: 1, options: ["Armored", "Uncanny Reflexes"] }],
    chooseMoves: 0,
    moves: [
      { name: "Dangerous", default: true, text: "When you deal your damage, you have advantage." },
      { name: "Hard to Kill", default: true, text: "When you are at Death's Door, you can roll +CON or +nothing (your choice). On a 7-9, you can mark a debility of your choice to regain 1 HP." },
      { name: "Armored", text: "When you carry a shield, mark only 1 box (instead of 2) on any armor you wear. Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome)." },
      { name: "Uncanny Reflexes", text: "When you are unarmored and carrying a normal or light load, you impose disadvantage on any damage you take that you could dodge or roll with." },
      { name: "Battle Joy", text: "When you spill blood — yours or another's — and lose yourself in battle, you ignore fear, pain, mind-control, and the effects of debilities as long as you keep fighting. When the action stops, roll +CON: on a 10+, that was a rush, regain 1d4 HP; on a 7-9, you're winded and out of it, but you'll be fine with a few minutes' rest; on a 6-, mark a debility but don't mark XP." },
      { name: "Berserker", req: "Battle Joy", text: "While in your Battle Joy, add the area tag to your melee attacks, lashing out at anyone nearby (friend and foe alike). Roll damage separately for each target." },
      { name: "Carved Out of Wood", text: "Increase your max HP by 4." },
      { name: "Formidable", text: "When you wade into battle, you can choose to roll +CHA: on a 10+, both; on a 7-9, pick 1: Lesser foes will quail, hesitate, or flee before you; Doughty foes will focus on you, seeing you as the greatest threat. On a 6-, pick 1 but ask the GM what you've missed." },
      { name: "Frosty", text: "When you Defy Danger by keeping calm and carrying on, on a 10+ you can also ask the GM a question that you could ask when Seeking Insight. You have advantage on your next move to act on the answer." },
      { name: "Guardian", text: "When you Defend, hold 1 extra Readiness. Even on a 6-, hold 1 Readiness (plus whatever the GM says)." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Intimidating", text: "When you Persuade using violence or threats, you have advantage." },
      { name: "Unstoppable", req: "Hard to Kill", text: "When you are reduced to 0 HP in battle, you can keep fighting. Each time you take damage while at 0 HP, mark 1. If you would regain HP while fighting, clear one mark instead. When you stop fighting, roll for Death's Door with a -1 penalty for each circle marked. If you survive, clear all your circles." },
      { name: "Musclebound", req: "STR +2 or higher", text: "When you make a hand-to-hand or thrown attack, it's forceful and messy. If it would already be forceful and/or messy, it's even more so." },
      { name: "Payback", text: "When you deal damage to a foe that has harmed you or one of your allies, deal +1d4 damage." },
      { name: "Relentless", text: "When you Clash and your foe survives, you gain advantage the next time you Clash with them." },
      { name: "Seasoned Warrior", req: "level 2+", text: "Take a move from the Fox, Marshal, Ranger, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. (You can't pick Improved Stat or Superior Stat.)" },
      { name: "Situational Awareness", text: "When you Seek Insight, add the following to the list of questions you can ask: Who or what here is the biggest threat? What is my enemy's true position? What here can I use as a weapon? When a fight breaks out, ask the GM 1 question that you could ask when Seeking Insight." },
      { name: "Unfettered", text: "When you are subject to physical or mental restraint, you may mark a debility to immediately break free of that restraint." },
      { name: "Terror on the Field", text: "When you reduce a foe to 0 HP, describe how you take them out. If you fell them in a particularly brutal or impressive manner, their allies are impressed, dismayed, or frightened and respond accordingly." },
      { name: "Bringer of Ruin", req: "level 6+", text: "When you roll a 12+ to Clash and your foe survives, name something they possess (like their sword, their position, a limb, their dignity, etc.), but nothing that would kill them outright. Whatever you name, it is broken, shattered, lost. Tell us how." },
      { name: "Cut from Granite", req: "level 6+, Carved Out of Wood", text: "Gain +1 armor (stacks with other sources) and increase your max HP by another 2 (+6 HP total)." },
      { name: "Mighty Thews", req: "level 6+, Musclebound", text: "When you perform a feat of extraordinary strength (bursting chains, smashing through a wall, heaving a boulder, etc.), you do it (OH YEAH!) but pick 1: It takes a while; You cause unwanted damage or harm; It takes a toll (mark a debility)." },
      { name: "Nemesis", req: "level 6+, Relentless", text: "When you Clash and your foe survives, all of your future attacks against them do +1d6 damage." },
      { name: "Steadfast Guardian", req: "level 6+, Guardian", text: "While you hold Readiness (from Defend), you can always suffer the damage/effects of an attack instead of your ward; no need to spend Readiness, you can just do it." },
      { name: "Stone Cold", req: "level 6+, Frosty", text: "When you Defy Danger (or Struggle as One) by keeping calm and carrying on, treat a 6- as a 7-9." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
    ],
    gear: {
      note: "Pick 2.",
      pickCount: 2,
      fixed: [],
      options: [
        { name: "Distillery", text: "skins of fine whisky (2 uses, grants advantage to Persuade), copper tubes, malt, ◊ firkins, stills, barrels, etc." },
        { name: "Chirurgeon's tools", text: "catgut, straps, bandages, tubes, poultices, willow bark, ◊ bonesaws, etc." },
        { name: "Husbandry tools", text: "brushes, muzzles, collars, feed, ◊ whips, ◊ bridles, etc. Gain advantage to Persuade domestic beasts (livestock, dogs, etc.)." },
        { name: "Smithy (or access to it)", text: "iron goods, ingots, thick gloves, ◊ tongs, ◊ bellows, an anvil, etc." },
        { name: "Stoneworker's tools", text: "chisels, drills, ◊ prybars, ◊ spikes, ◊ block & tackles, wheelbarrow, etc." },
        { name: "Weapons of war (choose up to 3, now or later)", text: "Sword, iron (close, +1 damage); Battleaxe, iron (close, messy); Warhammer, iron (close, 2 piercing); Mace or flail, iron (close, forceful); Crossbow (far, +1 damage, reload, piercing, low ammo, all out)." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, tell us about your history of violence, and what keeps you up at night.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Who is your lover/spouse/betrothed? Who most needs/deserves your protection? Whose forgiveness do you strive to earn?",
      "Ask your fellow PCs: Which one of you once dragged me home, bleeding and unconscious? Which one of you can I trust to always have my back? Which one of you has stayed my hand? Which one of you has traded blows with me?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Aerona", "Arthfael", "Cadmor", "Esyllt", "Pedr", "Rhonwen", "Terrwen", "Trystan"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Aengus", "Bairbre", "Bronach", "Flann", "Laughn", "Muirdoc", "Quinn", "Treasa"] },
        { name: "The Steplands (Hillfolk)", names: ["Andr", "Gabrl", "Kaetl", "Mael", "Maela", "Par", "Ral", "Umbert"] },
        { name: "The Manmarch", names: ["Bathilde", "Clothar", "Ganter", "Hiltrude", "Ludig", "Luise", "Modd", "Wiland"] },
        { name: "Lygos or some other point south", names: ["Aribl", "Akios", "Bhadur", "Seble", "Shahnaz", "Shay", "Tisi", "Zubin"] },
      ],
    },
  },

  judge: {
    id: "judge",
    name: "The Judge",
    tagline:
      "Look here at this little town, this candleflame in the darkness. Its very existence is an act of courage and faith. And Aratis has charged you to keep it: to settle its disputes; to chronicle its tales; to defend it from darkness and ruin. Take up your hammer, Judge. Your town needs you.",
    blurb:
      "Keeper of law, lore, and tradition — a devotee of Aratis who defends civilization with conviction and the written word.",
    damage: "d6",
    maxHP: 20,
    features: [
      {
        name: "The Chronicle",
        text:
          "The Judge of Aratis is charged with maintaining the Chronicle, a history of the community, its people, their knowledge, and their traditions. It is more than a mere book; it is a physical place. Decide on its physical structure, and mark its location on the steading map.",
        picks: [
          {
            prompt: "On the plus side, it… (choose 3)",
            count: 3,
            options: [
              "…is a sturdy vault from the time of the Makers.",
              "…has plenty of room to grow.",
              "…is hidden underground.",
              "…has but one entrance, magically sealed.",
              "…bears minor magics to preserve its contents.",
              "…is warded against spirits and magic.",
              "…includes your living quarters & office.",
            ],
          },
          {
            prompt: "But alas, it… (choose 2)",
            count: 2,
            options: [
              "…sits on the outskirts, near the Old Wall.",
              "…is cramped, chaotic, and overflowing.",
              "…is little more than a crude cellar.",
              "…seems to be haunted.",
              "…contains a few dangerous artifacts.",
            ],
          },
        ],
      },
      {
        name: "The Lawkeeper",
        text:
          "Her Judges say that Aratis has been with humanity since they first stacked one stone upon another and called it home.",
        picks: [
          {
            prompt: "In Stonetop's Pavilion of the Gods, Aratis's shrine is… (pick 1)",
            count: 1,
            options: [
              "…a hub of the community, a place of frequent rites, petitions, and celebrations.",
              "…used only on high holidays, for each home keeps its own shrine above the hearth.",
              "…neglected by most, tended only by you and a handful of believers.",
              "…a grim place of judgement and punishment, shunned by all but her chosen.",
              "…newly established, cramped and spare.",
            ],
          },
          {
            prompt: "Of her true disciples, Aratis demands… (choose 3)",
            count: 3,
            options: [
              "…truth, honesty, and forthrightness.",
              "…hospitality, freely given to all who ask for it.",
              "…the punishment of thieves & oathbreakers.",
              "…adherence to strict rules of diet and dress.",
              "…respect for authority, property, and rank.",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Legacy",
        text:
          "You are the latest in a long line of Judges — born here, apprenticed to the prior Judge, and charged with the passing of the mantle. The Chronicle is a rich repository of lore, but there's no index, so good luck finding anything. When you Know Things about the people or history of Stonetop, you have advantage. When you spend days, weeks, or months poring over the Chronicle, ask the GM a question, and the GM will tell you what you learn in that time.",
      },
      {
        name: "Missionary",
        text:
          "You are part of a larger order of Judges, sent here to protect the flickering flame of civilization. The Chronicle is relatively new; your position in town is far from certain. Add these Judges to the Neighbors section of the steading playbook (pick 2 more): Devin (Marshedge); Haeris (Gordin's Delve); Isalde (the Manmarch); Rahat (Lygos); Tejisha (Barrier Pass); Unz (the Hillfolk). When you call upon the Judge of another steading for aid or information, they are oathbound to give it; you are likewise oathbound to support them. You have an aviary in addition to your usual choice of special possessions (mark it now). When you send a message via trained bird, the GM will tell you if and when you receive a response, and what it says.",
      },
      {
        name: "Prophet",
        text:
          "The line of Judges was broken long ago, the Chronicle lost or fallen into ruin. Aratis has called you personally to her service through dreams, omens, and visions. Some in town resent the authority you've assumed. When you spend a few days communing with Aratis about a threat facing Stonetop or civilization as a whole, roll +WIS: on a 7+, Aratis reveals the course of action she would have you take; on a 10+, you also hold 2 Sanction. While acting on her orders, spend 1 Sanction to add +1 to a roll you just made.",
      },
    ],
    instincts: [
      { name: "Ambition", text: "To increase your status or influence." },
      { name: "Dispassion", text: "To disregard emotion or sentiment." },
      { name: "Harmony", text: "To seek a path that makes everyone happy." },
      { name: "Orthodoxy", text: "To strictly adhere to rules and traditions." },
      { name: "Zeal", text: "To judge quickly and without doubt." },
    ],
    appearance: [
      ["eager youth", "in my prime", "showing my years"],
      ["calm voice", "booming voice", "a voice that carries"],
      ["hard body", "powerful frame", "slim", "well-fed"],
      ["polished gear", "robes of office", "modest clothes"],
    ],
    startingMovesRule: "You start with Censure, Chronicler of Stonetop, plus 2 more of your choice.",
    defaultMoves: ["Censure", "Chronicler of Stonetop"],
    chooseMoves: 2,
    moves: [
      { name: "Censure", default: true, text: "When you first denounce an individual in your presence as an agent of chaos or anathema to civilization, they pick 1: They are ashamed, and act accordingly; They are doubtful, and hesitate, pause; They are afraid, and seek to escape; They are enraged, and lash out predictably (the next roll against them has advantage)." },
      { name: "Chronicler of Stonetop", default: true, text: "When you write up detailed session notes and share them with the other players, hold +1 Diligence. You can spend 1 Diligence at any time to add +1 to a roll that you or a fellow player just made." },
      { name: "Aegis of Faith", text: "When you wield a shield, it can turn away spells, magical effects, and insubstantial attacks as if they were physical blows." },
      { name: "Armored", text: "When you carry a shield, mark only 1 box (instead of 2) on any armor you wear. Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome)." },
      { name: "Bear Witness", text: "When you speak the truth with conviction and candor, none can doubt you. They might deny what you say, but in their hearts they recognize the truth." },
      { name: "Break Bread", text: "When you share a proper meal with someone and each of you eats their fill, each of you recovers 1d8 (extra) HP." },
      { name: "Bulwark", text: "When you Defend, you can spend 1 Readiness to stand fast, holding your position despite what befalls you." },
      { name: "Castigate", req: "level 2+, Censure", text: "When you Censure someone, your voice deals 1d4 damage to them (near, loud, ignores armor)." },
      { name: "For the Greater Good", text: "When you Persuade someone to act in defense of their community or civilization at large, you have advantage." },
      { name: "Hound of Aratis", text: "When you Seek Insight, you can always ask \"What here is tainted by chaos?\" for free, even on a 6-." },
      { name: "Like a Dog with a Bone", req: "Hound of Aratis", text: "When you attack something you know to be tainted by chaos, deal +1d6 damage." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Knowledge is Power", text: "When you roll 10+ to Know Things, you or an ally gain advantage on the next roll to act on what you learn." },
      { name: "Many Hands Make Light Work", text: "When you jump in to help another character who just rolled, tell us how and ask the GM what else is required or what the consequences will be. If you accept, increase your ally's roll by +1." },
      { name: "A Bundle of Sticks Unbroken", req: "Many Hands Make Light Work", text: "When you Struggle as One, you and one ally of your choice have advantage." },
      { name: "The Hammer and the Book", text: "When you strike a thing of supernatural chaos, roll +WIS: on a 10+, deal your damage and choose 1; on a 7-9, deal damage and choose 1, but you also expose yourself to harm or unwanted attention. — Deal +1d6 damage; Ignore the thing's armor or other defenses; Suppress one of its unnatural powers; Force it from its host." },
      { name: "Truth or Consequences", text: "When you look into someone's eyes and gaze upon their soul, you can ask their player, \"Are you lying or hiding something from me?\" and get an honest answer. If the answer is \"Yes,\" you have advantage on your next roll against them. When you lie or otherwise deceive someone through words, you have disadvantage on your next roll against them." },
      { name: "Binding Arbitration", req: "Truth or Consequences", text: "When you bear witness to someone's promise or oath, henceforth you may ask their player if they have kept their word. They must answer honestly. The character need not be present. If they have broken their word, you gain advantage on all rolls against them until they admit they're wrong and suffer an appropriate consequence (your call)." },
      { name: "Vision Unclouded", text: "When you Seek Insight, you can always ask \"What here is hidden by illusion or magic?\" for free, even on a 6-." },
      { name: "Well-Read", text: "When you name the source in which you read about the matter at hand, roll +WIS to Know Things instead of +INT." },
      { name: "A Mighty Rampart", req: "level 6+, Bulwark", text: "When you hold Readiness (from Defend), you cannot be forced from your position. Also, you can spend 1 Readiness to completely ignore the effects/damage of an attack that you suffer." },
      { name: "Armistice", req: "level 6+, Bear Witness", text: "When you approach an enemy to negotiate in good faith, they will at least hear you out. Even the most debased and savage foe will delay violence until you've had your say." },
      { name: "Condemn", req: "level 6+, Censure", text: "When you Censure someone, they are marked with a mystical brand that cannot be removed or hidden until you dismiss it. Any intelligent creature who sees the mark recognizes the bearer as an agent of chaos and anathema to civilization." },
      { name: "Proclamation", req: "level 6+, Condemn", text: "When you Censure, you may denounce a group or faction as long as you can clearly identify them. Apply the effects of Censure to every member of that group, regardless of distance." },
      { name: "Mirrorshield", req: "level 6+, Aegis of Faith", text: "When you Defend with a shield, you can spend 1 Readiness to intercept a magical force and redirect it to a different target (or none)." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
      { name: "The Tower Eternal", req: "level 6+", text: "When you Defy Danger against magic, treat a result of 6- as a 7-9." },
    ],
    gear: {
      note: "Pick 1, in addition to your symbol of authority and scribe's tools.",
      pickCount: 1,
      fixed: [
        { name: "Scribe's tools", text: "parchment, ink, pigments, vials, quills, ◊ a notebook, etc." },
      ],
      groups: [
        {
          prompt: "Your symbol of authority (pick 1)",
          count: 1,
          options: [
            { name: "Black iron maul", text: "utterly immune to all magic (close, forceful, awkward, +1 damage)." },
            { name: "Makerglass shield", text: "etched with Aratis's symbol (indestructible, +1 armor, +1 Readiness on a Defend 7+)." },
            { name: "Helm set with a dark ice \"jewel\"", text: "grants advantage to resist mind-affecting magic." },
          ],
        },
      ],
      options: [
        { name: "Aviary", text: "thick gloves, bird hoods, tethers, seed, ◊ messenger birds, ◊ birdcages, etc." },
        { name: "Carpenter's tools", text: "chisels, files, nails, pitch, ◊ prybars, ◊ saws, ◊ firkins, barrels, etc." },
        { name: "Engineer's tools", text: "rulers, tapes, rods, plumb-bobs, ◊ tripods, ◊ block & tackles, wheelbarrow, etc." },
        { name: "Smithy (or access to it)", text: "iron goods, ingots, thick gloves, ◊ tongs, ◊ bellows, an anvil, etc." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, describe the Chronicle. Then tell us about Aratis and her shrine, and what she demands of her true disciples.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Who is your lover/spouse/betrothed? Who is your apprentice? Who is the wisest of the town elders?",
      "Ask your fellow PCs: Which one of you is a true disciple of Aratis? Which one of you is my closest confidant? Which one of you has stood beside me in battle against unnatural chaos? Against which of you have I passed judgement?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Arianrhod", "Caerwyn", "Einion", "Eleri", "Magda", "Nerys", "Trahaern", "Trefor"] },
        { name: "Barrier Pass", names: ["Arinasai", "Bortachikhan", "Khadagan", "Khojin", "Odval", "Usun", "Yesui", "Yul"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Briget", "Comhall", "Elnor", "Liadain", "Mirdach", "Onghus", "Somha", "Toal"] },
        { name: "Lygos or some other southern town", names: ["Abrim", "Cassander", "Despina", "Hypatta", "Morecai", "Nomika", "Sofia", "Yose"] },
      ],
    },
  },

  lightbearer: {
    id: "lightbearer",
    name: "The Lightbearer",
    tagline:
      "Imagine yourself and your kin in a cave lit by a single torch, entranced by shadow puppet stories. Imagine realizing there is a greater truth, and stepping out of the cave into the true Light of day. Would you not bring that Light back into the darkness, to set your people free?",
    blurb:
      "A radiant servant of Helior the Day-bringer, channeling holy light, hope, and mercy — and the wrath of the sun against the dark.",
    damage: "d4",
    maxHP: 18,
    features: [
      {
        name: "Praise the day",
        text: "You are the appointed servant of Helior the Day-bringer, god of the sun and light, beacon of hope and mercy.",
        picks: [
          {
            prompt: "The worship of Helior is… (choose 1)",
            count: 1,
            options: [
              "…ancient, widespread, and well-known.",
              "…most common in Lygos and the south.",
              "…a new thing, still unheard of by many.",
              "…an old thing, forgotten by most.",
              "…widely persecuted.",
            ],
          },
          {
            prompt: "He is worshipped through… (choose 1 or 2)",
            count: 2,
            options: [
              "…solemn hymns.", "…serene meditation.", "…joyful song.", "…ascetic denial.",
              "…fervent dancing.", "…formal ceremonies.", "…drugs & intoxicants.", "…pain & sacrifice.",
            ],
          },
          {
            prompt: "In Stonetop's Pavilion of the Gods, Helior's shrine has… (choose 1)",
            count: 1,
            options: [
              "…the place of highest honor, even if Tor is more popular.",
              "…been well-tended and given due respect.",
              "…recently been restored/established, perhaps by you.",
              "…seen better days, for certain.",
            ],
          },
          {
            prompt: "Your predecessor, the previous Lightbearer… (choose 2 or 3)",
            count: 3,
            options: [
              "…lived long ago, a figure of legend.",
              "…was martyred for their faith.",
              "…died facing a mighty sorcerer or demon.",
              "…wrote many works of sublime beauty.",
              "…faced one of the Things Below.",
              "…died in their bed, peacefully.",
              "…ascended bodily into the heavens.",
              "…was reincarnated — as you.",
            ],
          },
          {
            prompt: "You came into your powers… (choose 1)",
            count: 1,
            options: [
              "…through years of study and devotion.",
              "…when your predecessor passed them on.",
              "…suddenly, at a moment of great need.",
              "…after a visitation from Helior or one of his servants.",
              "…when you first laid eyes upon the ______.",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Auspicious Birth",
        text:
          "You were born in Stonetop, and that birth was marked by the God of Light — during an eclipse, perhaps, or under the light of a bright new star? Maybe you bear a sun-shaped birthmark? Whatever the sign, your connection to Helior was clear early on. You've a place of honor in Stonetop, though it'd be a lie to say you don't make some uneasy. When one of your moves has you mark a debility, you may mark this background's circle instead, to no ill effect. Clear it when you Make Camp or Convalesce.",
      },
      {
        name: "Itinerant Mystic",
        text:
          "They think of you as a self-important kook who comes through now and again, speaking in riddles and playing tricks with the light. Sure, they know there's something holy about you, but it's not like you're a priest or anything. When you go off a-wandering, hold 1 Enigma if you're gone for days, 2 if gone for weeks, or 3 if gone for months. At the very start of play, hold 3 Enigma. Spend Enigma 1-for-1 to: Return from your wandering exactly when and where you are needed, fully Outfitted; Know Things as if you rolled a 10+, drawing on what you learned while away; Have What You Need to produce an oddly specific yet mundane item of Value 1 or less.",
      },
      {
        name: "Soul on Fire",
        text:
          "You once led a worldly life, full of fear and doubt, base pleasures and petty grudges. But something happened — injury, illness, a brush with death, or just a moment of such profound misery and self-loathing that you thought you could fall no further. There, in the dark, Helior's light shined upon you, igniting in your soul, lifting you and filling you with a profound sense of purpose. When you Persuade a group by preaching charity, mercy, and hope and roll a 7+, aside from the usual effect, choose 1: Your name and your message spread; Someone approaches you, now or later, eager to know more.",
      },
    ],
    instincts: [
      { name: "Charity", text: "To go without so that others are better off." },
      { name: "Hope", text: "To inspire others in the face of adversity." },
      { name: "Mercy", text: "To bring relief or comfort, to give second chances." },
      { name: "Praise", text: "To spread the glory and worship of Helior." },
      { name: "Righteousness", text: "To refuse to suffer an injustice or a lesser evil." },
    ],
    appearance: [
      ["a youthful glow", "well-weathered", "old & merry"],
      ["a lilting voice", "a melodious voice", "a soft voice"],
      ["beatific", "ethereal", "intense", "jovial", "serene"],
      ["fine robes", "threadbare cloak", "working clothes"],
    ],
    startingMovesRule: "You start with Consecrated Flame and Invoke the Sun God, plus 1 more of your choice.",
    defaultMoves: ["Consecrated Flame", "Invoke the Sun God"],
    chooseMoves: 1,
    moves: [
      { name: "Consecrated Flame", default: true, text: "When you whisper words of consecration to a flame, the flame casts a holy light. Holy light is uncomfortable for creatures of darkness to look upon, but does no true harm. The holy light lasts until the flame goes out or until you consecrate another flame, whichever comes first." },
      { name: "Invoke the Sun God", default: true, text: "When you imbue a holy light with Helior's power, choose an Invocation you know and roll +WIS: on a 10+, it works as described but you must choose 1 consequence from the list; on a 7-9, it works as described, but you and the GM each choose 1. — The Invocation has its reduced effect; The effort taxes you (mark a debility); The light is snuffed out when the Invocation is complete, its fuel consumed; You must bask in sunlight for an hour or so before using that Invocation again. (See the Invocations insert for details.)" },
      { name: "A Candle Against the Dark", text: "When you wield a holy light but go otherwise unarmed, you have 2 Armor." },
      { name: "Luminous Shield", req: "A Candle Against the Dark", text: "When you brandish a holy light to turn aside an attack against body, mind, or soul, roll +CHA: on a 10+, the attack is deflected and, if the attacker is in range of your light, they are briefly blinded; on a 7-9, the attack is deflected but your holy light flickers and dims, threatening to go out; on a 6-, your light snuffs out and the attack is unimpeded." },
      { name: "All is Illuminated", text: "When you look closely on another and see their soul laid bare, roll +WIS: on a 10+, ask their player 1 question from the list below, plus \"And what would make them feel loved, beautiful, or worthy?\"; on a 7-9, ask them 1 question from the list. They must answer truthfully. — Of what are they most ashamed? What do they most desire or covet? What hope have they abandoned? Who or what is most precious to them?" },
      { name: "And Behold a Pale Horse", text: "When you spend the night gazing into a flame, ask the GM to reveal an impending doom or grim portent that will come to pass unless you intervene, and how you might yet do so." },
      { name: "Fire Within", text: "When you are in darkness, you are able to see by the light of your inner fire. When you take damage from cold or fire, reduce that damage by 2." },
      { name: "Guiding Light", text: "When you lead one or more NPCs through danger, roll +CHA: on a 10+, you all make it through (Helior be praised); on a 7-9, the GM will tell you what's required to get everyone through safely." },
      { name: "Helior's Unblinking Eye", text: "When you stare into the sun long enough to lose your vision, name a person or place that you know and roll +WIS: on a 10+, you briefly glimpse your subject as if from a great height, and choose 2; on a 7-9, you glimpse your subject and choose 1: The glimpse lasts as long as you wish; Your point of view shifts to very close range; You recover your vision quickly." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Keep the Home-Fires Burning", text: "When you build a camp fire and sprinkle it with ash from your own hearth, anyone who Makes Camp with you is free from nightmares or bad dreams and recovers (extra) HP equal to your CHA." },
      { name: "Lamplighter", text: "When you whisper to a flammable object (a torch, a wick, kindling, etc.), it ignites in moments." },
      { name: "Piety", text: "When you spend at least an hour in proper worship to Helior, hold 1 Blessing. Other faithful PCs who partake in this worship also hold 1 Blessing. At any time, you can spend 1 Blessing to add +1 to a roll you just made in pursuit of a righteous cause." },
      { name: "Purifying Flames", text: "When you wield a holy light against a creature of darkness, it counts as a weapon (d10 damage, hand, close, area, 2 piercing) and you can choose to roll +WIS to Clash." },
      { name: "Radiant Countenance", text: "When you give someone your fond attention, you can then Persuade them with advantage. If they are a follower, you can instead choose to Strengthen Your Bond (as if you paid their cost)." },
      { name: "Rise Like the Sun", text: "When you draw attention to yourself by word or deed, roll +CHA: on a 10+, everyone turns and looks, and you hold their gaze as long as you keep giving them reason to look; on a 7-9, everyone turns and looks." },
      { name: "Spring's First Thaw", text: "When you spend time (an hour at least, maybe more) seeking to stir hope, kindness, or mercy in an NPC, roll +CHA: on a 10+, you light a fire deep within them and effect a lasting change; on a 7-9, you kindle goodness in their heart for now, but they will eventually return to their old ways; on a 6-, their heart hardens and you can't use this move on them again." },
      { name: "Burn Twice as Bright", req: "level 6+, Invoke the Sun God", text: "When you Invoke the Sun God, you may mark a debility to use 2 Invocations at once. Roll once, and apply any consequences to both Invocations." },
      { name: "Empowered Invocations", req: "level 6+, Invoke the Sun God", text: "When you Invoke the Sun God, you can choose an extra consequence before you roll. If you do, the Invocation has its empowered effect." },
      { name: "Glorious Servant", req: "level 6+, Invoke the Sun God", text: "When you Invoke the Sun God and roll a 10+, you need not choose a consequence; on a 7-9, you choose a consequence but the GM does not." },
      { name: "Hungry Flames", req: "level 6+, Purifying Flames", text: "When you deal damage with a holy light, you deal +1d6 damage and your target is engulfed in holy light and flames." },
      { name: "Light, More Light", req: "level 6+, Consecrated Flame", text: "When you consecrate a flame, it burns brighter than normal. A rushlight or candle illuminates to reach range, an oil lamp/lantern/torch out to near range, and a bullseye lantern out to far range." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
      { name: "Wielder of the White Flame", req: "level 6+, Invoke the Sun God", text: "When you channel Helior's essence into an object you carry, roll +WIS: on a 10+, it ignites with a white flame that casts a holy light (reach, area) and burns neither you nor the object, and you may Invoke the Sun God right now as if you rolled a 10+; on a 7-9, it ignites with a white flame that casts a holy light (reach, area) and burns neither you nor the object." },
    ],
    gear: {
      note: "Pick 2.",
      pickCount: 2,
      fixed: [],
      options: [
        { name: "Apiary", text: "beeswax, candles (close, area, lasts ~1 hr), honey, ◊ bee smokers, ◊ hats & veils, etc." },
        { name: "Books & scrolls (5 uses)", text: "expend a use to consult your collection and turn a Know Things roll you just made into a 10+." },
        { name: "Chandlery", text: "beeswax, candles (close, area, lasts ~1 hr), wicks, scented herbs, soap, lye, ash, etc." },
        { name: "Distillery", text: "skins of fine whisky (2 uses, grants advantage to Persuade), copper tubes, malt, ◊◊ firkins, stills, barrels, etc." },
        { name: "Glassworks", text: "vials, charms, lenses, sand, marbles, bellows, crucible, ◊ lanterns (5 hours, close, area), etc." },
        { name: "Holy relics (3 uses)", text: "if you have one in inventory when you Invoke the Sun God, you can mark a use in lieu of choosing a consequence." },
        { name: "Luthier's tools", text: "chisels, files, catgut, various woods, stains, ◊ a lute, ◊ a fiddle, etc." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, praise the day! Tell us of Helior, his worship and his shrine. Tell us, too, of the prior Lightbearer and how you gained your powers.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Who fans the flames of your heart? Whose kindness and generosity warm your soul? Who needs Helior's light, badly?",
      "Ask your fellow PCs: Which one of you is an old and dear friend? Which one of you shares my faith? Which one of you scoffs at mercy and hope? Which one of you will need my guidance soon?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Dai", "Eirian", "Eurig", "Haf", "Haul", "Hefin", "Hulwen", "Tesni"] },
        { name: "Barrier Pass", names: ["Alaqa", "Bat", "Dinget", "Ghoa", "Oyuun", "Sidurgu", "Temur", "Toragana"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Adfin", "Callach", "Conlad", "Eadna", "Fionntan", "Niamh", "Orlaith", "Sorsha"] },
        { name: "Lygos or some other point south", names: ["Arash", "Azar", "Hafiz", "Murat", "Roshan", "Shideh", "Zara", "Zohara"] },
      ],
    },
  },

  marshal: {
    id: "marshal",
    name: "The Marshal",
    tagline:
      "Hoping for peace isn't enough. Trouble always comes knocking. And that's why we need you: to run the drills, to man the towers, to take charge when things get bad. To be cold enough to send your neighbors to a sure death in order to keep Stonetop safe. That's the job, Marshal. You up for it?",
    blurb:
      "A leader of the village militia who commands a loyal crew, reads the battlefield, and inspires others to fight as one.",
    damage: "d8",
    maxHP: 20,
    features: [
      {
        name: "War stories",
        text: "The town's militia has seen action before, and you were at the heart of it.",
        picks: [
          {
            prompt: "The last time the militia saw serious action, it was… (pick 1)",
            count: 1,
            options: [
              "…to repel a nighttime raid by crinwin from the Great Wood.",
              "…to drive off bandits who'd taken up near the Ruined Tower.",
              "…to fend off Hillfolk pursuing a blood feud.",
              "…against Brennan and his Claws, before they settled in Marshedge.",
              "…to face a brutish hagr, come down from the Foothills to wreak havoc.",
              "…to hunt down beasts (wolves, drakes, or bears maybe?) who'd been preying on the village.",
            ],
          },
          {
            prompt: "Answer at least 3 of the following questions about that action",
            count: 3,
            options: [
              "When exactly did it happen?",
              "Who lost their life, and who mourns them?",
              "Who from Stonetop was maimed, and how?",
              "Who saved the day, and how?",
              "How did the enemy get away, and whom do you still blame for it?",
              "Who comported themselves with honor?",
              "What's been bugging you about it ever since?",
              "What's got you even more worried now?",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Scion",
        grantsMove: "Veteran Crew",
        text:
          "You grew up here, descended from a long line. Some of the biggest names in Stonetop's past are perched in your family tree. Everyone in the village takes your authority as a given, and your crew is a well-established institution in town. You start with the Veteran Crew move, in addition to your usual moves. When you create your Crew, they automatically have the respected tag (in addition to your usual picks, and any you get from Veteran Crew).",
      },
      {
        name: "Penitent",
        text:
          "Before you came here, you led a band of ne'er-do-wells: bandits, raiders, or bloody-handed mercenaries. But something changed. A moment of truth led you and your followers — some of them at least — to leave that life behind. And for whatever reason, the people of Stonetop took you in. When you draw on your bloody past to Know Things, you may roll +STR instead of +INT. If you do, the GM will ask you who you wronged back then or who might still hold a grudge. When you create your Crew, they automatically have the warriors tag (in addition to your usual picks).",
      },
      {
        name: "Luminary",
        grantsMove: "We Happy Few",
        text:
          "You're a natural leader — your words inspire, your plans win the day, your deeds are recounted far and wide. Are you touched by the gods? Does ancient blood flow in your veins? Or are you simply the champion that Stonetop needs in these trying times? You start with the We Happy Few move, in addition to your usual moves. When you create your Crew, they automatically have the devoted tag (in addition to your usual picks).",
      },
    ],
    instincts: [
      { name: "Authority", text: "To take charge and throw your weight around." },
      { name: "Caution", text: "To keep everyone safe, to agonize over decisions." },
      { name: "Drive", text: "To take on ever more responsibility." },
      { name: "Honor", text: "To keep your word, to follow a moral code." },
      { name: "Ruthlessness", text: "To do whatever it takes to win or survive." },
    ],
    appearance: [
      ["upstart youth", "experienced & sober", "grizzled"],
      ["clear voice", "resonant voice", "rumbling voice"],
      ["stern frown", "grim-set jaw", "knowing smirk"],
      ["badge of office", "spit & polish", "timeworn gear"],
    ],
    startingMovesRule:
      "You start with Crew, Logistics, any moves from your Background, and 1 move of your choice.",
    defaultMoves: ["Crew", "Logistics"],
    chooseMoves: 1,
    moves: [
      { name: "Crew", default: true, text: "You've got a crew of stalwarts, six or so residents of Stonetop with some steel to them. See the Crew insert for details." },
      { name: "Logistics", default: true, text: "When you have a steading Muster or Pull Together, or when you Requisition, you have advantage." },
      { name: "Armored", text: "When you carry a shield, mark only 1 box (instead of 2) on any armor you wear. Also, you can ignore the cumbersome tag on any armor you wear. If you take this move at the start of play, add an iron hauberk, bronze cuirass, or scale coat to your inventory (all are 2 armor, warm, cumbersome)." },
      { name: "Veteran Crew", req: "Crew", text: "Each time you take this move, pick 1. You can also choose to reselect their Instinct and Cost. — Select 2 new tags for your Crew; Increase their damage die from d6 to d8; Increase their max HP by 2 each." },
      { name: "Front Line Leader", text: "When you lead your crew into battle, hold 2 Presence. Spend Presence in lieu of your crew's Loyalty or as Readiness (as if you Defended them)." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Arts of War", req: "level 2+", text: "Take a move from the Fox, Heavy, Judge, Ranger, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. (You can't take Improved Stat or Superior Stat.)" },
      { name: "Read the Land", text: "When you first take a moment to survey the terrain, ask the GM one of the following; gain advantage on your next roll to act on the answer. — What's the best way in, out, through, or past? Where's the best spot for a trap or an ambush? Where's the most defensible position? What here is out of place?" },
      { name: "Prepare a Welcome", req: "Read the Land", text: "When you have your allies fortify a position and lie in wait for battle, hold 1 Surprise if you're rushed or 2 Surprises if you can take your time. Once battle is joined, spend 1 Surprise to reveal a ploy, defense, or dirty trick you prepared in advance and roll +INT: on a 10+, it works as well as can be expected, and you've still got a few tricks up your sleeve — regain 1 Surprise; on a 7-9, it works as well as can be expected." },
      { name: "Set-Up Strike", text: "When you Clash and get a 7+, you can choose to deal damage with disadvantage. If you do, you create an opening for an ally to act on, as if you provided Aid. Describe it!" },
      { name: "Shake It Off", text: "When you order an ally to overcome fear, doubt, or delusion, roll +CHA: on a 10+, they do it; on a 7-9, a PC gets advantage to do it; an NPC will do it, but they'll need time, they'll resent you, or they'll feel humiliated (GM decides)." },
      { name: "Shield Wall", text: "When you have your crew form a shield wall, they Defend with advantage and on a 7+ they hold +2 Readiness (instead of the usual +1 for shields). As long as they maintain formation, they can go on the offensive without losing Readiness." },
      { name: "Sir, Permission to Die, Sir", text: "When one of your followers would die, you can spend 1 of their Loyalty to have them survive (out of the action, but alive). If you let them go, mark XP." },
      { name: "Speak Softly", text: "When you offer peace but your enemy refuses, gain advantage on your next roll against them." },
      { name: "Stentorian", text: "When you raise your voice, it carries far and cuts through even the din of battle. When you go into battle, hold 2 Command. Spend 1 Command to shout an order or warning and pick 1: PCs get advantage on their next roll to do as you say; You have advantage to Order Followers or Deploy." },
      { name: "Take the Measure", text: "When you size someone up, ask their player one of the questions below and get an honest answer. If they fear or respect you (their call), you can ask another question. You can't use this move on them again until your relationship significantly changes. — Can I trust them (to ______)? What do they intend to do? How are they most useful/dangerous? What weakness of theirs can I exploit?" },
      { name: "We Happy Few", text: "When you give an inspiring speech to your allies before facing a dire threat, roll +CHA: on a 10+, each ally holds 2 Inspiration; on a 7-9, each ally holds 1 Inspiration; on a 6-, each ally holds 1, but you have disadvantage on all rolls until you share your nagging doubts with someone else. Once battle is joined, allies can spend Inspiration 1-for-1 to: Act fearlessly in the face of terror or overwhelming odds; Keep 1 HP instead of being reduced to 0 HP; Add 1d6 to a damage roll they just made." },
      { name: "Battlefield Grace", req: "level 6+, Front Line Leader", text: "When you take damage while leading your allies in battle, the damage roll has disadvantage." },
      { name: "Heroes to the Last", req: "level 6+, Veteran Crew", text: "Each time you take this move, pick 1: They are exceptional (and roll +2 instead of +1); They are inured to terror & horror; Increase their max HP by 4 each; Increase their damage die one size (max d10)." },
      { name: "Focus Fire", req: "level 6+, Stentorian", text: "You can spend 1 Command to order your allies to bring down a foe. If you do, each ally has advantage on their next damage roll against that foe." },
      { name: "Like an Open Book", req: "level 6+, Take the Measure", text: "When you Take the Measure of someone who fears or respects you, your second question can be anything you want. The GM might ask how you could possibly know this; tell them or ask something else." },
      { name: "Noble Mien", req: "level 6+", text: "When you lead an NPC through danger and return them to safety, if they aren't part of your crew they will either offer to join your crew or pledge their future aid and support." },
      { name: "Peace Through Strength", req: "level 6+, Speak Softly", text: "When you stand ready to fight alongside like-minded allies, anything capable of fear recognizes you as a serious threat and treats you accordingly." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
    ],
    gear: {
      note: "Pick 2.",
      pickCount: 2,
      fixed: [],
      options: [
        { name: "Chirurgeon's tools", text: "catgut, straps, bandages, tubes, poultice, willow bark, ◊ bonesaws, etc." },
        { name: "Distillery", text: "skins of fine whisky (2 uses, grants advantage to Persuade), copper tubes, malt, ◊ firkins, stills, barrels, etc." },
        { name: "Engineer's tools", text: "rulers, tapes, rods, plumb-bobs, ◊ tripods, ◊ block & tackles, wheelbarrow, etc." },
        { name: "Personal symbol", text: "a flag, crest, marking, etc.: when you display or reveal it in a dramatic fashion, your crew holds +1 Loyalty (max 3)." },
        { name: "Scribe's tools", text: "parchment, ink, pigments, vials, quills, ◊ a notebook, etc." },
        { name: "Weapons of war (choose up to 3, now or later)", text: "Sword, iron (close, +1 damage); Long spear, fine steel (reach, 2 piercing); Battleaxe, iron (close, messy); Composite bow (far, +1 damage, piercing, low ammo, all out)." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, tell us the town's war stories, plus the answers to the questions you chose.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Who is your lover/spouse/betrothed? Who is your lieutenant? Whose kin is dead because of your decisions?",
      "Ask your fellow PCs: Which one of you is or was part of my crew? Which one of you have I promised to keep safe? Which one of you do I still have doubts about? Which one of you ignored my orders and got someone killed?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Bethan", "Cadfael", "Ffraid", "Gwythyr", "Llewelyn", "Meredith", "Rhianna", "Urien"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Brigh", "Cathal", "Conn", "Donal", "Fionna", "Laith", "Talulla", "Torin"] },
        { name: "The Steplands (Hillfolk)", names: ["Adl", "Aeln", "Clotild", "Judoc", "Katrn", "Mygl", "Pirn", "Sera"] },
        { name: "The Manmarch", names: ["Berkhard", "Gerbild", "Hartig", "Hilde", "Sabrinne", "Ulrike", "Urrsla", "Weillem"] },
        { name: "Lygos or some other point south", names: ["Ameer", "Calixta", "Hadar", "Kelila", "Sulaim", "Ursa", "Xandros"] },
      ],
    },
  },

  ranger: {
    id: "ranger",
    name: "The Ranger",
    tagline:
      "Your true home is out there. Away from the Old Roads, in the wild places, where you've faced storm and beast alike. But unknown forces are at work beyond the Ringwall, and you fear for your kith and kin. These are strange times. Guide them, ranger, and keep them safe when darkness falls.",
    blurb:
      "A wilderness guardian and master tracker who roams beyond the Ringwall — at home in the wild and fierce in its defense.",
    damage: "d8",
    maxHP: 18,
    features: [
      {
        name: "Something wicked this way comes",
        text: "You know firsthand that trouble is out there, and one of these days the folk of Stonetop will have to face it.",
        picks: [
          {
            prompt: "What is it that you're so worried about? (choose 1)",
            count: 1,
            options: [
              "A dark, unwholesome presence lurking in the Great Wood.",
              "A strange, furtive figure seen near the Ruined Tower.",
              "Something big & savage stalking the northern foothills.",
              "Whatever's made the lizard-like suarachan of Ferrier's Fen so bold.",
              "That of which the Hillfolk refuse to speak.",
            ],
          },
          {
            prompt: "Then, answer at least 3 of the following questions about this threat",
            count: 3,
            options: [
              "What, exactly, do you think it is?",
              "What did you see, and how close did you have to get to see it?",
              "Whom or what have you lost to it?",
              "What did it leave behind?",
              "What do you think it wants?",
              "Who refuses to believe you?",
              "Who can tell you more, if you can only convince them?",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Mighty Hunter",
        grantsMove: "Expert Tracker, Stalker",
        text:
          "You are a hunter of the Great Wood, the best the town has seen in generations. You know every part of the Wood within a two-day march. You start with both the Expert Tracker move and the Stalker move. Go mark them now.",
      },
      {
        name: "Wide Wanderer",
        grantsMove: "Mental Map",
        text:
          "You have travelled much of the known world and perhaps parts beyond. Add each of the following to the Neighbors list, choosing 1 trait for each: Ennis (Marshedge); Shahar (Gordin's Delve); Yannic (the Hillfolk); Tovia (Lygos); Sasca (the northern Manmarch). You start with the Mental Map move (mark it now). When you Know Things about the wider world, you can roll +WIS instead of +INT. When you arrive somewhere you've visited before (your call), tell the GM when you were last here, and the GM will tell you how it's changed.",
      },
      {
        name: "Beast-Bonded",
        grantsMove: "Animal Companion",
        text:
          "You grew up civilized, but your soul is bound to a beast of the wild. You're closer to it than to any man or woman. How did this bond come about? How long ago? Regardless, you start with the Animal Companion move (mark it now). When you focus on your animal companion for a few moments, you can use any of the actions you've marked, no matter the distance between you. Mark 1 action at 1st level, then another at 3rd, 5th, 7th, and 9th: Gauge its distance and direction from you; Call it back to your side; Sense its emotional state; Get a brief impression of what it senses; Lend it your strength — lose 1d6 HP, and it regains an equal amount.",
      },
    ],
    instincts: [
      { name: "Adventure", text: "To test yourself, to experience new things." },
      { name: "Independence", text: "To refuse help and push others away." },
      { name: "Stewardship", text: "To value beasts and natural places over people." },
      { name: "Tenacity", text: "To be stubborn, to persist." },
      { name: "Wonder", text: "To marvel at beauty, magnificence, splendor." },
    ],
    appearance: [
      ["fledgling", "prime specimen", "long in the tooth"],
      ["barking voice", "growling voice", "sing-song voice"],
      ["compact & sturdy", "long & lean", "wolfish"],
      ["shaggy", "threadbare", "well-groomed"],
    ],
    startingMovesRule:
      "You start with Home on the Range, any moves from your Background, plus 1 of your choice.",
    defaultMoves: ["Home on the Range"],
    chooseMoves: 1,
    moves: [
      { name: "Home on the Range", default: true, text: "When you Defy Danger or Struggle as One, treat a 6- as a 7-9." },
      { name: "A Safe Place", text: "When you select and prepare the party's camp site, hold 1 Precaution, or 2 Precaution if you are well-versed with this area and its dangers. If trouble finds your camp site, you can spend 1 Precaution to reveal a simple defense, warning, or trick that you prepared in advance. If you do, tell us how you knew to make that specific preparation." },
      { name: "Animal Companion", text: "You are accompanied by a beast of uncommon loyalty and cleverness. See the Animal Companion insert for details." },
      { name: "Magnificent Specimen", req: "Animal Companion", text: "Each time you take this move, your companion gains 2 additional options of your choice." },
      { name: "Big Game Hunter", text: "When you strike at the weak spot of a large or huge creature, you deal +2 damage." },
      { name: "Blot Out the Sun", text: "When you Let Fly with a bow, you can deplete your ammunition (mark the next ammo status after your weapon) before you roll. If you do, choose 1: Gain advantage on your damage roll; Add the area tag to your attack (roll damage separately for each target)." },
      { name: "Call the Shot", text: "When you take your time and calmly line up the perfect shot, either deal your damage or roll +DEX: on a 10+, deal your damage and pick 2; on a 7-9, deal your damage and pick 1: Ignore armor or add +1d4 damage (your call); Stun, hobble, or hinder them; Make them trip or drop what they're holding; Do no harm; don't deal your damage after all." },
      { name: "Expert Tracker", text: "When you Seek Insight by searching for or studying the signs left by passing creatures, you can ask \"What happened here recently?\" for free, even on a 6-. When you follow a creature's trail, roll +WIS: on a 7+, you follow it to a significant change in terrain or activity; on a 10+, you can ask the GM a reasonable question about your quarry and get a useful answer." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Mental Map", text: "You can always retrace your steps and can accurately gauge distances and directions. You might not know the way forward but can always find your way back. When you think back on a place you've been, you can Seek Insight retroactively, as if you were still there." },
      { name: "Naturalist", text: "When you Know Things about beasts, natural environs, or spirits of the wild, you have advantage." },
      { name: "On the Hoof", text: "When you travel through the wilderness, you can procure 1d6 uses of provisions each day (roll with disadvantage in winter or barren terrain). Provisions can substitute for supplies when you Make Camp." },
      { name: "Pack Horse", text: "You can carry up to 4 items with a light load, 7 with a normal load, and 10 with a heavy load." },
      { name: "Pathfinder", text: "When you lead your people to Pull Together or Deploy beyond sight of home, you have advantage." },
      { name: "Predator", text: "When you Seek Insight, add the following to the list of questions you can ask. When acting on the answer to either question, deal an extra 1d4 damage. — Who or what here is the easiest prey? How is ____ weak or vulnerable?" },
      { name: "Sniff Out Corruption", text: "When you Seek Insight, you can ask, \"What here stinks of the unnatural?\" for free, even on a 6-." },
      { name: "Stalker", text: "When you carry a normal or light load and move with care, you make no noise and leave no sign of your passing. When you hide yourself in a natural environment, you remain unseen until you draw attention to yourself, move positions, or attack." },
      { name: "Survivalist", text: "When you Forage, pick 1 extra choice (even on a 6-, pick 1) and add \"Find or fashion some useful item or supply (GM can veto)\" to the list of options." },
      { name: "Warden of the Wild", text: "When you defeat a perversion of nature, you can ask the GM 2 of the following and get a useful answer: Will it come back? If so, how can I stop it? Will its taint spread? If so, how can I contain it? What useful (but grisly) bits can I harvest? What else can I learn about it or its ilk?" },
      { name: "Wild Speech", text: "The grunts, barks, chirps, and calls of natural beasts are as a language to you. You can understand their intentions and communicate basic ideas. When you Persuade a beast, you can choose to roll +WIS." },
      { name: "Worldly", req: "level 2+", text: "Take a move from the Blessed, Fox, Heavy, Marshal, or Seeker playbooks, for which you otherwise qualify. You can pick from a different playbook each time. (You can't pick Improved Stat or Superior Stat.)" },
      { name: "Alpha", req: "level 6+, Wild Speech or Spirit Tongue", text: "When you assert dominance over another (beast, spirit, Fae, or person), roll +WIS: on a 7+, they must pick 1 from the list; on a 10+, you also have advantage on your next roll against them. — Accept your authority, at least for now; Slink away or flee, then avoid you; Fight you for dominance." },
      { name: "Beast of Legend", req: "level 6+, Magnificent Specimen", text: "Each time you take this move, pick 1: They are exceptional (and roll +2 instead of +1); They get +4 HP and +1 armor; They develop some unique ability or trait." },
      { name: "Constant Vigilance", req: "level 6+", text: "Unless you're dazed, you're never caught off guard — not even when asleep or if you roll a 6-. When you intercept a sudden threat (to yourself or an ally), you have advantage on whatever move you make." },
      { name: "Giant Slayer", req: "level 6+, Big Game Hunter", text: "When you strike at a weak spot of a large or huge creature, you deal another +2 damage (+4 total)." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
      { name: "Trailblazer", req: "level 6+, Home on the Range", text: "When a journey causes you to Defy Danger or Struggle as One, on a 10+ you also learn or discover something interesting and useful — ask the GM what." },
      { name: "Walk It Off", req: "level 6+", text: "When you'd mark a debility, you can mark this move instead to no ill effect. Clear it as you would a debility." },
    ],
    gear: {
      note: "Pick 2, in addition to your composite bow.",
      pickCount: 2,
      fixed: [
        { name: "Composite bow", text: "far, +1 damage, piercing, low ammo, all out." },
      ],
      options: [
        { name: "Distillery", text: "skins of fine whisky (2 uses, grants advantage to Persuade), copper tubes, malt, ◊◊ firkins, stills, barrels, etc." },
        { name: "Hideouts (3 uses)", text: "expend a use to have a well-stocked, safe shelter nearby; GM can veto." },
        { name: "Husbandry tools", text: "brushes, muzzles, collars, feed, ◊ whips, ◊ bridles, etc. Gain advantage to Persuade domestic beasts (livestock, dogs, etc.)." },
        { name: "Hounds (2-3 followers)", text: "trackers, keen-nosed, fast; HP 6; Damage d6 (hand, grabby); Instinct: to give chase; Cost: training." },
        { name: "Lay of the land (3 uses)", text: "expend a use to know where to find ____, without having to Know Things; GM can veto." },
        { name: "Trapping gear", text: "snares, pelts, musk, bait, etc. When you Forage, get +1 use of provisions." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, tell us what you're worried about (see Something wicked this way comes).",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? To whom do you always return home? Who would be lost without you? Who has much to learn from you?",
      "Ask your fellow PCs: Which one of you fears the wider world? Which one of you has shown me great beauty? Which one of you have I caught staring out at the horizon? Which one of you lacked the stomach to put something out of its misery?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Aran", "Bledyn", "Branwen", "Deryn", "Ifur", "Meinir", "Rhys", "Teagan"] },
        { name: "Barrier Pass", names: ["Anarba", "Arslan", "Bolormaa", "Cirina", "Nergui", "Nomolun", "Saran", "Shigi-Qutuqu"] },
        { name: "Marshedge", names: ["Asling", "Conar", "Enna", "Flannan", "Macha", "Mave", "Proinsias", "Rowen"] },
        { name: "The Steplands (Hillfolk)", names: ["Bernd", "Elown", "Irn", "Kani", "Pol", "Nol", "Rozn", "Sterin"] },
        { name: "The Manmarch", names: ["Alfher", "Bertrim", "Dagmar", "Elfrida", "Hramn", "Meike", "Swanbilde", "Wulfrim"] },
        { name: "Lygos or some other point south", names: ["Ari", "Boriz", "Dimitra", "Gorhan", "Nitza", "Selen", "Todora", "Vasil"] },
      ],
    },
  },

  seeker: {
    id: "seeker",
    name: "The Seeker",
    tagline:
      "Look at us. Huddling behind our walls, hearing evil in every passing noise. Cowards, all. All, but you. You fear not the unknown. You plunge into it, searching. Grasping at what has been lost. What will you find, o Seeker? Signs of a bright new age? Or signs of our doom?",
    blurb:
      "A scholar of forbidden lore and arcane artifacts, wielding major and minor arcana to unravel the world's deepest mysteries.",
    damage: "d6",
    maxHP: 16,
    features: [
      {
        name: "Collection — Major Arcana",
        text:
          "In your travels and investigations you have acquired arcana — artifacts of power and mystery. Your Background grants you 1 major arcanum. You've begun to unlock its mysteries (mark 1 box on the front of its insert). When and how did that happen?",
        picks: [
          {
            prompt: "Answer at least 2 questions about your major arcanum",
            count: 2,
            options: [
              "Where did you acquire it?",
              "From whose grasp did you wrest it?",
              "Who else wants it?",
              "What did it cost you?",
            ],
          },
        ],
      },
      {
        name: "Collection — Minor Arcana",
        text:
          "Ask the GM for the minor arcana cards. Draw 3 at random and review both sides: one whose secrets you have unlocked (where is it now? how did you master it?); one you have not yet mastered (where is it? how did you find it?); and one you have not yet found but have a lead on (give the card back to the GM, but note it — during play, ask the GM what you know about it).",
      },
    ],
    backgrounds: [
      {
        name: "Patriot",
        grantsMove: "Let's Make a Deal",
        text:
          "These people are family. Chaos grows all around, but you'll be damned if you'll let your family come to harm. You have sought out and embraced dark power to protect that which you hold dear — or perhaps that power fell upon you, and you took it up for the greater good. Either way, you seek more. You start with the Let's Make a Deal move and are Well Versed in the Things Below (go mark them now). You've also acquired 1 major arcanum: The Hec'tumel Codex; The Red Scepter; or The Staff of the Lidless Orb.",
      },
      {
        name: "Antiquarian",
        grantsMove: "Polyglot",
        text:
          "The past has buried many secrets, and you are determined to dig them up. Years of study across the land have led you here, and you are convinced that this town holds the key to your greatest discoveries. What is it you hope to find? What is it that keeps you here? Your travels and studies mean that you start with the Polyglot move and that you are Well Versed in the Makers and their arts (go mark them now). You've also acquired 1 major arcanum: Noruba's Ice Sphere; The Azure Hand; or The Mindgem.",
      },
      {
        name: "Witch Hunter",
        grantsMove: "Everything Bleeds",
        text:
          "You've dedicated your life to rooting out and destroying horrors and their servants. What set you down this path? What did you sacrifice to walk it? What led you to call Stonetop home? Regardless, you start with the Everything Bleeds move and are Well Versed in (pick 1) the Fae, the Things Below, or the Last Door and what lies beyond (go mark them now). You've also acquired 1 major arcanum: The Demonhide Cloak; The Redwood Effigy; or The Twisted Spear.",
      },
    ],
    instincts: [
      { name: "Cunning", text: "To scheme, manipulate, and plot." },
      { name: "Curiosity", text: "To seek answers that maybe you oughtn't." },
      { name: "Hubris", text: "To assume you know best, that you can't fail." },
      { name: "Mystery", text: "To avoid straight answers; to keep secrets." },
      { name: "Vision", text: "To think big and pursue grandiose goals." },
    ],
    appearance: [
      ["curiously young", "world-weary", "bent with years"],
      ["haunted voice", "rich voice", "whispery"],
      ["ink-stained fingers", "sinewy hands", "soft hands"],
      ["bony limbed", "lean & lanky", "short", "thick-set"],
    ],
    startingMovesRule:
      "You start with Well Versed, Work With What You've Got, plus 1 move from your Background.",
    defaultMoves: ["Well Versed", "Work With What You've Got"],
    chooseMoves: 0,
    moves: [
      { name: "Well Versed", default: true, text: "Mark 1 topic, in addition to the one noted in your Background. Each additional time you take this move, mark 2 more topics. — The Last Door, death, and the undead; The civilization of humanity; The Fae and their strange ways; The Makers and their arts; The primordial powers; The Things Below; The wild world and its spirits. When you Know Things about one of your topics, you can ask the GM a follow-up question of your choice (even on a 6-)." },
      { name: "Work With What You've Got", default: true, text: "When you cleverly use your environment to harm or impede your foe(s), roll +INT: on a 10+, pick 2; on a 7-9, pick 1: Interrupt or thwart their action(s); Create an opportunity that grants you or an ally advantage on the next roll to exploit it; Deal damage appropriate to the source (d4 for bruises/scrapes, d6 for bloodshed, d8 if it'd break bones, d10 if it'd kill a common person)." },
      { name: "Attuned", text: "When you Seek Insight, you can always ask, \"What here is infused with magic?\" for free, even on a 6-." },
      { name: "Conduit of Power", text: "When you would mark a Consequence from a major arcanum, you can mark 1 box here instead, with no negative effect. (These marks never clear.)" },
      { name: "Countermeasures", text: "When you witness a magical effect, you may ask the GM, \"How can this be countered or interrupted?\" and get an honest answer. You or an ally gain advantage on your next roll to act on the answer." },
      { name: "Everything Bleeds", text: "When you exploit an unnatural foe's specific weakness or vulnerability, deal +1d6 damage." },
      { name: "Everything Burns", text: "When you inspect a work of artifice or magic for a fatal flaw, roll +INT: on a 7+, the GM will reveal the best way to destroy/sabotage it; on a 10+, you or an ally also gain advantage to act on the info." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "Initiate of the Secret Arts", req: "level 2+", text: "You have a \"Sacred Pouch\" (3 Stock, magical), as per the Blessed, but with no remarkable traits. Each time you take this move, choose a Blessed move for which you otherwise qualify. (You can't take Improved Stat or Superior Stat.)" },
      { name: "Let's Make a Deal", text: "When you Seek Insight, add \"What do they really want or need?\" to the list of questions. When you Persuade by offering them something that you know they want or need, treat a 7-9 as a 10+." },
      { name: "Logbook", text: "You have a logbook (2 uses, slow) that doesn't take up space in your inventory. When you (and only you) consult your logbook and expend a use, you can ignore a Know Things roll you just made and treat the result as a 10+. When the Seasons Change, reset your logbook to 2 uses." },
      { name: "Magpie", text: "When you Have What You Need, you can produce something strange, specific, maybe even valuable or a little bit magical, but if you do, tell us where you got it and 2 of: How it's not quite right, but maybe it'll do; The trouble you caused back home by getting it; Why using it will draw unwanted attention; That it's the only thing like this that you've got, and why it'll only work the one time." },
      { name: "Never at a Loss", text: "When you Know Things and roll a 6-, you may choose to not mark XP. If you don't mark XP, the worst that happens is that the GM tells you nothing interesting or useful about the subject, but instead tells you how you could learn more." },
      { name: "Polyglot", text: "When you first encounter a living language in play, describe your proficiency with it (if any) and how you came to acquire it. When you Know Things about any script, text, runes or symbols that you encounter, you have advantage." },
      { name: "Cryptologist", req: "Polyglot", text: "When you study encoded, forgotten, or arcane marks or writing, roll +INT: on a 10+, you can fully decipher them in just a few minutes; on a 7-9, you get the gist in a few minutes, but fully deciphering them will take you an hour or so." },
      { name: "Quick Study", text: "When you study something magical that should take months to understand, it instead takes mere weeks. If it should take weeks, it takes days. If it should take days, it takes only a few hours." },
      { name: "Safety First", text: "When you spend an hour or so preparing your mystical defenses, hold 2 Protection. When you are affected by harmful magic, spend 1 Protection either to gain advantage on any roll to resist it or to halve its damage/effects." },
      { name: "Sage Advice", text: "When another PC asks you for guidance, they get advantage on their next roll to follow your advice." },
      { name: "Arcane Adept", req: "level 6+", text: "When you wish to invent a spell or magical effect, detail its workings with the GM and Make a Plan to invent it. If you like, pick one requirement and ask the GM to provide an alternative (e.g. \"first you must ____\" could become \"first you must ____, or it will take months\")." },
      { name: "Deep Insight", req: "level 6+, Attuned", text: "When you Seek Insight about something magical, you may ask one additional question, not limited to the list. Even on a 6-, you get to ask this question." },
      { name: "Improvise", req: "level 6+, Quick Study", text: "When you wish to use an arcanum's move or option without having unlocked it, ask the GM what fool risk(s) it requires and/or what consequence(s) you'll incur. If you go for it, roll +INT: on a 7+, you get it to work this once — trigger the move or use the option as if you unlocked it; on a 10+, also mark one step towards unlocking the arcanum's mysteries." },
      { name: "Mind Over Magic", req: "level 6+", text: "When you roll to study or use an arcanum, you can roll +INT instead of the stat you'd normally roll." },
      { name: "Overchannel", req: "level 6+, Conduit of Power", text: "When you would mark a Consequence from a major arcanum, you may mark a debility instead." },
      { name: "Proof Against Detection", req: "level 6+, Safety First", text: "When you hold Protection, you can't be scried upon or sensed by magical means, and have advantage to Defy Danger by being stealthy." },
      { name: "Superior Stat", req: "level 6+", text: "Increase one of your stats by +1 (to a max of +3)." },
    ],
    gear: {
      note: "Pick 2, in addition to your scribe's tools.",
      pickCount: 2,
      fixed: [
        { name: "Scribe's tools", text: "parchment, ink, pigments, vials, quills, ◊ a notebook, etc." },
      ],
      options: [
        { name: "Books & scrolls (5 uses)", text: "expend a use to consult your collection and turn a Know Things roll you just made into a 10+." },
        { name: "Distillery", text: "skins of fine whisky (2 uses, grants advantage to Persuade), copper tubes, malt, ◊◊ firkins, stills, barrels, etc." },
        { name: "Engineer's tools", text: "rulers, tapes, rods, plumb-bobs, ◊ tripods, ◊ block & tackles, wheelbarrow, etc." },
        { name: "Laboratory", text: "chemics, reagents, vials, measures, ◊ scales, ◊ decanters, etc. Every season, produce d4-1 uses of naphtha (thrown, area, dangerous, ignores armor)." },
        { name: "Paraphernalia", text: "crystals, incense, talismans, blood, bone, horn, eye of newt, ◊ braziers, ◊◊ a cauldron, etc." },
        { name: "Trade contacts", text: "small amounts of salt, glass, silk, spice, medicinal herbs, pigments, ivory, etc." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, describe your major arcana and your answers to the questions you chose. Then tell us about your minor arcana, too.",
      "Name one or more NPCs who live in Stonetop: Who is your closest kin? Who is your spouse/lover/betrothed? Whom do you trust, even more than yourself? Whom do you secretly watch over, and why?",
      "Ask your fellow PCs: Which one of you led me to a key discovery? Which one of you has been at my side the entire way? Which one of you most fears the path I tread? Which one of you is keeping secrets from me?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Alis", "Dylan", "Eilwen", "Gerlt", "Gwenda", "Macsen", "Mirgan", "Owena", "Taliesyn", "Twymor"] },
        { name: "Barrier Pass", names: ["Bayanaganengri", "Chakha", "Jetei", "Moog", "Narengawa", "Ogul", "Ozbeg", "Solongo"] },
        { name: "The Steplands (Hillfolk)", names: ["Anook", "Anxo", "Dors", "Jory", "Mari", "Padg", "Pons", "Silf"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Aiden", "Barrfind", "Caolan", "Ciara", "Deirbhile", "Moirin", "Tiern", "Reamann"] },
        { name: "Lygos or some other point south", names: ["Dana", "Eliana", "Erez", "Fikri", "Isra", "Persefoni", "Spiro", "Vahid"] },
      ],
    },
  },

  wouldbehero: {
    id: "wouldbehero",
    name: "The Would-be Hero",
    tagline:
      "Most people hope for a quiet life. They spend their days a-worrying: about a leaky roof, a sick child, their crops. But you aren't like most people — you're on a different path. A path to adventure! There's greatness in you. Let's hope you live long enough for everyone else to see it.",
    blurb:
      "An untested, big-hearted hopeful destined for greatness — fueled by righteous anger and the will to become a true hero.",
    damage: "d6",
    maxHP: 16,
    statArray: [1, 0, 0, 0, 0, -1],
    statArrayNote: "The Would-be Hero starts weaker than other playbooks: assign +1, +0, +0, +0, +0, -1.",
    features: [
      {
        name: "Fear & anger",
        text: "Decide what you fear and what makes you burn with righteous anger. (Later: when did your fear or anger last cause you trouble? What did you do? How did it turn out?)",
        picks: [
          {
            prompt: "What do you fear most? (choose 1, maybe 2)",
            count: 2,
            options: [
              "Fire, burning, the smell of charred flesh.",
              "That they won't take you seriously.",
              "That you really aren't cut out for this.",
              "The death of your family or loved ones.",
              "Being alone and helpless.",
              "Violence, bloodshed, and pain.",
              "Monsters.",
              "What you're capable of.",
              "What you must do.",
            ],
          },
          {
            prompt: "What makes you burn with righteous anger? (choose 2, maybe 3)",
            count: 3,
            options: [
              "Bullying, slavery, and oppression.",
              "Wanton cruelty and unnecessary suffering.",
              "Injustice and inequality.",
              "Cowardice, treachery, and selfishness.",
              "The despoiling of beauty and innocence.",
              "Threats to your loved ones.",
              "Violence to children, animals, the innocent.",
              "Perversions of nature.",
            ],
          },
        ],
      },
    ],
    backgrounds: [
      {
        name: "Impetuous Youth",
        text:
          "Stonetop has always been home, but you chafe at the demands of mundane life and have always longed for more. Excitement! Danger! When you make a move and come up short, you can give it your all and turn a 6- into a 7-9, a 7-9 into a 10+, and (if it matters) a 10-11 into a 12+. But if you do, pick 1 (the GM will fill in the details): You get hurt (2d4 damage and an actual injury); You cause collateral damage, endanger others, or otherwise escalate the situation; Something on your person is lost or breaks.",
      },
      {
        name: "Driven",
        text:
          "You once led a simple life, but something happened — something changed you, burdened you with terrible purpose. What was it? Choose 1: A loved one was killed or abducted; Someone gave their life to save you; Your idol sacrificed themselves to save many; You stumbled upon a dark mystery; You must make amends for a terrible mistake. You always have the option to Burn Brightly: you can spend 2 XP after you roll to add +1, even if you don't have enough XP to level.",
      },
      {
        name: "Destined",
        text:
          "Fate has laid her hand upon you. Choose 3-4 items to describe your destiny (anointed / marked at birth / your coming foretold; destroy / discover / free / protect / restore; unify; blood / civilization / darkness; earth & stone / fire / ice / light / life / storms; war / water / the Fae / the gods / the Makers; the Stone / the Things Below). At the start of a session, roll +Omens: on a 7+, lose all Omens and the GM describes a vision pointing toward your fate; on a 10+, also ask a follow-up and get a clear answer; on a 6-, don't mark XP, hold +1 Omen, and tell us of recent nightmares. Until your destiny is fulfilled, treat a 6- on Death's Door as a 7-9, and a 7-9 as a 10+.",
      },
    ],
    instincts: [
      { name: "Defiance", text: "To refuse to back down, give up, give in." },
      { name: "Doubt", text: "To question yourself, your actions, your worth." },
      { name: "Earnestness", text: "To prove yourself, to yourself and others." },
      { name: "Optimism", text: "To assume the best, and that things are simple." },
      { name: "Sacrifice", text: "To put the needs/wants of others above your own." },
    ],
    appearance: [
      ["still a child", "young & beautiful", "all grown up"],
      ["confident voice", "earnest voice", "quiet voice"],
      ["big", "scrawny", "sinewy", "slender", "thick"],
      ["back unbowed", "jaw firmly set", "soulful eyes"],
    ],
    startingMovesRule:
      "You start with Anger is a Gift, Potential for Greatness, and 2 other moves of your choice.",
    defaultMoves: ["Anger is a Gift", "Potential for Greatness"],
    chooseMoves: 2,
    moves: [
      { name: "Anger is a Gift", default: true, text: "When you burn with righteous anger (see Fear & Anger), hold 2 Resolve. Spend Resolve 1-for-1 to: Set aside fear and doubt to do what must be done; Act suddenly, catching them off-guard; Inspire allies or bystanders to follow your lead; Strike hard (+1d4 damage, forceful); Keep your footing, position, and/or your course despite what befalls you." },
      { name: "Potential for Greatness", default: true, text: "Once per level, when you roll a stat and get a 10+, mark one of the following (note the level during which you marked it; you don't have to mark them in order): Increase the stat you rolled by 1, to a max of +2 (four times); Increase your max HP by 4; Increase your damage die to a d8." },
      { name: "Speak Truth to Power", req: "Anger is a Gift", text: "When you demand that someone does what is clearly good and right, you have advantage to Persuade. If they refuse, gain +1 Resolve." },
      { name: "Better Part of Valor", text: "When you are outnumbered or facing a foe bigger than you, you have advantage to hide from, escape from, or sneak past them." },
      { name: "I Get Knocked Down", text: "When you take damage despite your best efforts to avoid it, you can choose to halve the damage but pick 1: You lose something (footing, grip, etc.); Something on your person breaks; You're out of it for a moment. Whatever you choose, the GM will describe the details." },
      { name: "But I Get Up Again", req: "I Get Knocked Down", text: "When you use I Get Knocked Down, you have advantage on your next roll against whatever dealt the damage, and your next blow against them does +1d4 damage." },
      { name: "Improved Stat", text: "Each time you take this move, increase one of your stats by 1 (to a max of +2)." },
      { name: "In Over Your Head", text: "When another PC rescues you from danger, mark XP." },
      { name: "Iron Will", text: "When you are subject to mind control or magic that affects your feelings, you can take 1d4 damage (ignoring armor) to disregard its influence." },
      { name: "Inquiring Minds", text: "When you seek out and receive honest advice, gain advantage on your next roll to follow that advice." },
      { name: "Never Gonna Keep Me Down", text: "When you have 5 or fewer current HP, you impose disadvantage on any damage you take. Once per session, when you are at Death's Door, don't roll — you get a 10+." },
      { name: "Resourceful", text: "When you Defy Danger and roll a 6-, ask the GM a question from Seek Insight after they describe what happens. Gain advantage on your next roll to act on the answer." },
      { name: "Something to Remember Me By", text: "When you spend Readiness (from Defend) to strike back at an attacker, you deal +1d4 damage and scar, mark, or diminish them in some way (the GM will say how, or ask you to)." },
      { name: "Tough Love", text: "When you honestly think another PC is in the wrong and call them on it, they have disadvantage on any rolls against you until you two work it out." },
      { name: "Underestimated", text: "As long as you avoid overt hostility, no enemy will consider you a threat. When you first make your move against an enemy who underestimates you, you have advantage." },
      { name: "Up With People", text: "When you converse with someone (PC or NPC) you can hold 2 Rapport with them. If you do, they hold 1 Rapport with you. During the conversation, either of you can spend 1 Rapport to ask the other player one of the following and get an honest answer: What weighs you down or holds you back? What drives you forward? What lesson would you have me learn? What do you think of me, truly?" },
      { name: "Versatile", req: "level 2+", text: "Choose a move from any other playbook, as long as you meet its requirements. You can pick from a different playbook each time. (You can't take Improved Stat or Superior Stat.)" },
      { name: "A Force to be Reckoned With", req: "level 6+ (replaces Underestimated)", text: "Any intelligent creature who looks you in the eye or hears the steel in your voice instinctively knows that you are a force to be reckoned with, and treats you appropriately. When you Defy Danger against something trying to harm or constrain you, on a 12+ you turn the tables on them. (Cross off \"Would-be\" the first time you use this move.)" },
      { name: "Big Damn Hero", req: "level 6+ (replaces In Over Your Head)", text: "When you first leap into danger to protect someone, don't roll to Defend — treat it as though you rolled a 10+. When you Defend, you can spend 1 Readiness to lock eyes with an attacker; they have disadvantage on damage rolls against you and your ward for the rest of the fight. (Cross off \"Would-be\" the first time you use this move.)" },
      { name: "Superior Stat", req: "all 6 marks in Potential for Greatness", text: "Increase one of your stats by +1 (to a max of +3)." },
      { name: "Undaunted", req: "level 6+ (replaces Better Part of Valor)", text: "When you are outnumbered or facing a foe bigger than you, you get +1 armor and deal +1d6 damage. (Cross off \"Would-be\" the first time you use this move.)" },
      { name: "Voice of Experience", req: "level 6+ (replaces Inquiring Minds)", text: "When another PC comes to you for advice and you tell them what you think is best, they have advantage on their first roll to follow your advice. When you Seek Insight, you can always ask, \"What is about to happen?\" for free, even on a 6-. (Cross off \"Would-be\" the first time you use this move.)" },
    ],
    gear: {
      note: "Pick 2.",
      pickCount: 2,
      fixed: [],
      options: [
        { name: "A heap of expectations", text: "of little use." },
        { name: "A good dog (follower)", text: "retriever or herder, keen-nosed, clever; HP 6, Damage d6 (hand, grabby); Instinct: to play; Cost: affection." },
        { name: "Husbandry tools", text: "brushes, muzzles, collars, feed, ◊ whips, ◊ bridles, etc. Gain advantage to Persuade domestic beasts (livestock, dogs, etc.)." },
        { name: "Smithy (or access to it)", text: "iron goods, ingots, thick gloves, ◊ tongs, ◊ bellows, an anvil, etc." },
        { name: "Stoneworker's tools", text: "chisels, drills, ◊ prybars, ◊ spikes, ◊ block & tackles, wheelbarrow, etc." },
        { name: "Personal token, fraught with meaning", text: "pick 1: A shield, bearing ___'s crest; A wool cloak, woven just for you by ___; A letter, spattered with tears & blood; A flute, a gift from someone you loved; A fine locket, holding a strand of hair; A tinderbox, lovingly engraved." },
        { name: "Tannery (or access to it)", text: "lime, acid, salts, thick gloves, ◊ a boiled leather cuirass (1 armor), etc." },
      ],
    },
    connections: [
      "On your first turn, introduce yourself by name, pronouns, background, origin, and appearance.",
      "On your second turn, describe your special possessions and how you contribute to the village (beyond working the fields).",
      "On your third turn, tell us of your fear & anger, and of the last time they caused you trouble.",
      "Name one or more NPCs who live in Stonetop: Whose heart do you hope to win? Who is counting on you? Who quietly understands the path you are on? Who do you intend to prove wrong?",
      "Ask your fellow PCs: Which one of you is my closest, truest friend? Which one of you believes in me, despite it all? Which one of you has promised to teach me? Which one of you have I hurt, through what I have done or failed to do?",
    ],
    names: {
      intro: "Stonetop is your home, or close enough, but where are you (or your family) from originally? Pick 1 and a name to match (or make up something similar).",
      places: [
        { name: "Stonetop", names: ["Anwen", "Caradoc", "Dafyd", "Glenys", "Madoc", "Morwenna", "Siwan", "Wynfor"] },
        { name: "Barrier Pass", names: ["Bala", "Cotota", "Ganzorig", "Gerelma", "Ibahka", "Jungshoi", "Mukhali", "Taichu"] },
        { name: "The Steplands (Hillfolk)", names: ["Annic", "Cosette", "Denl", "Hugenne", "Jag", "Marc", "Oanz", "Sandre"] },
        { name: "Gordin's Delve", names: ["(pick a name from any list)"] },
        { name: "Marshedge", names: ["Bridin", "Clian", "Engis", "Fearghul", "Lan", "Neasa", "Nill", "Una"] },
        { name: "Lygos or some other point south", names: ["Chara", "Davud", "Korina", "Omid", "Parvaneh", "Tamir", "Takish", "Yannis"] },
      ],
    },
  },
};
