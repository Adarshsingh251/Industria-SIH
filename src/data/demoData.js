// INDUSTRIA - Coherent Demo Dataset & Domain Templates
// Company: Aarohan Precision Components Pvt. Ltd.

export const INITIAL_COMPANY = {
  id: "aarohan-01",
  legalName: "Aarohan Precision Components Pvt. Ltd.",
  tradeName: "Aarohan Precision",
  cin: "U29253PN2021PTC198421",
  pan: "AABCA8923K",
  gstin: "27AABCA8923K1ZM",
  udyam: "UDYAM-MH-26-0048192",
  industry: "Manufacturing",
  subIndustry: "Precision Automotive Components & CNC Tooling",
  district: "Pune",
  state: "Maharashtra",
  address: "Plot No. B-42, MIDC Phase II, Chakan Industrial Area, Pune, Maharashtra 410501",
  investment: 18.0, // in Crores
  investmentDisplay: "₹18.00 Cr",
  employeeCount: 128,
  factoryArea: "45,000 sq. ft.",
  electricityLoad: "450 kVA",
  waterUsage: "12,000 Litres/day",
  hazardousMaterial: "Minimal (Category B - Industrial coolants & cutting fluids)",
  constructionRequired: true,
  operationalSince: "Nov 2021",
  authorizedSignatory: "Vikramaditya Patil (Managing Director)",
  contactEmail: "admin@aarohan.demo",
  contactPhone: "+91 98230 44821",
  profileCompleted: 95
};

