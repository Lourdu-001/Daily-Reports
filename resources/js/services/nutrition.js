export async function getNutrition(foodQuery) {

    // ✅ FIX 1: Try Indian food database FIRST, not OpenFoodFacts
    return getIndianFoodNutrition(foodQuery);
}

function getIndianFoodNutrition(query) {
    const q = query.toLowerCase().trim();

    // Extract quantity from END of string
    const quantityMatch = q.match(/\s+(\d+\.?\d*)\s*(g|kg|ml|l|pieces?|pcs|cups?)?$/);

    let quantity = 1;
    let unit     = '';

    if (quantityMatch) {
        quantity = parseFloat(quantityMatch[1]);
        unit     = quantityMatch[2] || '';
    }

    const indianFoods = {
        'idly':           { cal: 78,  pro: 2.0,  carb: 15.0, fat: 0.5,  unit: 'piece' },
        'idli':           { cal: 78,  pro: 2.0,  carb: 15.0, fat: 0.5,  unit: 'piece' },
        'dosa':           { cal: 168, pro: 3.5,  carb: 30.0, fat: 4.5,  unit: 'piece' },
        'masala dosa':    { cal: 210, pro: 4.5,  carb: 35.0, fat: 6.0,  unit: 'piece' },
        'sambar':         { cal: 85,  pro: 4.0,  carb: 12.0, fat: 2.0,  unit: '100g'  },
        'vada':           { cal: 145, pro: 5.0,  carb: 18.0, fat: 7.0,  unit: 'piece' },
        'medu vada':      { cal: 145, pro: 5.0,  carb: 18.0, fat: 7.0,  unit: 'piece' },
        'upma':           { cal: 170, pro: 4.0,  carb: 28.0, fat: 5.0,  unit: '100g'  },
        'pongal':         { cal: 180, pro: 5.0,  carb: 30.0, fat: 5.0,  unit: '100g'  },
        'rice':           { cal: 130, pro: 2.7,  carb: 28.0, fat: 0.3,  unit: '100g'  },
        'biryani':        { cal: 180, pro: 8.0,  carb: 25.0, fat: 6.0,  unit: '100g'  },
        'mutton biryani': { cal: 220, pro: 12.0, carb: 25.0, fat: 9.0,  unit: '100g'  },
        'chicken biryani':{ cal: 195, pro: 13.0, carb: 25.0, fat: 6.0,  unit: '100g'  },
        'fried rice':     { cal: 160, pro: 4.0,  carb: 28.0, fat: 4.0,  unit: '100g'  },
        'roti':           { cal: 104, pro: 3.5,  carb: 20.0, fat: 1.5,  unit: 'piece' },
        'chapati':        { cal: 104, pro: 3.5,  carb: 20.0, fat: 1.5,  unit: 'piece' },
        'paratha':        { cal: 180, pro: 4.0,  carb: 28.0, fat: 6.0,  unit: 'piece' },
        'naan':           { cal: 262, pro: 8.7,  carb: 45.0, fat: 5.1,  unit: 'piece' },
        'semiya':         { cal: 350, pro: 8.7,  carb: 75.0, fat: 0.4,  unit: '100g' },
        'puri':           { cal: 150, pro: 3.0,  carb: 22.0, fat: 6.0,  unit: 'piece' },
        'dal':            { cal: 115, pro: 7.0,  carb: 18.0, fat: 1.5,  unit: '100g'  },
        'dal tadka':      { cal: 130, pro: 7.5,  carb: 18.0, fat: 3.0,  unit: '100g'  },
        'rajma':          { cal: 143, pro: 8.7,  carb: 22.0, fat: 2.0,  unit: '100g'  },
        'chole':          { cal: 164, pro: 8.9,  carb: 27.0, fat: 2.6,  unit: '100g'  },
        'paneer':         { cal: 265, pro: 18.3, carb: 1.2,  fat: 20.8, unit: '100g'  },
        'butter chicken': { cal: 165, pro: 15.0, carb: 8.0,  fat: 8.0,  unit: '100g'  },
        'chicken curry':  { cal: 155, pro: 15.0, carb: 5.0,  fat: 8.0,  unit: '100g'  },
        'mutton curry':   { cal: 180, pro: 16.0, carb: 4.0,  fat: 11.0, unit: '100g'  },
        'fish curry':     { cal: 140, pro: 18.0, carb: 4.0,  fat: 6.0,  unit: '100g'  },
        'samosa':         { cal: 262, pro: 5.0,  carb: 30.0, fat: 14.0, unit: 'piece' },
        'pakora':         { cal: 160, pro: 4.0,  carb: 18.0, fat: 8.0,  unit: 'piece' },
        'poha':           { cal: 158, pro: 3.5,  carb: 30.0, fat: 3.0,  unit: '100g'  },
        'chai':           { cal: 45,  pro: 1.5,  carb: 6.0,  fat: 1.5,  unit: 'cup'   },
        'lassi':          { cal: 150, pro: 5.0,  carb: 18.0, fat: 6.0,  unit: 'cup'   },
        'milk':           { cal: 61,  pro: 3.2,  carb: 4.8,  fat: 3.3,  unit: '100ml' },
        'egg':            { cal: 78,  pro: 6.0,  carb: 0.6,  fat: 5.0,  unit: 'piece' },
        'banana':         { cal: 89,  pro: 1.1,  carb: 23.0, fat: 0.3,  unit: 'piece' },
        'apple':          { cal: 52,  pro: 0.3,  carb: 14.0, fat: 0.2,  unit: '100g'  },
        'chicken':        { cal: 165, pro: 31.0, carb: 0.0,  fat: 3.6,  unit: '100g'  },
        'mutton':         { cal: 294, pro: 25.6, carb: 0.0,  fat: 21.0, unit: '100g'  },
        'fish':           { cal: 128, pro: 20.0, carb: 0.0,  fat: 5.0,  unit: '100g'  },
    };

    // Find longest matching food name
    let matchedFood = null;
    let matchedKey  = null;

    for (const [key, value] of Object.entries(indianFoods)) {
        if (q.includes(key)) {
            if (!matchedKey || key.length > matchedKey.length) {
                matchedFood = value;
                matchedKey  = key;
            }
        }
    }

    if (!matchedFood) {
        return { found: false };
    }

    // ✅ Correct multiplier logic
    let multiplier = 1;

    if (matchedFood.unit === 'piece') {
        multiplier = quantity; // dosa 4 → 4 × 168

    } else if (matchedFood.unit === '100g') {
        if (unit === 'g') {
            multiplier = quantity / 100;             // biryani 300g → 3
        } else if (unit === 'kg') {
            multiplier = (quantity * 1000) / 100;    // biryani 0.3kg → 3
        } else {
            multiplier = quantity / 100;             // biryani 300 → treat as grams
        }

    } else if (matchedFood.unit === '100ml') {
        if (unit === 'ml') {
            multiplier = quantity / 100;
        } else if (unit === 'l') {
            multiplier = (quantity * 1000) / 100;
        } else {
            multiplier = quantity / 100;
        }

    } else if (matchedFood.unit === 'cup') {
        multiplier = quantity; // chai 2 → 2 cups
    }

    return {
        found:     true,
        calories:  Math.round(matchedFood.cal  * multiplier),
        protein_g: parseFloat((matchedFood.pro  * multiplier).toFixed(1)),
        carbs_g:   parseFloat((matchedFood.carb * multiplier).toFixed(1)),
        fats_g:    parseFloat((matchedFood.fat  * multiplier).toFixed(1)),
    };
}