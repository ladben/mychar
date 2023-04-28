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
      <p>Starting at 1st level, when you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level (minimum of 1).</p>
    </div>`
}, {
  id: 2,
  name: "Pact of the Blade",
  description: `
    <div>
      <p>You can use your action to create a pact weapon in your empty hand. You can choose the form that this melee weapon takes each time you create it (see chapter 5 for weapon options). You are proficient with it while you wield it. This weapon counts as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.</p>
      <p>Your pact weapon disappears if it is more than 5 feet away from you for 1 minute or more. It also disappears if you use this feature again, if you dismiss the weapon (no action required), or if you die.</p>
      <p>You can transform one magic weapon into your pact weapon by performing a special ritual while you hold the weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. You can then dismiss the weapon, shunting it into an extradimensional space, and it appears whenever you create your pact weapon thereafter. You can't affect an artifact or a sentient weapon in this way. The weapon ceases being your pact weapon if you die, if you perform the 1-hour ritual on a different weapon, or if you use a 1-hour ritual to break your bond to it. The weapon appears at your feet if it is in the extradimensional space when the bond breaks.</p>
    </div>`
}, {
  id: 3,
  name: "Agonizing Blast (EI)",
  description: `
    <div>
      <p>When you cast eldritch blast, add your Charisma modifier to the damage it deals on a hit.</p>
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
    <p>Whispering to the spirits of nature, you create one of the following effects within range:</p>
    <ul>
      <li>You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.</li>
      <li>You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.</li>
      <li>You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube.</li>
      <li>You instantly light or snuff out a candle, a torch, or a small campfire.</li>
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
}];

const characterAbilities = [{
  characterId: 1,
  featureList: [1, 2, 3],
  spellList: [1, 2]
}, {
  characterId: 2,
  featureList: [],
  spellList: []
}];

export {characters, features, spells, characterAbilities};