const KNOWLEDGE_BASE = {
  Paddy: {
    traditional_practice: {
      en: 'Observe seasonal rainfall patterns and local environmental signs before deciding farm activities.',
      ta: 'வயல் பணிகளைத் தீர்மானிக்கும் முன் பருவ மழை நிலவரத்தையும் உள்ளூர் இயற்கை அறிகுறிகளையும் கவனிக்கவும்.'
    }
  },
  Millet: {
    traditional_practice: {
      en: 'Use local experience of rainfall timing and resilient crop varieties when planning millet activities.',
      ta: 'சிறுதானியப் பணிகளைத் திட்டமிடும்போது மழை வரும் காலம் குறித்த உள்ளூர் அனுபவத்தையும் தாங்கும் பயிர் வகைகளையும் கருத்தில் கொள்ளவும்.'
    }
  },
  Groundnut: {
    traditional_practice: {
      en: 'Consider local planting-time knowledge and field drainage practices when planning groundnut cultivation.',
      ta: 'நிலக்கடலை சாகுபடியைத் திட்டமிடும்போது உள்ளூர் விதைப்பு காலத்தையும் வயல் வடிகால் முறைகளையும் கருத்தில் கொள்ளவும்.'
    }
  },
  Cotton: {
    traditional_practice: {
      en: 'Use local observations of seasonal conditions and crop development to guide cotton field activities.',
      ta: 'பருத்தி வயல் பணிகளைத் தீர்மானிக்கப் பருவ நிலை மற்றும் பயிர் வளர்ச்சி குறித்த உள்ளூர் கவனிப்புகளைப் பயன்படுத்தவும்.'
    }
  }
};

const guidanceTranslations = {
  en: {
    context: (crop, location, state, season) => `For ${crop} in ${location}, ${state}, during ${season}, compare this traditional practice with current local agricultural information.`,
    weather: {
      Rainy: 'Review current rainfall conditions before carrying out the next farm activity.',
      Sunny: 'Review soil moisture and crop condition before deciding the next activity.',
      Cloudy: 'Monitor local weather and crop conditions before deciding the next farm activity.'
    },
    soil: {
      Clay: 'Check drainage and avoid working clay soil while it is very wet.',
      Sandy: 'Check soil moisture often because sandy soil dries quickly.',
      Loamy: 'Check soil moisture and field condition before the next activity.',
      'Sandy Loam': 'Check moisture regularly; sandy loam drains quickly but holds more water than sandy soil.',
      'Silty Soil': 'Avoid working silty soil when wet to reduce compaction and erosion.',
      'Black Soil': 'Check drainage and soil moisture; black soil can hold water for longer.',
      'Red Soil': 'Check soil moisture and consider adding organic matter where suitable.',
      'Alluvial Soil': 'Check local drainage and nutrient conditions before applying inputs.',
      'Laterite Soil': 'Check moisture and soil nutrients; use locally recommended soil amendments.',
      'Peaty Soil': 'Check drainage and avoid disturbing wet, organic-rich soil.'
    }
  },
  ta: {
    context: (crop, location, state, season) => `${location}, ${state} பகுதியில் ${season} பருவத்தில் ${crop} பயிருக்காக, இந்த பாரம்பரிய நடைமுறையை தற்போதைய உள்ளூர் விவசாயத் தகவலுடன் ஒப்பிட்டுப் பார்க்கவும்.`,
    weather: {
      Rainy: 'அடுத்த வயல் பணியைச் செய்வதற்கு முன் தற்போதைய மழை நிலவரத்தைச் சரிபார்க்கவும்.',
      Sunny: 'அடுத்த பணியை முடிவு செய்வதற்கு முன் மண்ணின் ஈரப்பதத்தையும் பயிரின் நிலையையும் பார்க்கவும்.',
      Cloudy: 'அடுத்த வயல் பணியை முடிவு செய்வதற்கு முன் உள்ளூர் வானிலை மற்றும் பயிர் நிலையை கவனிக்கவும்.'
    },
    soil: {
      Clay: 'வடிகால் நிலையைப் பார்த்து, மிகவும் ஈரமான களிமண்ணில் உழவு செய்வதைத் தவிர்க்கவும்.',
      Sandy: 'மணற்பாங்கான மண் விரைவாக உலர்வதால் ஈரப்பதத்தை அடிக்கடி சரிபார்க்கவும்.',
      Loamy: 'அடுத்த பணிக்கு முன் மண்ணின் ஈரப்பதத்தையும் வயல் நிலையையும் பார்க்கவும்.',
      'Sandy Loam': 'இந்த மண் விரைவாக நீரை வடிக்கும்; ஈரப்பதத்தைத் தொடர்ந்து சரிபார்க்கவும்.',
      'Silty Soil': 'வண்டல் மண் ஈரமாக இருக்கும்போது உழுவதைத் தவிர்த்து மண் இறுக்கத்தையும் அரிப்பையும் குறைக்கவும்.',
      'Black Soil': 'கரிசல் மண் நீரை நீண்ட நேரம் தக்கவைக்கலாம்; ஈரப்பதம் மற்றும் வடிகாலைச் சரிபார்க்கவும்.',
      'Red Soil': 'மண்ணின் ஈரப்பதத்தைச் சரிபார்த்து, தேவைக்கேற்ப உள்ளூர் பரிந்துரைப்படி கரிமப் பொருள் சேர்க்கவும்.',
      'Alluvial Soil': 'உரம் இடுவதற்கு முன் உள்ளூர் வடிகால் மற்றும் மண் ஊட்டச்சத்து நிலையைச் சரிபார்க்கவும்.',
      'Laterite Soil': 'ஈரப்பதம் மற்றும் ஊட்டச்சத்தைச் சரிபார்த்து, உள்ளூர் பரிந்துரைப்படி மண் திருத்தம் செய்யவும்.',
      'Peaty Soil': 'வடிகால் நிலையைச் சரிபார்த்து, ஈரமான கரிம மண்ணைக் கிளறுவதைத் தவிர்க்கவும்.'
    }
  }
};

