const characters = [{
  id: 1,
  name: 'Jörmungandr'
}, {
  id: 2,
  name: 'Rex Erectio'
}];

const features = [{
  id: 1,
  name: "Dark One's Blessing",
  description: `
    <div>
      <p>When you reduce a hostile creature to 0 hit points, you gain <b>7 temporary hit points.</b><br/><i>(your Charisma modifier + your warlock level)</i></p>
    </div>`
}, {
  id: 2,
  name: "Pact of the Blade",
  description: `
    <div>
      <p>You can <b>use your action</b> to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it. You are proficient with it while you wield it. This <b>weapon counts as magical</b> for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.</p>
      <p>Your pact weapon <b>disappears</b> if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die.</p>
    </div>`
}, {
  id: 3,
  name: "Agonizing Blast (EI)",
  description: `
    <div>
      <p>When you cast <b>eldritch blast, add 2 to the damage</b> it deals on a hit.<br/><i>(your Charisma modifier)</i></p>
    </div>`
}, {
  id: 4,
  name: "Devil's Sight (EI)",
  description: `
    <div>
      <p>You can see normally in darkness, both magical and nonmagical, to a distance of 120 feet.</p>
    </div>`
}, {
  id: 5,
  name: "Thirsting Blade (EI)",
  description: `
    <div>
      <p>You can <b>attack with your pact weapon twice</b>, instead of once, whenever you take the Attack action on your turn.</p>
    </div>`
}, {
  id: 6,
  name: "Breath Weapon",
  description: `
    <div>
      <p>You can <b>use your action</b> to exhale destructive energy: <b>cold damage in a 15 ft. cone.</b></p>
      <p>When you use your breath weapon, each creature in the area of the exhalation must make a <b>constitution saving throw, DC 15</b>.<br/><i>(8 + your Constitution modifier + your proficiency bonus)</i> A creature takes <b>2d6 damage on a failed</b> save, and <b>half as much damage on a successful</b> one.</p>
      <p>After you use your breath weapon, you can't use it again until you <b>complete a short or long rest.</b></p>
    </div>`
}, {
  id: 7,
  name: "Damage Resistance",
  description: `
    <div>
      <p>You have resistance to cold damage.</p>
    </div>`
}];

