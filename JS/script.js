// Base Stats das classes (que vai escalando conforme o level up)
const classBaseStats = {
    warrior: { level: 4, vitality: 11, attunement: 8, endurance: 12, strength: 13, dexterity: 13, resistance: 11, intelligence: 9, faith: 9 },
    knight: { level: 5, vitality: 14, attunement: 10, endurance: 10, strength: 11, dexterity: 11, resistance: 10, intelligence: 9, faith: 11 },
    wanderer: { level: 3, vitality: 10, attunement: 11, endurance: 10, strength: 10, dexterity: 14, resistance: 12, intelligence: 11, faith: 8 },
    thief: { level: 5, vitality: 9, attunement: 11, endurance: 9, strength: 9, dexterity: 15, resistance: 10, intelligence: 12, faith: 11 },
    bandit: { level: 4, vitality: 12, attunement: 8, endurance: 14, strength: 14, dexterity: 9, resistance: 11, intelligence: 8, faith: 10 },
    hunter: { level: 4, vitality: 11, attunement: 9, endurance: 11, strength: 12, dexterity: 14, resistance: 11, intelligence: 9, faith: 9 },
    sorcerer: { level: 3, vitality: 8, attunement: 15, endurance: 8, strength: 9, dexterity: 11, resistance: 8, intelligence: 15, faith: 8 },
    pyromancer: { level: 1, vitality: 10, attunement: 12, endurance: 11, strength: 12, dexterity: 9, resistance: 12, intelligence: 10, faith: 8 },
    cleric: { level: 2, vitality: 11, attunement: 11, endurance: 9, strength: 12, dexterity: 8, resistance: 11, intelligence: 8, faith: 14 },
    deprived: { level: 6, vitality: 11, attunement: 11, endurance: 11, strength: 11, dexterity: 11, resistance: 11, intelligence: 11, faith: 11 }
};
// Tabela de Hp que escala com os levels
const hpTable = [
    0, 400, 415, 433, 451, 471, 490, 511, 530, 552, 572, 594, 616, 638, 658, 682, 698, 718, 742, 766, 792,
    821, 849, 878, 908, 938, 970, 1001, 1034, 1066, 1100, 1123, 1147, 1170, 1193, 1216, 1239, 1261, 1283,
    1304, 1325, 1346, 1366, 1386, 1405, 1424, 1442, 1458, 1474, 1489, 1500, 1508, 1517, 1526, 1535, 1544,
    1553, 1562, 1571, 1580, 1588, 1597, 1606, 1615, 1623, 1632, 1641, 1649, 1658, 1666, 1675, 1683, 1692,
    1700, 1709, 1717, 1725, 1734, 1742, 1750, 1758, 1767, 1775, 1783, 1791, 1799, 1807, 1814, 1822, 1830,
    1837, 1845, 1852, 1860, 1867, 1874, 1881, 1888, 1894, 1900
];
// Tabela de Stamina que escala com os levels
const staminaTable = {
    8: 89, 9: 90, 10: 91, 11: 93, 12: 95, 13: 97, 14: 98, 15: 100, 16: 102, 17: 104, 18: 106, 19: 108, 20: 110,
    21: 112, 22: 115, 23: 117, 24: 119, 25: 121, 26: 124, 27: 126, 28: 129, 29: 131, 30: 133, 31: 136, 32: 139,
    33: 141, 34: 144, 35: 146, 36: 149, 37: 152, 38: 154, 39: 157, 40: 160, 41: 160
};

function setClassAttributes() {
    const selectedClass = document.getElementById('class').value;
    const baseStats = classBaseStats[selectedClass];

    document.getElementById('level').value = baseStats.level;
    document.getElementById('vitality').value = baseStats.vitality;
    document.getElementById('attunement').value = baseStats.attunement;
    document.getElementById('endurance').value = baseStats.endurance;
    document.getElementById('strength').value = baseStats.strength;
    document.getElementById('dexterity').value = baseStats.dexterity;
    document.getElementById('resistance').value = baseStats.resistance;
    document.getElementById('intelligence').value = baseStats.intelligence;
    document.getElementById('faith').value = baseStats.faith;
}

