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
      <p>When you use your breath weapon, each creature in the area of the exhalation must make a <b>Constitution saving throw, DC 13</b>.<br/><i>(8 + your Constitution modifier + your proficiency bonus)</i> A creature takes <b>2d6 damage on a failed</b> save, and <b>half as much damage on a successful</b> one.</p>
      <p>After you use your breath weapon, you can't use it again until you <b>complete a short or long rest.</b></p>
    </div>`
}, {
  id: 7,
  name: "Damage Resistance",
  description: `
    <div>
      <p>You have resistance to cold damage.</p>
    </div>`
}, {
  id: 8,
  name: "Bardic Inspiration",
  description: `
    <div>
      <p>You can inspire others through stirring words or music. To do so, you use a <b>bonus action</b> on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a <b>d8</b>.</p>
      <p>Once within the next 10 minutes, the creature can roll the die and add the number rolled to one <b>ability check, attack roll, or saving throw</b> it makes. The creature can wait until after it rolls the d20 before deciding to use the Bardic Inspiration die, but must decide before the DM says whether the roll succeeds or fails. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.</p>
      <p>You can use this feature a <b>4 times</b> <i>(your Charisma modifier)</i>. You regain any expended uses when you finish a <b>short or a long rest</b> <i>(Font of Inspiration feature)</i>.</p>
    </div>`
}, {
  id: 9,
  name: "Song of Rest",
  description: `
    <div>
      <p>Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creatures who can hear your performance regain hit points by spending Hit Dice at the end of the short rest, each of those creatures regains an <b>extra 1d6 hit points</b>.</p>
    </div>`
}, {
  id: 10,
  name: "Cutting Words",
  description: `
    <div>
      <p>Also at 3rd level, you learn how to use your wit to distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of you makes an <b>attack roll, an ability check, or a damage roll</b>, you can <b>use your reaction</b> to expend one of your uses of <b>Bardic Inspiration</b>, rolling a Bardic Inspiration die and subtracting the number rolled from the creature's roll. You can choose to use this feature after the creature makes its roll, but before the DM determines whether the attack roll or ability check succeeds or fails, or before the creature deals its damage. The creature is <b>immune if it can't hear you or if it's immune to being charmed</b>.</p>
    </div>`
}, {
  id: 11,
  name: "Breath Weapon",
  description: `
    <div>
      <p>You can <b>use your action</b> to exhale destructive energy: <b>lightning damage in a 5 by 30 ft. line.</b></p>
      <p>When you use your breath weapon, each creature in the area of the exhalation must make a <b>Dexterity saving throw, DC 13</b>.<br/><i>(8 + your Constitution modifier + your proficiency bonus)</i> A creature takes <b>2d6 damage on a failed</b> save, and <b>half as much damage on a successful</b> one.</p>
      <p>After you use your breath weapon, you can't use it again until you <b>complete a short or long rest.</b></p>
    </div>`
}, {
  id: 12,
  name: "Damage Resistance",
  description: `
    <div>
      <p>You have resistance to lightning damage.</p>
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
  id: 6,
  name: "Vicious Mockery",
  level: "cantrip",
  castingTime: "1 action",
  range: "60 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a <b>Wisdom saving throw</b> or take <b>2d4 psychic damage</b> and have <b>disadvantage on the next attack roll</b> it makes before the end of its next turn.</p>
    </div>`
}, {
  id: 7,
  name: "Light",
  level: "cantrip",
  castingTime: "1 action",
  range: "Touch",
  duration: "1 hour",
  description: `
    <div>
      <p>You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.</p>
      <p>If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.</p>
    </div>`
}, {
  id: 8,
  name: "Fire Bolt",
  level: "cantrip",
  castingTime: "1 action",
  range: "120 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You hurl a mote of fire at a creature or object within range. Make a <b>ranged spell attack</b> against the target. On a hit, the target takes <b>2d10 fire damage</b>. A flammable object hit by this spell ignites if it isn't being worn or carried.</p>
    </div>`
}, {
  id: 9,
  name: "Shocking Grasp",
  level: "cantrip",
  castingTime: "1 action",
  range: "Touch",
  duration: "Instantaneous",
  description: `
    <div>
      <p>Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a <b>melee spell attack</b> against the target. You have <b>advantage</b> on the attack roll if the target is <b>wearing armor made of metal</b>. On a hit, the target takes <b>2d8 lightning damage</b>, and it <b>can't take reactions</b> until the start of its next turn.</p>
    </div>`
}, {
  id: 10,
  name: "Guidance",
  level: "cantrip",
  castingTime: "1 action",
  range: "Touch",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>You touch one willing creature. Once before the spell ends, the target can <b>roll a d4</b> and add the number rolled <b>to one ability check</b> of its choice. It can roll the die before or after making the ability check. The spell then ends.</p>
    </div>`
}, {
  id: 11,
  name: "Prestidigitation",
  level: "cantrip",
  castingTime: "1 action",
  range: "10 feet",
  duration: "Up to 1 hour",
  description: "<div><p>This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:</p><ul><li>You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.</li><li>You instantaneously light or snuff out a candle, a torch, or a small campfire.</li><li>You instantaneously clean or soil an object no larger than 1 cubic foot.</li><li>You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.</li><li>You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.</li><li>You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.</li></ul><p>If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.</p></div>"
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
  id: 104,
  name: "Cure Wounds",
  level: "1st-level",
  castingTime: "1 action",
  range: "Touch",
  duration: "Instantaneous",
  description: `
    <div>
      <p>A creature you touch regains a number of hit points equal to <b>1d8 + 4</b> <i>(your spellcasting ability modifier</i>. This spell has no effect on undead or constructs.</p>
      <p><b style="color: var(--light)">At Higher Levels.</b> When you cast this spell using a spell slot of <b>2nd level or higher</b>, the healing increases by <b>1d8 for each slot level</b> above 1st.</p>
    </div>`
}, {
  id: 105,
  name: "Tasha's Hideous Laughter",
  level: "1st-level",
  castingTime: "1 action",
  range: "30 feet",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a <b>Wisdom saving throw</b> or fall <b>prone</b>, becoming <b>incapacitated</b> and unable to stand up for the duration. A creature with an <b>Intelligence score of 4 or less isn't affected</b>.</p>
      <p>At the <b>end of each of its turns</b>, and <b>each time it takes damage</b>, the target can make another <b>Wisdom saving throw</b>. The target has <b>advantage</b> on the saving throw if it's <b>triggered by damage</b>. On a success, the spell ends.</p>
    </div>`
}, {
  id: 106,
  name: "Silvery Barbs",
  level: "1st-level",
  castingTime: "1 reaction, which you take when a creature you can see within 60 feet of yourself succeeds on an attack roll, an ability check, or a saving throw",
  range: "60 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You magically distract the triggering creature and turn its momentary uncertainty into encouragement for another creature. The triggering creature must <b>reroll the d20</b> and use the <b>lower roll</b>.</p>
      <p>You can then <b>choose a different creature</b> you can see within range (you can choose yourself). The chosen creature has <b>advantage on the next attack roll, ability check, or saving throw</b> it makes within 1 minute. A creature can be empowered by only one use of this spell at a time.</p>
    </div>`
}, {
  id: 107,
  name: "Guiding Bolt",
  level: "1st-level",
  castingTime: "1 action",
  range: "120 feet",
  duration: "1 round",
  description: `
    <div>
      <p>A flash of light streaks toward a creature of your choice within range. Make a <b>ranged spell attack</b> against the target. On a hit, the target takes <b>4d6 radiant damage</b>, and the <b>next attack roll</b> made against this target <b>before the end of your next turn</b> has <b>advantage</b>, thanks to the mystical dim light glittering on the target until then.</p>
      <p><b style="color: var(--light)">At Higher Levels.</b> When you cast this spell using a spell slot of <b>2nd level or higher</b>, the damage increases by <b>1d6 for each slot level</b> above 1st.</p>
    </div>`
}, {
  "id": 108,
  "name": "Find Familiar",
  "level": "1st-level",
  "castingTime": "1 action / 1 hour ritual",
  "range": "10 feet",
  "duration": "Instantaneous",
  "description": `
    <div>
      <p>You can cast this spell <b>without a spell slot</b>, and you must finish a <b>long rest</b> before you can cast it in this way again. When you cast it this way the cold damage is the initial <b>2d6 cold damage</b><br><i>(Quandrix student background)</i></p>
      <p>You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of a beast.</p>
      <p>Your familiar acts independently of you, but it always obeys your commands. In combat, it rolls its own initiative and acts on its own turn. A familiar can't attack, but it can take other actions as normal.</p>
      <p>When the familiar drops to 0 hit points, it disappears, leaving behind no physical form. It reappears after you cast this spell again. As an action, you can temporarily dismiss the familiar to a pocket dimension. Alternatively, you can dismiss it forever. As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you. Whenever the familiar drops to 0 hit points or disappears into the pocket dimension, it leaves behind in its space anything it was wearing or carrying.</p>
      <p>While your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses.</p>
      <p>You can't have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Choose one of the forms from the above list. Your familiar transforms into the chosen creature.</p>
      <p>Finally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an attack roll, you use your attack modifier for the roll.</p>
    </div>`
}, {
  id: 109,
  name: "Chaos Bolt",
  level: "1st-level",
  castingTime: "1 action",
  range: "120 feet",
  duration: "Instantaneous",
  description: `
    <div>
      <p>You can cast this spell <b>once at its lowest level</b>, and you must finish a <b>long rest</b> before you can cast it in this way again.</p>
      <p>You hurl an undulating, warbling mass of chaotic energy at one creature in range. Make a <b>ranged spell attack</b> against the target. On a hit, the target takes <b>2d8 + 1d6 damage</b>. Choose one of the d8s. The number rolled on that die determines the attack's damage type, as shown below.</p>
      <ul class="two-column numbered">
        <li>Acid</li>
        <li>Cold</li>
        <li>Fire</li>
        <li>Force</li>
        <li>Lightning</li>
        <li>Poison</li>
        <li>Psychic</li>
        <li>Thunder</li>
      </ul>
      <p>If you <b>roll the same number</b> on both d8s, the chaotic energy <b>leaps from the target</b> to a different creature of your choice within 30 feet of it. Make a <b>new attack roll</b> against the new target, and make a new damage roll, which could cause the chaotic energy to leap again.</p>
      <p>A creature can be targeted <b>only once</b> by each casting of this spell.</p>
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
  id: 203,
  name: "Crown of Madness",
  level: "2nd-level",
  castingTime: "1 action",
  range: "120 feet",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>One humanoid of your choice that you can see within range must succeed on a <b>Wisdom saving throw</b> or become <b>charmed</b> by you for the duration. While the target is charmed in this way, a twisted crown of jagged iron appears on its head, and a madness glows in its eyes.</p>
      <p>The charmed target <b>must use its action</b> before moving on each of its turns <b>to make a melee attack</b> against a creature other than itself that <b>you mentally choose</b>. The target can act normally on its turn if you choose no creature or if none are within its reach.</p>
      <p>On your subsequent turns, you <b>must use your action</b> to maintain control over the target, or the spell ends. Also, the target can make a <b>Wisdom saving throw</b> at the end of each of its turns. On a success, the spell ends.</p>
    </div>`
}, {
  id: 204,
  name: "Invisibility",
  level: "2nd-level",
  castingTime: "1 action",
  range: "Touch",
  duration: "Concentration, up to 1 hour",
  description: `
    <div>
      <p>A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target's person. The spell <b>ends for a target that attacks or casts a spell</b>.</p>
      <p><b style="color: var(--light)">At Higher Levels.</b> When you cast this spell using a spell slot of <b>3rd level or higher</b>, you can target <b>one additional creature for each slot level</b> above 2nd.</p>
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
}, {
  id: 303,
  name: "Aura of Vitality",
  level: "3rd-level",
  castingTime: "1 action",
  range: "Self (30-foot radius)",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>Healing energy radiates from you in an aura with a 30-foot radius. Until the spell ends, the aura moves with you, centered on you. You can use a <b>bonus action</b> to cause one creature in the aura (including you) to <b>regain 2d6 hit points</b>.</p>
    </div>`
}, {
  id: 304,
  name: "Haste",
  level: "3rd-level",
  castingTime: "1 action",
  range: "30 feet",
  duration: "Concentration, up to 1 minute",
  description: `
    <div>
      <p>Choose a willing creature that you can see within range. Until the spell ends, the target's <b>speed is doubled</b>, it gains a <b>+2 bonus to AC</b>, it has <b>advantage on Dexterity saving throws</b>, and it gains <b>an additional action</b> on each of its turns. That action can be used only to take the <b>Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object</b> action.</p>
      <p>When the spell ends, the target <b>can't move or take actions</b> until after its next turn, as a wave of lethargy sweeps over it.</p>
    </div>`
}];

const characterAbilities = [{
  characterId: 1,
  featureList: [1, 2, 3, 4, 5, 6, 7],
  spellList: [1, 2, 3, 4, 5, 101, 102, 103, 201, 202, 301, 302]
}, {
  characterId: 2,
  featureList: [8, 9, 10, 11, 12],
  spellList: [2, 6, 7, 8, 9, 10, 11, 104, 105, 106, 107, 108, 109, 203, 204, 303, 304]
}];

export {characters, features, spells, characterAbilities};