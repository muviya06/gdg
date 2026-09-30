const authForm = document.querySelector("#auth-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const confirmPasswordField = document.querySelector("#confirm-password-field");
const confirmPasswordInput = document.querySelector("#confirm-password");
const authSubmit = document.querySelector("#auth-submit");
const authModeToggle = document.querySelector("#auth-mode-toggle");
const loginStatus = document.querySelector("#login-status");
const pageLanguageSelect = document.querySelector("#page-language");

const translations = {
  en: {
    loginLanguage: "Language",
    loginTitle: "Sign In | Fieldwise Farming Intelligence",
    loginBack: "Back to website",
    loginWorkspace: "FARMER WORKSPACE",
    loginWelcome: "Welcome back.",
    loginIntro: "Sign in with your username or create a new account.",
    loginPassword: "Password",
    loginPasswordPlaceholder: "Enter your password",
    loginCreateHeading: "Create your account",
    loginCreateIntro: "Choose a username and password to get started.",
    loginState: "State",
    selectState: "Select a state",
    loginVisualTag: "Knowledge grows together",
    loginVisualQuote: "“The best way forward starts with understanding the land.”",
    loginVisualCaption: "TRADITIONAL WISDOM. MODERN PERSPECTIVE.",
    loginVisualIndex: "FIELDWISE / 01",
    loginShow: "Show",
    loginHide: "Hide",
    loginRemember: "Remember me",
    loginForgot: "Forgot password?",
    loginSignIn: "Sign in",
    loginUsername: "Username",
    loginConfirmPassword: "Confirm password",
    loginSignIn: "Sign in",
    loginCreateAccount: "Create account",
    loginBackToSignIn: "Back to sign in",
    loginFootnote: "Accounts are stored in this browser only. This is a local demo, not server authentication.",
    loginPasswordMismatch: "Passwords do not match.",
    loginAccountCreated: "Account created. You are now signed in.",
    loginUsernameTaken: "That username is already in use.",
    loginInvalid: "Username or password is incorrect.",
    loginStorageError: "Could not save the account in this browser. Check browser storage settings.",
    loginCryptoError: "Secure password hashing is unavailable. Open this page through localhost or HTTPS."
  },
  ta: {
    loginLanguage: "மொழி",
    loginTitle: "சைன் இன் | Fieldwise Farming Intelligence",
    loginBack: "வலைத்தளத்துக்குத் திரும்பு",
    loginWorkspace: "விவசாயி பணியிடம்",
    loginWelcome: "மீண்டும் வரவேற்கிறோம்.",
    loginIntro: "பயனர்பெயருடன் உள்நுழையவும் அல்லது புதிய கணக்கை உருவாக்கவும்.",
    loginPassword: "கடவுச்சொல்",
    loginPasswordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
    loginCreateHeading: "உங்கள் கணக்கை உருவாக்கவும்",
    loginCreateIntro: "தொடங்க பயனர்பெயரும் கடவுச்சொல்லும் தேர்ந்தெடுக்கவும்.",
    loginState: "மாநிலம்",
    selectState: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    loginVisualTag: "அறிவு ஒன்றாக வளர்கிறது",
    loginVisualQuote: "“முன்னேறுவதற்கான சிறந்த வழி, நிலத்தைப் புரிந்துகொள்வதில் தொடங்குகிறது.”",
    loginVisualCaption: "பாரம்பரிய ஞானம். நவீன கண்ணோட்டம்.",
    loginVisualIndex: "FIELDWISE / 01",
    loginShow: "காட்டு",
    loginHide: "மறை",
    loginRemember: "என்னை நினைவில் கொள்ளவும்",
    loginForgot: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    loginSignIn: "உள்நுழைக",
    loginUsername: "பயனர்பெயர்",
    loginConfirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    loginSignIn: "உள்நுழைக",
    loginCreateAccount: "கணக்கை உருவாக்கு",
    loginBackToSignIn: "உள்நுழைவுக்குத் திரும்பு",
    loginFootnote: "கணக்குகள் இந்த உலாவியில் மட்டுமே சேமிக்கப்படும். இது உள்ளூர் மாதிரி; சேவையக அங்கீகாரம் அல்ல.",
    loginPasswordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை.",
    loginAccountCreated: "கணக்கு உருவாக்கப்பட்டது. இப்போது உள்நுழைந்துள்ளீர்கள்.",
    loginUsernameTaken: "இந்த பயனர்பெயர் ஏற்கனவே பயன்பாட்டில் உள்ளது.",
    loginInvalid: "பயனர்பெயர் அல்லது கடவுச்சொல் தவறானது.",
    loginStorageError: "இந்த உலாவியில் கணக்கைச் சேமிக்க முடியவில்லை. உலாவி சேமிப்பு அமைப்புகளைச் சரிபார்க்கவும்.",
    loginCryptoError: "பாதுகாப்பான password hashing கிடைக்கவில்லை. localhost அல்லது HTTPS மூலம் இந்தப் பக்கத்தைத் திறக்கவும்."
  },
  hi: {
    loginLanguage: "भाषा",
    loginTitle: "साइन इन | Fieldwise Farming Intelligence",
    loginBack: "वेबसाइट पर वापस जाएँ",
    loginWorkspace: "किसान कार्यक्षेत्र",
    loginWelcome: "वापस स्वागत है।",
    loginIntro: "साइन इन करने के लिए उपयोगकर्ता नाम दर्ज करें या नया खाता बनाएँ।",
    loginPassword: "पासवर्ड",
    loginPasswordPlaceholder: "अपना पासवर्ड दर्ज करें",
    loginState: "राज्य",
    selectState: "राज्य चुनें",
    loginVisualTag: "ज्ञान साथ-साथ बढ़ता है",
    loginVisualQuote: "“आगे बढ़ने का सबसे अच्छा तरीका भूमि को समझने से शुरू होता है।”",
    loginVisualCaption: "पारंपरिक ज्ञान. आधुनिक दृष्टिकोण.",
    loginVisualIndex: "FIELDWISE / 01",
    loginShow: "दिखाएँ",
    loginHide: "छुपाएँ",
    loginRemember: "मुझे याद रखें",
    loginForgot: "पासवर्ड भूल गए?",
    loginSignIn: "साइन इन",
    loginFootnote: "खाते केवल इस ब्राउज़र में सहेजे जाते हैं। यह स्थानीय डेमो है, सर्वर प्रमाणीकरण नहीं।"
  },
  te: {
    loginLanguage: "భాష",
    loginTitle: "సైన్ ఇన్ | Fieldwise Farming Intelligence",
    loginBack: "వెబ్‌సైట్‌కి తిరిగి వెళ్లండి",
    loginWorkspace: "వ్యవసాయి పనిమేదిక",
    loginWelcome: "మళ్ళీ స్వాగతం.",
    loginIntro: "సైన్ ఇన్ చేయడానికి వినియోగదారు పేరును నమోదు చేయండి లేదా కొత్త ఖాతాను సృష్టించండి.",
    loginPassword: "పాస్వర్డ్",
    loginPasswordPlaceholder: "మీ పాస్వర్డ్‌ను నమోదు చేయండి",
    loginState: "రాష్ట్రం",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    loginVisualTag: "జ్ఞానం కలిసి పెరుగుతుంది",
    loginVisualQuote: "“ముందుకు వెళ్లే ఉత్తమ మార్గం భూమిని అర్థం చేసుకోవడం నుండి ప్రారంభమవుతుంది.”",
    loginVisualCaption: "సాంప్రదాయ జ్ఞానం. ఆధునిక దృక్పథం.",
    loginVisualIndex: "FIELDWISE / 01",
    loginShow: "చూపించు",
    loginHide: "దాచు",
    loginRemember: "నన్ను గుర్తుంచుకో",
    loginForgot: "పాస్వర్డ్ మర్చిపోయారా?",
    loginSignIn: "సైన్ ఇన్",
    loginFootnote: "ఖాతాలు ఈ బ్రౌజర్‌లో మాత్రమే నిల్వ చేయబడతాయి. ఇది స్థానిక డెమో, సర్వర్ ప్రామాణీకరణ కాదు."
  },
  kn: {
    loginLanguage: "ಭಾಷೆ",
    loginTitle: "ಸೈನ್ ಇನ್ | Fieldwise Farming Intelligence",
    loginBack: "ವೆಬ್‌ಸೈಟ್‌ಗೆ ಹಿಂತಿರುಗಿ",
    loginWorkspace: "ರೈತ ಕಾರ್ಯಕ್ಷೇತ್ರ",
    loginWelcome: "ಮರಳಿ ಸ್ವಾಗತ.",
    loginIntro: "ಸೈನ್ ಇನ್ ಮಾಡಲು ಬಳಕೆದಾರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ ಅಥವಾ ಹೊಸ ಖಾತೆ ರಚಿಸಿ.",
    loginPassword: "ಪಾಸ್‌ವರ್ಡ್",
    loginPasswordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    loginState: "ರಾಜ್ಯ",
    selectState: "ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    loginVisualTag: "ಜ್ಞಾನ ಜೊತೆಯಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ",
    loginVisualQuote: "“ಮುಂದೆ ಹೋಗುವ ಅತ್ಯುತ್ತಮ ಮಾರ್ಗವು ಭೂಮಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದರಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ.”",
    loginVisualCaption: "ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನ. ಆಧುನಿಕ ದೃಷ್ಟಿಕೋನ.",
    loginVisualIndex: "FIELDWISE / 01",
    loginShow: "ತೋರಿಸಿ",
    loginHide: "ಮರೆಮಾಡಿ",
    loginRemember: "ನನ್ನನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳಿ",
    loginForgot: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
    loginSignIn: "ಸೈನ್ ಇನ್",
    loginFootnote: "ಖಾತೆಗಳನ್ನು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗುತ್ತದೆ. ಇದು ಸ್ಥಳೀಯ ಡೆಮೋ, ಸರ್ವರ್ ದೃಢೀಕರಣವಲ್ಲ."
  },
  ml: {
    loginLanguage: "ഭാഷ",
    loginTitle: "സൈൻ ഇൻ | Fieldwise Farming Intelligence",
    loginBack: "വെബ്‌സൈറ്റിലേക്ക് തിരിച്ച് പോകുക",
    loginWorkspace: "കർഷകൻ ജോലി സ്ഥലമ്",
    loginWelcome: "വീണ്ടും സ്വാഗതം.",
    loginIntro: "സൈൻ ഇൻ ചെയ്യാൻ ഉപയോക്തൃനാമം നൽകുക അല്ലെങ്കിൽ പുതിയ അക്കൗണ്ട് സൃഷ്ടിക്കുക.",
    loginPassword: "പാസ്‌വേഡ്",
    loginPasswordPlaceholder: "നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക",
    loginState: "സംസ്ഥാനം",
    selectState: "സംസ്ഥാനം തിരഞ്ഞെടുക്കുക",
    loginVisualTag: "ജ്ഞാനം ഒത്തുചേരുമ്പോൾ വളരുന്നു",
    loginVisualQuote: "“മുന്നോട്ട് പോകാനുള്ള മികച്ച മാർഗം ഭൂമിയെ മനസ്സിലാക്കുന്നതിൽ നിന്നാണ് ആരംഭിക്കുന്നത്.”",
    loginVisualCaption: "സാംസ്കാരിക ജ്ഞാനം. ആധുനിക വീക്ഷണം.",
    loginVisualIndex: "FIELDWISE / 01",
    loginShow: "കാണിക്കുക",
    loginHide: "മറയ്ക്കുക",
    loginRemember: "എன்னை ഓർക്കുക",
    loginForgot: "പാസ്‌വേഡ് മറന്നോ?",
    loginSignIn: "സൈൻ ഇൻ",
    loginFootnote: "അക്കൗണ്ടുകൾ ഈ ബ്രൗസറിൽ മാത്രമേ സൂക്ഷിക്കൂ. ഇത് പ്രാദേശിക ഡെമോയാണ്, സെർവർ ഓതന്റിക്കേഷൻ അല്ല."
  }
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
    "Andhra Pradesh": "ആന്ധ്രപ്രദേശ്",
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

function applyLanguage(lang) {
  const chosen = { ...translations.en, ...(translations[lang] || {}) };
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    if (chosen[node.dataset.i18n]) {
      node.textContent = chosen[node.dataset.i18n];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (chosen[key]) {
      node.placeholder = chosen[key];
    }
  });

  if (pageLanguageSelect) {
    pageLanguageSelect.value = lang;
    pageLanguageSelect.setAttribute("aria-label", chosen.loginLanguage || "Language");
  }

  const stateSelectField = document.querySelector("#state");
  if (stateSelectField) {
    [...stateSelectField.options].forEach((option) => {
      if (option.value && stateTranslations[lang] && stateTranslations[lang][option.value]) {
        option.textContent = stateTranslations[lang][option.value];
      }
    });

    const placeholderOption = stateSelectField.querySelector("option[disabled]");
    if (placeholderOption) {
      placeholderOption.textContent = chosen.selectState;
    }
  }

  document.documentElement.lang = lang;
  document.title = chosen.loginTitle || document.title;
}

if (pageLanguageSelect) {
  pageLanguageSelect.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem("fieldwiseLanguage", selectedLanguage);
    applyLanguage(selectedLanguage);
  });
}