function calculateBuild() {
    const vitality = parseInt(document.getElementById('vitality').value);
    const attunement = parseInt(document.getElementById('attunement').value);
    const endurance = parseInt(document.getElementById('endurance').value);
    const strength = parseInt(document.getElementById('strength').value);
    const dexterity = parseInt(document.getElementById('dexterity').value);
    const resistance = parseInt(document.getElementById('resistance').value);
    const intelligence = parseInt(document.getElementById('intelligence').value);
    const faith = parseInt(document.getElementById('faith').value);
    const startingLevel = parseInt(document.getElementById('level').value);

    const initialAttributes = classBaseStats[document.getElementById('class').value];

    const totalLevel = vitality + attunement + endurance + strength + dexterity + resistance + intelligence + faith;
    const additionalLevels = totalLevel - (initialAttributes.vitality + initialAttributes.attunement + initialAttributes.endurance + initialAttributes.strength + initialAttributes.dexterity + initialAttributes.resistance + initialAttributes.intelligence + initialAttributes.faith);

    let totalCost = 0;
    for (let level = startingLevel + 1; level <= startingLevel + additionalLevels; level++) {
        if (level <= 12) {
            totalCost += 0.0068 * Math.pow(level, 3) - 0.06 * Math.pow(level, 2) + 17.1 * level + 639;
        } else if (level <= 240) {
            totalCost += 0.02 * Math.pow(level, 3) + 3.06 * Math.pow(level, 2) + 105.6 * level - 895;
        }
    }

    const ring1 = document.getElementById('ring1').value;
    const ring2 = document.getElementById('ring2').value;

    const baseHp = hpTable[vitality] || 1900;
    let hp = baseHp;
    if (ring1 === 'favor' || ring2 === 'favor') {
        hp *= 1.2;
    }

    const baseStamina = staminaTable[endurance] || 160;
    let stamina = baseStamina;
    if (ring1 === 'favor' || ring2 === 'favor') {
        stamina *= 1.2;
    }

    const baseEquipLoad = 40 + endurance;
    let equipLoad = baseEquipLoad;

    if (ring1 === 'havel' || ring2 === 'havel') {
        equipLoad *= 1.5;
    }
    if (ring1 === 'favor' || ring2 === 'favor') {
        equipLoad *= 1.2;
    }

    document.getElementById('result').textContent = `Total Level: ${additionalLevels + startingLevel}`;
    document.getElementById('souls-result').textContent = `Soul Cost: ${Math.round(totalCost)}`;
    document.getElementById('hp-result').textContent = `HP: ${Math.floor(hp)}`;
    document.getElementById('stamina-result').textContent = `Stamina: ${Math.floor(stamina)}`;
    document.getElementById('equipload-result').textContent = `Equip Load: ${Math.floor(equipLoad)}`;
}

function updateRingImage(ringId) {
    const ringSelect = document.getElementById(ringId);
    const ringImage = document.getElementById(`${ringId}Image`);
    const selectedRing = ringSelect.value;

    switch (selectedRing) {
        case 'havel':
            ringImage.src = "https://static.wikia.nocookie.net/darksouls/images/5/56/Havel%27s_Ring_%28DSIII%29.png/revision/latest?cb=20160612045517";
            break;
        case 'favor':
            ringImage.src = "https://static.wikia.nocookie.net/darksouls/images/d/d5/Ring_of_Favor.png/revision/latest?cb=20160612045721";
            break;
        case 'steel':
            ringImage.src = "https://static.wikia.nocookie.net/darksouls/images/a/a1/Ring_of_Steel_Protection_%28DSIII%29.png/revision/latest?cb=20160612045722";
            break;
        case 'clarity':
            ringImage.src = "https://i.pinimg.com/originals/73/6d/e6/736de683f1f168d1b1718578db8e058e.png";
            break;
        default:
            ringImage.src = "https://manciniworldwide.com/wp-content/uploads/2019/02/invisible-png.png";
            break;
    }
}

