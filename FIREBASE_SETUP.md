# إعداد قواعل أمان Firestore

## المشكلة الحالية
عند محاولة إضافة أو حذف عقار من لوحة التحكم، تظهر الرسالة:
```
FirebaseError: Missing or insufficient permissions
```

## الحل

### 1. الذهاب إلى Firebase Console
https://console.firebase.google.com/project/estatein-project/firestore

### 2. الانتقال إلى Firestore Database Rules
- اختر **Cloud Firestore**
- اختر **Rules** من القائمة العلوية

### 3. استبدل القواعل الحالية بما يلي:

#### للتطوير (السماح الكامل):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة والكتابة لجميع المستخدمين (للتطوير فقط)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### للإنتاج (مع المصادقة):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة والكتابة للمستخدمين المسجلين فقط
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. انقر على **Publish**

## ✅ بعد التحديث
جرب الآن إضافة/تحديث/حذف عقار من لوحة التحكم - يجب أن يعمل بشكل صحيح!

## ملاحظة أمان ⚠️
- استخدم قاعدة التطوير (true) فقط أثناء الاختبار
- في الإنتاج، استخدم `request.auth != null` أو قواعل أكثر تحديداً
