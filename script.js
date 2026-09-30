const sessionStorageKey = "fieldwiseLocalSession";
document.body.hidden = true;

if (localStorage.getItem(sessionStorageKey)) {
  document.body.hidden = false;
} else {
  window.location.replace("login.html");
}

const logoutButton = document.querySelector("#logout-button");
const analysisForm = document.querySelector("#analysis-form");
const formStatus = document.querySelector("#form-status");
const submitButton = analysisForm.querySelector("[type='submit']");
const buttonLabel = submitButton.querySelector(".button-label");
const resultEmpty = document.querySelector("#result-empty");
const resultContent = document.querySelector("#result-content");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const chatSection = document.querySelector("#assistant-chat");
const chatForm = document.querySelector("#chat-form");
const chatQuestionInput = document.querySelector("#chat-question");
const chatMessages = document.querySelector("#chat-messages");
const chatContextLabel = document.querySelector("#chat-context-label");
let fieldChatContext = null;
let previousChatTopic = "";

const englishTranslations = {
  navApproach: "Our approach",
  navAssistant: "AI assistant",
  navHow: "How it works",
  navLogout: "Logout",
  navTry: "Try the assistant",
  heroEyebrow: "Agricultural intelligence, rooted in experience",
  heroTitle: "AI-Powered Traditional Farming Intelligence",
  heroSubtitle: "Bringing traditional farming knowledge into modern agriculture with AI.",
  heroStart: "Start AI Analysis",
  heroDiscover: "Discover our approach",
  heroFoot: "LOCAL WISDOM. BETTER-INFORMED FARMING.",
  fieldNotes: "FIELD NOTES",
  fieldNoteCaption: "Knowledge grows when it is shared.",
  methodLabel: "FIELDWISE / METHOD 01",
  signal1: "Local knowledge",
  signal2: "Modern data",
  signal3: "Informed decisions",
  signalNote: "A new kind of farming conversation",
  oppLabel: "01 — The opportunity",
  oppTitle: "Good knowledge\ndeserves to travel.",
  oppLead: "For generations, farmers have read the land through lived experience. That wisdom is valuable, but too often it is shared informally and can be difficult for others to access.",
  pointAHead: "Experience is passed person to person",
  pointAText: "Traditional farming knowledge is often shared informally, making it easy to miss or lose between generations.",
  pointBHead: "Nature holds useful signals",
  pointBText: "Natural signs, seasonal patterns and local experience offer valuable context for everyday farming decisions.",
  pointCHead: "Context belongs together",
  pointCText: "Farmers need a simple way to connect traditional knowledge with modern weather, soil and agricultural information.",
  solutionLabel: "02 — Our solution",
  solutionTitle: "Two ways of knowing.\nOne clearer next step.",
  solutionText: "We bring local practices and present-day context into one accessible AI-assisted process.",
  input01: "INPUT 01",
  input02: "INPUT 02",
  tradFarm: "Traditional Farming\nKnowledge",
  modernData: "Modern Agricultural\nData",
  interpret: "INTERPRET",
  aiAnalysis: "AI Analysis",
  contextAware: "CONTEXT-AWARE",
  output: "OUTPUT",
  farmingGuidance: "Farming Guidance",
  assistantLabel: "03 — Try the assistant",
  assistantTitle: "Start with your field.",
  assistantText: "Share a few details to request guidance shaped by your crop, season and local conditions.",
  chatLabel: "FIELD FOLLOW-UP",
  chatTitle: "Ask another question",
  chatPrompt: "Ask about water, soil, pests, fertilizer, planting or crop care.",
  chatPlaceholder: "Type a question about your field...",
  chatQuestionLabel: "Your question",
  chatSend: "Ask",
  chatContextPrefix: "Current field",
  chatWorking: "Checking your field details...",
  chatTopics: { water: "water", soil: "soil", pest: "pests or symptoms", fertilizer: "fertilizer", sowing: "planting time", crop: "crop care" },
  chatWaterRain: (crop) => `Rain is selected for this ${crop} field. Check whether the root zone is already wet and keep drainage channels clear; do not irrigate just by routine while rain is continuing.`,
  chatWaterDry: (crop, soil) => `For ${crop} in ${soil}, check moisture near the active roots before irrigating. Sandy soils dry faster; clay and black soils can stay wet longer. Use the local forecast and crop stage to decide timing.`,
  chatSoil: (soil) => `The selected soil is ${soil}. Check field moisture and drainage before the next operation. Avoid working soil when it is waterlogged; a soil test is the reliable way to decide nutrient amendments.`,
  chatPest: "I cannot identify a pest from text alone. Check both sides of leaves, stems and nearby plants; note the crop stage and how quickly symptoms are spreading. Share a clear photo or consult your local agricultural officer before spraying.",
  chatFertilizer: "I cannot safely give a fertilizer dose without a soil test, crop stage and field area. Use a recent soil-test recommendation and the product label; avoid mixing or increasing doses on guesswork.",
  chatSowing: (crop, season) => `For ${crop} in ${season}, use local sowing guidance together with current rainfall and soil moisture. Tell me your planned sowing date and crop stage if you want help checking the timing.`,
  chatCrop: (crop, weather) => `For ${crop}, the current report is ${weather}. Check the crop stand and new growth across several spots in the field, then base the next operation on the crop stage and local forecast. What growth stage is the crop in?`,
  chatNeedDetails: (crop) => `I can help with water, soil, pests, fertilizer, planting or crop care for ${crop}. Add the crop stage and the exact symptom or decision you are facing.`,
  chatUnknown: "I do not have enough field-specific information to answer that reliably. Ask about water, soil, pests, fertilizer, planting or crop care, and include the crop stage or observed symptom.",
  chatEmpty: "Type a question about this field first.",
  fieldProfile: "FIELD PROFILE",
  allFieldsRequired: "ALL FIELDS REQUIRED",
  formLanguage: "Language",
  selectLanguage: "Select a language",
  formState: "State",
  selectState: "Select a state",
  formCrop: "Crop",
  selectCrop: "Select a crop",
  formLocation: "Location",
  formLocationPlaceholder: "Village, district or region",
  formSeason: "Season",
  selectSeason: "Select a season",
  formWeather: "Current weather",
  selectWeather: "Select current weather",
  formSoil: "Soil type",
  selectSoil: "Select a soil type",
  submitAnalyze: "Analyse with AI",
  analysisLoading: "Analysing...",
  guidanceLoading: "Preparing field guidance...",
  guidanceUnavailable: "No guidance was returned for this request.",
  analysisOutput: "ANALYSIS OUTPUT",
  resultTitle: "Your field, in context.",
  resultEmpty: "Complete the field profile and run an analysis. Your response will appear here.",
  resultLanguage: "LANGUAGE",
  resultState: "STATE",
  resultCrop: "CROP",
  resultLocation: "LOCATION",
  resultSoil: "SOIL",
  tradKnowledge: "TRADITIONAL KNOWLEDGE",
  aiGuidance: "AI GUIDANCE",
  processLabel: "04 — How it works",
  processTitle: "From field notes\nto thoughtful guidance.",
  processText: "A simple sequence makes room for both community knowledge and current conditions.",
  process01Head: "Farmer Input",
  process01Text: "Share crop, location, season, weather and soil.",
  process02Head: "Gather Context",
  process02Text: "Organize the field details that shape a decision.",
  process03Head: "Retrieve Traditional Practices",
  process03Text: "Bring relevant local and crop-specific knowledge into view.",
  process04Head: "Compare",
  process04Text: "Consider traditional practice alongside modern context.",
  process05Head: "Generate Guidance",
  process05Text: "Present a clear response to support informed choices.",
  benefitsLabel: "05 — Why it matters",
  benefitsTitle: "A stronger link between\nknowledge and action.",
  benefit01Tag: "PRESERVE",
  benefit01Head: "Keep local knowledge growing",
  benefit01Text: "Help preserve farming knowledge that might otherwise remain undocumented.",
  benefit02Tag: "ACCESS",
  benefit02Head: "Make practices easier to find",
  benefit02Text: "Improve access to traditional practices for farmers and the next generation.",
  benefit03Tag: "CONNECT",
  benefit03Head: "Bring context together",
  benefit03Text: "Connect traditional knowledge with modern agricultural data and conditions.",
  benefit04Tag: "SUPPORT",
  benefit04Head: "Make informed decisions",
  benefit04Text: "Support thoughtful farming decisions with relevant, understandable guidance.",
  futureLabel: "06 — Looking ahead",
  futureTitle: "Room to grow.",
  futureText: "The next chapter connects more voices, more places and more ways of understanding the land.",
  future01: "Tamil voice assistant",
  future02: "Regional knowledge database",
  future03: "Soil and weather sensors",
  future04: "Crop-specific models",
  future05: "Digitized historical records",
  future06: "Advisory-service integration",
  footerTag: "Traditional wisdom. Modern perspective.",
  footerTop: "Back to top",
  footerSmall: "College project demonstration · AI-assisted decision support",
  loginBack: "Back to website",
  loginWorkspace: "FARMER WORKSPACE",
  loginWelcome: "Welcome back.",
  loginIntro: "Sign in to continue to your farming intelligence workspace.",
  loginPassword: "Password",
  loginShow: "Show",
  loginRemember: "Remember me",
  loginForgot: "Forgot password?",
  loginSignIn: "Sign in",
  loginFootnote: "This project demo does not send or store your credentials."
};

