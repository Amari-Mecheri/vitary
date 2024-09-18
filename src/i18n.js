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
      "admin": "Admin"
    }
  },
  fr: {
    translation: {
      "login": "Connexion",
      "username": "Nom d'utilisateur",
      "password": "Mot de passe",
      "invalid_credentials": "Nom d'utilisateur ou mot de passe incorrect.",
      "login_success": "Connexion réussie!",
      "admin": "Admin"
    }
  },
  ar: {
    translation: {
      "login": "تسجيل الدخول",
      "username": "اسم المستخدم",
      "password": "كلمة المرور",
      "invalid_credentials": "اسم المستخدم أو كلمة المرور غير صحيحة.",
      "login_success": "تم تسجيل الدخول بنجاح!",
      "admin": "مدير"
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