export const INITIAL_APPLICATIONS = [
  {
    id: "app-factory-01",
    approvalId: "appr-factory-lic",
    applicationNumber: "MH-LAB-2026-09-8812",
    title: "Factory License (Form No. 2)",
    department: "Directorate of Industrial Safety & Health (DISH), Labour Dept.",
    status: "UNDER_REVIEW",
    statusLabel: "Under Review",
    currentStage: 3, // 1: Submitted, 2: Document Verification, 3: Department Review, 4: Inspection, 5: Approved
    totalStages: 5,
    stages: [
      { id: 1, name: "Submitted", status: "completed", date: "24 Sep 2026", note: "Application dossier received electronically" },
      { id: 2, name: "Document Verification", status: "completed", date: "27 Sep 2026", note: "All 5 mandatory documents verified by Scrutiny Desk" },
      { id: 3, name: "Department Review", status: "in_progress", date: "29 Sep 2026", note: "Under review by Senior Inspector of Factories, Pune Region" },
      { id: 4, name: "Factory Inspection", status: "pending", date: "Est. 06 Oct 2026", note: "On-site safety & machinery clearance inspection" },
      { id: 5, name: "Grant of License", status: "pending", date: "Est. 12 Oct 2026", note: "Issuance of digitally signed Factory License certificate" }
    ],
    submittedAt: "24 Sep 2026",
    lastUpdatedAt: "29 Sep 2026, 03:45 PM",
    nextAction: "No action required from business. Await inspection date confirmation.",
    slaDaysRemaining: 9,
    priority: "MEDIUM",
    officerInCharge: "Shri R. K. Deshmukh (Inspector of Factories, Division 2)",
    requiredDocuments: [
      { docId: "doc-pan", name: "Company PAN Card", status: "VERIFIED" },
      { docId: "doc-coi", name: "Certificate of Incorporation", status: "VERIFIED" },
      { docId: "doc-land", name: "MIDC Land Allotment & Lease Deed", status: "VERIFIED" },
      { docId: "doc-dish-plan", name: "Approved Factory Building & Machinery Layout", status: "VERIFIED" },
      { docId: "doc-form2", name: "Signed Form No. 2 (Application & Employee Register)", status: "VERIFIED" }
    ],
    activityLog: [
      { date: "29 Sep 2026, 03:45 PM", actor: "DISH Pune Portal", text: "Application dossier advanced to Department Review stage by Scrutiny Officer." },
      { date: "27 Sep 2026, 11:20 AM", actor: "Scrutiny Desk", text: "Document verification completed with zero objections." },
      { date: "24 Sep 2026, 04:15 PM", actor: "Operations Admin", text: "Application submitted online with statutory fee payment of ₹14,500 (Ref: MH-PAY-9821)." }
    ]
  },
  {
    id: "app-fire-02",
    approvalId: "appr-fire-noc",
    applicationNumber: "MH-FIRE-2026-09-3104",
    title: "Fire Safety Approval & Final NOC",
    department: "Maharashtra Fire Services / MIDC Fire Brigade",
    status: "DOCUMENTS_REQUIRED",
    statusLabel: "Documents Required",
    currentStage: 2,
    totalStages: 5,
    stages: [
      { id: 1, name: "Submitted", status: "completed", date: "22 Sep 2026", note: "Initial provisional NOC request registered" },
      { id: 2, name: "Document Scrutiny", status: "action_required", date: "28 Sep 2026", note: "1 missing mandatory document flagged: Fire Hydrant & Evacuation Layout" },
      { id: 3, name: "Technical Scrutiny", status: "pending", date: "Pending Docs", note: "Chief Fire Officer technical appraisal" },
      { id: 4, name: "Site Fire Drill & Inspection", status: "pending", date: "Pending Scrutiny", note: "Hydrant pressure test & fire extinguisher validation" },
      { id: 5, name: "Final NOC Issuance", status: "pending", date: "Pending", note: "Final Fire Safety Certificate" }
    ],
    submittedAt: "22 Sep 2026",
    lastUpdatedAt: "28 Sep 2026, 05:10 PM",
    nextAction: "URGENT: Upload Building Evacuation & Fire Hydrant Blueprint to proceed.",
    slaDaysRemaining: 2,
    priority: "HIGH",
    officerInCharge: "Capt. S. V. Jadhav (Divisional Fire Officer, Chakan)",
    requiredDocuments: [
      { docId: "doc-coi", name: "Certificate of Incorporation", status: "VERIFIED" },
      { docId: "doc-land", name: "MIDC Land Possession Receipt", status: "VERIFIED" },
      { docId: "doc-fire-plan", name: "Fire Hydrant & Evacuation Blueprint", status: "MISSING" },
      { docId: "doc-fire-eq", name: "Fire Safety Equipment OEM Compliance Certificate", status: "UPLOADED" }
    ],
    activityLog: [
      { date: "28 Sep 2026, 05:10 PM", actor: "Fire Dept Scrutiny", text: "Deficiency notice issued: Building Evacuation & Fire Hydrant Blueprint missing in uploaded package." },
      { date: "25 Sep 2026, 02:00 PM", actor: "Operations Admin", text: "Uploaded OEM certificates for 24 Dry Powder & CO2 extinguishers." },
      { date: "22 Sep 2026, 10:30 AM", actor: "Operations Admin", text: "Fire NOC application MH-FIRE-2026-09-3104 created." }
    ]
  },
  {
    id: "app-mpcb-03",
    approvalId: "appr-mpcb-cto",
    applicationNumber: "MPCB-CTO-2026-08-1194",
    title: "Consent to Operate (CTO - Orange Category)",
    department: "Maharashtra Pollution Control Board (MPCB)",
    status: "INSPECTION_SCHEDULED",
    statusLabel: "Inspection Scheduled",
    currentStage: 4,
    totalStages: 5,
    stages: [
      { id: 1, name: "Application Submitted", status: "completed", date: "15 Aug 2026", note: "Form I (Water & Air Acts) filed with capital investment audit" },
      { id: 2, name: "Document Verification", status: "completed", date: "28 Aug 2026", note: "Effluent treatment & emissions specs validated" },
      { id: 3, name: "Sub-Regional Review", status: "completed", date: "12 Sep 2026", note: "Approved for physical validation by Sub-Regional Officer" },
      { id: 4, name: "Board Inspection", status: "in_progress", date: "02 Oct 2026", note: "Scheduled for 02 Oct 2026, 11:00 AM by MPCB Pune-II Field Officer" },
      { id: 5, name: "Consent Issuance", status: "pending", date: "Est. 10 Oct 2026", note: "Final 5-year Renewable Consent Order" }
    ],
    submittedAt: "15 Aug 2026",
    lastUpdatedAt: "27 Sep 2026, 11:00 AM",
    nextAction: "Prepare on-site ETP logbook and coolant recycling station for inspection on 02 Oct.",
    slaDaysRemaining: 5,
    priority: "HIGH",
    officerInCharge: "Dr. Aniruddha Kulkarni (Sub-Regional Officer, MPCB Chakan)",
    requiredDocuments: [
      { docId: "doc-land", name: "Site Land Title Deed", status: "VERIFIED" },
      { docId: "doc-etp-plan", name: "Effluent Treatment Plant (ETP) Process Flow", status: "VERIFIED" },
      { docId: "doc-air-emiss", name: "DG Stack Emission & Air Pollution Monitoring Plan", status: "VERIFIED" },
      { docId: "doc-ca-cert", name: "CA Certificate for Capital Investment on Plant & Machinery", status: "VERIFIED" }
    ],
    activityLog: [
      { date: "27 Sep 2026, 11:00 AM", actor: "MPCB Portal", text: "Physical field inspection scheduled for 02 Oct 2026 at 11:00 AM. Officer assigned: Field Inspector V. More." },
      { date: "12 Sep 2026, 04:30 PM", actor: "Sub-Regional Office", text: "Technical scrutiny complete. No ambient air violations found." },
      { date: "15 Aug 2026, 01:15 PM", actor: "Operations Admin", text: "CTO application filed with MPCB fee of ₹35,000." }
    ]
  },
  {
    id: "app-msedcl-04",
    approvalId: "appr-msedcl-ht",
    applicationNumber: "MSEDCL-HT-2026-06-4410",
    title: "High Tension (HT) 450 kVA Industrial Power Connection",
    department: "Maharashtra State Electricity Distribution Co. Ltd. (MSEDCL)",
    status: "APPROVED",
    statusLabel: "Approved",
    currentStage: 5,
    totalStages: 5,
    stages: [
      { id: 1, name: "Application Filed", status: "completed", date: "10 Jun 2026", note: "Load sanction request for 450 kVA HT connection" },
      { id: 2, name: "Feasibility Study", status: "completed", date: "25 Jun 2026", note: "11 kV feeder line capacity confirmed" },
      { id: 3, name: "Demand Note Payment", status: "completed", date: "05 Jul 2026", note: "Security deposit & service connection charges paid" },
      { id: 4, name: "Transformer & Meter Testing", status: "completed", date: "28 Jul 2026", note: "CT-PT unit and transformer test passed by Electrical Inspector" },
      { id: 5, name: "Power Energized", status: "completed", date: "14 Aug 2026", note: "Connection energized. Consumer No: 178290481290" }
    ],
    submittedAt: "10 Jun 2026",
    lastUpdatedAt: "14 Aug 2026, 04:00 PM",
    nextAction: "Completed. HT Connection active. Monthly TOD tariff billing linked.",
    slaDaysRemaining: 0,
    priority: "LOW",
    officerInCharge: "Executive Engineer (Testing), MSEDCL Bhosari Division",
    requiredDocuments: [
      { docId: "doc-land", name: "Land Possession Letter", status: "VERIFIED" },
      { docId: "doc-el-schem", name: "Single Line Diagram (SLD) Approved by Electrical Inspector", status: "VERIFIED" },
      { docId: "doc-el-test", name: "Installation Test Report by Licensed Contractor", status: "VERIFIED" },
      { docId: "doc-demand-rec", name: "MSEDCL Demand Note Payment Receipt", status: "VERIFIED" }
    ],
    activityLog: [
      { date: "14 Aug 2026, 04:00 PM", actor: "MSEDCL Chakan Substation", text: "Meter energized. Sanction Order MH-ENG-4410 issued." },
      { date: "28 Jul 2026, 03:00 PM", actor: "Electrical Inspector", text: "Transformer safety clearance certificate issued." }
    ]
  },
  {
    id: "app-dish-05",
    approvalId: "appr-dish-plan",
    applicationNumber: "DISH-PN-2026-09-5091",
    title: "Factory Building & Machinery Layout Plan Approval",
    department: "Directorate of Industrial Safety & Health (DISH)",
    status: "SUBMITTED",
    statusLabel: "Submitted",
    currentStage: 1,
    totalStages: 5,
    stages: [
      { id: 1, name: "Submitted", status: "completed", date: "29 Sep 2026", note: "Phase II shed expansion architectural & machine blueprint submitted" },
      { id: 2, name: "Structural Scrutiny", status: "pending", date: "Est. 04 Oct 2026", note: "Ventilation, aisle widths and emergency exit clearance check" },
      { id: 3, name: "Joint Site Verification", status: "pending", date: "Est. 10 Oct 2026", note: "DISH safety officer inspection" },
      { id: 4, name: "Technical Approval", status: "pending", date: "Est. 16 Oct 2026", note: "Approval by Joint Director, DISH Pune" },
      { id: 5, name: "Approved Plan Release", status: "pending", date: "Est. 22 Oct 2026", note: "Stamped blueprint released" }
    ],
    submittedAt: "29 Sep 2026",
    lastUpdatedAt: "29 Sep 2026, 06:15 PM",
    nextAction: "Application lodged. Scrutiny desk assigned.",
    slaDaysRemaining: 14,
    priority: "MEDIUM",
    officerInCharge: "Shri M. S. Joshi (Safety Scrutiny Engineer, DISH)",
    requiredDocuments: [
      { docId: "doc-arch-plan", name: "Architectural Layout Plan (1:100 scale)", status: "UPLOADED" },
      { docId: "doc-struct-stab", name: "Structural Stability Certificate by Chartered Engineer", status: "UPLOADED" },
      { docId: "doc-flow-diag", name: "Manufacturing Process & Machine Material Flow", status: "UPLOADED" }
    ],
    activityLog: [
      { date: "29 Sep 2026, 06:15 PM", actor: "Operations Admin", text: "Uploaded architectural blueprints and paid statutory scrutiny fee of ₹8,000." }
    ]
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: "doc-pan",
    name: "Company PAN Card",
    category: "Company Documents",
    relatedApproval: "Factory License / All Applications",
    relatedApplicationId: "app-factory-01",
    fileUrl: "/docs/pan-aarohan.pdf",
    fileName: "PAN_AAROHAN_PRECISION_2026.pdf",
    fileSize: "1.2 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "10 Jan 2026",
    verifiedAt: "12 Jan 2026",
    expiryDate: "Perpetual",
    version: "v1.0"
  },
  {
    id: "doc-coi",
    name: "Certificate of Incorporation (MCA)",
    category: "Company Documents",
    relatedApproval: "Factory License & Fire NOC",
    relatedApplicationId: "app-factory-01",
    fileUrl: "/docs/coi-aarohan.pdf",
    fileName: "COI_MCA_U29253PN2021PTC198421.pdf",
    fileSize: "2.4 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "10 Jan 2026",
    verifiedAt: "12 Jan 2026",
    expiryDate: "Perpetual",
    version: "v1.0"
  },
  {
    id: "doc-land",
    name: "MIDC Land Lease Deed & Possession Letter",
    category: "Approval Documents",
    relatedApproval: "Factory License, Fire NOC, MPCB CTO",
    relatedApplicationId: "app-factory-01",
    fileUrl: "/docs/midc-lease.pdf",
    fileName: "MIDC_Chakan_Plot_B42_LeaseDeed.pdf",
    fileSize: "6.8 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "15 Jan 2026",
    verifiedAt: "20 Jan 2026",
    expiryDate: "95 Years (Valid till 2116)",
    version: "v1.2"
  },
  {
    id: "doc-dish-plan",
    name: "Approved Factory Building & Machinery Layout",
    category: "Approval Documents",
    relatedApproval: "Factory License (Form 2)",
    relatedApplicationId: "app-factory-01",
    fileUrl: "/docs/factory-layout.pdf",
    fileName: "DISH_Approved_Layout_Phase1.pdf",
    fileSize: "8.4 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "24 Sep 2026",
    verifiedAt: "27 Sep 2026",
    expiryDate: "31 Dec 2027",
    version: "v2.0"
  },
  {
    id: "doc-form2",
    name: "Factory License Application Form No. 2",
    category: "Approval Documents",
    relatedApproval: "Factory License (Form 2)",
    relatedApplicationId: "app-factory-01",
    fileUrl: "/docs/form-2.pdf",
    fileName: "Signed_Form2_Aarohan_128Emp.pdf",
    fileSize: "1.8 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "24 Sep 2026",
    verifiedAt: "27 Sep 2026",
    expiryDate: "Annual Renewal",
    version: "v1.0"
  },
  {
    id: "doc-fire-plan",
    name: "Building Evacuation & Fire Hydrant Blueprint",
    category: "Approval Documents",
    relatedApproval: "Fire Safety Approval & Final NOC",
    relatedApplicationId: "app-fire-02",
    fileUrl: null,
    fileName: null,
    fileSize: null,
    fileType: "PDF / CAD",
    status: "MISSING",
    uploadedAt: null,
    verifiedAt: null,
    expiryDate: "Required for Fire NOC",
    version: "Pending"
  },
  {
    id: "doc-fire-eq",
    name: "Fire Safety Equipment OEM Compliance Certificate",
    category: "Approval Documents",
    relatedApproval: "Fire Safety Approval & Final NOC",
    relatedApplicationId: "app-fire-02",
    fileUrl: "/docs/oem-fire.pdf",
    fileName: "Ceasefire_OEM_Calibration_2026.pdf",
    fileSize: "3.1 MB",
    fileType: "PDF",
    status: "UPLOADED",
    uploadedAt: "25 Sep 2026",
    verifiedAt: null,
    expiryDate: "24 Sep 2027",
    version: "v1.0"
  },
  {
    id: "doc-etp-plan",
    name: "Effluent Treatment Plant (ETP) Process Flow & Design",
    category: "Compliance Documents",
    relatedApproval: "Consent to Operate (MPCB CTO)",
    relatedApplicationId: "app-mpcb-03",
    fileUrl: "/docs/etp-design.pdf",
    fileName: "ETP_ZeroLiquidDischarge_Schematic.pdf",
    fileSize: "4.5 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "15 Aug 2026",
    verifiedAt: "28 Aug 2026",
    expiryDate: "Perpetual",
    version: "v1.1"
  },
  {
    id: "doc-air-emiss",
    name: "DG Stack Emission & Air Pollution Monitoring Report",
    category: "Compliance Documents",
    relatedApproval: "Consent to Operate (MPCB CTO)",
    relatedApplicationId: "app-mpcb-03",
    fileUrl: "/docs/stack-emission.pdf",
    fileName: "SGS_Stack_Emission_Testing_Q3.pdf",
    fileSize: "2.1 MB",
    fileType: "PDF",
    status: "VERIFIED",
    uploadedAt: "15 Aug 2026",
    verifiedAt: "28 Aug 2026",
    expiryDate: "30 Nov 2026 (Expiring Soon)",
    version: "v3.0"
  }
];