const taTranslations = {
  navApproach: "எங்கள் அணுகுமுறை",
  navAssistant: "AI ஆலோசகர்",
  navHow: "இது எப்படி வேலை செய்கிறது",
  navLogout: "வெளியேறு",
  navTry: "ஆலோசகரை முயற்சிக்கவும்",
  heroEyebrow: "நிலத்துடன் இணைந்த விவசாய நுண்ணறிவு",
  heroTitle: "AI-இயங்கும் பாரம்பரிய விவசாய நுண்ணறிவு",
  heroSubtitle: "பாரம்பரிய விவசாய அறிவை நவீன விவசாயத்துடன் இணைக்கிறது.",
  heroStart: "AI பகுப்பாய்வை தொடங்கவும்",
  heroDiscover: "எங்கள் அணுகுமுறையை கண்டறியவும்",
  heroFoot: "உள்ளூர் ஞானம். சிறந்த முடிவுகள்.",
  fieldNotes: "கள குறிப்புகள்",
  fieldNoteCaption: "அறிவு பகிரும்போது வளர்கிறது.",
  methodLabel: "FIELDWISE / முறை 01",
  signal1: "உள்ளூர் அறிவு",
  signal2: "நவீன தரவு",
  signal3: "தகவலறிந்த முடிவுகள்",
  signalNote: "விவசாயம் பற்றிய புதிய உரையாடல்",
  oppLabel: "01 — வாய்ப்பு",
  oppTitle: "நல்ல அறிவு\nபயணிக்க தகுதியுள்ளது.",
  oppLead: "காலங்களாக, விவசாயிகள் நிலத்தை அனுபவத்தின் மூலம் புரிந்துள்ளனர். அந்த ஞானம் மதிப்புமிக்கது; ஆனால் பெரும்பாலும் முறையானதாகப் பகிரப்படுவதில்லை.",
  pointAHead: "அனுபவம் ஒருவரிடமிருந்து இன்னொருவருக்கு செல்லும்",
  pointAText: "பாரம்பரிய விவசாய அறிவு பெரும்பாலும் முறைசாராக பகிரப்படுகிறது; இதனால் தலைமுறைகள் இடையே இழக்கப்படுகிறது.",
  pointBHead: "இயற்கை பயனுள்ள குறிப்புகளை தருகிறது",
  pointBText: "பருவங்கள், மழை, நிலைமை மற்றும் உள்ளூர் அனுபவம் ஆகியவை தினசரி முடிவுகளை நன்கு பாதிக்கின்றன.",
  pointCHead: "சூழல் ஒன்றாக இருக்க வேண்டும்",
  pointCText: "விவசாயிகள் பாரம்பரிய அறிவையும், மழை, மண் மற்றும் விவசாயத் தரவுகளையும் இணைக்க எளிய வழி தேவைப்படுகிறார்கள்.",
  solutionLabel: "02 — எங்கள் தீர்வு",
  solutionTitle: "இரண்டு விதமான அறிவு.\nஒரு தெளிவான அடுத்த படி.",
  solutionText: "உள்ளூர் பழக்கவழக்கங்களையும் தற்போது உள்ள சூழலையும் ஒரு AI-ஆதரவு செயல்முறையில் ஒன்றிணைக்கிறோம்.",
  input01: "உள்ளீடு 01",
  input02: "உள்ளீடு 02",
  tradFarm: "பாரம்பரிய விவசாயம்\nஅறிவு",
  modernData: "நவீன விவசாய\nதரவு",
  interpret: "விளக்கம்",
  aiAnalysis: "AI பகுப்பாய்வு",
  contextAware: "சூழல்-அறிந்த",
  output: "வெளியீடு",
  farmingGuidance: "விவசாய வழிகாட்டல்",
  assistantLabel: "03 — ஆலோசகரை முயற்சிக்கவும்",
  assistantTitle: "உங்கள் வயலை தொடங்குங்கள்.",
  assistantText: "கூலு, பருவம் மற்றும் உள்ளூர் நிலைமைகளை அடிப்படையாகக் கொண்டு தேவையான விவரங்களை பகிருங்கள்.",
  chatLabel: "வயல் தொடர்பான கேள்விகள்",
  chatTitle: "தொடர்ந்து கேளுங்கள்",
  chatPrompt: "நீர், மண், பூச்சி, உரம், விதைப்பு அல்லது பயிர் பராமரிப்பு பற்றி கேளுங்கள்.",
  chatPlaceholder: "உங்கள் வயலைப் பற்றி கேள்வி எழுதுங்கள்...",
  chatQuestionLabel: "உங்கள் கேள்வி",
  chatSend: "கேள்",
  chatContextPrefix: "தற்போதைய வயல்",
  chatWorking: "உங்கள் வயல் விவரங்களைப் பார்க்கிறேன்...",
  chatTopics: { water: "நீர்", soil: "மண்", pest: "பூச்சி அல்லது அறிகுறிகள்", fertilizer: "உரம்", sowing: "விதைப்பு காலம்", crop: "பயிர் பராமரிப்பு" },
  chatWaterRain: (crop) => `${crop} வயலுக்கு மழை எனத் தேர்ந்தெடுத்துள்ளீர்கள். வேர் பகுதியில் மண் ஏற்கனவே ஈரமாக உள்ளதா என்று பார்த்து வடிகால் வாய்க்கால்களைத் திறந்துவையுங்கள். தொடர்ந்து மழை பெய்யும்போது வழக்கம்போல் பாசனம் செய்ய வேண்டாம்.`,
  chatWaterDry: (crop, soil) => `${soil} மண்ணில் உள்ள ${crop} பயிருக்கு பாசனம் செய்வதற்கு முன் வேர் பகுதியில் ஈரப்பதத்தைச் சரிபார்க்கவும். மணற்பாங்கான மண் விரைவாக உலரும்; களிமண் மற்றும் கரிசல் மண் நீரை நீண்ட நேரம் தக்கவைக்கலாம். பயிர் வளர்ச்சி நிலை மற்றும் உள்ளூர் வானிலை முன்னறிவிப்பையும் கவனிக்கவும்.`,
  chatSoil: (soil) => `தேர்ந்தெடுத்த மண் வகை ${soil}. அடுத்த வயல் பணிக்கு முன் ஈரப்பதம் மற்றும் வடிகால் நிலையைப் பார்க்கவும். நீர் தேங்கிய மண்ணில் வேலை செய்வதைத் தவிர்க்கவும். ஊட்டச்சத்து திருத்தங்களை முடிவு செய்ய மண் பரிசோதனையைப் பயன்படுத்தவும்.`,
  chatPest: "எழுத்து விவரத்தை மட்டும் வைத்து பூச்சி அல்லது நோயை உறுதிப்படுத்த முடியாது. இலைகளின் இருபுறம், தண்டு மற்றும் அருகிலுள்ள செடிகளைப் பார்க்கவும்; பயிர் வளர்ச்சி நிலை மற்றும் அறிகுறி பரவும் வேகத்தைக் குறிக்கவும். தெளிப்பதற்கு முன் தெளிவான படத்துடன் உள்ளூர் வேளாண்மை அலுவலரிடம் உறுதிப்படுத்தவும்.",
  chatFertilizer: "மண் பரிசோதனை, பயிர் வளர்ச்சி நிலை மற்றும் வயல் பரப்பளவு இல்லாமல் உர அளவைத் துல்லியமாகச் சொல்ல முடியாது. சமீபத்திய மண் பரிசோதனை பரிந்துரையையும் உரப் பொதியின் வழிமுறையையும் பின்பற்றவும்; ஊகத்தின் அடிப்படையில் அளவை அதிகரிக்கவோ உரங்களை கலக்கவோ வேண்டாம்.",
  chatSowing: (crop, season) => `${season} பருவத்தில் ${crop} விதைப்புக்கு உள்ளூர் பரிந்துரையுடன் தற்போதைய மழை மற்றும் மண் ஈரப்பதத்தையும் பார்க்கவும். விதைக்கத் திட்டமிட்ட நாள் மற்றும் பயிரின் வளர்ச்சி நிலையைச் சொன்னால் காலத்தைச் சரிபார்க்க உதவுகிறேன்.`,
  chatCrop: (crop, weather) => `${crop} பயிருக்கு தற்போதைய வானிலை ${weather}. வயலின் பல இடங்களில் பயிர் வளர்ச்சியையும் புதிய தளிர்களையும் கவனித்து, வளர்ச்சி நிலை மற்றும் உள்ளூர் வானிலைக்கு ஏற்ப அடுத்த பணியை முடிவு செய்யவும். இப்போது பயிர் எந்த வளர்ச்சி நிலையில் உள்ளது?`,
  chatNeedDetails: (crop) => `${crop} பயிருக்கு நீர், மண், பூச்சி, உரம், விதைப்பு அல்லது பயிர் பராமரிப்பு பற்றி உதவ முடியும். பயிரின் வளர்ச்சி நிலையையும் நீங்கள் சந்திக்கும் குறிப்பிட்ட அறிகுறி அல்லது முடிவையும் சேர்த்துக் கேளுங்கள்.`,
  chatUnknown: "நம்பகமாகப் பதிலளிக்க வயல் விவரங்கள் போதவில்லை. நீர், மண், பூச்சி, உரம், விதைப்பு அல்லது பயிர் பராமரிப்பு பற்றி கேட்டு, பயிர் வளர்ச்சி நிலை அல்லது அறிகுறியையும் குறிப்பிடுங்கள்.",
  chatEmpty: "முதலில் உங்கள் வயலைப் பற்றிய கேள்வியை எழுதுங்கள்.",
  fieldProfile: "கள விவரம்",
  allFieldsRequired: "அனைத்து புலங்களும் அவசியம்",
  formLanguage: "மொழி",
  selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
  formState: "மாநிலம்",
  selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
  formCrop: "பயிர்",
  selectCrop: "பயிரைத் தேர்ந்தெடுக்கவும்",
  formLocation: "இடம்",
  formLocationPlaceholder: "கிராமம், மாவட்டம் அல்லது பகுதி",
  formSeason: "பருவம்",
  selectSeason: "பருவத்தைத் தேர்ந்தெடுக்கவும்",
  formWeather: "தற்போதைய வானிலை",
  selectWeather: "வானிலையைத் தேர்ந்தெடுக்கவும்",
  formSoil: "மண் வகை",
  selectSoil: "மண் வகையைத் தேர்ந்தெடுக்கவும்",
  submitAnalyze: "AI உடன் பகுப்பாய்வு",
  analysisLoading: "பகுப்பாய்வு செய்யப்படுகிறது...",
  guidanceLoading: "வயலுக்கான வழிகாட்டல் தயாராகிறது...",
  guidanceUnavailable: "இந்த விவரங்களுக்கு வழிகாட்டல் கிடைக்கவில்லை.",
  analysisOutput: "பகுப்பாய்வு வெளியீடு",
  resultTitle: "உங்கள் வயல், சூழலுடன்.",
  resultEmpty: "கள விவரங்களை பூர்த்தி செய்து பகுப்பாய்வை இயக்குங்கள். உங்கள் பதில் இங்கே தோன்றும்.",
  resultLanguage: "மொழி",
  resultState: "மாநிலம்",
  resultCrop: "பயிர்",
  resultLocation: "இடம்",
  resultSoil: "மண் வகை",
  tradKnowledge: "பாரம்பரிய அறிவு",
  aiGuidance: "AI வழிகாட்டல்",
  processLabel: "04 — இது எப்படி வேலை செய்கிறது",
  processTitle: "கள குறிப்புகளிலிருந்து\nதகவலறிந்த வழிகாட்டல் வரை.",
  processText: "சமூக அறிவையும் தற்போதைய நிலைமைகளையும் இணைக்கும் எளிய வரிசை.",
  process01Head: "விவசாயி உள்ளீடு",
  process01Text: "பயிர், இடம், பருவம், வானிலை மற்றும் மண் விவரங்களை பகிரவும்.",
  process02Head: "சூழலை சேகரித்தல்",
  process02Text: "முடிவை பாதிக்கும் கள விவரங்களை ஒழுங்கமைக்கவும்.",
  process03Head: "பாரம்பரிய நடைமுறைகளை மீட்டெடுத்தல்",
  process03Text: "உள்ளூர் மற்றும் பயிர் சார்ந்த அறிவைப் பார்க்கவும்.",
  process04Head: "ஒப்பீடு",
  process04Text: "பாரம்பரிய நடைமுறையையும் நவீன சூழலையும் ஒப்பிடவும்.",
  process05Head: "வழிகாட்டல் உருவாக்கம்",
  process05Text: "தெரிவான பதிலை வழங்கி அறிவார்ந்த முடிவுக்கு உதவவும்.",
  benefitsLabel: "05 — ஏன் இது முக்கியம்",
  benefitsTitle: "அறிவு மற்றும் செயலுக்கு\nஇடையே வலிமையான தொடர்பு.",
  benefit01Tag: "பாதுகாத்தல்",
  benefit01Head: "உள்ளூர் அறிவை வளர்த்தெடுங்கள்",
  benefit01Text: "ஆவணமாக்கப்படாமல் போகக்கூடிய விவசாய அறிவை பாதுகாக்கவும்.",
  benefit02Tag: "அணுகல்",
  benefit02Head: "பயிற்சிகளை எளிதாக கண்டறியவும்",
  benefit02Text: "விவசாயிகளுக்கும் அடுத்த தலைமுறைக்கும் பாரம்பரிய பழக்கங்களை எளிதாகப் பெறுவதற்கு உதவுங்கள்.",
  benefit03Tag: "இணைப்பு",
  benefit03Head: "சூழலை ஒன்றாக கொண்டுவரவும்",
  benefit03Text: "பாரம்பரிய அறிவை நவீன விவசாயத் தரவு மற்றும் நிலைமைகளுடன் இணைக்கவும்.",
  benefit04Tag: "ஆதரவு",
  benefit04Head: "அறிவார்ந்த முடிவுகளை எடுக்கவும்",
  benefit04Text: "பொருத்தமான, புரியும் வகையில் வழிகாட்டலை வழங்குவதன் மூலம் சிந்தனைமிக்க விவசாய முடிவுகளை ஆதரிக்கவும்.",
  futureLabel: "06 — எதிர்காலம்",
  futureTitle: "வளர இடம் உள்ளது.",
  futureText: "அடுத்த கட்டம் மேலும் குரல்கள், இடங்கள் மற்றும் நிலத்தைப் புரிந்துகொள்ளும் வழிகளைக் கொண்டுவருகிறது.",
  future01: "தமிழ் குரல் உதவியாளர்",
  future02: "மண்டல அறிவு தரவுத்தளம்",
  future03: "மண் மற்றும் வானிலை உணரிகள்",
  future04: "பயிர் சார்ந்த மாதிரிகள்",
  future05: "டிஜிட்டல் வரலாற்று பதிவுகள்",
  future06: "பரிந்துரை சேவை ஒருங்கிணைப்பு",
  footerTag: "பாரம்பரிய ஞானம். நவீன கண்ணோட்டம்.",
  footerTop: "மேலே செல்லவும்",
  footerSmall: "கல்லூரி திட்டக் காட்சி · AI-ஆதரவு முடிவுக் காட்சி",
  loginBack: "வலைத்தளத்துக்குத் திரும்பு",
  loginWorkspace: "விவசாயி பணியிடம்",
  loginWelcome: "மீண்டும் வரவேற்கிறோம்.",
  loginIntro: "உங்கள் விவசாய நுண்ணறிவு பணியிடத்தை தொடர உள்நுழைக.",
  loginPassword: "கடவுச்சொல்",
  loginShow: "காட்டு",
  loginRemember: "என்னை நினைவில் கொள்ளவும்",
  loginForgot: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
  loginSignIn: "உள்நுழைக",
  loginFootnote: "இந்த திட்ட மாதிரி உங்கள் தளவுகளை அனுப்பவோ சேமிக்கவோ இல்லை."
};

