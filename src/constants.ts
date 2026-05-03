export interface Scheme {
  id: string;
  name: string;
  ministry: string;
  benefits: string;
  eligibility: {
    ageMin?: number;
    ageMax?: number;
    incomeMax?: number;
    gender?: string[];
    categories?: string[];
    occupations?: string[];
    state?: string;
    specialConditions?: string[];
  };
  requiredDocuments: string[];
  deadline?: string;
  link: string;
  category: 'Education' | 'Agriculture' | 'MSME' | 'Women & Child' | 'Health' | 'Social Welfare';
  priority: number;
}

export const SCHEMES: Scheme[] = [
  {
    id: 'karnataka-shakti',
    name: 'Shakti Scheme',
    ministry: 'Transport Department, Govt. of Karnataka',
    benefits: 'Free travel in non-premium state-run buses for women residents of Karnataka.',
    eligibility: {
      gender: ['Female'],
      state: 'Karnataka'
    },
    requiredDocuments: ['Aadhaar Card', 'Address Proof'],
    link: 'https://sevasindhu.karnataka.gov.in/shakti',
    category: 'Social Welfare',
    priority: 10
  },
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    ministry: 'Ministry of Agriculture and Farmers Welfare, India',
    benefits: '₹6,000 per year in three equal installments directly into bank accounts.',
    eligibility: {
      occupations: ['Farmer'],
      specialConditions: ['Landholding Farmer Family']
    },
    requiredDocuments: ['Aadhaar Card', 'Land Ownership Documents', 'Bank Account Details'],
    link: 'https://pmkisan.gov.in/',
    category: 'Agriculture',
    priority: 9
  },
  {
    id: 'rtps-karnataka',
    name: 'Sakala Services',
    ministry: 'Dept. of Personnel and Administrative Reforms, Karnataka',
    benefits: 'Time-bound delivery of government services.',
    eligibility: {
      state: 'Karnataka'
    },
    requiredDocuments: ['Identity Proof'],
    link: 'https://www.sakala.kar.nic.in/',
    category: 'Social Welfare',
    priority: 5
  },
  {
    id: 'pm-ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY',
    ministry: 'National Health Authority',
    benefits: 'Health cover of ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.',
    eligibility: {
      categories: ['OBC', 'SC', 'ST'],
      incomeMax: 120000
    },
    requiredDocuments: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
    link: 'https://nha.gov.in/',
    category: 'Health',
    priority: 8
  },
  {
    id: 'karnataka-gruha-jyothi',
    name: 'Gruha Jyothi Scheme',
    ministry: 'Energy Department, Govt. of Karnataka',
    benefits: 'Up to 200 units of free electricity per month for residential households.',
    eligibility: {
      state: 'Karnataka'
    },
    requiredDocuments: ['RR Number (Electricity Consumer ID)', 'Aadhaar Card'],
    link: 'https://sevasindhu.karnataka.gov.in/',
    category: 'Social Welfare',
    priority: 10
  },
  {
    id: 'pm-mudra-yojana',
    name: 'PMMY (Pradhan Mantri Mudra Yojana)',
    ministry: 'Ministry of Finance, India',
    benefits: 'Loans up to ₹10 Lakhs for non-corporate, non-farm small/micro enterprises.',
    eligibility: {
      occupations: ['Entrepreneur', 'Business Owner']
    },
    requiredDocuments: ['Identity Proof', 'Address Proof', 'Business Proof'],
    link: 'https://www.mudra.org.in/',
    category: 'MSME',
    priority: 7
  }
];