export const INITIAL_COMPLIANCE_TASKS = [
  {
    id: "comp-01",
    title: "Fire Safety Audit & Hydrant Pressure Log Submission",
    relatedApproval: "Fire Safety Approval & Final NOC",
    department: "Maharashtra Fire Services",
    dueDate: "30 Sep 2026",
    dueDays: 0,
    status: "ACTION_REQUIRED",
    statusLabel: "Due Today",
    priority: "URGENT",
    frequency: "Half-Yearly",
    description: "Submit certified quarterly fire drill report & hydro-test certificate for plant hydrant ring.",
    requiredDocument: "Fire Safety Audit Certificate",
    completedAt: null
  },
  {
    id: "comp-02",
    title: "MPCB Hazardous Waste Form 4 Annual Return Filing",
    relatedApproval: "Consent to Operate (MPCB)",
    department: "Maharashtra Pollution Control Board",
    dueDate: "05 Oct 2026",
    dueDays: 5,
    status: "DUE_SOON",
    statusLabel: "Due in 5 Days",
    priority: "HIGH",
    frequency: "Annual",
    description: "Submit Form 4 manifest register showing total disposal of used CNC coolant and spent oils via MEPL.",
    requiredDocument: "Form 4 Manifest & Manifest Slips",
    completedAt: null
  },
  {
    id: "comp-03",
    title: "Environmental Statement Form V (Environment Protection Act)",
    relatedApproval: "Consent to Operate (MPCB)",
    department: "MPCB / Environment Dept.",
    dueDate: "15 Oct 2026",
    dueDays: 15,
    status: "UPCOMING",
    statusLabel: "Due in 15 Days",
    priority: "MEDIUM",
    frequency: "Annual",
    description: "Filing of Environmental Statement Form V detailing raw material consumption and carbon footprint.",
    requiredDocument: "Water & Raw Material Audit Report",
    completedAt: null
  },
  {
    id: "comp-04",
    title: "Factory License Annual Renewal (Form 2 Extension)",
    relatedApproval: "Factory License (Labour Dept)",
    department: "DISH Labour Department",
    dueDate: "24 Oct 2026",
    dueDays: 24,
    status: "UPCOMING",
    statusLabel: "Due in 24 Days",
    priority: "HIGH",
    frequency: "Annual",
    description: "Annual statutory renewal of factory license with revised manpower roster and fee assessment.",
    requiredDocument: "Form 2 & Employee Insurance Roster",
    completedAt: null
  },
  {
    id: "comp-05",
    title: "Periodical Boiler & Compressed Air Receiver Hydro-Test",
    relatedApproval: "Boiler & Pressure Vessel Clearance",
    department: "Directorate of Steam Boilers, Maharashtra",
    dueDate: "12 Nov 2026",
    dueDays: 43,
    status: "SCHEDULED",
    statusLabel: "Scheduled",
    priority: "MEDIUM",
    frequency: "Annual",
    description: "Hydrostatic testing and ultrasonic wall-thickness audit of 10-bar industrial compressor vessels.",
    requiredDocument: "Chartered Engineer Pressure Vessel Test Certificate",
    completedAt: null
  },
  {
    id: "comp-06",
    title: "Annual Returns under Maharashtra Factories Rules (Form 27)",
    relatedApproval: "Factory License (Labour Dept)",
    department: "DISH Labour Department",
    dueDate: "31 Jan 2026",
    dueDays: -242,
    status: "COMPLETED",
    statusLabel: "Completed",
    priority: "LOW",
    frequency: "Annual",
    description: "Statutory annual returns of working hours, leaves with wages, and safety committee meetings.",
    requiredDocument: "Form 27 Filing Acknowledgement",
    completedAt: "28 Jan 2026"
  }
];