const hiTranslations = {
  navApproach: "हमारा तरीका",
  navAssistant: "AI सहायक",
  navHow: "यह कैसे काम करता है",
  navLogout: "लॉगआउट",
  navTry: "सहायक आज़माएँ",
  heroEyebrow: "अनुभव से जुड़ी कृषि बुद्धिमत्ता",
  heroTitle: "एआई-आधारित पारंपरिक कृषि बुद्धिमत्ता",
  heroSubtitle: "पारंपरिक कृषि ज्ञान को आधुनिक कृषि से जोड़ता है।",
  heroStart: "AI विश्लेषण शुरू करें",
  heroDiscover: "हमारा तरीका देखें",
  heroFoot: "स्थानीय ज्ञान. बेहतर-informed खेती.",
  fieldNotes: "फील्ड नोट्स",
  fieldNoteCaption: "ज्ञान साझा होने पर बढ़ता है।",
  methodLabel: "FIELDWISE / मेथड 01",
  signal1: "स्थानीय ज्ञान",
  signal2: "आधुनिक डेटा",
  signal3: "सूचित निर्णय",
  signalNote: "कृषि की एक नई बातचीत",
  oppLabel: "01 — अवसर",
  oppTitle: "अच्छा ज्ञान\nयात्रा के योग्य है।",
  oppLead: "पीढ़ियों से, किसान अनुभव के माध्यम से भूमि को समझते आए हैं। यह ज्ञान मूल्यवान है, लेकिन अक्सर अनौपचारिक रूप से साझा किया जाता है।",
  pointAHead: "अनुभव व्यक्ति से व्यक्ति तक पहुँचता है",
  pointAText: "पारंपरिक कृषि ज्ञान अक्सर अनौपचारिक रूप से साझा होता है, इसलिए यह पीढ़ियों के बीच खो सकता है।",
  pointBHead: "प्रकृति उपयोगी संकेत देती है",
  pointBText: "मौसम, मौसमी पैटर्न और स्थानीय अनुभव रोज़मर्रा के निर्णयों के लिए महत्वपूर्ण संदर्भ देते हैं।",
  pointCHead: "संदर्भ एक साथ आते हैं",
  pointCText: "किसानों को पारंपरिक ज्ञान और आधुनिक मौसम, मिट्टी तथा कृषि जानकारी को जोड़ने का आसान तरीका चाहिए।",
  solutionLabel: "02 — हमारा समाधान",
  solutionTitle: "दो तरह का ज्ञान।\nएक स्पष्ट अगला कदम।",
  solutionText: "हम स्थानीय प्रथाओं और वर्तमान संदर्भ को एक AI-सहायता प्रक्रिया में जोड़ते हैं।",
  input01: "इनपुट 01",
  input02: "इनपुट 02",
  tradFarm: "पारंपरिक कृषि\nज्ञान",
  modernData: "आधुनिक कृषि\nडेटा",
  interpret: "व्याख्या",
  aiAnalysis: "AI विश्लेषण",
  contextAware: "संदर्भ-आधारित",
  output: "आउटपुट",
  farmingGuidance: "कृषि मार्गदर्शन",
  assistantLabel: "03 — सहायक आज़माएँ",
  assistantTitle: "अपने खेत से शुरू करें।",
  assistantText: "अपनी फसल, मौसम और स्थानीय परिस्थितियों के आधार पर कुछ विवरण साझा करें।",
  fieldProfile: "फील्ड प्रोफ़ाइल",
  allFieldsRequired: "सभी फील्ड आवश्यक हैं",
  formLanguage: "भाषा",
  selectLanguage: "भाषा चुनें",
  formState: "राज्य",
  selectState: "राज्य चुनें",
  formCrop: "फसल",
  selectCrop: "फसल चुनें",
  formLocation: "स्थान",
  formLocationPlaceholder: "गाँव, जिला या क्षेत्र",
  formSeason: "मौसम/सीज़न",
  selectSeason: "सीज़न चुनें",
  formWeather: "वर्तमान मौसम",
  selectWeather: "मौसम चुनें",
  formSoil: "मिट्टी का प्रकार",
  selectSoil: "मिट्टी चुनें",
  submitAnalyze: "AI के साथ विश्लेषण",
  analysisOutput: "विश्लेषण आउटपुट",
  resultTitle: "आपका खेत, संदर्भ के साथ।",
  resultEmpty: "फील्ड प्रोफ़ाइल भरें और विश्लेषण चलाएँ। आपका उत्तर यहाँ दिखाई देगा।",
  resultLanguage: "भाषा",
  resultState: "राज्य",
  resultCrop: "फसल",
  resultLocation: "स्थान",
  resultSoil: "मिट्टी",
  tradKnowledge: "पारंपरिक ज्ञान",
  aiGuidance: "AI मार्गदर्शन",
  processLabel: "04 — यह कैसे काम करता है",
  processTitle: "फील्ड नोट्स से\nसूचित मार्गदर्शन तक।",
  processText: "एक सरल अनुक्रम समुदाय के ज्ञान और वर्तमान स्थितियों को जगह देता है।",
  process01Head: "किसान इनपुट",
  process01Text: "फसल, स्थान, सीज़न, मौसम और मिट्टी साझा करें।",
  process02Head: "संदर्भ इकट्ठा करें",
  process02Text: "निर्णय को प्रभावित करने वाले विवरणों को व्यवस्थित करें।",
  process03Head: "पारंपरिक प्रथाएँ ढूँढें",
  process03Text: "स्थानीय और फसल-विशिष्ट ज्ञान को देखें।",
  process04Head: "तुलना करें",
  process04Text: "पारंपरिक प्रथा को आधुनिक संदर्भ के साथ देखें।",
  process05Head: "मार्गदर्शन बनाएं",
  process05Text: "स्पष्ट उत्तर देने से सूचित निर्णय को सहारा मिलता है।",
  benefitsLabel: "05 — यह क्यों महत्वपूर्ण है",
  benefitsTitle: "ज्ञान और कार्रवाई के बीच\nमजबूत संबंध।",
  benefit01Tag: "संरक्षण",
  benefit01Head: "स्थानीय ज्ञान बढ़ाएँ",
  benefit01Text: "कृषि ज्ञान को सुरक्षित रखें जो अन्यथा दस्तावेज़ में नहीं आता।",
  benefit02Tag: "पहुँच",
  benefit02Head: "प्रथाओं तक आसान पहुँच",
  benefit02Text: "किसानों और अगली पीढ़ी के लिए पारंपरिक प्रथाओं को आसान बनाएं।",
  benefit03Tag: "कनेक्ट",
  benefit03Head: "संदर्भ को एक साथ लाएँ",
  benefit03Text: "पारंपरिक ज्ञान को आधुनिक कृषि डेटा और परिस्थितियों के साथ जोड़ें।",
  benefit04Tag: "सहायता",
  benefit04Head: "सूचित निर्णय लें",
  benefit04Text: "उपयुक्त और समझने योग्य मार्गदर्शन से बेहतर कृषि निर्णय लें।",
  futureLabel: "06 — आगे का रास्ता",
  futureTitle: "विकास का अवसर।",
  futureText: "अगला चरण अधिक आवाज़ों, स्थलों और भूमि को समझने के नए तरीकों से जुड़ता है।",
  future01: "तमिल वॉयस असिस्टेंट",
  future02: "क्षेत्रीय ज्ञान डेटाबेस",
  future03: "मिट्टी और मौसम सेंसर",
  future04: "फसल-विशिष्ट मॉडल",
  future05: "डिजिटल ऐतिहासिक रिकॉर्ड",
  future06: "सलाह सेवा एकीकरण",
  footerTag: "पारंपरिक ज्ञान. आधुनिक दृष्टिकोण.",
  footerTop: "ऊपर जाएँ",
  footerSmall: "कॉलेज प्रोजेक्ट डेमो · AI-सहायता निर्णय समर्थन",
  loginBack: "वेबसाइट पर वापस जाएँ",
  loginWorkspace: "किसान कार्यक्षेत्र",
  loginWelcome: "वापस स्वागत है।",
  loginIntro: "अपने कृषि बौद्धिक कार्यक्षेत्र में जारी रखने के लिए साइन इन करें।",
  loginPassword: "पासवर्ड",
  loginShow: "दिखाएँ",
  loginRemember: "मुझे याद रखें",
  loginForgot: "पासवर्ड भूल गए?",
  loginSignIn: "साइन इन",
  loginFootnote: "यह प्रोजेक्ट डेमो आपके क्रेडेंशियल्स को भेज या संग्रहीत नहीं करता है।"
};

const teTranslations = {
  navApproach: "మా విధానం",
  navAssistant: "AI సహాయకం",
  navHow: "ఇది ఎలా పనిచేస్తుంది",
  navLogout: "లాగ్ అవుట్",
  navTry: "సహాయకాన్ని ప్రయత్నించండి",
  heroEyebrow: "అనుభవంతో కూడిన వ్యవసాయ జ్ఞానం",
  heroTitle: "AI-ఆధారిత సాంప్రదాయ వ్యవసాయ జ్ఞానం",
  heroSubtitle: "సాంప్రదాయ వ్యవసాయ జ్ఞానాన్ని ఆధునిక వ్యవసాయంతో కలుపుతుంది.",
  heroStart: "AI విశ్లేషణ ప్రారంభించండి",
  heroDiscover: "మా విధానాన్ని కనుగొనండి",
  heroFoot: "స్థానిక జ్ఞానం. మెరుగైన సమాచార వ్యవసాయం.",
  fieldNotes: "ఫీల్డ్ నోట్స్",
  fieldNoteCaption: "జ్ఞానం పంచుకునేటప్పుడు పెరుగుతుంది.",
  methodLabel: "FIELDWISE / మెథడ్ 01",
  signal1: "స్థానిక జ్ఞానం",
  signal2: "ఆధునిక డేటా",
  signal3: "సూచిత నిర్ణయాలు",
  signalNote: "వ్యవసాయానికి కొత్త సంభాషణ",
  oppLabel: "01 — అవకాశం",
  oppTitle: "చక్కని జ్ఞానం\nప్రయాణించడానికి అర్హం.",
  oppLead: "పెద్దకాలంగా, రైతులు అనుభవం ద్వారా భూమిని అర్థం చేసుకున్నారు. ఆ జ్ఞానం విలువైనది, కానీ తరచుగా అధికారికంగా పంచుకోబడదు.",
  pointAHead: "అనుభవం వ్యక్తి నుంచి వ్యక్తికి వెళ్తుంది",
  pointAText: "సాంప్రదాయ వ్యవసాయ జ్ఞానం తరచుగా అనౌపచారికంగా పంచుకోబడుతుంది, అందుకే తర generations కోల్పోయే అవకాశం ఉంది.",
  pointBHead: "సహజం ఉపయోగకర సూచనలను ఇస్తుంది",
  pointBText: "సీజన్లు, వర్షం, స్థానిక అనుభవం మరియు ప్రకృతి సంకేతాలు ప్రతిరోజు నిర్ణయాలకు ముఖ్యమైన సందర్భాన్ని ఇస్తాయి.",
  pointCHead: "సందర్భం ఒకտեղ ఉండాలి",
  pointCText: "రైతులకు సాంప్రదాయ జ్ఞానాన్ని వర్షం, మట్టి, వ్యవసాయ డేటా మరియు పరిస్థితులతో అనుసంధానించడానికి సరళమైన మార్గం అవసరం.",
  solutionLabel: "02 — మా పరిష్కారం",
  solutionTitle: "రెండు రకాల జ్ఞానం.\nఒక స్పష్టమైన తదుపరి అడుగు.",
  solutionText: "స్థానిక పద్ధతులు మరియు ప్రస్తుత పరిస్థితులను AI-సహాయక ప్రక్రియలో కలుపుతాము.",
  input01: "ఇన్‌పుట్ 01",
  input02: "ఇన్‌పుట్ 02",
  tradFarm: "సాంప్రదాయ వ్యవసాయం\nజ్ఞానం",
  modernData: "ఆధునిక వ్యవసాయ\nడేటా",
  interpret: "వివరణ",
  aiAnalysis: "AI విశ్లేషణ",
  contextAware: "సందర్భ-తెలిసిన",
  output: "అవుట్‌పుట్",
  farmingGuidance: "వ్యవసాయ మార్గదర్శకం",
  assistantLabel: "03 — సహాయకాన్ని ప్రయత్నించండి",
  assistantTitle: "మీ పొలాన్ని ప్రారంభించండి.",
  assistantText: "మీ పంట, సీజన్ మరియు స్థానిక పరిస్థితుల ఆధారంగా కొన్ని వివరాలు పంచుకోండి.",
  fieldProfile: "ఫీల్డ్ ప్రొఫైల్",
  allFieldsRequired: "అన్ని ఫీల్డ్స్ అవసరం",
  formLanguage: "భాష",
  selectLanguage: "భాషను ఎంచుకోండి",
  formState: "రాష్ట్రం",
  selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
  formCrop: "పంట",
  selectCrop: "పంటను ఎంచుకోండి",
  formLocation: "స్థానం",
  formLocationPlaceholder: "గ్రామం, జిల్లా లేదా ప్రాంతం",
  formSeason: "సీజన్",
  selectSeason: "సీజన్ను ఎంచుకోండి",
  formWeather: "ప్రస్తుత వాతావరణం",
  selectWeather: "వాతావరణాన్ని ఎంచుకోండి",
  formSoil: "మట్టి రకం",
  selectSoil: "మట్టి రకాన్ని ఎంచుకోండి",
  submitAnalyze: "AIతో విశ్లేషణ",
  analysisOutput: "విశ్లేషణ అవుట్‌పుట్",
  resultTitle: "మీ పొలం, సందర్భంతో.",
  resultEmpty: "ఫీల్డ్ ప్రొఫైల్‌ను పూరించండి మరియు విశ్లేషణను రన్ చేయండి. మీ సమాధానం ఇక్కడ కనిపిస్తుంది.",
  resultLanguage: "భాష",
  resultState: "రాష్ట్రం",
  resultCrop: "పంట",
  resultLocation: "స్థానం",
  resultSoil: "మట్టి రకం",
  tradKnowledge: "సాంప్రదాయ జ్ఞానం",
  aiGuidance: "AI మార్గదర్శకం",
  processLabel: "04 — ఇది ఎలా పనిచేస్తుంది",
  processTitle: "ఫీల్డ్ నోట్స్ నుండి\nసూచిత మార్గదర్శకానికి.",
  processText: "సరళమైన క్రమం కమ్యూనిటీ జ్ఞానాన్ని మరియు ప్రస్తుత పరిస్థితులను చోటివ్వడం చేయిస్తుంది.",
  process01Head: "రైతు ఇన్‌పుట్",
  process01Text: "పంట, స్థానం, సీజన్, వాతావరణం మరియు మట్టి వివరాలను పంచుకోండి.",
  process02Head: "సందర్భాన్ని సేకరించండి",
  process02Text: "నిర్ణయం ప్రభావితమయ్యే వివరాలను నిర్వహించండి.",
  process03Head: "సాంప్రదాయ పద్ధతులను తీసుకోండి",
  process03Text: "స్థానిక మరియు పంట-నిర్దిష్ట జ్ఞానాన్ని చూడండి.",
  process04Head: "పోల్చండి",
  process04Text: "సాంప్రదాయ పద్ధతిని ఆధునిక సందర్భంతో పోల్చండి.",
  process05Head: "మార్గదర్శకాన్ని రూపొందించండి",
  process05Text: "స్పష్టమైన ప్రతిస్పందనతో సమాచార పరమైన నిర్ణయాలకు సహాయపడండి.",
  benefitsLabel: "05 — ఇది ఎందుకు ముఖ్యమే",
  benefitsTitle: "జ్ఞానం మరియు చర్య మధ్య\nశక్తివంతమైన సంబంధం.",
  benefit01Tag: "సంరక్షణ",
  benefit01Head: "స్థానిక జ్ఞానాన్ని పెంచండి",
  benefit01Text: "వ్యవసాయ జ్ఞానాన్ని రక్షించండి, ఇది లేకపోతే డాక్యుమెంట్ కాకుండా పోతుంది.",
  benefit02Tag: "ప్రాప్యత",
  benefit02Head: "పద్ధతులకు సులభంగా ప్రాప్యత",
  benefit02Text: "రైతులు మరియు తర్వాతి తరానికి సాంప్రదాయ పద్ధతులను సులభంగా అందుబాటులో ఉంచండి.",
  benefit03Tag: "కనెక్ట్",
  benefit03Head: "సందర్భాన్ని ఒకచోట తీసుకురండి",
  benefit03Text: "సాంప్రదాయ జ్ఞానాన్ని ఆధునిక వ్యవసాయ డేటా మరియు పరిస్థితులతో కలపండి.",
  benefit04Tag: "మద్దతు",
  benefit04Head: "సూచిత నిర్ణయాలు తీసుకోండి",
  benefit04Text: "సరిపోలిన మరియు అర్థమయ్యే మార్గదర్శకంతో తెలివైన వ్యవసాయ నిర్ణయాలకు మద్దతు ఇవ్వండి.",
  futureLabel: "06 — ముందుకు",
  futureTitle: "వృద్ధికి అవకాశం ఉంది.",
  futureText: "మరువాతి దశ ఎక్కువ కంఠస్వరాలు, స్థలాలు మరియు భూమిని అర్థం చేసుకోవడానికి కొత్త మార్గాలను కలుపుతుంది.",
  future01: "తమిళ వాయిస్ అసిస్టెంట్",
  future02: "ప్రాంతీయ జ్ఞాన డేటాబేస్",
  future03: "మట్టి మరియు వాతావరణ సెన్సార్లు",
  future04: "పంట-నిర్దిష్ట మోడళ్లు",
  future05: "డిజిటల్ చారిత్రక రికార్డులు",
  future06: "సలహా సేవా ఏకీకరణ",
  footerTag: "సాంప్రదాయ జ్ఞానం. ఆధునిక దృక్పథం.",
  footerTop: "ఎగువకు వెళ్లండి",
  footerSmall: "కళాశాల ప్రాజెక్ట్ డెమో · AI-సహాయక నిర్ణయ మద్దతు",
  loginBack: "వెబ్‌సైట్‌కి తిరిగి వెళ్లండి",
  loginWorkspace: "వ్యవసాయి పనిమేదిక",
  loginWelcome: "మళ్ళీ స్వాగతం.",
  loginIntro: "మీ వ్యవసాయ జ్ఞానం పనితీరును కొనసాగించడానికి సైన్ ఇన్ చేయండి.",
  loginPassword: "పాస్వర్డ్",
  loginShow: "చూపించు",
  loginRemember: "నన్ను గుర్తుంచుకో",
  loginForgot: "పాస్వర్డ్ మర్చిపోయారా?",
  loginSignIn: "సైన్ ఇన్",
  loginFootnote: "ఈ ప్రాజెక్ట్ డెమో మీ క్రెడెన్షియల్స్‌ను పంపదు లేదా నిల్వ చేయదు."
};