function cleanText(value) {
  if (typeof value !== 'string') return '';
  return value.trim();
}

function buildGuidance(lang, crop, location, state, season, weather, soil) {
  const translationsForLanguage = guidanceTranslations[lang] || guidanceTranslations.en;
  return [
    translationsForLanguage.context(crop, location, state, season),
    translationsForLanguage.weather[weather] || translationsForLanguage.weather.Cloudy,
    translationsForLanguage.soil[soil] || translationsForLanguage.soil.Loamy
  ];
}

function analyseField(data) {
  const crop = cleanText(data.crop);
  const location = cleanText(data.location);
  const state = cleanText(data.state) || 'unspecified state';
  const season = cleanText(data.season) || 'unspecified season';
  const weather = cleanText(data.weather) || 'unspecified weather';
  const soil = cleanText(data.soil) || 'unspecified soil';

  if (!crop || !location) {
    throw new Error('Crop and location are required.');
  }

  const cropKnowledge = KNOWLEDGE_BASE[crop];
  if (!cropKnowledge) {
    return {
      success: false,
      crop,
      message: `Traditional knowledge for ${crop} is not available yet.`
    };
  }

  const lang = (data.language || 'en').toLowerCase();
  const safeLang = ['en', 'ta'].includes(lang) ? lang : 'en';

  return {
    success: true,
    crop,
    location,
    state,
    season,
    weather,
    soil,
    language: safeLang,
    traditional_practice: cropKnowledge.traditional_practice[safeLang] || cropKnowledge.traditional_practice.en,
    guidance: buildGuidance(safeLang, crop, location, state, season, weather, soil)
  };
}

module.exports = function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const result = analyseField(request.body || {});
    if (!result.success) {
      return response.status(400).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    return response.status(400).json({ success: false, message: error && error.message ? error.message : 'Analysis failed.' });
  }
};
