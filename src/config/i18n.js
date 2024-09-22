// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "login": "Login",
      "username": "Username",
      "password": "Password",
      "invalid_credentials": "Invalid username or password.",
      "login_success": "Login successful!",
      "admin": "Admin",
      "no_access_last_page": "You no longer have access to the last visited page.",
      "loading": "Loading",
      "page_not_found": "Page Not Found",
      "return_home": "Return to the home page.",
      "userManagement": "User Management",
      "calendar": "Calendar",
      "inventory": "Inventory",
      "expenses": "Expenses",
      "reports": "Reports",
      "clientFiles": "Client Files",
      "logout": "Logout",
      "user": "User",
      "settings": "Settings",
      "changePassword": "Change Password"
    }
  },
  fr: {
    translation: {
      "login": "Connexion",
      "username": "Nom d'utilisateur",
      "password": "Mot de passe",
      "invalid_credentials": "Nom d'utilisateur ou mot de passe incorrect.",
      "login_success": "Connexion réussie!",
      "admin": "Admin",
      "no_access_last_page": "Vous n'avez plus accès à la dernière page visitée.",
      "loading":"Chargement",
      "page_not_found": "Page non trouvée",
      "return_home": "Retour à la page d'accueil.",
      "userManagement": "Gestion des utilisateurs",
      "calendar": "Calendrier",
      "inventory": "Inventaire",
      "expenses": "Dépenses",
      "reports": "Rapports",
      "clientFiles": "Fichiers clients",
      "logout": "Déconnexion",
      "user": "Utilisateur",
      "settings": "Paramètres",
      "changePassword": "Changer le mot de passe"
    }
  },
  ar: {
    translation: {
      "login": "تسجيل الدخول",
      "username": "اسم المستخدم",
      "password": "كلمة المرور",
      "invalid_credentials": "اسم المستخدم أو كلمة المرور غير صحيحة.",
      "login_success": "تم تسجيل الدخول بنجاح!",
      "admin": "مدير",
      "no_access_last_page": "لم يعد لديك صلاحية الوصول إلى الصفحة التي زرتها آخر مرة.",
      "loading": "جارٍ التحميل",
      "page_not_found": "الصفحة غير موجودة",
      "return_home": "العودة إلى الصفحة الرئيسية.",
      "userManagement": "إدارة المستخدمين",
      "calendar": "التقويم",
      "inventory": "المخزون",
      "expenses": "المصروفات",
      "reports": "التقارير",
      "clientFiles": "ملفات العملاء",
      "logout": "تسجيل الخروج",
      "user": "المستخدم",
      "settings": "الإعدادات",
      "changePassword": "تغيير كلمة المرور"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