const knTranslations = {
  navApproach: "ನಮ್ಮ ವಿಧಾನ",
  navAssistant: "AI ಸಹಾಯಕ",
  navHow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  navLogout: "ಲಾಗ್ ಔಟ್",
  navTry: "ಸಹಾಯಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ",
  heroEyebrow: "ಅನುಭವದಿಂದ ಮೂಡಿದ ಕೃಷಿ ಜ್ಞಾನ",
  heroTitle: "AI ಆಧಾರಿತ ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ಜ್ಞಾನ",
  heroSubtitle: "ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ಜ್ಞಾನವನ್ನು ಆಧುನಿಕ ಕೃಷಿಯೊಂದಿಗೆ ಒಗ್ಗೂಡಿಸುತ್ತದೆ.",
  heroStart: "AI ವಿಶ್ಲೇಷಣೆ ಆರಂಭಿಸಿ",
  heroDiscover: "ನಮ್ಮ ವಿಧಾನದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
  heroFoot: "ಸ್ಥಳೀಯ ಜ್ಞಾನ. ಉತ್ತಮ ಮಾಹಿತಿ ಕೃಷಿ.",
  fieldNotes: "ಫೀಲ್ಡ್ ನೋಟ್ಸ್",
  fieldNoteCaption: "ಜ್ಞಾನ ಹಂಚಿಕೊಳ್ಳುವುದರಿಂದ ಬೆಳೆಯುತ್ತದೆ.",
  methodLabel: "FIELDWISE / ಮೆಥಡ್ 01",
  signal1: "ಸ್ಥಳೀಯ ಜ್ಞಾನ",
  signal2: "ಆಧುನಿಕ ಡೇಟಾ",
  signal3: "ಮಾಹಿತಿ ಪಡೆದ ನಿರ್ಧಾರಗಳು",
  signalNote: "ಕೃಷಿಯ ಹೊಸ ಸಂಭಾಷಣೆ",
  oppLabel: "01 — ಅವಕಾಶ",
  oppTitle: "ಉತ್ತಮ ಜ್ಞಾನ\nಪ್ರಯಾಣಕ್ಕೆ ಅರ್ಹವಾಗಿದೆ.",
  oppLead: "ಅनेक ದ generations ದಿಂದ ರೈತರು ಅನುಭವದ ಮೂಲಕ ಭೂಮಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ. ಆ ಜ್ಞಾನ ಮೌಲ್ಯವುಳ್ಳದ್ದಾಗಿದೆ, ಆದರೆ ಹೆಚ್ಚಾಗಿ ಅನೌಪಚಾರಿಕವಾಗಿ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.",
  pointAHead: "ಅನುಭವ ಒಬ್ಬರಿಂದ ಇನ್ನೊಬ್ಬರಿಗೆ ಹೋಗುತ್ತದೆ",
  pointAText: "ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ಜ್ಞಾನ ಹೆಚ್ಚಾಗಿ ಅನೌಪಚಾರಿಕವಾಗಿ ಹಂಚಿಕೊಳ್ಳಲ್ಪಡುತ್ತದೆ; ಈ ಕಾರಣದಿಂದ ಪೀಳಿಗೆಗಳ ನಡುವೆ ಕಳೆದು ಹೋಗಬಹುದು.",
  pointBHead: "ಪ್ರಕೃತಿ ಉಪಯುಕ್ತ ಸೂಚನೆಗಳನ್ನು ನೀಡುತ್ತದೆ",
  pointBText: "ಮಾಸಗಳು, ಮಳೆ, ಸ್ಥಳೀಯ ಅನುಭವ ಮತ್ತು ಪ್ರಕೃತಿ ಸೂಚನೆಗಳು ಪ್ರತಿದಿನದ ನಿರ್ಧಾರಗಳಿಗೆ ಮಹತ್ವದ ಸಂದರ್ಭ ನೀಡುತ್ತವೆ.",
  pointCHead: "ಸಂದರ್ಭ ಒಟ್ಟಿಗೆ ಇರಬೇಕು",
  pointCText: "ರೈತರಿಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನವನ್ನು ಮಳೆ, ಮಣ್ಣು ಮತ್ತು ಕೃಷಿ ಮಾಹಿತಿಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ಸರಳ ಮಾರ್ಗ ಬೇಕು.",
  solutionLabel: "02 — ನಮ್ಮ ಪರಿಹಾರ",
  solutionTitle: "ಎರಡು ರೀತಿಯ ಜ್ಞಾನ.\nಒಂದು ಸ್ಪಷ್ಟ ಮುಂದಿನ ಹೆಜ್ಜೆ.",
  solutionText: "ಸ್ಥಳೀಯ ಪದ್ಧತಿಗಳು ಮತ್ತು ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳನ್ನು AI-ಸಹಾಯಕ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಒಟ್ಟಿಗೆ ಸೇರಿಸುತ್ತೇವೆ.",
  input01: "ಇನ್ಪುಟ್ 01",
  input02: "ಇನ್ಪುಟ್ 02",
  tradFarm: "ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ\nಜ್ಞಾನ",
  modernData: "ಆಧುನಿಕ ಕೃಷಿ\nಡೇಟಾ",
  interpret: "ವಿವರಣೆ",
  aiAnalysis: "AI ವಿಶ್ಲೇಷಣೆ",
  contextAware: "ಸಂದರ್ಭ-ಜ್ಞಾನವಿರುವ",
  output: "ಔಟ್ಪುಟ್",
  farmingGuidance: "ಕೃಷಿ ಮಾರ್ಗದರ್ಶನ",
  assistantLabel: "03 — ಸಹಾಯಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ",
  assistantTitle: "ನಿಮ್ಮ ಹೊಲದಿಂದ ಪ್ರಾರಂಭಿಸಿ.",
  assistantText: "ನಿಮ್ಮ ತಳಿ, பருவ ಮತ್ತು ಸ್ಥಳೀಯ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ ಕೆಲವು ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
  fieldProfile: "ಫೀಲ್ಡ್ ಪ್ರೊಫೈಲ್",
  allFieldsRequired: "ಎಲ್ಲ ಫೀಲ್ಡ್ಗಳು ಅಗತ್ಯ",
  formLanguage: "ಭಾಷೆ",
  selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  formState: "ರಾಜ್ಯ",
  selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  formCrop: "ಬೆಳೆ",
  selectCrop: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
  formLocation: "ಸ್ಥಳ",
  formLocationPlaceholder: "ಗ್ರಾಮ, ಜಿಲ್ಲೆ ಅಥವಾ ಪ್ರದೇಶ",
  formSeason: "ಪರಿಸರ/ಸೀಸನ್",
  selectSeason: "ಸೀಸನ್ ಆಯ್ಕೆಮಾಡಿ",
  formWeather: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
  selectWeather: "ಹವಾಮಾನ ಆಯ್ಕೆಮಾಡಿ",
  formSoil: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
  selectSoil: "ಮಣ್ಣಿನ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
  submitAnalyze: "AI ಜೊತೆ ವಿಶ್ಲೇಷಣೆ",
  analysisOutput: "ವಿಶ್ಲೇಷಣೆಯ ಉತ್ಪನ್ನ",
  resultTitle: "ನಿಮ್ಮ ಹೊಲ, ಸಂದರ್ಭದೊಂದಿಗೆ.",
  resultEmpty: "ಫೀಲ್ಡ್ ಪ್ರೊಫೈಲ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ವಿಶ್ಲೇಷಣೆಯನ್ನು ಚಲಾಯಿಸಿ. ನಿಮ್ಮ ಉತ್ತರ ಇಲ್ಲೇ ತೋರಿಸುತ್ತದೆ.",
  resultLanguage: "ಭಾಷೆ",
  resultState: "ರಾಜ್ಯ",
  resultCrop: "ಬೆಳೆ",
  resultLocation: "ಸ್ಥಳ",
  resultSoil: "ಮಣ್ಣಿನ ವಿಧ",
  tradKnowledge: "ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ",
  aiGuidance: "AI ಮಾರ್ಗದರ್ಶನ",
  processLabel: "04 — ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  processTitle: "ಫೀಲ್ಡ್ ನೋಟ್ಸ್‌ನಿಂದ\nಮಾಹಿತಿಯುತ ಮಾರ್ಗದರ್ಶಿಕೆ വരെ.",
  processText: "ಸರಳ ಕ್ರಮದ ಮೂಲಕ ಸಮುದಾಯ ಜ್ಞಾನ ಮತ್ತು ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಜೋಡಿಸಲಾಗುತ್ತದೆ.",
  process01Head: "ರೈತ ಇನ್ಪುಟ್",
  process01Text: "ಬೆಳೆ, ಸ್ಥಳ, ಸೀಸನ್, ಹವಾಮಾನ ಮತ್ತು ಮಣ್ಣಿನ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
  process02Head: "ಸಂದರ್ಭ ಸಂಗ್ರಹಿಸಿ",
  process02Text: "ನಿರ್ಧಾರಕ್ಕೆ ಪರಿಣಾಮ ಬೀರುವ ವಿವರಗಳನ್ನು ವ್ಯವಸ್ಥೆಗೊಳಿಸಿ.",
  process03Head: "ಸಾಂಪ್ರದಾಯಿಕ ಪದ್ಧತಿಗಳನ್ನು ಪಡೆಯಿರಿ",
  process03Text: "ಸ್ಥಳೀಯ ಮತ್ತು ಬೆಳೆ-ನಿರ್ದಿಷ್ಟ ಜ್ಞಾನದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.",
  process04Head: "ಹೋಲಿಸಿ",
  process04Text: "ಸಾಂಪ್ರದಾಯಿಕ ಪದ್ಧತಿಯನ್ನು ಆಧುನಿಕ ಸಂದರ್ಭದೊಂದಿಗೆ ಹೋಲಿಸಿ.",
  process05Head: "ಮಾರ್ಗದರ್ಶನ ರಚಿಸಿ",
  process05Text: "ಸ್ಪಷ್ಟ ಉತ್ತರದಿಂದ ತಿಳುವಳಿಕೆಯುಳ್ಳ ನಿರ್ಧಾರಕ್ಕೆ ಸಹಾಯ ಮಾಡಿ.",
  benefitsLabel: "05 — ಇದೇಕೆ ಮುಖ್ಯ",
  benefitsTitle: "ಜ್ಞಾನ ಮತ್ತು ಕ್ರಮಗಳ ನಡುವೆ\nಅಯ್ಯೋ ಕಳಪೆ ಸಂಬಂಧ.",
  benefit01Tag: "ಸಂರಕ್ಷಣೆ",
  benefit01Head: "ಸ್ಥಳೀಯ ಜ್ಞಾನವನ್ನು ಹೆಚ್ಚಿಸಿ",
  benefit01Text: "ಕೃಷಿ ಜ್ಞಾನವನ್ನು ಸಂರಕ್ಷಿಸಿ, ಅದು ದಾಖಲೆಗಳಲ್ಲಿ ಉಳಿಯದಿದ್ದರೆ ಕಳೆದುಹೋಗುತ್ತದೆ.",
  benefit02Tag: "ಪ್ರವೇಶ",
  benefit02Head: "ಪದ್ಧತಿಗಳ ಪ್ರವೇಶವನ್ನು ಸುಲಭಗೊಳಿಸಿ",
  benefit02Text: "ರೈತರು ಮತ್ತು ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಸಾಂಪ್ರದಾಯಿಕ ಪದ್ಧತಿಗಳನ್ನು ಸುಲಭವಾಗಿ ತಲುಪಿಸುವಂತೆ ಮಾಡಿ.",
  benefit03Tag: "ಕನೆಕ್ಟ್",
  benefit03Head: "ಸಂದರ್ಭವನ್ನು ಒಟ್ಟಿಗೆ ತಂದುಕೊಂಡುಬನ್ನಿ",
  benefit03Text: "ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನವನ್ನು ಆಧುನಿಕ ಕೃಷಿ ಡೇಟಾ ಮತ್ತು ಪರಿಸ್ಥಿತಿಗಳೊಂದಿಗೆ соединಿಸಿ.",
  benefit04Tag: "ಬೆಂಬಲ",
  benefit04Head: "ತಿಳಿದ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ",
  benefit04Text: "ಸಮಂಜಸ ಮತ್ತು ಅರ್ಥವಾಗುವ ಮಾರ್ಗದರ್ಶನದಿಂದ ವಿಚಾರಚಿಂತನೆಯುತ ಕೃಷಿ ನಿರ್ಧಾರಗಳನ್ನು ಬೆಂಬಲಿಸಿ.",
  futureLabel: "06 — ಮುಂದಿನದ್ದು",
  futureTitle: "ಬೆಳೆದ opportunity ಇದೆ.",
  futureText: "ಮುಂದಿನ ಅಂಶವು ಹೆಚ್ಚು ಧ್ವನಿಗಳು, ಸ್ಥಳಗಳು ಮತ್ತು ಭೂಮಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಹೊಸ ಮಾರ್ಗಗಳನ್ನು ನೀಡುತ್ತದೆ.",
  future01: "ತಮಿಳು ವಾಯ್ಸ್ ಸಹಾಯಕ",
  future02: "ಪ್ರಾದೇಶಿಕ ಜ್ಞಾನ ಡೇಟಾಬೇಸ್",
  future03: "ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಸೆನ್ಸರ್ಗಳು",
  future04: "ಬೆಳೆ-ನಿರ್ದಿಷ್ಟ ಮಾದರಿಗಳು",
  future05: "ಡಿಜಿಟಲ್ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು",
  future06: "सलಹೆ ಸೇವಾ ಸಂಯೋಜನೆ",
  footerTag: "ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ. ಆಧುನಿಕ ಒಳನೋಟ.",
  footerTop: "ಮೇಲಕ್ಕೆ ಹೋಗಿ",
  footerSmall: "ಕಾಲೇಜು ಪ್ರಾಜೆಕ್ಟ್ ಡೆಮೊ · AI-ಬೆಂಬಲ ನಿರ್ಧಾರ ಸಹಾಯ",
  loginBack: "ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹಿಂತಿರುಗಿ",
  loginWorkspace: "ರೈತ ಕಾರ್ಯಕ್ಷೇತ್ರ",
  loginWelcome: "ಮರಳಿ ಸ್ವಾಗತ.",
  loginIntro: "ನಿಮ್ಮ ಕೃಷಿ ಜ್ಞಾನ ಕಾರ್ಯಕ್ಷೇತ್ರಕ್ಕೆ ಮುಂದುವರಿಯಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.",
  loginPassword: "ಪಾಸ್‌ವರ್ಡ್",
  loginShow: "ತೋರಿಸಿ",
  loginRemember: "ನನ್ನನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳಿ",
  loginForgot: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
  loginSignIn: "ಸೈನ್ ಇನ್",
  loginFootnote: "ಈ ಯೋಜನೆಯ ಡೆಮೊ ನಿಮ್ಮ ಸREDENTIAL ಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ ಅಥವಾ ಸಂಗ್ರಹಿಸುವುದಿಲ್ಲ."
};

