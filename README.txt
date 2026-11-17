CONSTANTA MANEUVER PLAN - PWA (functioneaza pe Android, iPhone, tableta, calculator)

Continut: index.html, sw.js (mod offline), manifest.webmanifest, folderele maps si icons.

PUBLICARE GRATUITA PE GITHUB PAGES (aprox. 10 minute)
 1. Fa-ti un cont pe github.com (gratuit).
 2. New repository -> nume, de exemplu "maneuver-plan" -> Public -> Create repository.
 3. Apasa "uploading an existing file" si trage in fereastra TOT continutul acestui folder
    (index.html, sw.js, manifest.webmanifest, folderele maps si icons). Apoi Commit changes.
 4. Settings -> Pages -> la "Branch" alege main si folderul "/ (root)" -> Save.
 5. Dupa 1-2 minute apare adresa: https://NUMELE-TAU.github.io/maneuver-plan/
    Deschide-o intr-un browser ca sa verifici ca merge.

ATENTIE: un repository Public inseamna ca oricine are adresa poate deschide aplicatia si vedea hartile.
Hartile sunt documente ale C.N. Administratia Porturilor Maritime: verifica daca ai voie sa le publici.
Daca nu, gazduieste aplicatia pe un server intern al companiei sau cere acordul administratiei.

INSTALARE PE TELEFON (deschide adresa o data cu internet)
 Android (Chrome): meniul cu 3 puncte -> "Instaleaza aplicatia" sau "Adauga pe ecranul principal".
 iPhone (Safari): butonul Share -> "Add to Home Screen" -> Add.
 Dupa prima deschidere aplicatia merge si fara internet.

PDF
 Android si calculator: PDF-ul se descarca in Downloads.
 iPhone: se deschide meniul Share; alege "Save to Files" sau trimite PDF-ul direct pe email.

ACTUALIZARE
 Incarca fisierele noi peste cele vechi in repository. In sw.js schimba "maneuver-plan-v5" in "maneuver-plan-v6" (numarul creste la fiecare versiune noua),
 ca telefoanele sa primeasca versiunea noua.

OPTIONAL (recomandat)
 Descarca biblioteca PDF de la https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
 si incarca fisierul, cu numele jspdf.umd.min.js, langa index.html. Asa nu depinde de CDN la prima deschidere.