// Função para atualizar a imagem da arma
function updateWeaponImage() {
    const weaponSelect = document.getElementById('weapon');
    const weaponImage = document.getElementById('weaponImage');
    const selectedWeapon = weaponSelect.value;

    switch (selectedWeapon) {
        case 'longsword':
            weaponImage.src = "https://static.wikia.nocookie.net/darksouls/images/f/fd/Long_Sword.png/revision/latest?cb=20160612042702";
            break;
        case 'broadsword':
            weaponImage.src = "https://darksouls3.wdfiles.com/local--files/image-set-equipment:broadsword/Broadsword.png";
            break;
        case 'scimitar':
            weaponImage.src = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/scimitar_curved_sword_weapon_elden_ring_wiki_guide_200px.png";
            break;
        case 'bandits_knife':
            weaponImage.src = "https://static.wikia.nocookie.net/darksouls/images/5/5b/Bandit%27s_Knife_%28DSIII%29.png/revision/latest?cb=20160613020544";
            break;
        case 'battleaxe':
            weaponImage.src = "https://static.wikia.nocookie.net/darksouls/images/9/97/Battle_Axe_%28DSIII%29.png/revision/latest?cb=20160612040437";
            break;
        case 'shortsword':
            weaponImage.src = "https://darksouls3.wdfiles.com/local--files/image-set-equipment:shortsword/Shortsword.png";
            break;
        case 'short_bow':
            weaponImage.src = "https://demonssouls.wiki.fextralife.com/file/Demons-Souls/short_bow_demons_souls_remake_wiki_guide_150px.png";
            break;
        case 'dagger':
            weaponImage.src = "https://cdn.discordapp.com/attachments/1222013883263483974/1250055833945899098/lspq4t4u8zq91.png?ex=66698cb7&is=66683b37&hm=4aa7db5fd88f56c43e7e97a7b4eca55e28259d65558beb89c0387171e68af590&";
            break;
        case 'sorcerers_catalyst':
            weaponImage.src = "https://static.wikia.nocookie.net/darksouls/images/d/d3/Sorcerer%27s_Staff_%28DSIII%29.png/revision/latest?cb=20160613024656";
            break;
        case 'hand_axe':
            weaponImage.src = "https://darksouls3.wdfiles.com/local--files/image-set-equipment:hand-axe/Hand-Axe.png";
            break;
        case 'mace':
            weaponImage.src = "https://static.wikia.nocookie.net/darksouls/images/7/78/Mace_%28DSIII%29.png/revision/latest/thumbnail/width/360/height/450?cb=20160629134521";
            break;
        case 'club':
            weaponImage.src = "https://static.wikia.nocookie.net/darksouls/images/2/20/Club_%28DSIII%29.png/revision/latest?cb=20160629140829";
            break;
        default:
            weaponImage.src = "https://manciniworldwide.com/wp-content/uploads/2019/02/invisible-png.png";
            break;
    }
}

// Função para atualizar a imagem do talismã
function updateTalismanImage() {
    const talismanSelect = document.getElementById('talisman');
    const talismanImage = document.getElementById('talismanImage');
    const selectedTalisman = talismanSelect.value;

    switch (selectedTalisman) {
        case 'darkmoon_talisman':
            talismanImage.src = "https://darksouls3.wiki.fextralife.com/file/Dark-Souls-3/sunless_talisman.png";
            break;
        case 'canvas_talisman':
            talismanImage.src = "https://static.wikia.nocookie.net/darksouls/images/3/38/Canvas_Talisman_%28DSIII%29.png/revision/latest?cb=20160613030000";
            break;
        case 'ivory_talisman':
            talismanImage.src = "https://static.wikia.nocookie.net/darksouls/images/c/ca/Saint%27s_Talisman.png/revision/latest?cb=20160613030001";
            break;
        default:
            talismanImage.src = "https://manciniworldwide.com/wp-content/uploads/2019/02/invisible-png.png";
            break;
    }
}

window.onload = setClassAttributes;