const mlTranslations = {
  navApproach: "ഞങ്ങളുടെ സമീപനം",
  navAssistant: "AI സഹായകൻ",
  navHow: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  navLogout: "ലോഗൗട്ട്",
  navTry: "സഹായിയെ പരീക്ഷിക്കുക",
  heroEyebrow: "അനുഭവത്തിൽ നിന്നുള്ള കൃഷിജ്ഞാനം",
  heroTitle: "AI-ആധാരം ഉള്ള സാംസ്കാരിക കൃഷിജ്ഞാനം",
  heroSubtitle: "സാംസ്കാരിക കൃഷിജ്ഞാനത്തെ ആധുനിക കൃഷിയുമായി കൂട്ടിച്ചേര്ക്കുന്നു.",
  heroStart: "AI വിശകലനം ആരംഭിക്കുക",
  heroDiscover: "ഞങ്ങളുടെ സമീപനം കണ്ടെത്തുക",
  heroFoot: "പ്രാദേശിക ജ്ഞാനം. മികച്ച വിവരമുള്ള കൃഷി.",
  fieldNotes: "ഫീൽഡ് നോട്ടുകൾ",
  fieldNoteCaption: "വിജ്ഞാനം പങ്കിടുമ്പോൾ വളരും.",
  methodLabel: "FIELDWISE / മെഥഡ് 01",
  signal1: "പ്രാദേശിക ജ്ഞാനം",
  signal2: "ആധുനിക ഡാറ്റ",
  signal3: "വിവരാധിഷ്ഠിത തീരുമാനങ്ങൾ",
  signalNote: "കൃഷിയിലുള്ള ഒരു പുതിയ സംഭാഷണം",
  oppLabel: "01 — അവസരം",
  oppTitle: "നല്ല ജ്ഞാനം\nയാത്രയ്ക്ക് യോഗ്യമാണ്.",
  oppLead: "കാലങ്ങളായി, കർഷകർ അനുഭവത്തിലൂടെ ഭൂമിയെ മനസ്സിലാക്കിയിട്ടുണ്ട്. ആ ജ്ഞാനം വിലപ്പെട്ടതാണ്; പക്ഷേ പലപ്പോഴും അനൗപചാരികമായി പങ്കിടപ്പെടുന്നു.",
  pointAHead: "അനുഭവം ഒരാൾക്ക് നിന്ന് മറ്റൊരാൾക്ക് പോകുന്നു",
  pointAText: "സാംസ്കാരിക കൃഷിജ്ഞാനം പലപ്പോഴും അനൗപചാരികമായി പങ്കിടപ്പെടുന്നു; അതിനാൽ തലമുറകൾക്കിടയിൽ മങ്ങിയുപോകാം.",
  pointBHead: "പ്രകൃതി ഉപയോക്താവായ സൂചനങ്ങൾ നൽകുന്നു",
  pointBText: "പകൽ, മഴ, പ്രദേശീയ അനുഭവം, പ്രകൃതി അടയാളങ്ങൾ എന്നിവയാണ് ഓരോ ദിവസവും ഉണ്ടാകുന്ന തീരുമാനങ്ങളിലേക്ക് പ്രധാന പശ്ചാത്തലം നൽകുന്നത്.",
  pointCHead: "സന്ദർഭങ്ങൾ ഒത്തുചേരണം",
  pointCText: "കർഷകർക്ക് സാംസ്കാരിക ജ്ഞാനവും മഴ, മണ്ണ്, കൃഷി ഡാറ്റയും ചേർക്കാൻ എളുപ്പമുള്ള ഒരു വഴിയുണ്ട്.",
  solutionLabel: "02 — നമ്മുടെ പരിഹാരം",
  solutionTitle: "രണ്ട് തരത്തിലുള്ള ജ്ഞാനം.\nഒരു വ്യക്തമായ അടുത്ത ഘട്ടം.",
  solutionText: "പ്രാദേശിക പാരമ്പര്യങ്ങളും ഇപ്പോഴത്തെ സാഹചര്യങ്ങളും AI-സഹായപ്രക്രിയയിൽ ചേർക്കുന്നു.",
  input01: "ഇൻപുട്ട് 01",
  input02: "ഇൻപുട്ട് 02",
  tradFarm: "സാംസ്കാരിക കൃഷി\nജ്ഞാനം",
  modernData: "ആധുനിക കൃഷി\nഡാറ്റ",
  interpret: "വിവരണം",
  aiAnalysis: "AI വിശകലനം",
  contextAware: "സന്ദർഭ-അറിയുന്ന",
  output: "ഔട്ട്പുട്ട്",
  farmingGuidance: "കൃഷി മാർഗ്ഗനിർദ്ദേശം",
  assistantLabel: "03 — സഹായകനെ പരീക്ഷിക്കുക",
  assistantTitle: "നിങ്ങളുടെ വയലിൽ നിന്ന് ആരംഭിക്കാം.",
  assistantText: "നിങ്ങളുടെ വിള, കാലാവസ്ഥ, പ്രദേശീയ സാഹചര്യങ്ങൾ എന്നിവയെ അടിസ്ഥാനമാക്കി കുറച്ച് വിവരങ്ങൾ പങ്കിടുക.",
  fieldProfile: "ഫീൽഡ് പ്രൊഫൈൽ",
  allFieldsRequired: "എല്ലാ ഫീൽഡുകളും ആവശ്യമാണ്",
  formLanguage: "ഭാഷ",
  selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
  formState: "സംസ്ഥാനം",
  selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
  formCrop: "വെള്ളം/വിള",
  selectCrop: "വെള്ളം തിരഞ്ഞെടുക്കുക",
  formLocation: "സ്ഥലം",
  formLocationPlaceholder: "ഗ്രാമം, ജില്ല അല്ലെങ്കിൽ പ്രദേശം",
  formSeason: "കാലം",
  selectSeason: "കാലം തിരഞ്ഞെടുക്കുക",
  formWeather: "നിലവിലെ കാലാവസ്ഥ",
  selectWeather: "കാലാവസ്ഥ തിരഞ്ഞെടുക്കുക",
  formSoil: "മണ്ണിന്റെ തരം",
  selectSoil: "മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക",
  submitAnalyze: "AI ഉപയോഗിച്ച് വിശകലനം",
  analysisOutput: "വിശകലന ഔട്ട്പുട്ട്",
  resultTitle: "നിങ്ങളുടെ വയൽ, സന്ദർഭത്തോടൊപ്പം.",
  resultEmpty: "ഫീൽഡ് പ്രൊഫൈൽ പൂരിപ്പിച്ച് വിശകലനംRunnable ചെയ്യുക. നിങ്ങളുടെ മറുപടി ഇവിടെ കാണിക്കും.",
  resultLanguage: "ഭാഷ",
  resultState: "സംസ്ഥാനം",
  resultCrop: "വള്ളി",
  resultLocation: "സ്ഥലം",
  resultSoil: "മണ്ണിന്റെ തരം",
  tradKnowledge: "സാംസ്കാരിക ജ്ഞാനം",
  aiGuidance: "AI മാർഗ്ഗനിർദ്ദേശം",
  processLabel: "04 — ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
  processTitle: "ഫീൽഡ് നോട്ടുകളിൽ നിന്നു\nവിവരാവകാശമുള്ള മാർഗ്ഗനിർദ്ദേശം വരെ.",
  processText: "എളുപ്പമുള്ള ക്രമം സമൂഹജ്ഞാനവും നിലവിലെ സാഹചര്യങ്ങളും ചേർക്കുന്നു.",
  process01Head: "കർഷക് ഇൻപുട്ട്",
  process01Text: "വിള, സ്ഥലം, കാലം, കാലാവസ്ഥ, മണ്ണ് എന്നിവ പങ്കിടുക.",
  process02Head: "സന്ദർഭം ശേഖരിക്കുക",
  process02Text: "തീരുമാനത്തെ ബാധിക്കുന്ന വിശദാംശങ്ങൾ സമEHമാക്കുക.",
  process03Head: "സാംസ്കാരിക പാരമ്പര്യങ്ങൾ വീണ്ടെടുക്കുക",
  process03Text: "പ്രാദേശികവും വിള-നിർദ്ദിഷ്ടവുമായ ജ്ഞാനം കാണുക.",
  process04Head: "താരതമ്യം ചെയ്യുക",
  process04Text: "സാംസ്കാരിക രീതിയും ആധുനിക സന്ദർഭവും താരതമ്യം ചെയ്യുക.",
  process05Head: "മാർഗ്ഗനിർദ്ദേശം സൃഷ്ടിക്കുക",
  process05Text: "വ്യക്തമായ മറുപടിയിലൂടെ ഉൾക്കൊള്ളുന്ന തീരുമാനത്തിന് കരുത്ത് നൽകുക.",
  benefitsLabel: "05 — എല്ലാം എന്തിനാണ്",
  benefitsTitle: "ജ്ഞാനവും പ്രവർത്തനവും\nഇടയിൽ ശക്തമായ ബന്ധം.",
  benefit01Tag: "സംരക്ഷണം",
  benefit01Head: "പ്രാദേശിക ജ്ഞാനം വളരട്ടെ",
  benefit01Text: "കൃഷിജ്ഞാനം അടയാളപ്പെടുത്താതെ പോകുന്നതിനെ സംരക്ഷിക്കുക.",
  benefit02Tag: "പ്രവേശനം",
  benefit02Head: "പാരമ്പര്യങ്ങൾക്ക് എളുപ്പം",
  benefit02Text: "കർഷകരുടെയും അടുത്ത തലമുറയ്ക്കും സാംസ്കാരിക രീതികൾ എളുപ്പത്തിൽ ലഭ്യമാക്കുക.",
  benefit03Tag: "കണക്ട്",
  benefit03Head: "സന്ദർഭങ്ങൾ ഒരുമിച്ച് കൊണ്ടുവരുക",
  benefit03Text: "സാംസ്കാരിക ജ്ഞാനവും ആധുനിക കൃഷി ഡാറ്റയും അവസ്ഥകളും ബന്ധിപ്പിക്കുക.",
  benefit04Tag: "സഹായം",
  benefit04Head: "വിവരാധിഷ്ഠിത തീരുമാനങ്ങൾ എടുക്കുക",
  benefit04Text: "ശരിയായ, മനസിലാക്കാൻ വേഗമുള്ള മാർഗ്ഗനിർദ്ദേശം നൽകുന്ന കൃഷി തീരുമാനങ്ങളെ പിന്തുണയ്ക്കുക.",
  futureLabel: "06 — വരാനിരിക്കുന്നവ",
  futureTitle: "വളർച്ചയ്ക്ക് ഇടമുണ്ട്.",
  futureText: "അടുത്ത ഘട്ടം കൂടുതൽ ശബ്ദങ്ങൾ, സ്ഥലങ്ങൾ, ഭൂമി മനസ്സിലാക്കാനുള്ള പുതിയ വഴികൾ കൊണ്ടുവരും.",
  future01: "തമിഴ് വോയ്സ് അസിസ്റ്റന്റ്",
  future02: "പ്രാദേശിക ജ്ഞാന ഡാറ്റാബേസ്",
  future03: "മണ്ണും കാലാവസ്ഥ സെൻസറുകളും",
  future04: "വിള-നിർദ്ദിഷ്ട മോഡലുകൾ",
  future05: "ഡിജിറ്റൈസ്ഡ് ചരിത്ര റിക്കോർഡുകൾ",
  future06: "സലഹാ-സേവാ സംയോജനം",
  footerTag: "സാംസ്കാരിക ജ്ഞാനം. ആധുനിക വീക്ഷണം.",
  footerTop: "മുകളിലേക്കു പോകൂ",
  footerSmall: "കോളേജ് പ്രോജക്ട് ഡെമോ · AI-സഹായം കൊണ്ടുള്ള തീരുമാനം",
  loginBack: "വെബ്‌സൈറ്റിലേയ്ക്ക് തിരിച്ച് പോകുക",
  loginWorkspace: "കർഷകർക്കുള്ള ജോലി സ്ഥലങ്ങൾ",
  loginWelcome: "വീണ്ടും സ്വാഗതം.",
  loginIntro: "നിങ്ങളുടെ കൃഷിജ്ഞാന വർക്ക്സ്പെയ്സിലേക്ക് തുടരാൻ സൈൻ ഇൻ ചെയ്യുക.",
  loginPassword: "പാസ്‌വേഡ്",
  loginShow: "കാണിക്കുക",
  loginRemember: "എന്നെ ഓർക്കുക",
  loginForgot: "പാസ്‌വേഡ് മറന്നോ?",
  loginSignIn: "സൈൻ ഇൻ",
  loginFootnote: "ഈ പ്രോജക്റ്റ് ഡെമോ നിങ്ങളുടെ ക്രെഡൻഷ്യലുകൾ അയക്കുകയോ സൂക്ഷിക്കുകയോ ഇല്ല."
};