applyLanguage(localStorage.getItem("fieldwiseLanguage") || "en");

function setLoginStatus(message) {
  loginStatus.textContent = message;
  loginStatus.classList.add("is-visible");
}

function loginText(key) {
  const language = pageLanguageSelect ? pageLanguageSelect.value : "en";
  return (translations[language] && translations[language][key]) || translations.en[key];
}

const stateSelect = document.querySelector("#state");
const savedState = localStorage.getItem("fieldwiseState");
const sessionStorageKey = "fieldwiseLocalSession";
let isCreatingAccount = false;

if (savedState) {
  stateSelect.value = savedState;
}

if (localStorage.getItem(sessionStorageKey)) {
  window.location.replace("index.html");
}

function showCreateAccountMode() {
  isCreatingAccount = !isCreatingAccount;
  confirmPasswordField.hidden = !isCreatingAccount;
  confirmPasswordInput.required = isCreatingAccount;
  passwordInput.autocomplete = isCreatingAccount ? "new-password" : "current-password";

  const chosen = { ...translations.en, ...(translations[pageLanguageSelect.value] || {}) };
  authSubmit.querySelector("span").textContent = isCreatingAccount
    ? chosen.loginCreateAccount
    : chosen.loginSignIn;
  authModeToggle.textContent = isCreatingAccount
    ? chosen.loginBackToSignIn
    : chosen.loginCreateAccount;
  document.querySelector("#login-title").textContent = isCreatingAccount
    ? chosen.loginCreateHeading
    : chosen.loginWelcome;
  document.querySelector(".login-intro").textContent = isCreatingAccount
    ? chosen.loginCreateIntro
    : chosen.loginIntro;
  loginStatus.textContent = "";
  loginStatus.classList.remove("is-visible");
}

authModeToggle.addEventListener("click", showCreateAccountMode);

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!authForm.reportValidity()) {
    return;
  }

  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const state = stateSelect.value;

  if (isCreatingAccount && password !== confirmPasswordInput.value) {
    setLoginStatus(loginText("loginPasswordMismatch"));
    confirmPasswordInput.focus();
    return;
  }

  authSubmit.disabled = true;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        state,
        createAccount: isCreatingAccount
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setLoginStatus(data.message || loginText("loginStorageError"));
      return;
    }

    localStorage.setItem("fieldwiseState", state);
    localStorage.setItem(sessionStorageKey, JSON.stringify({ username, state }));
    setLoginStatus(data.message || loginText("loginAccountCreated"));
    window.location.replace("index.html");
  } catch (error) {
    setLoginStatus(loginText("loginStorageError"));
  } finally {
    authSubmit.disabled = false;
  }
});

if (typeof window !== "undefined") {
  const fallbackState = localStorage.getItem("fieldwiseState");
  if (fallbackState) {
    stateSelect.value = fallbackState;
  }
}
