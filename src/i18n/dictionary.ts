export const LOCALES = ["en", "es", "fr", "de", "it"] as const;
export type Locale = (typeof LOCALES)[number];

export const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

// Flat key → per-locale string. Keep keys stable; add new copy here.
type Dict = Record<string, Record<Locale, string>>;

export const dict: Dict = {
  // ---- Nav ----
  "nav.inventory": { en: "Inventory", es: "Inventario", fr: "Inventaire", de: "Bestand", it: "Inventario" },
  "nav.import": { en: "US Import", es: "Importación", fr: "Importation", de: "US-Import", it: "Importazione" },
  "nav.contact": { en: "Contact", es: "Contacto", fr: "Contact", de: "Kontakt", it: "Contatto" },
  "nav.cta": { en: "Order a car", es: "Pedir un coche", fr: "Commander", de: "Auto bestellen", it: "Ordina un'auto" },
  "cta.importCar": { en: "Import a car", es: "Importar un coche", fr: "Importer une voiture", de: "Auto importieren", it: "Importa un'auto" },

  // ---- Find cars search ----
  "find.tab.all": { en: "All", es: "Todos", fr: "Tous", de: "Alle", it: "Tutti" },
  "find.tab.new": { en: "New", es: "Nuevos", fr: "Neufs", de: "Neu", it: "Nuovi" },
  "find.tab.used": { en: "Used", es: "Usados", fr: "Occasion", de: "Gebraucht", it: "Usati" },
  "find.tab.cpo": { en: "CPO", es: "Certificados", fr: "Certifiés", de: "Geprüft", it: "Certificati" },
  "find.anyMake": { en: "Any make", es: "Cualquier marca", fr: "Toute marque", de: "Alle Marken", it: "Qualsiasi marca" },
  "find.make": { en: "Make", es: "Marca", fr: "Marque", de: "Marke", it: "Marca" },
  "find.model": { en: "Model", es: "Modelo", fr: "Modèle", de: "Modell", it: "Modello" },
  "find.years": { en: "Years", es: "Años", fr: "Années", de: "Jahre", it: "Anni" },
  "find.price": { en: "Price", es: "Precio", fr: "Prix", de: "Preis", it: "Prezzo" },
  "find.search": { en: "Search", es: "Buscar", fr: "Rechercher", de: "Suchen", it: "Cerca" },

  // ---- Detail page ----
  "detail.topSpeed": { en: "Top speed", es: "Velocidad máx.", fr: "Vitesse max", de: "Höchstgeschw.", it: "Velocità max" },
  "detail.accel": { en: "0–100 km/h", es: "0–100 km/h", fr: "0–100 km/h", de: "0–100 km/h", it: "0–100 km/h" },
  "detail.power": { en: "Power", es: "Potencia", fr: "Puissance", de: "Leistung", it: "Potenza" },
  "detail.contact": { en: "Contact Us", es: "Contáctanos", fr: "Contactez-nous", de: "Kontakt", it: "Contattaci" },
  "detail.highlight": { en: "Product Highlight", es: "Destacados", fr: "Points forts", de: "Highlights", it: "In evidenza" },
  "detail.seats": { en: "Seating capacity", es: "Plazas", fr: "Places", de: "Sitzplätze", it: "Posti" },
  "detail.bodyType": { en: "Body type", es: "Carrocería", fr: "Carrosserie", de: "Karosserie", it: "Carrozzeria" },
  "detail.doors": { en: "Number of doors", es: "Nº de puertas", fr: "Nombre de portes", de: "Anzahl Türen", it: "Numero di porte" },
  "detail.information": { en: "Information", es: "Información", fr: "Informations", de: "Informationen", it: "Informazioni" },
  "detail.width": { en: "Width", es: "Anchura", fr: "Largeur", de: "Breite", it: "Larghezza" },
  "detail.length": { en: "Length", es: "Longitud", fr: "Longueur", de: "Länge", it: "Lunghezza" },
  "body.suv": { en: "SUV", es: "SUV", fr: "SUV", de: "SUV", it: "SUV" },

  // ---- Inventory make filter ----
  "inv.showingMake": { en: "Showing", es: "Mostrando", fr: "Affichage", de: "Anzeige", it: "Mostrando" },
  "inv.clearMake": { en: "Clear make filter", es: "Quitar filtro de marca", fr: "Effacer le filtre de marque", de: "Markenfilter entfernen", it: "Rimuovi filtro marca" },

  // ---- Hero ----
  "hero.cta.inventory": { en: "View Inventory", es: "Ver inventario", fr: "Voir l'inventaire", de: "Bestand ansehen", it: "Vedi inventario" },
  "hero.cta.import": { en: "Order from the US", es: "Pedir desde EE. UU.", fr: "Commander des USA", de: "Aus den USA bestellen", it: "Ordina dagli USA" },

  // ---- Trust stripe ----
  "trust.auth.title": { en: "100% Authenticated", es: "100% Autenticado", fr: "100% Authentifié", de: "100% Authentifiziert", it: "100% Autenticato" },
  "trust.auth.sub": { en: "Every vehicle independently verified & vetted", es: "Cada vehículo verificado e inspeccionado de forma independiente", fr: "Chaque véhicule vérifié et contrôlé indépendamment", de: "Jedes Fahrzeug unabhängig geprüft und verifiziert", it: "Ogni veicolo verificato e controllato in modo indipendente" },
  "trust.usa.title": { en: "Founded in the USA", es: "Fundada en EE. UU.", fr: "Fondée aux USA", de: "Gegründet in den USA", it: "Fondata negli USA" },
  "trust.usa.sub": { en: "Sourced direct from the American market", es: "Procedente directamente del mercado americano", fr: "Sourcé directement sur le marché américain", de: "Direkt vom amerikanischen Markt bezogen", it: "Proveniente direttamente dal mercato americano" },
  "trust.secure.title": { en: "Secure Transactions", es: "Transacciones Seguras", fr: "Transactions Sécurisées", de: "Sichere Transaktionen", it: "Transazioni Sicure" },
  "trust.secure.sub": { en: "Protected payments & full import transparency", es: "Pagos protegidos y total transparencia en la importación", fr: "Paiements protégés et transparence totale de l'importation", de: "Geschützte Zahlungen & volle Importtransparenz", it: "Pagamenti protetti e piena trasparenza sull'importazione" },

  // ---- Inventory ----
  "inv.eyebrow": { en: "Available on-island", es: "Disponible en la isla", fr: "Disponible sur l'île", de: "Auf der Insel verfügbar", it: "Disponibile sull'isola" },
  "inv.title": { en: "Current Inventory", es: "Inventario Actual", fr: "Inventaire Actuel", de: "Aktueller Bestand", it: "Inventario Attuale" },
  "inv.subtitle": { en: "Hand-selected, fully vetted, and ready to drive in Tenerife. Click any vehicle to see the full photo gallery.", es: "Seleccionados a mano, totalmente inspeccionados y listos para conducir en Tenerife. Haz clic en cualquier vehículo para ver la galería de fotos completa.", fr: "Sélectionnés à la main, entièrement contrôlés et prêts à rouler à Tenerife. Cliquez sur un véhicule pour voir la galerie photo complète.", de: "Handverlesen, vollständig geprüft und fahrbereit auf Teneriffa. Klicken Sie auf ein Fahrzeug für die vollständige Fotogalerie.", it: "Selezionati a mano, completamente controllati e pronti alla guida a Tenerife. Clicca su un veicolo per vedere la galleria fotografica completa." },
  "inv.moreInfo": { en: "More Info", es: "Más información", fr: "Plus d'infos", de: "Mehr Infos", it: "Più informazioni" },
  "inv.badge.inStock": { en: "In stock · Tenerife", es: "En stock · Tenerife", fr: "En stock · Tenerife", de: "Auf Lager · Teneriffa", it: "Disponibile · Tenerife" },
  "inv.badge.import": { en: "Available to import", es: "Disponible para importar", fr: "Disponible à l'import", de: "Zum Import verfügbar", it: "Disponibile su importazione" },
  "inv.filter.all": { en: "All", es: "Todos", fr: "Tous", de: "Alle", it: "Tutti" },
  "inv.filter.inStock": { en: "In stock", es: "En stock", fr: "En stock", de: "Auf Lager", it: "Disponibili" },
  "inv.filter.import": { en: "To import", es: "Importar", fr: "À importer", de: "Importieren", it: "Da importare" },
  "inv.empty": { en: "No vehicles in this category right now — tell us what you're after and we'll source it.", es: "Ahora mismo no hay vehículos en esta categoría — dinos qué buscas y lo conseguimos.", fr: "Aucun véhicule dans cette catégorie pour le moment — dites-nous ce que vous cherchez et nous le trouverons.", de: "Derzeit keine Fahrzeuge in dieser Kategorie — sagen Sie uns, was Sie suchen, und wir beschaffen es.", it: "Al momento nessun veicolo in questa categoria — dicci cosa cerchi e lo troviamo." },

  // ---- Vehicle taglines ----
  "veh.4runner.tagline": { en: "Body-on-frame icon. Built to outlast the island roads.", es: "Icono con chasis independiente. Hecho para durar más que las carreteras de la isla.", fr: "Icône à châssis séparé. Conçu pour durer plus que les routes de l'île.", de: "Leiterrahmen-Ikone. Gebaut, um die Inselstraßen zu überdauern.", it: "Icona con telaio a longheroni. Costruito per durare più delle strade dell'isola." },
  "veh.bronco.tagline": { en: "Compact adventure rig. Trail-ready, city-refined.", es: "Todoterreno compacto de aventura. Listo para el campo, refinado para la ciudad.", fr: "Tout-terrain compact d'aventure. Prêt pour les sentiers, raffiné pour la ville.", de: "Kompaktes Abenteuerfahrzeug. Geländetauglich, stadtfein.", it: "Mezzo compatto da avventura. Pronto per i sentieri, raffinato per la città." },

  // ---- Colors / conditions ----
  "color.blue": { en: "Blue", es: "Azul", fr: "Bleu", de: "Blau", it: "Blu" },
  "cond.4runner": { en: "Excellent — single owner", es: "Excelente — único propietario", fr: "Excellent — un seul propriétaire", de: "Ausgezeichnet — Erstbesitz", it: "Eccellente — unico proprietario" },
  "cond.bronco": { en: "Like new", es: "Como nuevo", fr: "Comme neuf", de: "Wie neu", it: "Come nuovo" },

  // ---- Spec labels ----
  "spec.engine": { en: "Engine", es: "Motor", fr: "Moteur", de: "Motor", it: "Motore" },
  "spec.drivetrain": { en: "Drivetrain", es: "Tracción", fr: "Transmission", de: "Antrieb", it: "Trazione" },
  "spec.transmission": { en: "Transmission", es: "Caja de cambios", fr: "Boîte de vitesses", de: "Getriebe", it: "Cambio" },
  "spec.fuel": { en: "Fuel", es: "Combustible", fr: "Carburant", de: "Kraftstoff", it: "Carburante" },
  "spec.seats": { en: "Seats", es: "Plazas", fr: "Places", de: "Sitze", it: "Posti" },
  "spec.exterior": { en: "Exterior", es: "Exterior", fr: "Extérieur", de: "Außenfarbe", it: "Esterno" },

  // ---- Spec values (translatable) ----
  "val.gasoline": { en: "Gasoline", es: "Gasolina", fr: "Essence", de: "Benzin", it: "Benzina" },
  "val.auto5": { en: "5-speed Automatic", es: "Automático de 5 velocidades", fr: "Automatique 5 vitesses", de: "5-Gang-Automatik", it: "Automatico a 5 rapporti" },
  "val.auto8": { en: "8-speed Automatic", es: "Automático de 8 velocidades", fr: "Automatique 8 vitesses", de: "8-Gang-Automatik", it: "Automatico a 8 rapporti" },

  // ---- Highlights ----
  "hl.inspection": { en: "Pre-import 150-point inspection", es: "Inspección de 150 puntos previa a la importación", fr: "Inspection en 150 points avant importation", de: "150-Punkte-Prüfung vor dem Import", it: "Ispezione in 150 punti prima dell'importazione" },
  "hl.4runner.1": { en: "Full US service history & Carfax", es: "Historial de servicio completo de EE. UU. y Carfax", fr: "Historique d'entretien complet US & Carfax", de: "Vollständige US-Servicehistorie & Carfax", it: "Storico completo dei tagliandi USA e Carfax" },
  "hl.4runner.3": { en: "TRD-style off-road package", es: "Paquete todoterreno estilo TRD", fr: "Pack tout-terrain style TRD", de: "Geländepaket im TRD-Stil", it: "Pacchetto off-road stile TRD" },
  "hl.bronco.1": { en: "G.O.A.T. terrain management modes", es: "Modos de gestión de terreno G.O.A.T.", fr: "Modes de gestion de terrain G.O.A.T.", de: "G.O.A.T.-Geländemodi", it: "Modalità di gestione del terreno G.O.A.T." },
  "hl.bronco.3": { en: "Co-Pilot360 driver assist suite", es: "Suite de asistencia Co-Pilot360", fr: "Suite d'aide à la conduite Co-Pilot360", de: "Co-Pilot360 Fahrerassistenz-Paket", it: "Suite di assistenza alla guida Co-Pilot360" },

  // ---- Vehicle modal ----
  "modal.price": { en: "On-island price", es: "Precio en la isla", fr: "Prix sur l'île", de: "Preis auf der Insel", it: "Prezzo sull'isola" },
  "modal.priceNote": { en: "Local Canary Islands pricing — IGIC included. US custom-order quotes itemize freight, customs & DUA separately.", es: "Precio local de Canarias — IGIC incluido. Los pedidos personalizados desde EE. UU. detallan flete, aduanas y DUA por separado.", fr: "Prix local des Canaries — IGIC inclus. Les commandes personnalisées des USA détaillent le fret, la douane et le DUA séparément.", de: "Lokaler Kanaren-Preis — IGIC inklusive. US-Sonderbestellungen weisen Fracht, Zoll & DUA separat aus.", it: "Prezzo locale delle Canarie — IGIC incluso. I preventivi su ordinazione dagli USA dettagliano nolo, dogana e DUA separatamente." },
  "modal.mileage": { en: "Mileage", es: "Kilometraje", fr: "Kilométrage", de: "Laufleistung", it: "Chilometraggio" },
  "modal.condition": { en: "Condition", es: "Estado", fr: "État", de: "Zustand", it: "Condizione" },
  "modal.orbitHint": { en: "Swipe to rotate 360° · scroll to zoom", es: "Desliza para girar 360° · desplaza para acercar", fr: "Glissez pour pivoter à 360° · défilez pour zoomer", de: "Wischen zum 360°-Drehen · scrollen zum Zoomen", it: "Scorri per ruotare a 360° · scorri per zoomare" },
  "modal.loading": { en: "Loading model", es: "Cargando modelo", fr: "Chargement du modèle", de: "Modell wird geladen", it: "Caricamento modello" },
  "modal.enquire": { en: "Enquire about this vehicle", es: "Consultar sobre este vehículo", fr: "Se renseigner sur ce véhicule", de: "Zu diesem Fahrzeug anfragen", it: "Richiedi info su questo veicolo" },
  "modal.viewPhoto": { en: "View photo", es: "Ver foto", fr: "Voir la photo", de: "Foto ansehen", it: "Vedi foto" },
  "modal.prevPhoto": { en: "Previous photo", es: "Foto anterior", fr: "Photo précédente", de: "Vorheriges Foto", it: "Foto precedente" },
  "modal.nextPhoto": { en: "Next photo", es: "Foto siguiente", fr: "Photo suivante", de: "Nächstes Foto", it: "Foto successiva" },
  "modal.closePhoto": { en: "Close", es: "Cerrar", fr: "Fermer", de: "Schließen", it: "Chiudi" },

  // ---- Import hub ----
  "import.eyebrow": { en: "Core business", es: "Negocio principal", fr: "Activité principale", de: "Kerngeschäft", it: "Attività principale" },
  "import.title1": { en: "Custom-ordered from the", es: "Pedido personalizado desde", fr: "Commandé sur mesure depuis", de: "Maßgefertigt aus den", it: "Ordinato su misura dagli" },
  "import.titleUS": { en: "United States", es: "Estados Unidos", fr: "États-Unis", de: "Vereinigten Staaten", it: "Stati Uniti" },
  "import.title2": { en: "Delivered to Tenerife.", es: "Entregado en Tenerife.", fr: "Livré à Tenerife.", de: "Geliefert nach Teneriffa.", it: "Consegnato a Tenerife." },
  "import.lead": { en: "VALS isn't just a local lot. We source, inspect, and import custom-ordered vehicles directly from the US market — handling every step from auction floor to your driveway in the Canary Islands.", es: "VALS no es solo un concesionario local. Buscamos, inspeccionamos e importamos vehículos por encargo directamente del mercado estadounidense, gestionando cada paso desde la subasta hasta tu casa en Canarias.", fr: "VALS n'est pas qu'un parc local. Nous sourçons, inspectons et importons des véhicules sur commande directement du marché américain — gérant chaque étape, de la salle des ventes à votre allée aux Canaries.", de: "VALS ist nicht nur ein lokaler Händler. Wir beschaffen, prüfen und importieren maßgefertigte Fahrzeuge direkt vom US-Markt — und übernehmen jeden Schritt von der Auktion bis in Ihre Einfahrt auf den Kanaren.", it: "VALS non è solo un piazzale locale. Cerchiamo, ispezioniamo e importiamo veicoli su ordinazione direttamente dal mercato statunitense, gestendo ogni fase, dall'asta al tuo vialetto alle Canarie." },
  "import.step1.t": { en: "You choose", es: "Tú eliges", fr: "Vous choisissez", de: "Sie wählen", it: "Tu scegli" },
  "import.step1.d": { en: "Tell us the exact US car and spec. We locate and verify it stateside.", es: "Dinos el coche americano y la especificación exacta. Lo localizamos y verificamos en EE. UU.", fr: "Dites-nous la voiture américaine et la spécification exacte. Nous la localisons et la vérifions aux USA.", de: "Nennen Sie uns das genaue US-Auto und die Spezifikation. Wir finden und prüfen es in den USA.", it: "Dicci l'auto americana e la specifica esatta. La individuiamo e verifichiamo negli USA." },
  "import.step2.t": { en: "We inspect & buy", es: "Inspeccionamos y compramos", fr: "Nous inspectons et achetons", de: "Wir prüfen & kaufen", it: "Ispezioniamo e acquistiamo" },
  "import.step2.d": { en: "Independent 150-point inspection before VALS purchases on your behalf.", es: "Inspección independiente de 150 puntos antes de que VALS lo compre por ti.", fr: "Inspection indépendante en 150 points avant que VALS ne l'achète pour vous.", de: "Unabhängige 150-Punkte-Prüfung, bevor VALS für Sie kauft.", it: "Ispezione indipendente in 150 punti prima che VALS lo acquisti per te." },
  "import.step3.t": { en: "Shipping & customs", es: "Envío y aduanas", fr: "Transport et douane", de: "Versand & Zoll", it: "Spedizione e dogana" },
  "import.step3.d": { en: "Ocean freight, Tenerife customs, IGIC & DUA handled end-to-end — paperwork included.", es: "Flete marítimo, aduanas de Tenerife, IGIC y DUA gestionados de principio a fin — papeleo incluido.", fr: "Fret maritime, douane de Tenerife, IGIC et DUA gérés de bout en bout — paperasse incluse.", de: "Seefracht, Zoll auf Teneriffa, IGIC & DUA komplett abgewickelt — Papierkram inklusive.", it: "Trasporto marittimo, dogana di Tenerife, IGIC e DUA gestiti dall'inizio alla fine — pratiche incluse." },
  "import.step4.t": { en: "Delivered to your door", es: "Entregado en tu puerta", fr: "Livré à votre porte", de: "Bis vor Ihre Tür geliefert", it: "Consegnato a casa tua" },
  "import.step4.d": { en: "Registered, road-legal and delivered anywhere in Tenerife — ready to drive.", es: "Matriculado, legal para circular y entregado en cualquier punto de Tenerife — listo para conducir.", fr: "Immatriculé, homologué et livré partout à Tenerife — prêt à rouler.", de: "Zugelassen, straßentauglich und überall auf Teneriffa geliefert — fahrbereit.", it: "Immatricolato, omologato e consegnato ovunque a Tenerife — pronto alla guida." },
  "import.videos.label": { en: "Real imports, handled by us", es: "Importaciones reales, gestionadas por nosotros", fr: "Importations réelles, gérées par nous", de: "Echte Importe, von uns abgewickelt", it: "Importazioni reali, gestite da noi" },
  "import.disclosure.before": { en: "Vehicles listed directly on our platform represent ", es: "Los vehículos listados directamente en nuestra plataforma representan ", fr: "Les véhicules listés directement sur notre plateforme représentent ", de: "Direkt auf unserer Plattform gelistete Fahrzeuge stellen ", it: "I veicoli elencati direttamente sulla nostra piattaforma rappresentano " },
  "import.disclosure.local": { en: "local on-island pricing", es: "precios locales en la isla", fr: "des prix locaux sur l'île", de: "lokale Inselpreise", it: "i prezzi locali sull'isola" },
  "import.disclosure.mid": { en: ". For custom vehicle requests sourced from the US market, finalized quotes will explicitly itemize ", es: ". Para solicitudes de vehículos personalizados desde el mercado estadounidense, los presupuestos finales detallarán explícitamente ", fr: ". Pour les demandes de véhicules sur mesure depuis le marché américain, les devis finaux détailleront explicitement ", de: ". Bei individuellen Fahrzeuganfragen vom US-Markt weisen die endgültigen Angebote ausdrücklich ", it: ". Per richieste di veicoli su misura dal mercato statunitense, i preventivi finali dettaglieranno esplicitamente " },
  "import.disclosure.fees": { en: "container logistics, ocean freight handling, customs clearing, IGIC, and DUA import processing fees", es: "la logística de contenedores, el flete marítimo, el despacho de aduanas, el IGIC y las tasas de tramitación DUA de importación", fr: "la logistique des conteneurs, le fret maritime, le dédouanement, l'IGIC et les frais de traitement DUA à l'importation", de: "Container-Logistik, Seefracht-Abwicklung, Zollabfertigung, IGIC und DUA-Importgebühren", it: "la logistica dei container, il trasporto marittimo, lo sdoganamento, l'IGIC e le spese di trattamento DUA all'importazione" },

  // ---- Survey ----
  "survey.step.vehicle": { en: "Vehicle", es: "Vehículo", fr: "Véhicule", de: "Fahrzeug", it: "Veicolo" },
  "survey.step.budget": { en: "Budget", es: "Presupuesto", fr: "Budget", de: "Budget", it: "Budget" },
  "survey.step.contact": { en: "Contact", es: "Contacto", fr: "Contact", de: "Kontakt", it: "Contatto" },
  "survey.q1": { en: "What are we hunting for?", es: "¿Qué estamos buscando?", fr: "Que recherchons-nous ?", de: "Wonach suchen wir?", it: "Cosa stiamo cercando?" },
  "survey.yearFrom": { en: "Year from", es: "Año desde", fr: "Année de", de: "Jahr von", it: "Anno da" },
  "survey.yearTo": { en: "Year to", es: "Año hasta", fr: "Année à", de: "Jahr bis", it: "Anno a" },
  "survey.make": { en: "Make", es: "Marca", fr: "Marque", de: "Marke", it: "Marca" },
  "survey.model": { en: "Model", es: "Modelo", fr: "Modèle", de: "Modell", it: "Modello" },
  "survey.q2": { en: "What's your target budget? (vehicle only — import fees quoted separately)", es: "¿Cuál es tu presupuesto objetivo? (solo vehículo — las tasas de importación se cotizan aparte)", fr: "Quel est votre budget cible ? (véhicule seul — frais d'importation chiffrés séparément)", de: "Wie hoch ist Ihr Zielbudget? (nur Fahrzeug — Importgebühren werden separat angegeben)", it: "Qual è il tuo budget previsto? (solo veicolo — le spese di importazione sono quotate a parte)" },
  "survey.budget": { en: "Estimated budget (€)", es: "Presupuesto estimado (€)", fr: "Budget estimé (€)", de: "Geschätztes Budget (€)", it: "Budget stimato (€)" },
  "survey.notes": { en: "Anything specific? (optional)", es: "¿Algo específico? (opcional)", fr: "Quelque chose de précis ? (facultatif)", de: "Etwas Bestimmtes? (optional)", it: "Qualcosa di specifico? (facoltativo)" },
  "survey.notesPh": { en: "Trim, color, must-have options…", es: "Acabado, color, opciones imprescindibles…", fr: "Finition, couleur, options indispensables…", de: "Ausstattung, Farbe, Must-have-Optionen…", it: "Allestimento, colore, opzioni irrinunciabili…" },
  "survey.q3": { en: "Where do we send your itemized quote?", es: "¿A dónde enviamos tu presupuesto detallado?", fr: "Où envoyons-nous votre devis détaillé ?", de: "Wohin senden wir Ihr detailliertes Angebot?", it: "Dove inviamo il tuo preventivo dettagliato?" },
  "survey.name": { en: "Full name", es: "Nombre completo", fr: "Nom complet", de: "Vollständiger Name", it: "Nome completo" },
  "survey.phone": { en: "Phone", es: "Teléfono", fr: "Téléphone", de: "Telefon", it: "Telefono" },
  "survey.email": { en: "Email", es: "Correo electrónico", fr: "E-mail", de: "E-Mail", it: "Email" },
  "survey.back": { en: "Back", es: "Atrás", fr: "Retour", de: "Zurück", it: "Indietro" },
  "survey.continue": { en: "Continue", es: "Continuar", fr: "Continuer", de: "Weiter", it: "Continua" },
  "survey.send": { en: "Request quote", es: "Solicitar presupuesto", fr: "Demander un devis", de: "Angebot anfordern", it: "Richiedi preventivo" },
  "survey.sending": { en: "Sending…", es: "Enviando…", fr: "Envoi…", de: "Senden…", it: "Invio…" },
  "survey.successTitle": { en: "Request received", es: "Solicitud recibida", fr: "Demande reçue", de: "Anfrage erhalten", it: "Richiesta ricevuta" },
  "survey.successBody": { en: "Our import specialists are already on it — expect a personally itemized US-sourcing quote within 48 hours.", es: "Nuestros especialistas en importación ya están en ello: recibirás un presupuesto detallado de aprovisionamiento en EE. UU. en un plazo de 48 horas.", fr: "Nos spécialistes de l'importation s'en occupent déjà — vous recevrez un devis détaillé de sourcing aux USA sous 48 heures.", de: "Unsere Import-Spezialisten sind bereits dran — Sie erhalten innerhalb von 48 Stunden ein detailliertes US-Beschaffungsangebot.", it: "I nostri specialisti dell'importazione sono già al lavoro: riceverai un preventivo dettagliato di approvvigionamento dagli USA entro 48 ore." },
  "survey.successThanks": { en: "Thank you", es: "Gracias", fr: "Merci", de: "Vielen Dank", it: "Grazie" },
  "survey.another": { en: "Submit another request", es: "Enviar otra solicitud", fr: "Soumettre une autre demande", de: "Weitere Anfrage senden", it: "Invia un'altra richiesta" },

  // ---- Footer ----
  "footer.about.eyebrow": { en: "About VALS", es: "Sobre VALS", fr: "À propos de VALS", de: "Über VALS", it: "Chi è VALS" },
  "footer.about.title": { en: "Tenerife's premium bridge to the American automotive market.", es: "El puente premium de Tenerife al mercado automovilístico americano.", fr: "Le pont premium de Tenerife vers le marché automobile américain.", de: "Teneriffas Premium-Brücke zum amerikanischen Automobilmarkt.", it: "Il ponte premium di Tenerife verso il mercato automobilistico americano." },
  "footer.about.body": { en: "We exist for one reason: to bring the cars you can't find here, here — without compromise. Every vehicle is independently vetted, every quote is itemized to the cent, and every import is shepherded personally from the US market to the Canary Islands. No hidden fees, no guesswork. Just uncompromising transparency and the machines you actually want to drive.", es: "Existimos por una razón: traer aquí los coches que no encuentras, sin concesiones. Cada vehículo se inspecciona de forma independiente, cada presupuesto se detalla al céntimo y cada importación se acompaña personalmente desde EE. UU. hasta Canarias. Sin tarifas ocultas ni conjeturas. Solo transparencia absoluta y los coches que de verdad quieres conducir.", fr: "Nous existons pour une raison : amener ici les voitures introuvables, sans compromis. Chaque véhicule est contrôlé indépendamment, chaque devis est détaillé au centime, et chaque importation est accompagnée personnellement des USA jusqu'aux Canaries. Aucun frais caché, aucune approximation. Juste une transparence totale et les voitures que vous voulez vraiment conduire.", de: "Wir existieren aus einem Grund: die Autos, die es hier nicht gibt, hierherzubringen — kompromisslos. Jedes Fahrzeug wird unabhängig geprüft, jedes Angebot auf den Cent aufgeschlüsselt und jeder Import persönlich von den USA bis zu den Kanaren begleitet. Keine versteckten Kosten, kein Raten. Nur kompromisslose Transparenz und die Autos, die Sie wirklich fahren wollen.", it: "Esistiamo per un motivo: portare qui le auto che non trovi, senza compromessi. Ogni veicolo è controllato in modo indipendente, ogni preventivo è dettagliato al centesimo e ogni importazione è seguita personalmente dagli USA alle Canarie. Nessun costo nascosto, nessuna approssimazione. Solo trasparenza assoluta e le auto che vuoi davvero guidare." },
  "footer.stat.turnaround": { en: "Quote turnaround", es: "Tiempo de respuesta", fr: "Délai de devis", de: "Angebotsfrist", it: "Tempi di preventivo" },
  "footer.stat.inspection": { en: "Point inspection", es: "Puntos de inspección", fr: "Points d'inspection", de: "Punkte-Prüfung", it: "Punti di ispezione" },
  "footer.stat.fees": { en: "Itemized import fees", es: "Tasas de importación detalladas", fr: "Frais d'importation détaillés", de: "Detaillierte Importgebühren", it: "Spese di importazione dettagliate" },
  "footer.getInTouch": { en: "Get in touch", es: "Contáctanos", fr: "Contactez-nous", de: "Kontakt aufnehmen", it: "Contattaci" },
  "footer.form.name": { en: "Name", es: "Nombre", fr: "Nom", de: "Name", it: "Nome" },
  "footer.form.email": { en: "Email", es: "Correo electrónico", fr: "E-mail", de: "E-Mail", it: "Email" },
  "footer.form.message": { en: "How can we help?", es: "¿Cómo podemos ayudarte?", fr: "Comment pouvons-nous aider ?", de: "Wie können wir helfen?", it: "Come possiamo aiutarti?" },
  "footer.form.send": { en: "Send message", es: "Enviar mensaje", fr: "Envoyer", de: "Nachricht senden", it: "Invia messaggio" },
  "footer.form.sent": { en: "Thanks — we'll be in touch shortly.", es: "Gracias, nos pondremos en contacto en breve.", fr: "Merci — nous vous recontacterons sous peu.", de: "Danke — wir melden uns in Kürze.", it: "Grazie — ti contatteremo a breve." },

  // ---- Reviews ----
  "reviews.eyebrow": { en: "What clients say", es: "Lo que dicen los clientes", fr: "Ce que disent les clients", de: "Was Kunden sagen", it: "Cosa dicono i clienti" },
  "reviews.title": { en: "Trusted across Tenerife", es: "Con la confianza de toda Tenerife", fr: "La confiance de tout Tenerife", de: "Vertraut auf ganz Teneriffa", it: "La fiducia di tutta Tenerife" },
};

export function translate(locale: Locale, key: string): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en ?? key;
}

/** Resolve a spec value that may be a translation key (e.g. "val.gasoline")
 *  or a plain literal (e.g. "4.0L V6 (270 hp)"). */
export function resolveValue(locale: Locale, value: string): string {
  if (dict[value]) return translate(locale, value);
  return value;
}