const translations = {
  en: englishTranslations,
  ta: { ...englishTranslations, ...taTranslations },
  hi: { ...englishTranslations, ...hiTranslations },
  te: { ...englishTranslations, ...teTranslations },
  kn: { ...englishTranslations, ...knTranslations },
  ml: { ...englishTranslations, ...mlTranslations }
};

const stateTranslations = {
  en: {
    "Andhra Pradesh": "Andhra Pradesh",
    "Arunachal Pradesh": "Arunachal Pradesh",
    "Assam": "Assam",
    "Bihar": "Bihar",
    "Chhattisgarh": "Chhattisgarh",
    "Goa": "Goa",
    "Gujarat": "Gujarat",
    "Haryana": "Haryana",
    "Himachal Pradesh": "Himachal Pradesh",
    "Jharkhand": "Jharkhand",
    "Karnataka": "Karnataka",
    "Kerala": "Kerala",
    "Madhya Pradesh": "Madhya Pradesh",
    "Maharashtra": "Maharashtra",
    "Manipur": "Manipur",
    "Meghalaya": "Meghalaya",
    "Mizoram": "Mizoram",
    "Nagaland": "Nagaland",
    "Odisha": "Odisha",
    "Punjab": "Punjab",
    "Rajasthan": "Rajasthan",
    "Sikkim": "Sikkim",
    "Tamil Nadu": "Tamil Nadu",
    "Telangana": "Telangana",
    "Tripura": "Tripura",
    "Uttar Pradesh": "Uttar Pradesh",
    "Uttarakhand": "Uttarakhand",
    "West Bengal": "West Bengal",
    "Andaman and Nicobar Islands": "Andaman and Nicobar Islands",
    "Chandigarh": "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu": "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi": "Delhi",
    "Jammu and Kashmir": "Jammu and Kashmir",
    "Ladakh": "Ladakh",
    "Lakshadweep": "Lakshadweep",
    "Puducherry": "Puducherry"
  },
  ta: {
    "Andhra Pradesh": "ஆந்திரப் பிரதேசம்",
    "Arunachal Pradesh": "அருணாச்சலப் பிரதேசம்",
    "Assam": "அசாம்",
    "Bihar": "பீகார்",
    "Chhattisgarh": "சத்தீஸ்கர்",
    "Goa": "கோவா",
    "Gujarat": "குஜராத்",
    "Haryana": "ஹரியானா",
    "Himachal Pradesh": "இமாச்சலப் பிரதேசம்",
    "Jharkhand": "ஜார்கண்ட்",
    "Karnataka": "கர்நாடகா",
    "Kerala": "கேரளா",
    "Madhya Pradesh": "மத்தியப் பிரதேசம்",
    "Maharashtra": "மகாராஷ்டிரா",
    "Manipur": "மணிப்பூர்",
    "Meghalaya": "மேகாலயா",
    "Mizoram": "மிசோரம்",
    "Nagaland": "நாகாலாந்து",
    "Odisha": "ஒடிசா",
    "Punjab": "பஞ்சாப்",
    "Rajasthan": "ராஜஸ்தான்",
    "Sikkim": "சிக்கிம்",
    "Tamil Nadu": "தமிழ்நாடு",
    "Telangana": "தெலுங்கானா",
    "Tripura": "திரிபுரா",
    "Uttar Pradesh": "உத்தரப் பிரதேசம்",
    "Uttarakhand": "உத்தராகண்ட்",
    "West Bengal": "மேற்கு வங்காளம்",
    "Andaman and Nicobar Islands": "அந்தமான் நிகோபார் தீவுகள்",
    "Chandigarh": "சண்டிகர்",
    "Dadra and Nagar Haveli and Daman and Diu": "தாத்ரா & நகர் ஹவேலி & தாமன் & டையூ",
    "Delhi": "டெல்லி",
    "Jammu and Kashmir": "ஜம்மு & காஷ்மீர்",
    "Ladakh": "லடாக்",
    "Lakshadweep": "லட்சத்தீவு",
    "Puducherry": "புதுச்சேரி"
  },
  hi: {
    "Andhra Pradesh": "आंध्र प्रदेश",
    "Arunachal Pradesh": "अरुणाचल प्रदेश",
    "Assam": "असम",
    "Bihar": "बिहार",
    "Chhattisgarh": "छत्तीसगढ़",
    "Goa": "गोवा",
    "Gujarat": "गुजरात",
    "Haryana": "हरियाणा",
    "Himachal Pradesh": "हिमाचल प्रदेश",
    "Jharkhand": "झारखंड",
    "Karnataka": "कर्नाटक",
    "Kerala": "केरल",
    "Madhya Pradesh": "मध्य प्रदेश",
    "Maharashtra": "महाराष्ट्र",
    "Manipur": "मणिपुर",
    "Meghalaya": "मेघालय",
    "Mizoram": "मिजोरम",
    "Nagaland": "नागालैंड",
    "Odisha": "ओडिशा",
    "Punjab": "पंजाब",
    "Rajasthan": "राजस्थान",
    "Sikkim": "सिक्किम",
    "Tamil Nadu": "तमिलनाडु",
    "Telangana": "तेलंगाना",
    "Tripura": "त्रिपुरा",
    "Uttar Pradesh": "उत्तर प्रदेश",
    "Uttarakhand": "उत्तराखंड",
    "West Bengal": "पश्चिम बंगाल",
    "Andaman and Nicobar Islands": "अंडमान और निकोबार द्वीपसमूह",
    "Chandigarh": "चंडीगढ़",
    "Dadra and Nagar Haveli and Daman and Diu": "दादरा और नगर हवेली और दमन और दीव",
    "Delhi": "दिल्ली",
    "Jammu and Kashmir": "जम्मू और कश्मीर",
    "Ladakh": "लद्दाख",
    "Lakshadweep": "लक्षद्वीप",
    "Puducherry": "पुदुच्चेरी"
  },
  te: {
    "Andhra Pradesh": "ఆంధ్రప్రదేశ్",
    "Arunachal Pradesh": "అరుణాచల్ ప్రదేశ్",
    "Assam": "అసోం",
    "Bihar": "బీహార్",
    "Chhattisgarh": "చత్తీస్‌గఢ్",
    "Goa": "గోవా",
    "Gujarat": "గుజరాత్",
    "Haryana": "హర్యానా",
    "Himachal Pradesh": "హిమాచల్ ప్రదేశ్",
    "Jharkhand": "జార్ఖండ్",
    "Karnataka": "కర్ణాటక",
    "Kerala": "కేరళ",
    "Madhya Pradesh": "మధ్యప్రదేశ్",
    "Maharashtra": "మహారాష్ట్ర",
    "Manipur": "మణిపూర్",
    "Meghalaya": "మేఘాలయం",
    "Mizoram": "మిజోరం",
    "Nagaland": "నాగాలాండ్",
    "Odisha": "ఒడిశా",
    "Punjab": "పంజాబ్",
    "Rajasthan": "రాజస్థాన్",
    "Sikkim": "సిక్కిం",
    "Tamil Nadu": "తమిళనాడు",
    "Telangana": "తెలంగాణ",
    "Tripura": "త్రిపుర",
    "Uttar Pradesh": "ఉత్తరప్రదేశ్",
    "Uttarakhand": "ఉత్తరాఖండ్",
    "West Bengal": "పశ్చిమ బంగ్లా",
    "Andaman and Nicobar Islands": "అండమాన్ నికోబార్ దీవులు",
    "Chandigarh": "చండీగఢ్",
    "Dadra and Nagar Haveli and Daman and Diu": "దాద్రా & నగర్ హవేలీ & దామన్ & డియు",
    "Delhi": "దిల్లీ",
    "Jammu and Kashmir": "జమ్మూ & కశ్మీర్",
    "Ladakh": "లడఖ్",
    "Lakshadweep": "లక్షద్వీపం",
    "Puducherry": "పుదుచ్చేరి"
  },
  kn: {
    "Andhra Pradesh": "ಆಂಧ್ರಪ್ರದೇಶ",
    "Arunachal Pradesh": "ಅರುಣಾಚಲ ಪ್ರದೇಶ",
    "Assam": "ಅಸ್ಸಂ",
    "Bihar": "ಬಿಹಾರ",
    "Chhattisgarh": "ಛತ್ತೀಸ್ಗಢ",
    "Goa": "ಗೋವಾ",
    "Gujarat": "ಗುಜರಾತ್",
    "Haryana": "ಹರಿಯಾಣ",
    "Himachal Pradesh": "ಹಿಮಾಚಲ ಪ್ರದೇಶ",
    "Jharkhand": "ಜಾರ್ಖಂಡ್",
    "Karnataka": "ಕರ್ನಾಟಕ",
    "Kerala": "ಕೇರಳ",
    "Madhya Pradesh": "ಮಧ್ಯಪ್ರದೇಶ",
    "Maharashtra": "ಮಹಾರಾಷ್ಟ್ರ",
    "Manipur": "ಮಣಿಪುರ",
    "Meghalaya": "ಮೇಘಾಲಯ",
    "Mizoram": "ಮಿಜೋರಾಂ",
    "Nagaland": "ನಾಗಾಲ್ಯಾಂಡ್",
    "Odisha": "ಒಡಿಶಾ",
    "Punjab": "ಪಂಜಾಬ್",
    "Rajasthan": "ರಾಜಸ್ಥಾನ",
    "Sikkim": "ಸಿಕ್ಕಿಮ್",
    "Tamil Nadu": "ತಮಿಳುನಾಡು",
    "Telangana": "ತೆಲಂಗಾಣ",
    "Tripura": "ತ್ರಿಪುರ",
    "Uttar Pradesh": "ಉತ್ತರಪ್ರದೇಶ",
    "Uttarakhand": "ಉತ್ತರಾಖಂಡ",
    "West Bengal": "ಪಶ್ಚಿಮ ಬಂಗಾಳಿ",
    "Andaman and Nicobar Islands": "ಅಂಡಾಮಾನ್ ನಿಕೋಬಾರ್ ದ್ವೀಪಗಳು",
    "Chandigarh": "ಚಂಡೀಗಢ",
    "Dadra and Nagar Haveli and Daman and Diu": "ದಾದ್ರಾ & ನಗರ್ ಹವೇಲಿ & ದಮನ್ & ದೀಯು",
    "Delhi": "ದೆಹಲಿ",
    "Jammu and Kashmir": "ಜಮ್ಮು & ಕಾಶ್ಮೀರ",
    "Ladakh": "ಲಡಾಖ್",
    "Lakshadweep": "ಲಕ್ಷದ್ವೀಪ",
    "Puducherry": "ಪುರುಚ್ಚೇರಿ"
  },
  ml: {
    "Andhra Pradesh": "ആന്ധ്രಪ್ರദേശ്",
    "Arunachal Pradesh": "അരുണാചൽ പ്രദേശ്",
    "Assam": "അസോം",
    "Bihar": "ബിഹാർ",
    "Chhattisgarh": "ചത്തീസ്ഗഡ്",
    "Goa": "ഗോവ",
    "Gujarat": "ഗുജറാത്ത്",
    "Haryana": "ഹരിയാന",
    "Himachal Pradesh": "ഹിമാചൽ പ്രദേശ്",
    "Jharkhand": "ജാർഖണ്ഡ്",
    "Karnataka": "കർണാടക",
    "Kerala": "കേരളം",
    "Madhya Pradesh": "മധ്യപ്രദേശ്",
    "Maharashtra": "മഹാരാഷ്ട്ര",
    "Manipur": "മണിപ്പൂർ",
    "Meghalaya": "മെഘാലയ",
    "Mizoram": "മിസോറം",
    "Nagaland": "നാഗാലാൻഡ്",
    "Odisha": "ഒഡീഷ",
    "Punjab": "പഞ്ചാബ്",
    "Rajasthan": "രാജസ്ഥാൻ",
    "Sikkim": "സിക്കിം",
    "Tamil Nadu": "തമിഴ്നാട്",
    "Telangana": "തെലങ്കാന",
    "Tripura": "ട്രിപുര",
    "Uttar Pradesh": "ഉത്തർപ്രദേശ്",
    "Uttarakhand": "ഉത്തരാഖണ്ഡ്",
    "West Bengal": "പശ്ചിമ ബംഗാൾ",
    "Andaman and Nicobar Islands": "അൻഡമാൻ നിക്കോപ്പാർ ദ്വീപുകൾ",
    "Chandigarh": "ചണ്ഡീഗഡ്",
    "Dadra and Nagar Haveli and Daman and Diu": "ദാദ്രാ & നാഗർ ഹവേലി & ദാമൻ & ഡയു",
    "Delhi": "ദില്ലി",
    "Jammu and Kashmir": "ജമ്മു & കശ്മീർ",
    "Ladakh": "ലഡാക്ക്",
    "Lakshadweep": "ലക്ഷദ്വീപ്",
    "Puducherry": "പുതുച്ചേരി"
  }
};

