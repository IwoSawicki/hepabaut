// Galerie-Daten der Startseite (1:1 aus mirror-v3). Bilder liegen unter public/cdn/…
// Neues Projektbild = Zeile ergänzen; Layout bleibt unberührt (Section-Komponente).
const CDN = '/cdn/67eacdeb6f6d737ef0fa7d13';
const CDN2 = '/cdn/67eacdeb6f6d737ef0fa7cd2';

export const projekte: string[] = [
  `${CDN}/693a94edbd73293db11640c6_86c8e93f-fa3c-4b00-b1ef-8c43ae6ac7d8.JPG`,
  `${CDN}/693aaf5c319bbaf9d63ce313_239ce492-2554-4377-9bcc-22118e5d9e24.JPG`,
  `${CDN}/6968ce26c2487c01b0ba2dc4_hepa-3.jpg`,
  `${CDN}/6968cdaecbeed8fa60b56d42_693a952a33a32932bdba0404_IMG_4769-p-2000.jpg`,
  `${CDN}/6968ce391fe30c540fff7dbf_hepa-5.jpg`,
  `${CDN}/6968ce4224a9a35261105e8d_hepa-6.jpg`,
  `${CDN}/6968ce4b19aa84f4995b9062_hepa-7.jpg`,
  `${CDN}/693a955bc92c7d98766829fc_Screenshot 2025-12-11 at 10.56.30.png`,
  `${CDN}/693a95633be9005641ff5af1_Screenshot 2025-12-11 at 10.56.37.png`,
];

export interface VorherNachherPaar {
  vorher: string;
  nachher: string;
}

export const vorherNachher: VorherNachherPaar[] = [
  { vorher: `${CDN2}/693acd81fa4299aff79f4b02_Screenshot 2025-12-11 at 14.56.02.png`, nachher: `${CDN2}/693acd99cb6b6ac86f58e202_Bad Nachher 2.jpg` },
  { vorher: `${CDN2}/693ade5ccfb7c698193dedb9_Screenshot 2025-12-11 at 15.17.15.png`, nachher: `${CDN2}/693ade678a01bdab804f978a_Außen Nachher.jpg` },
  { vorher: `${CDN2}/693adeead492b0b176c57d91_Screenshot 2025-12-11 at 16.09.53.png`, nachher: `${CDN2}/693adef3a5fa6617b969dfb8_Screenshot 2025-12-11 at 16.10.27.png` },
  { vorher: `${CDN2}/693ade75bf449baa3623809b_Flur 2 Vorher.JPG`, nachher: `${CDN2}/693adf8513065916cf1d763c_Screenshot 2025-12-11 at 16.13.00.png` },
  { vorher: `${CDN2}/693ae008961f924129c055ad_Screenshot 2025-12-11 at 16.15.10.png`, nachher: `${CDN2}/693ae009ddae85505ed4b8db_Screenshot 2025-12-11 at 16.15.03.png` },
  { vorher: `${CDN2}/693ae09f7557ee64f02866f0_Screenshot 2025-12-11 at 16.17.39.png`, nachher: `${CDN2}/693ae09f7f97ffd476f039b5_Screenshot 2025-12-11 at 16.17.32.png` },
  { vorher: `${CDN2}/693ade75f8c43428e099d992_Tür Bad Vorher.JPG`, nachher: `${CDN2}/693ae0dd92e9a2edf517d092_Screenshot 2025-12-11 at 16.18.33.png` },
  { vorher: `${CDN2}/693ae1046b26dc12342162f4_Screenshot 2025-12-11 at 16.19.17.png`, nachher: `${CDN2}/693ae104de1bd38011ddd0bf_Screenshot 2025-12-11 at 16.19.22.png` },
];

// Leistungs-Kacheln (Startseite, section-3): Bild + Ziel + Titel
export const leistungsKacheln = [
  { titel: 'Sanierung', href: '/sanierung', bild: `${CDN2}/682c9dfc4168c06f6465c915_jessica-hearn-ut6gWxh3oqQ-unsplash.jpg`, alt: 'Hepa Baut - Mitarbeiter auf Baustelle' },
  { titel: 'Renovierung', href: '/renovierung', bild: `${CDN2}/682c9dfc6da27675aa4f7add_point3d-commercial-imaging-ltd-OaclQ1SHI1k-unsplash.jpg`, alt: 'Hepa Baut - Neu verlegter Boden' },
  { titel: 'Wasserschäden', href: '/wasserschaden', bild: `${CDN2}/682c9dfd4320bed1166b9ef9_stefan-lehner-biRt6RXejuk-unsplash.jpg`, alt: 'Hepa Baut - Komplette Kernsanierung' },
] as const;
