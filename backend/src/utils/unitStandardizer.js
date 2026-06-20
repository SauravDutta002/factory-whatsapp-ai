const standardizeUnit = (unitString) => {
    if (!unitString || typeof unitString !== 'string') return '';
    
    // Normalize string
    let normalized = unitString.toLowerCase().trim();
    // Remove plural 's' at the end if it's longer than 2 characters (e.g., 'rolls' -> 'roll', but 'pcs' remains 'pcs', 'kgs' -> 'kg' is handled)
    
    const standardMap = {
        'm': 'meter',
        'meter': 'meter',
        'meters': 'meter',
        'mtr': 'meter',
        'mtrs': 'meter',
        
        'cm': 'cm',
        'centimeter': 'cm',
        'centimeters': 'cm',
        
        'mm': 'mm',
        'millimeter': 'mm',
        'millimeters': 'mm',
        
        'kg': 'kg',
        'kgs': 'kg',
        'kilogram': 'kg',
        'kilograms': 'kg',
        'kilo': 'kg',
        'kilos': 'kg',
        
        'g': 'g',
        'gram': 'g',
        'grams': 'g',
        'gm': 'g',
        'gms': 'g',
        
        'l': 'liter',
        'liter': 'liter',
        'liters': 'liter',
        'litre': 'liter',
        'litres': 'liter',
        'ltr': 'liter',
        'ltrs': 'liter',
        
        'ml': 'ml',
        'milliliter': 'ml',
        'milliliters': 'ml',
        
        'pc': 'pcs',
        'pcs': 'pcs',
        'piece': 'pcs',
        'pieces': 'pcs',
        'nos': 'pcs',
        'number': 'pcs',
        'numbers': 'pcs',
        'unit': 'pcs',
        'units': 'pcs',
        
        'roll': 'roll',
        'rolls': 'roll',
        'rl': 'roll',
        
        'box': 'box',
        'boxes': 'box',
        'bx': 'box',
        
        'pack': 'pack',
        'packs': 'pack',
        'packet': 'pack',
        'packets': 'pack',
        'pkt': 'pack',
        'pkts': 'pack',
        
        'set': 'set',
        'sets': 'set',
        
        'pair': 'pair',
        'pairs': 'pair',
        'pr': 'pair',

        'bottle': 'bottle',
        'bottles': 'bottle',
        'btl': 'bottle',

        'can': 'can',
        'cans': 'can',

        'drum': 'drum',
        'drums': 'drum',
        
        'sheet': 'sheet',
        'sheets': 'sheet'
    };

    if (standardMap[normalized]) {
        return standardMap[normalized];
    }
    
    // Fallback: simple plural stripping if it's not a known unit
    if (normalized.length > 2 && normalized.endsWith('s')) {
        const singular = normalized.slice(0, -1);
        if (standardMap[singular]) {
            return standardMap[singular];
        }
    }

    return normalized; // Return as-is if no intelligent match
};

module.exports = standardizeUnit;