const fieldOptionTranslations = {
  en: {
    language: { Tamil: "Tamil", English: "English", Hindi: "Hindi", Telugu: "Telugu", Kannada: "Kannada", Malayalam: "Malayalam" },
    crop: { Paddy: "Paddy", Millet: "Millet", Groundnut: "Groundnut", Cotton: "Cotton" },
    season: { Kharif: "Kharif / monsoon", Rabi: "Rabi / winter", Zaid: "Zaid / summer" },
    weather: { Rainy: "Rainy", Sunny: "Sunny", Cloudy: "Cloudy" },
    soil: { Clay: "Clay", Sandy: "Sandy", Loamy: "Loamy", "Sandy Loam": "Sandy Loam", "Silty Soil": "Silty Soil", "Black Soil": "Black Soil", "Red Soil": "Red Soil", "Alluvial Soil": "Alluvial Soil", "Laterite Soil": "Laterite Soil", "Peaty Soil": "Peaty Soil" }
  },
  ta: {
    language: { Tamil: "தமிழ்", English: "ஆங்கிலம்", Hindi: "இந்தி", Telugu: "தெலுங்கு", Kannada: "கன்னடம்", Malayalam: "மലையாளம்" },
    crop: { Paddy: "நெல்", Millet: "சிறுதானியம்", Groundnut: "நிலக்கடலை", Cotton: "பருத்தி" },
    season: { Kharif: "காரிஃப் / மழைக்காலம்", Rabi: "ரபி / குளிர்காலம்", Zaid: "சைத் / கோடைக்காலம்" },
    weather: { Rainy: "மழை", Sunny: "வெயில்", Cloudy: "மேகமூட்டம்" },
    soil: { Clay: "களிமண்", Sandy: "மணற்பாங்கான மண்", Loamy: "களிமண்-மணல் கலந்த மண்", "Sandy Loam": "மணல் கலந்த களிமண்", "Silty Soil": "வண்டல் நுண்மண்", "Black Soil": "கரிசல் மண்", "Red Soil": "செம்மண்", "Alluvial Soil": "ஆற்றுவண்டல் மண்", "Laterite Soil": "சரளை மண்", "Peaty Soil": "கரிமச் சத்து நிறைந்த மண்" }
  },
  hi: {
    language: { Tamil: "तमिल", English: "अंग्रेज़ी", Hindi: "हिन्दी", Telugu: "तेलुगु", Kannada: "कन्नड़", Malayalam: "मलयालम" },
    crop: { Paddy: "धान", Millet: "बाजरा", Groundnut: "मूंगफली", Cotton: "कपास" },
    season: { Kharif: "खरीफ / मानसून", Rabi: "रबी / सर्दी", Zaid: "ज़ायद / गर्मी" },
    weather: { Rainy: "बारिश", Sunny: "धूप", Cloudy: "बादल" },
    soil: { Clay: "चिकनी मिट्टी", Sandy: "रेतीली मिट्टी", Loamy: "दोमट मिट्टी", "Sandy Loam": "बलुई दोमट मिट्टी", "Silty Soil": "गाद वाली मिट्टी", "Black Soil": "काली मिट्टी", "Red Soil": "लाल मिट्टी", "Alluvial Soil": "जलोढ़ मिट्टी", "Laterite Soil": "लैटेराइट मिट्टी", "Peaty Soil": "पीट मिट्टी" }
  },
  te: {
    language: { Tamil: "తమిళం", English: "ఆంగ్లం", Hindi: "హిందీ", Telugu: "తెలుగు", Kannada: "కన్నడ", Malayalam: "మలయాళం" },
    crop: { Paddy: "వరి", Millet: "చిరుధాన్యాలు", Groundnut: "వేరుశెనగ", Cotton: "పత్తి" },
    season: { Kharif: "ఖరీఫ్ / వర్షాకాలం", Rabi: "రబీ / శీతాకాలం", Zaid: "జైద్ / వేసవి" },
    weather: { Rainy: "వర్షం", Sunny: "ఎండ", Cloudy: "మేఘావృతం" },
    soil: { Clay: "బంకమట్టి", Sandy: "ఇసుక నేల", Loamy: "లోమీ నేల", "Sandy Loam": "ఇసుక లోమీ నేల", "Silty Soil": "సిల్ట్ నేల", "Black Soil": "నల్ల మట్టి", "Red Soil": "ఎర్ర మట్టి", "Alluvial Soil": "ఒండ్రు మట్టి", "Laterite Soil": "లేటరైట్ మట్టి", "Peaty Soil": "పీట్ మట్టి" }
  },
  kn: {
    language: { Tamil: "ತಮಿಳು", English: "ಇಂಗ್ಲಿಷ್", Hindi: "ಹಿಂದಿ", Telugu: "ತೆಲುಗು", Kannada: "ಕನ್ನಡ", Malayalam: "ಮಲಯಾಳಂ" },
    crop: { Paddy: "ಭತ್ತ", Millet: "ಸಿರಿಧಾನ್ಯ", Groundnut: "ಕಡಲೆಕಾಯಿ", Cotton: "ಹತ್ತಿ" },
    season: { Kharif: "ಖರೀಫ್ / ಮಳೆಗಾಲ", Rabi: "ರಬಿ / ಚಳಿಗಾಲ", Zaid: "ಝೈದ್ / ಬೇಸಿಗೆ" },
    weather: { Rainy: "ಮಳೆ", Sunny: "ಬಿಸಿಲು", Cloudy: "ಮೋಡ ಕವಿದಿದೆ" },
    soil: { Clay: "ಜೇಡಿ ಮಣ್ಣು", Sandy: "ಮರಳು ಮಣ್ಣು", Loamy: "ಲೋಮಿ ಮಣ್ಣು", "Sandy Loam": "ಮರಳು ಜೇಡಿ ಮಣ್ಣು", "Silty Soil": "ಸಿಲ್ಟ್ ಮಣ್ಣು", "Black Soil": "ಕಪ್ಪು ಮಣ್ಣು", "Red Soil": "ಕೆಂಪು ಮಣ್ಣು", "Alluvial Soil": "ಮೆಕ್ಕಲು ಮಣ್ಣು", "Laterite Soil": "ಲ್ಯಾಟರೈಟ್ ಮಣ್ಣು", "Peaty Soil": "ಪೀಟ್ ಮಣ್ಣು" }
  },
  ml: {
    language: { Tamil: "തമിഴ്", English: "ഇംഗ്ലീഷ്", Hindi: "ഹിന്ദി", Telugu: "తెலుంగ్", Kannada: "ಕನ್ನಡ", Malayalam: "മലയാളം" },
    crop: { Paddy: "നെല്ല്", Millet: "ചെറുധാന്യം", Groundnut: "നിലക്കടല", Cotton: "പരുത്തി" },
    season: { Kharif: "ഖരീഫ് / മഴക്കാലം", Rabi: "റാബി / ശീതകാലം", Zaid: "സൈദ് / വേനൽക്കാലം" },
    weather: { Rainy: "മഴ", Sunny: "വെയിൽ", Cloudy: "മേഘാവൃതം" },
    soil: { Clay: "കളിമണ്ണ്", Sandy: "മണൽമണ്ണ്", Loamy: "ലോമി മണ്ണ്", "Sandy Loam": "മണൽ കലർന്ന കളിമണ്ണ്", "Silty Soil": "എക്കൽമണ്ണ്", "Black Soil": "കറുത്ത മണ്ണ്", "Red Soil": "ചുവന്ന മണ്ണ്", "Alluvial Soil": "അലൂവിയൽ മണ്ണ്", "Laterite Soil": "ലാറ്ററൈറ്റ് മണ്ണ്", "Peaty Soil": "തത്വമണ്ണ്" }
  }
};

function getLanguageForValue(value) {
  return { Tamil: "ta", Hindi: "hi", Telugu: "te", Kannada: "kn", Malayalam: "ml", English: "en" }[value] || "en";
}

function localizeFieldValue(lang, type, value) {
  return fieldOptionTranslations[lang]?.[type]?.[value] || value;
}

function applyLanguage(lang) {
  const chosen = translations[lang] || translations.en;
  const nodes = document.querySelectorAll("[data-i18n]");

  nodes.forEach((node) => {
    const key = node.dataset.i18n;
    const value = chosen[key];
    if (value) {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const value = chosen[node.dataset.i18nPlaceholder];
    if (value) node.placeholder = value;
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const value = chosen[node.dataset.i18nAriaLabel];
    if (value) node.setAttribute("aria-label", value);
  });

  document.querySelectorAll("select[name]").forEach((select) => {
    const type = select.name;
    const labels = fieldOptionTranslations[lang]?.[type];
    if (!labels) return;
    [...select.options].forEach((option) => {
      if (option.value && labels[option.value]) option.textContent = labels[option.value];
    });
  });

  const stateSelect = analysisForm?.querySelector('[name="state"]');
  if (stateSelect) {
    [...stateSelect.options].forEach((option) => {
      if (option.value && stateTranslations[lang] && stateTranslations[lang][option.value]) {
        option.textContent = stateTranslations[lang][option.value];
      }
    });

    const placeholder = stateSelect.querySelector('option[disabled]');
    if (placeholder) {
      placeholder.textContent = translations[lang]?.selectState || translations.en.selectState;
    }
  }

  document.documentElement.lang = lang;
}

applyLanguage(localStorage.getItem("fieldwiseLanguage") || "en");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem(sessionStorageKey);
    window.location.replace("login.html");
  });
}

const KNOWLEDGE_BASE = {
  Paddy: {
    traditional_practice: {
      en: "Observe seasonal rainfall patterns and local environmental signs before deciding farm activities.",
      ta: "வயல் பணிகளைத் தீர்மானிக்கும் முன் பருவ மழை நிலவரத்தையும் உள்ளூர் இயற்கை அறிகுறிகளையும் கவனிக்கவும்."
    }
  },
  Millet: {
    traditional_practice: {
      en: "Use local experience of rainfall timing and resilient crop varieties when planning millet activities.",
      ta: "சிறுதானியப் பணிகளைத் திட்டமிடும்போது மழை வரும் காலம் குறித்த உள்ளூர் அனுபவத்தையும் தாங்கும் பயிர் வகைகளையும் கருத்தில் கொள்ளவும்."
    }
  },
  Groundnut: {
    traditional_practice: {
      en: "Consider local planting-time knowledge and field drainage practices when planning groundnut cultivation.",
      ta: "நிலக்கடலை சாகுபடியைத் திட்டமிடும்போது உள்ளூர் விதைப்பு காலத்தையும் வயல் வடிகால் முறைகளையும் கருத்தில் கொள்ளவும்."
    }
  },
  Cotton: {
    traditional_practice: {
      en: "Use local observations of seasonal conditions and crop development to guide cotton field activities.",
      ta: "பருத்தி வயல் பணிகளைத் தீர்மானிக்கப் பருவ நிலை மற்றும் பயிர் வளர்ச்சி குறித்த உள்ளூர் கவனிப்புகளைப் பயன்படுத்தவும்."
    }
  }
};

