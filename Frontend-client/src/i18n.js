import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: {
        translation: {
            headerTitle: "Jeevan Samvardhan",
            HeaderHomeLink: "Home",
            HeaderAboutUsLink: "About Us",
            HeaderNewsLink: "News",
            HeaderJoinUsLink: "Join Us",
            HeaderContactLink: "Contact",
            HeaderDonateNowLink: "Donate Now",
            //hero section
            HeroSectionTypography: "We change the lives of those who have no hope.",
            HeroCard1Title: "Chala Ghari Jaudya",
            HeroCard1Content: "We work to protect vulnerable children from child labor, trafficking, and exploitation by reuniting them with families or providing safe rehabilitation.",
            HeroCard2Title: "Aamhalahi shikudya",
            HeroCard2Content: "Educational campaigns to guide underprivileged children towards learning, skill development, and a brighter future.",
            //welcome banner
            WelcomeBannerTitle: "Welcome to Jeevan Samvardhan",
            WelcomeBannerDesc:"Jeevan Samvardhan Foundation (JSF), founded by Sadashiv Chavan, is dedicated to uplifting homeless and underprivileged children. Rooted in rural Maharashtra, JSF provides education, nutrition, health awareness, sanitation, and vocational training—empowering children, youth, and women towards a dignified and self-reliant future.",
            WelcomeBannerGetInvolved: "Get Involved",
            WelcomeBannerDonateNow: "Donate Now",
            //featured campaigns
            FeaturedPreTitle: "We Need Your Help",
FeaturedTitle: "Featured Campaigns",
FeaturedSubTitle:"Growth often comes through challenges. By letting go of what is not essential, we create space for meaningful change.",
//contact us
ContactTitle: "Questions? Ask.",
ContactSubTitle:"When you donate to Jeevan Samvardhan, you can be sure that your contribution is used responsibly. If you have questions before making a donation, please feel free to contact us.",
ContactNameLabel: "Name",
ContactNamePlaceholder: "Your Name",
ContactMobileLabel: "Mobile Number",
ContactMobilePlaceholder: "Your Mobile Number",
ContactEmailLabel: "Email Address",
ContactEmailPlaceholder: "Your Email Address",
ContactQuestionLabel: "Question",
ContactQuestionPlaceholder: "Your Question",
ContactSubmitButton: "Submit",
//transparency
TransparencyTitle: "Committed to Transparency",
TransparencyDesc:"84% of our total operating expenses directly fund programs for children in the communities we serve. When you make a monthly gift or donation, the majority of your contribution goes exactly where you intend — supporting children in poverty.",
//footer
FooterLogoText: "Jeevan Samvardhan",
FooterConnect: "Connect with Us",
FooterQuickLinks: "Quick Links",
FooterFindUs: "Find us at",
FooterOffice: "Office:",
FooterCopyright:"Copyright © 2026 Digital Marketing Company. All rights reserved.",
FooterAllCampaign: "All Campaigns",
FooterWorkWithUs: "Work With Us",
FooterWhoWeAre: "Who We Are",
}
      },
      hi: {
        translation: {
            headerTitle: "जीवन संवर्धन",
            HeaderHomeLink: "होम",
            HeaderAboutUsLink: "हमारे बारे में",
            HeaderNewsLink: "समाचार",
            HeaderJoinUsLink: "हमसे जुड़ें",
            HeaderContactLink: "संपर्क",
            HeaderDonateNowLink: "अभी दान करें",

            // hero section
            HeroSectionTypography: "हम उन लोगों का जीवन बदलते हैं जिनके पास कोई आशा नहीं है।",
            HeroCard1Title: "चला घरी जाऊ द्या",
            HeroCard1Content: "हम बाल श्रम, तस्करी और शोषण से बच्चों की रक्षा करते हैं तथा उन्हें परिवार से मिलाने या सुरक्षित पुनर्वास देने का कार्य करते हैं।",
            HeroCard2Title: "आम्हालाही शिकू द्या",
            HeroCard2Content: "वंचित बच्चों को शिक्षा, कौशल विकास और उज्ज्वल भविष्य की ओर मार्गदर्शन करने के लिए अभियान चलाते हैं।",
            //welcome banner
            WelcomeBannerTitle: "जीवन संवर्धन में आपका स्वागत है",
            WelcomeBannerDesc:"जीवन संवर्धन फाउंडेशन (JSF), जिसकी स्थापना सदाशिव चव्हाण द्वारा की गई, बेघर और वंचित बच्चों के उत्थान के लिए समर्पित है। ग्रामीण महाराष्ट्र में जड़ें रखने वाला JSF शिक्षा, पोषण, स्वास्थ्य जागरूकता, स्वच्छता और व्यावसायिक प्रशिक्षण प्रदान करता है—ताकि बच्चे, युवा और महिलाएं सम्मानजनक व आत्मनिर्भर भविष्य की ओर बढ़ सकें।",
            WelcomeBannerGetInvolved: "हमसे जुड़ें",
            WelcomeBannerDonateNow: "अभी दान करें",
            //featured campaigns
            FeaturedPreTitle: "हमें आपकी सहायता की आवश्यकता है",
FeaturedTitle: "प्रमुख अभियान",
FeaturedSubTitle:"विकास अक्सर चुनौतियों के माध्यम से आता है। जो आवश्यक नहीं है उसे छोड़कर हम सार्थक परिवर्तन के लिए स्थान बनाते हैं।",
//contact us
ContactTitle: "कोई प्रश्न है? पूछें।",
ContactSubTitle:"जब आप जीवन संवर्धन को दान देते हैं, तो आप निश्चिंत रह सकते हैं कि आपका योगदान जिम्मेदारी से उपयोग किया जाता है। यदि दान करने से पहले आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें।",
ContactNameLabel: "नाम",
ContactNamePlaceholder: "आपका नाम",
ContactMobileLabel: "मोबाइल नंबर",
ContactMobilePlaceholder: "आपका मोबाइल नंबर",
ContactEmailLabel: "ईमेल पता",
ContactEmailPlaceholder: "आपका ईमेल पता",
ContactQuestionLabel: "प्रश्न",
ContactQuestionPlaceholder: "आपका प्रश्न",
ContactSubmitButton: "जमा करें",
//transparency
TransparencyTitle: "पारदर्शिता के प्रति प्रतिबद्ध",
TransparencyDesc:"हमारे कुल संचालन व्यय का 84% उन समुदायों में बच्चों के कार्यक्रमों पर सीधे खर्च किया जाता है जहाँ हम कार्य करते हैं। जब आप मासिक योगदान या दान देते हैं, तो आपकी अधिकांश राशि वहीं उपयोग होती है जहाँ आप चाहते हैं — गरीबी में जी रहे बच्चों के समर्थन के लिए।",
//footer
FooterLogoText: "जीवन संवर्धन",
FooterConnect: "हमसे जुड़ें",
FooterQuickLinks: "त्वरित लिंक",
FooterFindUs: "हमारा पता",
FooterOffice: "कार्यालय:",
FooterCopyright:"कॉपीराइट © 2026 डिजिटल मार्केटिंग कंपनी। सर्वाधिकार सुरक्षित।",
FooterAllCampaign: "सभी अभियान",
FooterWorkWithUs: "हमारे साथ काम करें",
FooterWhoWeAre: "हम कौन हैं",
}
      },
      mr: {
        translation: {
            headerTitle: "जीवन संवर्धन",
            HeaderHomeLink: "मुख्यपृष्ठ",
            HeaderAboutUsLink: "आमच्याबद्दल",
            HeaderNewsLink: "बातम्या",
            HeaderJoinUsLink: "आमच्यात सामील व्हा",
            HeaderContactLink: "संपर्क",
            HeaderDonateNowLink: "आता देणगी द्या",

            // hero section
            HeroSectionTypography: "ज्यांच्याकडे आशा नाही, त्यांच्या जीवनात आम्ही बदल घडवतो.",
            HeroCard1Title: "चला घरी जाऊ द्या",
            HeroCard1Content: "बालमजुरी, तस्करी आणि शोषणापासून मुलांचे संरक्षण करून त्यांना कुटुंबाशी पुन्हा जोडणे किंवा सुरक्षित पुनर्वसन देणे हे आमचे कार्य आहे.",
            HeroCard2Title: "आम्हालाही शिकू द्या",
            HeroCard2Content: "वंचित मुलांना शिक्षण, कौशल्य विकास आणि उज्ज्वल भविष्यासाठी मार्गदर्शन करणारे उपक्रम राबवतो.",
            //welcome banner
            WelcomeBannerTitle: "जीवन संवर्धन मध्ये आपले स्वागत आहे",
            WelcomeBannerDesc:"जीवन संवर्धन फाउंडेशन (JSF), ज्याची स्थापना सदाशिव चव्हाण यांनी केली, हे बेघर व वंचित मुलांच्या उन्नतीसाठी कार्यरत आहे. ग्रामीण महाराष्ट्राशी निगडित असलेले JSF शिक्षण, पोषण, आरोग्य जनजागृती, स्वच्छता आणि व्यावसायिक प्रशिक्षण देऊन मुले, युवक आणि महिलांना सन्माननीय व स्वावलंबी भविष्याकडे सक्षम करते.",
            WelcomeBannerGetInvolved: "सहभागी व्हा",
            WelcomeBannerDonateNow: "आता देणगी द्या",
            //featured campaigns
            FeaturedPreTitle: "आम्हाला तुमच्या मदतीची गरज आहे",
FeaturedTitle: "विशेष उपक्रम",
FeaturedSubTitle: "प्रगती अनेकदा आव्हानांतून घडते. अनावश्यक गोष्टी दूर केल्यास अर्थपूर्ण बदलासाठी जागा निर्माण होते.",
//contact us
ContactTitle: "प्रश्न आहेत? विचारा.",
ContactSubTitle:"जीवन संवर्धनला देणगी दिल्यास आपले योगदान जबाबदारीने वापरले जाते याची खात्री बाळगा. देणगी देण्यापूर्वी काही प्रश्न असल्यास कृपया आमच्याशी संपर्क साधा.",
ContactNameLabel: "नाव",
ContactNamePlaceholder: "आपले नाव",
ContactMobileLabel: "मोबाइल क्रमांक",
ContactMobilePlaceholder: "आपला मोबाइल क्रमांक",
ContactEmailLabel: "ईमेल पत्ता",
ContactEmailPlaceholder: "आपला ईमेल पत्ता",
ContactQuestionLabel: "प्रश्न",
ContactQuestionPlaceholder: "आपला प्रश्न",
ContactSubmitButton: "सबमिट करा",
//transparency
TransparencyTitle: "पारदर्शिता के प्रति प्रतिबद्ध",
TransparencyDesc:"हमारे कुल संचालन व्यय का 84% उन समुदायों में बच्चों के कार्यक्रमों पर सीधे खर्च किया जाता है जहाँ हम कार्य करते हैं। जब आप मासिक योगदान या दान देते हैं, तो आपकी अधिकांश राशि वहीं उपयोग होती है जहाँ आप चाहते हैं — गरीबी में जी रहे बच्चों के समर्थन के लिए।",
//footer
FooterLogoText: "जीवन संवर्धन",
FooterConnect: "आमच्याशी संपर्क साधा",
FooterQuickLinks: "द्रुत दुवे",
FooterFindUs: "आमचा पत्ता",
FooterOffice: "कार्यालय:",
FooterCopyright:"कॉपीराइट © 2026 डिजिटल मार्केटिंग कंपनी. सर्व हक्क राखीव.",
FooterAllCampaign: "सर्व उपक्रम",
FooterWorkWithUs: "आमच्यासोबत काम करा",
FooterWhoWeAre: "आम्ही कोण आहोत",
}
}
    }
  });

export default i18n;