export const educationalInfo = {
  BJP: { fullName: "Bharatiya Janata Party", ideology: "Right-wing, Hindu Nationalism, Conservatism", founded: 1980 },
  INC: { fullName: "Indian National Congress", ideology: "Centrism, Social Democracy, Secularism", founded: 1885 },
  AAP: { fullName: "Aam Aadmi Party", ideology: "Populism, Anti-corruption, Secularism", founded: 2012 },
  AITC: { fullName: "All India Trinamool Congress", ideology: "Populism, Progressivism, Secularism", founded: 1998 },
  SP: { fullName: "Samajwadi Party", ideology: "Social Democracy, Democratic Socialism", founded: 1992 },
  DMK: { fullName: "Dravida Munnetra Kazhagam", ideology: "Social Democracy, Dravidianism", founded: 1949 },
  YSRCP: { fullName: "Yuvajana Sramika Rythu Congress Party", ideology: "Regionalism, Populism", founded: 2011 }
};

export const historicalData = [
  { year: 2009, bjp: 116, inc: 206, others: 221, turnout: 58.2 },
  { year: 2014, bjp: 282, inc: 44, others: 217, turnout: 66.4 },
  { year: 2019, bjp: 303, inc: 52, others: 188, turnout: 67.4 },
  { year: 2024, bjp: 240, inc: 99, others: 204, turnout: 65.8 },
];

export const exitPollData = [
  { agency: 'Axis My India', bjp: [361, 401], inc: [131, 166], others: [20, 30] },
  { agency: 'Today\'s Chanakya', bjp: [385, 415], inc: [96, 118], others: [25, 45] },
  { agency: 'CVoter', bjp: [353, 383], inc: [152, 182], others: [15, 30] },
  { agency: 'CNX', bjp: [371, 401], inc: [109, 139], others: [10, 25] },
];

export const actualResults2024 = { bjp: 240, inc: 99, others: 204 };

export const calculateAccuracy = (pollPrediction, actual) => {
  const errorBjp = Math.abs(((pollPrediction.bjp[0] + pollPrediction.bjp[1]) / 2) - actual.bjp);
  const errorInc = Math.abs(((pollPrediction.inc[0] + pollPrediction.inc[1]) / 2) - actual.inc);
  const totalError = errorBjp + errorInc;
  return Math.max(0, 100 - (totalError * 0.3)).toFixed(1);
};

export const regions = [
  { id: 'up', name: 'Uttar Pradesh', seats: 80, currentSplit: { bjp: 33, inc: 6, others: 41 } },
  { id: 'mh', name: 'Maharashtra', seats: 48, currentSplit: { bjp: 9, inc: 13, others: 26 } },
  { id: 'wb', name: 'West Bengal', seats: 42, currentSplit: { bjp: 12, inc: 1, others: 29 } },
  { id: 'br', name: 'Bihar', seats: 40, currentSplit: { bjp: 12, inc: 3, others: 25 } },
  { id: 'tn', name: 'Tamil Nadu', seats: 39, currentSplit: { bjp: 0, inc: 9, others: 30 } },
  { id: 'mp', name: 'Madhya Pradesh', seats: 29, currentSplit: { bjp: 29, inc: 0, others: 0 } },
  { id: 'ka', name: 'Karnataka', seats: 28, currentSplit: { bjp: 17, inc: 9, others: 2 } },
  { id: 'gj', name: 'Gujarat', seats: 26, currentSplit: { bjp: 25, inc: 1, others: 0 } },
  { id: 'ap', name: 'Andhra Pradesh', seats: 25, currentSplit: { bjp: 3, inc: 0, others: 22 } },
  { id: 'rj', name: 'Rajasthan', seats: 25, currentSplit: { bjp: 14, inc: 8, others: 3 } },
  { id: 'od', name: 'Odisha', seats: 21, currentSplit: { bjp: 20, inc: 1, others: 0 } },
  { id: 'kl', name: 'Kerala', seats: 20, currentSplit: { bjp: 1, inc: 14, others: 5 } },
  { id: 'tg', name: 'Telangana', seats: 17, currentSplit: { bjp: 8, inc: 8, others: 1 } },
  { id: 'as', name: 'Assam', seats: 14, currentSplit: { bjp: 9, inc: 3, others: 2 } },
  { id: 'jh', name: 'Jharkhand', seats: 14, currentSplit: { bjp: 8, inc: 2, others: 4 } },
  { id: 'pb', name: 'Punjab', seats: 13, currentSplit: { bjp: 0, inc: 7, others: 6 } },
  { id: 'cg', name: 'Chhattisgarh', seats: 11, currentSplit: { bjp: 10, inc: 1, others: 0 } },
  { id: 'hr', name: 'Haryana', seats: 10, currentSplit: { bjp: 5, inc: 5, others: 0 } },
  { id: 'dl', name: 'Delhi', seats: 7, currentSplit: { bjp: 7, inc: 0, others: 0 } },
  { id: 'uk', name: 'Uttarakhand', seats: 5, currentSplit: { bjp: 5, inc: 0, others: 0 } },
  { id: 'hp', name: 'Himachal Pradesh', seats: 4, currentSplit: { bjp: 4, inc: 0, others: 0 } },
  { id: 'jk', name: 'Jammu & Kashmir', seats: 5, currentSplit: { bjp: 2, inc: 0, others: 3 } },
  { id: 'ar', name: 'Arunachal Pradesh', seats: 2, currentSplit: { bjp: 2, inc: 0, others: 0 } },
  { id: 'ga', name: 'Goa', seats: 2, currentSplit: { bjp: 1, inc: 1, others: 0 } },
  { id: 'mn', name: 'Manipur', seats: 2, currentSplit: { bjp: 0, inc: 2, others: 0 } },
  { id: 'ml', name: 'Meghalaya', seats: 2, currentSplit: { bjp: 0, inc: 0, others: 2 } },
  { id: 'tr', name: 'Tripura', seats: 2, currentSplit: { bjp: 2, inc: 0, others: 0 } },
  { id: 'mz', name: 'Mizoram', seats: 1, currentSplit: { bjp: 0, inc: 0, others: 1 } },
  { id: 'nl', name: 'Nagaland', seats: 1, currentSplit: { bjp: 0, inc: 1, others: 0 } },
  { id: 'sk', name: 'Sikkim', seats: 1, currentSplit: { bjp: 0, inc: 0, others: 1 } },
  { id: 'py', name: 'Puducherry', seats: 1, currentSplit: { bjp: 0, inc: 1, others: 0 } },
  { id: 'ch', name: 'Chandigarh', seats: 1, currentSplit: { bjp: 0, inc: 1, others: 0 } },
  { id: 'an', name: 'Andaman & Nicobar', seats: 1, currentSplit: { bjp: 1, inc: 0, others: 0 } },
  { id: 'dd', name: 'Dadra & Nagar Haveli and Daman & Diu', seats: 2, currentSplit: { bjp: 1, inc: 0, others: 1 } },
  { id: 'ld', name: 'Lakshadweep', seats: 1, currentSplit: { bjp: 0, inc: 1, others: 0 } },
  { id: 'la', name: 'Ladakh', seats: 1, currentSplit: { bjp: 0, inc: 0, others: 1 } },
];
