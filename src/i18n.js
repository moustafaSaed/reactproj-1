import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            // header
            "todo": "todo list",
            "logout": "log out",
            "profile": "profile",
            "muslim": "muslim",
            "html": "html",
            "hello": "hello : ",
            "motiv": "i hope i can help you to manage your time, breakdown difficult tasks, easily attain you goals  ...",
            "langs": "langs",
            "english": "english",
            "arabic": "arabic",
            "signin": "sign in",
            "signup": "sign up",
            "emailEx": "Ex : name@something.com",
            "password": "password",
            "regist": "regist",
            "reset": "reset",
            "name": "name",
            "phone": "phone",
            "email": "email",
            "timeCreat": "creation time",
            "lastSignIn": "last sign in",
            "emailStatus": "email status",
            "verified": "verified",
            "notverified": "not verified",
            "verMess": "we sent you a verfication link to sure that's your mail",
            "noTasks": "you have no tasks yet, add more tasks .. ",
            "allTasks": "all tasks",
            "compTasks": "completed tasks",
            "notCompTasks": "not completed tasks",
            "todoList": "todo list",
            "newFirst": "newest first",
            "oldFirst": "oldest first",
            "addNewTask": "add new task",
            "add": "add",
            "cancel": "cancel",
            "submit": "submit",
            "profileInfo": "profile info",
            "goApp": "go to todoList",
            "years": "years ago",
            "months": "months ago",
            "days": "days ago",
            "hours": "hours ago",
            "minutes": "minutes ago",
            "seconds": "seconds",
        }
    },
    ar: {
        translation: {
            // header
            "todo": "قائمة المهام",
            "logout": "تسجيل الخروج",
            "profile": "الحساب",
            "muslim": "مُسلِم",
            "html": "هتمل",
            "hello": "مرحباً  : ",
            "motiv": "آمل أن أتمكن من مساعدتك في إدارة وقتك، وتقسيم المهام الصعبة، وتحقيق أهدافك بسهولة ...",
            "langs": "اللغات",
            "english": "الانجليزية",
            "arabic": "العربية",
            "signin": "تسجيل الدخول",
            "signup": "إنشاء حساب",
            "emailEx": "مثـال : name@something.com",
            "password": "كلمة السر",
            "regist": "سجّل",
            "reset": "إستعادة",
            "name": "الاسم",
            "phone": "الرقم",
            "email": "الإيميل",
            "timeCreat": "وقت الإنشاء",
            "lastSignIn": "اخر تسجيل دخول",
            "emailStatus": "حالة الإيميل",
            "verified": "مؤكد",
            "notverified": "غير مؤكد",
            "verMess": "أرسلنا لك رابط على ايميلك للتحقق ما إن كان هذا هو بريدك الخاص",
            "noTasks": "ليس لديك مهام بعد، قم بإضافة المزيد من المهام  ... ",
            "allTasks": "كل المهام",
            "compTasks": "مهام انتهت",
            "notCompTasks": "مهام قائمة",
            "todoList": "قائمة المهام",
            "newFirst": "الأحدث أولاً",
            "oldFirst": "الأقدم أولاً",
            "addNewTask": "إضافة مُهمة جديدة",
            "add": "أضِف",
            "cancel": "إلغـَاء",
            "submit": "إضَافة",
            "profileInfo": "معلومات الحساب",
            "goApp": "اذهب إلى قائمة المهَام",
            "years": "سنة",
            "months": "شهر",
            "days": "يوم",
            "hours": "ساعة",
            "minutes": "دقيقة",
            "seconds": "ثانية",
            }
        }
    };

    i18n.use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            detection: {
                order: ["localStorage", "htmlTag"],
                caches: ["localStorage"],
            },

            interpolation: {
                escapeValue: false, // react already safes from xss
            },

            react: {
                useSuspense: false,
            },
        });

    export default i18n;