const guidanceTranslations = {
  en: {
    context: (crop, location, state, season) => `For ${crop} in ${location}, ${state}, during ${season}, compare this traditional practice with current local agricultural information.`,
    weather: {
      Rainy: "Review current rainfall conditions before carrying out the next farm activity.",
      Sunny: "Review soil moisture and crop condition before deciding the next activity.",
      Cloudy: "Monitor local weather and crop conditions before deciding the next farm activity."
    },
    soil: {
      Clay: "Check drainage and avoid working clay soil while it is very wet.",
      Sandy: "Check soil moisture often because sandy soil dries quickly.",
      Loamy: "Check soil moisture and field condition before the next activity.",
      "Sandy Loam": "Check moisture regularly; sandy loam drains quickly but holds more water than sandy soil.",
      "Silty Soil": "Avoid working silty soil when wet to reduce compaction and erosion.",
      "Black Soil": "Check drainage and soil moisture; black soil can hold water for longer.",
      "Red Soil": "Check soil moisture and consider adding organic matter where suitable.",
      "Alluvial Soil": "Check local drainage and nutrient conditions before applying inputs.",
      "Laterite Soil": "Check moisture and soil nutrients; use locally recommended soil amendments.",
      "Peaty Soil": "Check drainage and avoid disturbing wet, organic-rich soil."
    }
  },
  ta: {
    context: (crop, location, state, season) => `${location}, ${state} பகுதியில் ${season} பருவத்தில் ${crop} பயிருக்காக, இந்த பாரம்பரிய நடைமுறையை தற்போதைய உள்ளூர் விவசாயத் தகவலுடன் ஒப்பிட்டுப் பார்க்கவும்.`,
    weather: {
      Rainy: "அடுத்த வயல் பணியைச் செய்வதற்கு முன் தற்போதைய மழை நிலவரத்தைச் சரிபார்க்கவும்.",
      Sunny: "அடுத்த பணியை முடிவு செய்வதற்கு முன் மண்ணின் ஈரப்பதத்தையும் பயிரின் நிலையையும் பார்க்கவும்.",
      Cloudy: "அடுத்த வயல் பணியை முடிவு செய்வதற்கு முன் உள்ளூர் வானிலை மற்றும் பயிர் நிலையை கவனிக்கவும்."
    },
    soil: {
      Clay: "வடிகால் நிலையைப் பார்த்து, மிகவும் ஈரமான களிமண்ணில் உழவு செய்வதைத் தவிர்க்கவும்.",
      Sandy: "மணற்பாங்கான மண் விரைவாக உலர்வதால் ஈரப்பதத்தை அடிக்கடி சரிபார்க்கவும்.",
      Loamy: "அடுத்த பணிக்கு முன் மண்ணின் ஈரப்பதத்தையும் வயல் நிலையையும் பார்க்கவும்.",
      "Sandy Loam": "இந்த மண் விரைவாக நீரை வடிக்கும்; ஈரப்பதத்தைத் தொடர்ந்து சரிபார்க்கவும்.",
      "Silty Soil": "வண்டல் மண் ஈரமாக இருக்கும்போது உழுவதைத் தவிர்த்து மண் இறுக்கத்தையும் அரிப்பையும் குறைக்கவும்.",
      "Black Soil": "கரிசல் மண் நீரை நீண்ட நேரம் தக்கவைக்கலாம்; ஈரப்பதம் மற்றும் வடிகாலைச் சரிபார்க்கவும்.",
      "Red Soil": "மண்ணின் ஈரப்பதத்தைச் சரிபார்த்து, தேவைக்கேற்ப உள்ளூர் பரிந்துரைப்படி கரிமப் பொருள் சேர்க்கவும்.",
      "Alluvial Soil": "உரம் இடுவதற்கு முன் உள்ளூர் வடிகால் மற்றும் மண் ஊட்டச்சத்து நிலையைச் சரிபார்க்கவும்.",
      "Laterite Soil": "ஈரப்பதம் மற்றும் ஊட்டச்சத்தைச் சரிபார்த்து, உள்ளூர் பரிந்துரைப்படி மண் திருத்தம் செய்யவும்.",
      "Peaty Soil": "வடிகால் நிலையைச் சரிபார்த்து, ஈரமான கரிம மண்ணைக் கிளறுவதைத் தவிர்க்கவும்."
    }
  }
};

function pickValue(source, keys, fallback) {
  for (const key of keys) {
    if (source[key] !== undefined && source[key] !== null && source[key] !== "") {
      return source[key];
    }
  }
  return fallback;
}

function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function buildGuidance(lang, crop, location, state, season, weather, soil) {
  const translationsForLanguage = guidanceTranslations[lang] || guidanceTranslations.en;
  const localizedCrop = localizeFieldValue(lang, "crop", crop);
  const localizedSeason = localizeFieldValue(lang, "season", season);
  const localizedState = stateTranslations[lang]?.[state] || state;

  return [
    translationsForLanguage.context(localizedCrop, location, localizedState, localizedSeason),
    translationsForLanguage.weather[weather] || translationsForLanguage.weather.Cloudy,
    translationsForLanguage.soil[soil] || translationsForLanguage.soil.Loamy
  ];
}

function analyseField(data) {
  const crop = cleanText(data.crop);
  const location = cleanText(data.location);
  const state = cleanText(data.state) || "unspecified state";
  const season = cleanText(data.season) || "unspecified season";
  const weather = cleanText(data.weather) || "unspecified weather";
  const soil = cleanText(data.soil) || "unspecified soil";

  if (!crop) {
    throw new Error("Crop is required.");
  }

  if (!location) {
    throw new Error("Location is required.");
  }

  const cropKnowledge = KNOWLEDGE_BASE[crop];
  if (!cropKnowledge) {
    return {
      success: false,
      crop,
      message: `Traditional knowledge for ${crop} is not available yet.`,
      available_crops: Object.keys(KNOWLEDGE_BASE).sort()
    };
  }

  return {
    success: true,
    crop,
    location,
    state,
    season,
    weather,
    soil,
    traditional_practice: cropKnowledge.traditional_practice[localStorage.getItem("fieldwiseLanguage") || "en"] || cropKnowledge.traditional_practice.en,
    guidance: buildGuidance(localStorage.getItem("fieldwiseLanguage") || "en", crop, location, state, season, weather, soil)
  };
}

function setResultText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function displayResult(data, submittedValues) {
  const response = typeof data === "string" ? { guidance: data } : (data || {});
  if (response.success === false) {
    throw new Error(response.message || "The analysis service could not complete this request.");
  }

  const resultLanguageCode = localStorage.getItem("fieldwiseLanguage") || "en";
  const crop = pickValue(response, ["crop"], submittedValues.crop);
  const location = pickValue(response, ["location"], submittedValues.location);
  const state = pickValue(response, ["state"], submittedValues.state);
  const soil = pickValue(response, ["soil"], submittedValues.soil);
  const languageNames = { en: "English", ta: "Tamil", hi: "Hindi", te: "Telugu", kn: "Kannada", ml: "Malayalam" };
  const language = languageNames[resultLanguageCode] || "English";
  const traditional = pickValue(response, [
    "traditional_knowledge", "traditionalKnowledge", "traditional_practice",
    "traditional_practices", "traditional"
  ], "No traditional knowledge was included in this response.");
  const guidance = pickValue(response, [
    "ai_guidance", "aiGuidance", "guidance", "recommendation", "analysis", "result", "message"
  ], "The API returned a response without a guidance field.");

  setResultText("#result-language", localizeFieldValue(resultLanguageCode, "language", String(language)));
  setResultText("#result-state", stateTranslations[resultLanguageCode]?.[state] || String(state));
  setResultText("#result-crop", localizeFieldValue(resultLanguageCode, "crop", String(crop)));
  setResultText("#result-location", String(location));
  setResultText("#result-soil", localizeFieldValue(resultLanguageCode, "soil", String(soil)));
  setResultText("#result-traditional", String(traditional));
  setResultText("#result-guidance", Array.isArray(guidance) ? guidance.join("\n") : String(guidance));
  fieldChatContext = { ...submittedValues };
  previousChatTopic = "";
  chatMessages.replaceChildren();
  const contextSummary = [
    localizeFieldValue(resultLanguageCode, "crop", String(crop)),
    stateTranslations[resultLanguageCode]?.[state] || String(state),
    localizeFieldValue(resultLanguageCode, "soil", String(soil))
  ];
  chatContextLabel.textContent = `${translations[resultLanguageCode]?.chatContextPrefix || englishTranslations.chatContextPrefix}: ${contextSummary.join(" · ")}`;
  chatSection.hidden = false;
  resultEmpty.hidden = true;
  resultContent.hidden = false;
}

function appendChatMessage(role, text) {
  const message = document.createElement("p");
  message.className = `chat-message chat-message--${role}`;
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function matchQuestion(question, words) {
  return words.some((word) => question.includes(word));
}

function answerFieldQuestion(question, context, lang) {
  const copy = translations[lang] || englishTranslations;
  const words = question.normalize("NFKC").toLocaleLowerCase();
  const waterIntent = matchQuestion(words, ["water", "irrigat", "rain", "moisture", "தண்ணீர்", "நீர்", "பாசன", "மழை", "ஈரப்பத"]);
  const soilIntent = matchQuestion(words, ["soil", "drain", "மண்", "வடிகால", "கரிசல்", "செம்மண்"]);
  const pestIntent = matchQuestion(words, ["pest", "insect", "disease", "spray", "leaf", "yellow", "பூச்சி", "நோய்", "தெளி", "இலை", "மஞ்சள்", "புழு"]);
  const fertilizerIntent = matchQuestion(words, ["fertiliz", "manure", "urea", "nutrient", "dose", "உர", "யூரியா", "ஊட்டச்சத்த", "சத்து"]);
  const sowingIntent = matchQuestion(words, ["sow", "plant", "seed", "transplant", "நடவு", "விதை", "விதைப்பு", "நாற்று", "எப்போது"]);
  const cropIntent = matchQuestion(words, ["crop", "growth", "stage", "care", "harvest", "பயிர்", "வளர்ச்சி", "அறுவடை", "பராமரிப்ப"]);
  const thanksIntent = matchQuestion(words, ["thank", "thanks", "நன்றி"]);
  let topic = "";

  if (thanksIntent) {
    return lang === "ta" ? "சரி. இந்த வயல் விவரங்களை அடிப்படையாகக் கொண்டு வேறு கேள்வியையும் கேட்கலாம்." : "You're welcome. Ask another question about this field whenever you need.";
  }

  if (waterIntent) topic = "water";
  else if (soilIntent) topic = "soil";
  else if (pestIntent) topic = "pest";
  else if (fertilizerIntent) topic = "fertilizer";
  else if (sowingIntent) topic = "sowing";
  else if (cropIntent) topic = "crop";
  else if (previousChatTopic && words.length < 42) topic = previousChatTopic;

  if (!topic) {
    return matchQuestion(words, ["help", "உதவி", "என்ன கேட்க", "what can"])
      ? `${copy.chatPrompt} ${copy.chatNeedDetails(localizeFieldValue(lang, "crop", context.crop))}`
      : copy.chatUnknown;
  }

  previousChatTopic = topic;
  const crop = localizeFieldValue(lang, "crop", context.crop);
  const soil = localizeFieldValue(lang, "soil", context.soil);
  const weather = localizeFieldValue(lang, "weather", context.weather);
  const season = localizeFieldValue(lang, "season", context.season);

  if (topic === "water") {
    return context.weather === "Rainy"
      ? copy.chatWaterRain(crop)
      : copy.chatWaterDry(crop, soil);
  }
  if (topic === "soil") return copy.chatSoil(soil);
  if (topic === "pest") return copy.chatPest;
  if (topic === "fertilizer") return copy.chatFertilizer;
  if (topic === "sowing") return copy.chatSowing(crop, season);
  return copy.chatCrop(crop, weather);
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatQuestionInput.value.trim();
  if (!question || !fieldChatContext) return;

  const lang = localStorage.getItem("fieldwiseLanguage") || "en";
  appendChatMessage("user", question);
  chatQuestionInput.value = "";
  appendChatMessage("assistant", answerFieldQuestion(question, fieldChatContext, lang));
  chatQuestionInput.focus();
});

async function submitAnalysisToBackend(submittedValues) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...submittedValues,
      language: localStorage.getItem("fieldwiseLanguage") || "en"
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "The analysis service could not complete this request.");
  }

  return data;
}

analysisForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!analysisForm.reportValidity()) return;

  const language = localStorage.getItem("fieldwiseLanguage") || "en";
  const copy = translations[language] || englishTranslations;
  const submittedValues = Object.fromEntries(new FormData(analysisForm).entries());
  submitButton.disabled = true;
  buttonLabel.textContent = copy.analysisLoading || "Analysing...";
  resultContent.hidden = true;
  resultEmpty.hidden = false;
  resultEmpty.textContent = copy.guidanceLoading || "Preparing field guidance...";

  try {
    const result = await submitAnalysisToBackend(submittedValues);
    displayResult(result, submittedValues);
  } catch (error) {
    try {
      const fallbackResult = analyseField(submittedValues);
      displayResult(fallbackResult, submittedValues);
    } catch (fallbackError) {
      formStatus.textContent = fallbackError.message || error.message;
      resultEmpty.textContent = copy.guidanceUnavailable || "No guidance was returned for this request.";
    }
  } finally {
    submitButton.disabled = false;
    buttonLabel.textContent = copy.submitAnalyze;
  }
});

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});