const spells = [{
  id: 1,
  name: "Druidcraft",
  level: "cantrip",
  castingTime: "1 action",
  range: "30 feet",
  duration: "Instantaneous",
  description: `
    <div>
    <p>Whispering to the spirits of nature, you <b>create one</b> of the following effects within range:</p>
    <ul>
      <li>You instantly light or snuff out a candle, a torch, or a small campfire.</li>
      <li>You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.</li>
      <li>You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube.</li>
      <li>You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.</li>
    </ul>
  </div>`
}, {
  id: 2,
  name: "Mage Hand",
  level: "cantrip",
  castingTime: "1 action",
  range: "30 feet",
  duration: "1 minute",
  description: `
    <div>
      <p>A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.</p>
      <p>You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.</p>
      <p>The hand can't attack, activate magic items, or carry more than 10 pounds.</p>
    </div>`
}, {
  id: 3,
  name: "Eldritch Blast",
  level: "cantrip",
  castingTime: "1 action",
  range: "120 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>Two beams of crackling energy streak toward one or two creatures within range. Make a ranged spell attack against the target or targets for each beam. On a hit, the target takes <b>1d10 + 2 force damage</b>.<br/><i>(agonizing blast eldritch invocation feature)</i></p>
    </div>`
}, {
  id: 4,
  name: "Toll the Dead",
  level: "cantrip",
  castingTime: "1 action",
  range: "60 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a <b>Wisdom saving throw</b> or take <b>2d8 necrotic damage</b>. If the target is <b>missing any of its hit points</b>, it instead takes <b>2d12 necrotic damage</b>.</p>
    </div>`
}, {
  id: 5,
  name: "Booming Blade",
  level: "cantrip",
  castingTime: "1 action",
  range: "Self (5-foot radius)",
  duration: "1 round",
  description: `
    <div>
      <p>You brandish the weapon used in the spell's casting and <b>make a melee attack</b> with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects plus <b>1d8 thunder damage</b> and then becomes sheathed in booming energy until the start of your next turn. If the <b>target willingly moves</b> 5 feet or more before then, the target takes <b>2d8 thunder damage</b>, and the spell ends.</p>
    </div>`
}, {
  id: 101,
  name: "Guiding Bolt",
  level: "1st-level",
  castingTime: "1 action",
  range: "120 feet",
  duration: "1 round",
  description: `
    <div>
      <p>A flash of light streaks toward a creature of your choice within range. Make a <b>ranged spell attack</b> against the target. On a hit, the target takes <b>6d6 radiant damage</b>, and the <b>next attack roll</b> made against this target <b>before the end of your next turn has advantage</b>, thanks to the mystical dim light glittering on the target until then.<br/><i>(+ 1d6 for each slot level above 1st)</i></p>
    </div>`
}, {
  id: 102,
  name: "Hex",
  level: "1st-level",
  castingTime: "1 bonus action",
  range: "90 feet",
  duration: "Concentration, up to 8 hours",
  description: `
    <div>
      <p>You place a curse on a creature that you can see within range. Until the spell ends, you deal an <b>extra 1d6 necrotic damage</b> to the target whenever you hit it with an attack. Also, <b>choose one ability</b> when you cast the spell. The <b>target has disadvantage on ability checks</b> made with the chosen ability.</p>
      <p>If the target <b>drops to 0 hit points</b> before this spell ends, you can <b>use a bonus action</b> on a subsequent turn of yours to <b>curse a new creature</b>.</p>
      <p>A remove curse cast on the target ends this spell early.</p>
    </div>`
}, {
  id: 103,
  name: "Ice Knife",
  level: "1st-level",
  castingTime: "1 action",
  range: "60 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You create a shard of ice and fling it at one creature within range. Make a <b>ranged spell attack</b> against the target. On a hit, the target takes <b>1d10 piercing damage</b>. Hit or miss, the shard then <b>explodes</b>. The target and each creature within 5 feet of it must succeed on a <b>Dexterity saving throw</b> or take <b>4d6 cold damage</b>.<br/><i>(+ 1d6 for each slot level above 1st)</i></p>
      <p>You can cast this spell <b>without a spell slot</b>, and you must finish a <b>long rest</b> before you can cast it in this way again. When you cast it this way the cold damage is the initial <b>2d6 cold damage</b><br/><i>(Quandrix student background)</i></p>
    </div>`
}, {
  id: 201,
  name: "Scorching Ray",
  level: "2nd-level",
  castingTime: "1 action",
  range: "120 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You create <b>four rays of fire</b> and hurl them at targets within range. You can hurl them at one target or several.<br/><i>(one additional ray for each slot level above 2nd)</i></p>
      <p>Make a <b>ranged spell attack</b> for each ray. On a hit, the target takes <b>2d6 fire damage</b>.</p>
    </div>`
}, {
  id: 202,
  name: "Mirror Image",
  level: "2nd-level",
  castingTime: "1 action",
  range: "Self",
  duration: "1 minute",
  description: `
    <div>
      <p><b>Three illusory duplicates</b> of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it's impossible to track which image is real. You can use your action to dismiss the illusory duplicates.</p>
      <p>Each time a <b>creature targets you</b> with an attack during the spell's duration, <b>roll a d20</b> to determine whether the attack instead targets one of your duplicates.</p>
      <p>If you have <b>three duplicates</b>, you must roll a <b>6 or higher</b> to change the attack's target to a duplicate. With <b>two duplicates</b>, you must roll an <b>8 or higher</b>. With <b>one duplicate</b>, you must roll an <b>11 or higher</b>.</p>
      <p>A <b>duplicate's AC equals 10 + 2 </b><i>(your Dexterity modifier)</i>. If an attack hits a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that hits it. It ignores all other damage and effects. The spell ends when all three duplicates are destroyed.</p>
      <p>A creature is unaffected by this spell if it can't see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight.</p>
    </div>`
}, {
  id: 301,
  name: "Spirit Shroud",
  level: "3rd-level",
  castingTime: "1 bonus action",
  range: "Self",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>You call forth spirits of the dead, which flit around you for the spell's duration. The spirits are intangible and invulnerable.</p>
      <p>Until the spell ends, any attack you make deals <b>1d8 extra damage</b> when you hit a creature within 10 feet of you. This damage is <b>radiant, necrotic, or cold</b> <i>(your choice when you cast the spell)</i>. Any creature that takes this damage <b>can't regain hit points</b> until the start of your next turn.</p>
      <p>In addition, <b>any creature of your choice</b> that you can see that starts its turn within 10 feet of you has its <b>speed reduced by 10 feet</b> until the start of your next turn.</p>
    </div>`
}, {
  id: 302,
  name: "Hunger of Hadar",
  level: "3rd-level",
  castingTime: "1 action",
  range: "150 feet",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>You open a gateway to the dark between the stars, a region infested with unknown horrors. A <b>20-foot-radius sphere</b> of blackness and bitter cold appears, centered on a point within range and lasting for the duration. This void is filled with a cacophony of soft whispers and slurping noises that can be heard up to 30 feet away. No light, magical or otherwise, can illuminate the area, and creatures fully within the area are blinded.</p>
      <p>The void creates a warp in the fabric of space, and the area is <b>difficult terrain</b>. Any creature that <b>starts its turn</b> in the area takes <b>2d6 cold damage</b>. Any creature that <b>ends its turn</b> in the area must succeed on a <b>Dexterity saving throw</b> or take <b>2d6 acid damage</b> as milky, otherworldly tentacles rub against it.</p>
    </div>`
}];

const characterAbilities = [{
  characterId: 1,
  featureList: [1, 2, 3, 4, 5, 6, 7],
  spellList: [1, 2, 3, 4, 5, 101, 102, 103, 201, 202, 301, 302]
}, {
  characterId: 2,
  featureList: [],
  spellList: []
}];

export {characters, features, spells, characterAbilities};