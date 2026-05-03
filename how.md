# Guide de Déploiement (GitHub & Cloudflare Pages)

Ce guide explique comment mettre à jour vos deux pages de destination hébergées sur **Cloudflare Pages**.

## 1. Kera Landing Page (`kera-landing-page`)
Pour mettre à jour la page **Kera** :

1. Ouvrez votre terminal dans le dossier : `c:\Users\hp\Antigravity& Stitch\kera-landing-page`
2. **Préparer les fichiers** : `git add .`
3. **Enregistrer les changements** : `git commit -m "Mise à jour : Migration vers Cloudflare"`
4. **Envoyer sur GitHub** : `git push origin main`

*Le déploiement sur Cloudflare Pages se lancera automatiquement après le push.*

---

## 2. Balta Landing Page (`balta-landing-page`)
Pour mettre à jour la page **Baltazar** :

1. Ouvrez votre terminal dans le dossier : `c:\Users\hp\Antigravity& Stitch\balta-landing-page`
2. **Préparer les fichiers** : `git add .`
3. **Enregistrer les changements** : `git commit -m "Mise à jour : Migration vers Cloudflare"`
4. **Envoyer sur GitHub** : `git push origin main`

*Le déploiement sur Cloudflare Pages se lancera automatiquement après le push.*

---

## Notes Importantes
- **Analytics** : Cloudflare Web Analytics est prêt. Si vous avez un Token, insérez-le dans le fichier `index.html`. Sinon, activez "Web Analytics" dans votre tableau de bord Cloudflare pour un suivi automatique.
- **Domaines** : N'oubliez pas de configurer vos domaines personnalisés directement dans l'interface Cloudflare Pages si nécessaire.
- **Vercel** : Tous les fichiers liés à Vercel ont été supprimés pour alléger le projet.