export const INITIAL_SCHEMES = [
  {
    id: "scheme-01",
    title: "Maharashtra Package Scheme of Incentives (PSI 2019) - Capital Subsidy",
    department: "Directorate of Industries, Govt. of Maharashtra",
    category: "Capital Subsidy & Fiscal Incentive",
    supportType: "Financial Grant / Direct Benefit",
    investmentRange: "₹5 Cr to ₹50 Cr (MSME & Large)",
    targetIndustries: ["Manufacturing", "Automotive & Auto Components", "Engineering", "Electronics"],
    districts: ["Pune (Zone B/C)", "Chhatrapati Sambhajinagar", "Nashik", "Nagpur", "All Maharashtra"],
    deadline: "31 Mar 2027",
    matchScore: 98,
    isEligible: true,
    saved: true,
    benefits: [
      "Up to 40% Capital Subsidy on eligible Fixed Capital Investment in Plant & Machinery (Max ₹2.50 Cr for Pune Zone)",
      "100% Industrial Promotion Subsidy (IPS) linked to State GST (SGST) paid for 7 years",
      "Interest Subvention of 5% on term loans for modern CNC machinery up to ₹25 Lakhs per year"
    ],
    eligibilityCriteria: [
      "Manufacturing enterprise registered with Udyam Registration in Maharashtra",
      "Fixed Capital Investment (FCI) in Plant & Machinery >= ₹10.00 Cr",
      "Valid Factory License and MPCB Consent to Operate in place",
      "Direct employment generated >= 50 persons (Aarohan has 128 employees - Qualified)"
    ],
    requiredDocuments: [
      "Udyam Registration Certificate & PAN Card",
      "CA Certified Fixed Capital Investment Schedule",
      "Bank Term Loan Sanction Letter & Disbursement Proof",
      "Valid MPCB Consent to Operate & Factory License"
    ],
    applicationMode: "Online via Maitri Single Window Portal (Govt. of Maharashtra)",
    officialPortalUrl: "https://maitri.mahaonline.gov.in"
  },
  {
    id: "scheme-02",
    title: "Industrial Power Tariff Rebate for MSME Manufacturing Units",
    department: "Energy Department / MSEDCL, Govt. of Maharashtra",
    category: "Operating Expense Subsidy",
    supportType: "Tariff Concession",
    investmentRange: "All MSME Categories",
    targetIndustries: ["Manufacturing", "Food Processing", "Textiles", "Chemicals", "Electronics"],
    districts: ["All Vidarbha, Marathwada & Selected Western Maharashtra Industrial Clusters"],
    deadline: "Continuous Scheme",
    matchScore: 94,
    isEligible: true,
    saved: true,
    benefits: [
      "Rebate of ₹1.00 per unit (kWh) on industrial HT electricity tariff for 3 consecutive years",
      "100% exemption on Electricity Duty for 10 years in MIDC industrial designated zones",
      "Estimated annual power cost savings: ₹6.40 Lakhs based on 450 kVA sanctioned load"
    ],
    eligibilityCriteria: [
      "HT/LT Industrial Connection with MSEDCL",
      "Active Manufacturing operations with electricity consumption logs",
      "No outstanding electricity duty defaults"
    ],
    requiredDocuments: [
      "Last 3 Months MSEDCL Industrial Electricity Bills",
      "MSEDCL Sanction Letter for 450 kVA load",
      "Udyam Registration Certificate"
    ],
    applicationMode: "Online via MSEDCL Consumer Energy Portal",
    officialPortalUrl: "https://wss.mahadiscom.in"
  },
  {
    id: "scheme-03",
    title: "Maharashtra Clean Energy & Green Technology MSME Grant",
    department: "Maharashtra Energy Development Agency (MEDA) & Environment Dept.",
    category: "Green Technology & Sustainability",
    supportType: "Capital Subsidy",
    investmentRange: "₹1 Cr to ₹25 Cr",
    targetIndustries: ["Manufacturing", "Engineering", "Chemicals", "Textiles"],
    districts: ["All Maharashtra Districts"],
    deadline: "30 Nov 2026",
    matchScore: 91,
    isEligible: true,
    saved: false,
    benefits: [
      "30% Capital Subsidy on Rooftop Solar PV installation (up to 200 kWp)",
      "50% reimbursement on Energy Audit & Water Audit consultancy expenses (Max ₹1.5 Lakhs)",
      "Accelerated depreciation & low-interest green loans through SIDBI"
    ],
    eligibilityCriteria: [
      "Active industrial unit with minimum 2 years of continuous operation",
      "Valid MPCB Consent to Operate (Orange / Green / Red category)",
      "Installation of MNRE approved solar equipment by certified vendor"
    ],
    requiredDocuments: [
      "MEDA Grid Connectivity In-Principle Feasibility Letter",
      "Detailed Project Report (DPR) by BEE Accredited Energy Auditor",
      "Equipment invoices and vendor GST vouchers"
    ],
    applicationMode: "Direct application to MEDA Pune Regional Office",
    officialPortalUrl: "https://www.mahaurja.com"
  },
  {
    id: "scheme-04",
    title: "Industrial Export Promotion & Quality Certification Assistance (ISO/IATF)",
    department: "Maharashtra Industrial Development Corporation (MIDC) & MoMSME",
    category: "Quality Standards & Export Readiness",
    supportType: "Reimbursement Grant",
    investmentRange: "Micro, Small & Medium Enterprises",
    targetIndustries: ["Automotive Components", "Precision Tooling", "Aerospace & Defense", "Electronics"],
    districts: ["All Maharashtra Industrial Estates"],
    deadline: "15 Jan 2027",
    matchScore: 89,
    isEligible: true,
    saved: false,
    benefits: [
      "75% reimbursement of expenses incurred in acquiring IATF 16949 / ISO 9001 / ISO 14001 certification (Up to ₹2.00 Lakhs)",
      "50% international exhibition stall rental reimbursement for auto-component export fairs (Up to ₹3.00 Lakhs)",
      "Free access to MIDC testing labs and metallurgy calibration benches"
    ],
    eligibilityCriteria: [
      "Valid Udyam registered enterprise in manufacturing",
      "Certification acquired from NABCB/IAF accredited certification bodies",
      "Unit must not have claimed the same reimbursement from central schemes"
    ],
    requiredDocuments: [
      "Accredited ISO/IATF Audit Report and Certificate Copy",
      "Original fee receipts paid to Certification Agency",
      "Cancelled Cheque and Bank Mandate Form"
    ],
    applicationMode: "Online via MSME Champions & MIDC Single Window",
    officialPortalUrl: "https://champions.gov.in"
  },
  {
    id: "scheme-05",
    title: "Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)",
    department: "Ministry of MSME & SIDBI (Implemented in Maharashtra)",
    category: "Collateral-Free Credit Facility",
    supportType: "Loan Guarantee",
    investmentRange: "Up to ₹5.00 Cr Loan Size",
    targetIndustries: ["Manufacturing", "Services", "Tooling"],
    districts: ["All Maharashtra Districts"],
    deadline: "Open All Year",
    matchScore: 82,
    isEligible: true,
    saved: false,
    benefits: [
      "Collateral-free term loans and working capital facility up to ₹5.00 Cr",
      "85% guarantee cover for micro/women enterprises and 75% for general manufacturing units",
      "Reduced processing fees across public and scheduled commercial banks"
    ],
    eligibilityCriteria: [
      "New and existing MSME manufacturing units with positive debt service coverage ratio",
      "Borrower unit must not have defaulted on previous banking facilities"
    ],
    requiredDocuments: [
      "Audited Balance Sheet & Profit & Loss for past 3 years",
      "CMA Data & Projected Cash Flow Statement",
      "Company Business Profile and Director KYC"
    ],
    applicationMode: "Through participating Member Lending Institutions (State Bank of India, Bank of Maharashtra, etc.)",
    officialPortalUrl: "https://www.cgtmse.in"
  },
  {
    id: "scheme-06",
    title: "Special Capital Subsidy for SC/ST and Women Industrialists (CMEMP)",
    department: "Chief Minister Employment Generation Programme (CMEGP), Maharashtra",
    category: "Affirmative Action Grant",
    supportType: "Capital Grant & Margin Money",
    investmentRange: "Projects up to ₹10 Cr",
    targetIndustries: ["Manufacturing", "Agro-Processing", "Textiles"],
    districts: ["All Maharashtra Districts"],
    deadline: "28 Feb 2027",
    matchScore: 70,
    isEligible: false,
    saved: false,
    benefits: [
      "Special 10% additional capital subsidy over standard PSI 2019 incentives",
      "Margin money contribution limited to 5% of project cost by promoter",
      "Priority plot allotment in MIDC electronic and textile parks"
    ],
    eligibilityCriteria: [
      "Enterprise must have >= 51% equity holding by SC/ST or Women Promoters",
      "Aarohan Precision currently has 25% women director equity (Requires restructuring for eligibility)"
    ],
    requiredDocuments: [
      "Shareholding Pattern Certificate by Company Secretary",
      "Caste Certificate / Promoter Identity Proof",
      "Detailed Project Report (DPR)"
    ],
    applicationMode: "Online via CMEGP Maha-portal",
    officialPortalUrl: "https://cmegp.gov.in"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-01",
    title: "Fire NOC requires 1 missing document",
    description: "Building Evacuation & Fire Hydrant Blueprint is required to proceed past Scrutiny Desk.",
    type: "ACTION_REQUIRED",
    category: "Application",
    timestamp: "10 mins ago",
    link: "/applications/app-fire-02",
    read: false,
    priority: "HIGH"
  },
  {
    id: "notif-02",
    title: "MPCB CTO Field Inspection scheduled for 02 Oct",
    description: "Inspection confirmed by Field Officer V. More at 11:00 AM. Ensure ETP logs are ready on-site.",
    type: "STATUS_UPDATE",
    category: "Inspection",
    timestamp: "2 hours ago",
    link: "/applications/app-mpcb-03",
    read: false,
    priority: "HIGH"
  },
  {
    id: "notif-03",
    title: "Fire Safety Audit & Pressure Log due today",
    description: "Submit quarterly certified fire safety register to MIDC fire division before 5:00 PM.",
    type: "DEADLINE",
    category: "Compliance",
    timestamp: "4 hours ago",
    link: "/compliance",
    read: false,
    priority: "URGENT"
  },
  {
    id: "notif-04",
    title: "Factory License application advanced to Department Review",
    description: "Document verification completed successfully without objections by DISH Pune.",
    type: "STATUS_UPDATE",
    category: "Application",
    timestamp: "Yesterday",
    link: "/applications/app-factory-01",
    read: true,
    priority: "MEDIUM"
  },
  {
    id: "notif-05",
    title: "New Government Incentive matched for your profile",
    description: "Maharashtra PSI 2019 Capital Subsidy matched with 98% eligibility (Up to ₹2.5 Cr incentive).",
    type: "SUPPORT_MATCH",
    category: "Support",
    timestamp: "2 days ago",
    link: "/support",
    read: true,
    priority: "LOW"
  }
];

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: "act-01",
    date: "30 Sep 2026, 04:30 PM",
    user: "Operations Admin (Vikram Patil)",
    action: "Fire NOC application MH-FIRE-2026-09-3104 opened for document resolution",
    module: "Applications"
  },
  {
    id: "act-02",
    date: "29 Sep 2026, 06:15 PM",
    user: "Operations Admin",
    action: "Factory Building Plan Application DISH-PN-2026-09-5091 submitted to DISH Pune",
    module: "Applications"
  },
  {
    id: "act-03",
    date: "29 Sep 2026, 03:45 PM",
    user: "System (DISH Portal Integration)",
    action: "Factory License application MH-LAB-2026-09-8812 moved from Document Verification to Department Review",
    module: "Approvals"
  },
  {
    id: "act-04",
    date: "28 Sep 2026, 05:10 PM",
    user: "Scrutiny Officer (Capt. Jadhav)",
    action: "Flagged missing Fire Hydrant Layout on application MH-FIRE-2026-09-3104",
    module: "Review"
  },
  {
    id: "act-05",
    date: "27 Sep 2026, 11:00 AM",
    user: "MPCB Chakan Regional Office",
    action: "Field Inspection scheduled for Consent to Operate (CTO) on 02 Oct 2026",
    module: "Compliance"
  }
];
