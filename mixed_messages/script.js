const character = {
    characterClass: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
    characterRace: ['Dragonborn', 'Dwarf', 'Elf', 'Gnome', 'Half-elf', 'Halfling', 'Half-orc', 'Human', 'Satyr', 'Centaur', 'Changeling', 'Eladrin', 'Fairy',  'Goblin', 'Orc', 'Automoton(Warforged)', 'Plasmoid', 'Genasi'],
    characterBackstory: [`Mollycoddle- "Ordinary, happy upbringing. All attributes slightly bellow average."`,
`Lone Remnant- "Lone survivor of a lost town. High life essence and vigor."`,
`Troubled Childhood- "Suffered misfortune in youth. Highly resilient as a result."`,
`Violent Past- "Terribly murderous past. Frenzied, but stronger for it."`,
`Professional- "Born specialist, fit for sleuthing or academia."`,
`Military Veteran- "Experienced in war. A soldier with strength and skill."`,
`Noble Offspring- "Offspring to a respectable line with faith in your pedigree."`,
`Harsh Fate- "Faced terrible hardships, but now confident in your purpose."`,
`Squandering- "You are nothing. Talentless. You shouldn't have been born."`,
`Insubstantial Phantom- "Supernatural connection to the nether. Weak to magic."`,
`Lost student- "Talented child abandoned at university. All attributes average."`]
}

const randomNumGen = (num) => {
    return Math.floor(Math.random() * num)
  }

const makeMessage = (obj) => {
    let personalCharacter = []
    for(let item in obj){
        let optionIdx = randomNumGen(character[item].length)
        
        switch(item) {
        case 'characterClass':
            personalCharacter.push(`Your character class is ${character[item][optionIdx]}.`)
            break
        case 'characterRace':
            personalCharacter.push(`Your rase is ${character[item][optionIdx]}.`)
            break
        case 'characterBackstory':
            personalCharacter.push(`Your backstory is ${character[item][optionIdx]}.`)
            break
        default:
            personalCharacter.push('There is not enough info.')
        }
    }
    const formatted = personalCharacter.join('\n')
    console.log(formatted)
}

makeMessage(character)