export const status = ["Neutre", "Sympathisant", "Militant", "Organisateur"];

export const statusOptions = [
  {
    label: "Sélectionner un statut",
    value: -1
  },
  ...status.map((s, i) => ({
    label: s,
    value: i
  }))
];

export const topics = [
  "Economie",
  "Social",
  "Ecologie",
  "Relations internationales défense",
  "Droits",
  "Sécurité"
];

export const details = ["Logement", "Accès aux Droits"];

export const agesOptions = [
  {
    label: "Sélectionner une tranche d'âge",
    value: -1
  },
  {
    label: "16-25 ans",
    value: 16
  },
  {
    label: "26-35 ans",
    value: 26
  },
  {
    label: "36-50 ans",
    value: 36
  },
  {
    label: "51-61 ans",
    value: 51
  },
  {
    label: "Plus de 62 ans",
    value: 62
  }];