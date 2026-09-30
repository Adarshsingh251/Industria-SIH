import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COMPANY,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_COMPLIANCE_TASKS,
  INITIAL_SCHEMES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS
} from '../data/demoData';
import { discoverApprovals } from '../services/approvalEngine';

const AppContext = createContext();

const DEFAULT_USER = {
  id: "usr-01",
  name: "Vikramaditya Patil",
  email: "admin@aarohan.demo",
  phone: "+91 98230 44821",
  role: "business_admin",
  roleLabel: "Enterprise Managing Director",
  designation: "Managing Director",
  companyId: "aarohan-01"
};

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('industria_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [company, setCompany] = useState(() => {
    const saved = localStorage.getItem('industria_company');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('industria_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('industria_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [complianceTasks, setComplianceTasks] = useState(() => {
    const saved = localStorage.getItem('industria_compliance');
    return saved ? JSON.parse(saved) : INITIAL_COMPLIANCE_TASKS;
  });

  const [schemes, setSchemes] = useState(() => {
    const saved = localStorage.getItem('industria_schemes');
    return saved ? JSON.parse(saved) : INITIAL_SCHEMES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('industria_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = localStorage.getItem('industria_activity');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  // Current view role: "business_admin" or "officer"
  const [currentUserRole, setCurrentUserRole] = useState(currentUser.role || "business_admin");
  const [activeToast, setActiveToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('industria_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('industria_company', JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    localStorage.setItem('industria_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('industria_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('industria_compliance', JSON.stringify(complianceTasks));
  }, [complianceTasks]);

  useEffect(() => {
    localStorage.setItem('industria_schemes', JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem('industria_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('industria_activity', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Toast Helper
  const showToast = (title, message, type = 'success') => {
    setActiveToast({ id: Date.now(), title, message, type });
    setTimeout(() => {
      setActiveToast(null);
    }, 4500);
  };

  const addActivityLog = (action, module = "General") => {
    const newLog = {
      id: `act-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      user: currentUserRole === 'business_admin' ? `${currentUser.name} (${company.tradeName})` : 'Officer (Govt of Maharashtra)',
      action,
      module
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Register New User & Company dynamically
  const registerNewUserAndCompany = (userData, companyData) => {
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const companyId = `comp-${Date.now()}`;
    const userId = `usr-${Date.now()}`;

    const newComp = {
      id: companyId,
      legalName: companyData.legalName || "New Enterprise India Pvt. Ltd.",
      tradeName: companyData.tradeName || companyData.legalName?.split(' ')[0] || "New Enterprise",
      cin: companyData.cin || `U${Math.floor(10000 + Math.random() * 90000)}MH2026PTC${Math.floor(100000 + Math.random() * 900000)}`,
      pan: companyData.pan || `AABC${Math.floor(1000 + Math.random() * 9000)}K`,
      gstin: companyData.gstin || `27AABC${Math.floor(1000 + Math.random() * 9000)}K1ZM`,
      udyam: companyData.udyam || `UDYAM-MH-26-${Math.floor(1000000 + Math.random() * 9000000)}`,
      industry: companyData.industry || "Manufacturing",
      subIndustry: companyData.subIndustry || "Industrial Manufacturing & Assembly",
      district: companyData.district || "Pune",
      state: "Maharashtra",
      address: companyData.address || `Plot No. ${Math.floor(10 + Math.random() * 90)}, MIDC Industrial Area, ${companyData.district || 'Pune'}, Maharashtra`,
      investment: parseFloat(companyData.investment) || 12.0,
      investmentDisplay: `₹${(parseFloat(companyData.investment) || 12.0).toFixed(2)} Cr`,
      employeeCount: parseInt(companyData.employeeCount, 10) || 85,
      factoryArea: companyData.factoryArea || "35,000 sq. ft.",
      electricityLoad: companyData.electricityLoad || "350 kVA",
      waterUsage: companyData.waterUsage || "Moderate",
      hazardousMaterial: companyData.hazardousMaterial || "Minimal",
      constructionRequired: companyData.constructionRequired !== false,
      operationalSince: "2026",
      authorizedSignatory: `${userData.name} (${userData.roleLabel || 'Director'})`,
      contactEmail: userData.email,
      contactPhone: userData.phone || "+91 98000 00000",
      profileCompleted: 100
    };

    const newUser = {
      id: userId,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98000 00000",
      role: userData.role || "business_admin",
      roleLabel: userData.roleLabel || "Enterprise Admin",
      designation: userData.designation || "Director",
      companyId: companyId
    };

    // Calculate dynamic approval requirements for this new company
    const dynamicRoadmap = discoverApprovals(newComp);

    // Initialize custom applications for the new company
    const newApps = dynamicRoadmap.required.slice(0, 4).map((item, idx) => {
      const appId = `app-new-${idx}-${Date.now()}`;
      const statusList = ['UNDER_REVIEW', 'DOCUMENTS_REQUIRED', 'SUBMITTED', 'INSPECTION_SCHEDULED'];
      const status = statusList[idx % statusList.length];
      const statusLabel = status.replace(/_/g, ' ');

      return {
        id: appId,
        approvalId: item.approval.id,
        applicationNumber: `MH-${newComp.district.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        title: item.approval.name,
        department: item.approval.department,
        status: status,
        statusLabel: statusLabel,
        currentStage: status === 'DOCUMENTS_REQUIRED' ? 2 : status === 'UNDER_REVIEW' ? 3 : 1,
        totalStages: 5,
        stages: [
          { id: 1, name: "Submitted", status: "completed", date: now, note: "Online dossier lodged" },
          { id: 2, name: "Document Scrutiny", status: status === 'DOCUMENTS_REQUIRED' ? "action_required" : "completed", date: now, note: "Scrutiny desk review" },
          { id: 3, name: "Department Review", status: status === 'UNDER_REVIEW' ? "in_progress" : "pending", date: "In Progress", note: "Inspector review" },
          { id: 4, name: "Site Inspection", status: "pending", date: "Est. Next Week", note: "Safety inspection" },
          { id: 5, name: "Clearance Issuance", status: "pending", date: "Pending", note: "Digitally signed certificate" }
        ],
        submittedAt: now,
        lastUpdatedAt: `${now}, Just now`,
        nextAction: status === 'DOCUMENTS_REQUIRED' 
          ? "Upload required drawings to advance scrutiny desk." 
          : "Under formal department review.",
        slaDaysRemaining: 15,
        priority: "HIGH",
        officerInCharge: `Shri A. K. Sharma (${item.approval.department.split(',')[0]} Desk)`,
        requiredDocuments: item.approval.requiredDocuments.slice(0, 4).map((docName, dIdx) => ({
          docId: `doc-new-${idx}-${dIdx}`,
          name: docName,
          status: (status === 'DOCUMENTS_REQUIRED' && dIdx === 1) ? 'MISSING' : 'VERIFIED'
        })),
        activityLog: [
          { date: `${now}, Just now`, actor: userData.name, text: `Registered application for ${item.approval.name}` }
        ]
      };
    });

    // Custom documents for new company
    const newDocs = [
      {
        id: `doc-pan-${companyId}`,
        name: "Company Permanent Account Number (PAN)",
        category: "Company Documents",
        relatedApproval: "All Clearances",
        relatedApplicationId: newApps[0]?.id || null,
        fileUrl: "/docs/pan-preview.pdf",
        fileName: `PAN_${newComp.pan}.pdf`,
        fileSize: "1.2 MB",
        fileType: "PDF",
        status: "VERIFIED",
        uploadedAt: now,
        verifiedAt: now,
        expiryDate: "Perpetual",
        version: "v1.0"
      },
      {
        id: `doc-coi-${companyId}`,
        name: "Certificate of Incorporation (MCA)",
        category: "Company Documents",
        relatedApproval: "Factory License & Fire NOC",
        relatedApplicationId: newApps[0]?.id || null,
        fileUrl: "/docs/coi-preview.pdf",
        fileName: `COI_${newComp.cin}.pdf`,
        fileSize: "2.1 MB",
        fileType: "PDF",
        status: "VERIFIED",
        uploadedAt: now,
        verifiedAt: now,
        expiryDate: "Perpetual",
        version: "v1.0"
      },
      {
        id: `doc-missing-${companyId}`,
        name: "Factory Layout & Machinery Blueprint",
        category: "Approval Documents",
        relatedApproval: newApps[1]?.title || "Fire Safety Approval & Final NOC",
        relatedApplicationId: newApps[1]?.id || newApps[0]?.id,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        fileType: "PDF",
        status: "MISSING",
        uploadedAt: null,
        verifiedAt: null,
        expiryDate: "Required for Scrutiny",
        version: "Pending"
      }
    ];

    // Custom compliance tasks
    const newCompliance = [
      {
        id: `comp-new-1`,
        title: `${newComp.industry} Safety & Pressure Audit`,
        relatedApproval: "Safety Compliance",
        department: "Directorate of Industrial Safety & Health",
        dueDate: "15 Oct 2026",
        dueDays: 15,
        status: "UPCOMING",
        statusLabel: "Due in 15 Days",
        priority: "HIGH",
        frequency: "Annual",
        description: `Periodic statutory plant safety audit for ${newComp.legalName}.`,
        requiredDocument: "Certified Safety Audit Report",
        completedAt: null
      },
      {
        id: `comp-new-2`,
        title: "Annual Environmental Statement (Form V)",
        relatedApproval: "MPCB Pollution Consent",
        department: "Maharashtra Pollution Control Board",
        dueDate: "30 Oct 2026",
        dueDays: 30,
        status: "SCHEDULED",
        statusLabel: "Scheduled",
        priority: "MEDIUM",
        frequency: "Annual",
        description: "Annual environmental returns of raw material & energy consumption.",
        requiredDocument: "Form V Statement",
        completedAt: null
      }
    ];

    // Update global state
    setCurrentUser(newUser);
    setCompany(newComp);
    setApplications(newApps);
    setDocuments(newDocs);
    setComplianceTasks(newCompliance);
    setCurrentUserRole(newUser.role);

    const initialNotifs = [
      {
        id: `notif-welcome-${Date.now()}`,
        title: `Welcome ${newUser.name}! Your workspace is active.`,
        description: `Personalized approval roadmap generated for ${newComp.legalName} in ${newComp.district}.`,
        type: "STATUS_UPDATE",
        category: "Onboarding",
        timestamp: "Just now",
        link: "/dashboard",
        read: false,
        priority: "HIGH"
      }
    ];
    setNotifications(initialNotifs);

    addActivityLog(`Registered new enterprise profile: ${newComp.legalName}`, "Onboarding");
    showToast(
      "Enterprise Workspace Created",
      `Welcome to INDUSTRIA, ${newUser.name}! Workspace initialized for ${newComp.legalName}.`,
      "success"
    );
  };

  // Login handler
  const loginUser = (email, role = 'business_admin') => {
    if (email === 'officer@industria.demo' || role === 'officer') {
      const officerUser = {
        id: "usr-officer-01",
        name: "Capt. S. V. Jadhav",
        email: "officer@industria.demo",
        phone: "+91 20 2712 4491",
        role: "officer",
        roleLabel: "Government Scrutiny Officer",
        designation: "Divisional Fire & DISH Scrutiny Desk, Pune",
        companyId: "govt-mh"
      };
      setCurrentUser(officerUser);
      setCurrentUserRole("officer");
      showToast("Officer Logged In", "Logged in to Government Scrutiny Desk.", "info");
    } else {
      const adminUser = {
        id: "usr-01",
        name: "Vikramaditya Patil",
        email: email || "admin@aarohan.demo",
        phone: "+91 98230 44821",
        role: "business_admin",
        roleLabel: "Enterprise Managing Director",
        designation: "Managing Director",
        companyId: "aarohan-01"
      };
      setCurrentUser(adminUser);
      setCurrentUserRole("business_admin");
      showToast("Enterprise Logged In", `Logged in as ${adminUser.name}.`, "success");
    }
  };

  // Logout handler
  const logoutUser = () => {
    showToast("Logged Out", "You have been logged out of INDUSTRIA.", "info");
  };

  // Upload or update document
  const uploadDocument = (docId, fileData = {}) => {
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    setDocuments(prev => prev.map(doc => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: "UPLOADED",
          fileName: fileData.fileName || `${doc.name.replace(/\s+/g, '_')}_Uploaded.pdf`,
          fileSize: fileData.fileSize || "3.4 MB",
          fileUrl: "/docs/uploaded-preview.pdf",
          uploadedAt: now,
          version: "v1.1 (Uploaded)"
        };
      }
      return doc;
    }));

    // Update the associated application's required documents status
    const targetDoc = documents.find(d => d.id === docId);
    if (targetDoc && targetDoc.relatedApplicationId) {
      setApplications(prev => prev.map(app => {
        if (app.id === targetDoc.relatedApplicationId) {
          const updatedReqDocs = app.requiredDocuments.map(rd => {
            if (rd.docId === docId || rd.name === targetDoc.name) {
              return { ...rd, status: "UPLOADED" };
            }
            return rd;
          });

          // Check if all documents are now uploaded/verified
          const hasMissing = updatedReqDocs.some(rd => rd.status === 'MISSING');
          const newStatus = hasMissing ? app.status : 'UNDER_REVIEW';
          const newStatusLabel = hasMissing ? app.statusLabel : 'Under Review (Resubmitted)';
          
          return {
            ...app,
            status: newStatus,
            statusLabel: newStatusLabel,
            lastUpdatedAt: `${now}, Just now`,
            nextAction: hasMissing 
              ? app.nextAction 
              : "All required documents uploaded. Application forwarded for Officer Technical Review.",
            requiredDocuments: updatedReqDocs,
            activityLog: [
              {
                date: `${now}, Just now`,
                actor: currentUser.name || "Operations Admin",
                text: `Uploaded document "${targetDoc.name}". Status changed to UPLOADED.`
              },
              ...app.activityLog
            ]
          };
        }
        return app;
      }));
    }

    addActivityLog(`Uploaded document "${targetDoc ? targetDoc.name : docId}"`, "Documents");
    showToast(
      "Document Uploaded Successfully",
      `"${targetDoc ? targetDoc.name : 'Document'}" has been linked to the application.`
    );
  };

  // Complete Compliance Task
  const completeComplianceTask = (taskId, notes = "Verified and filed with regulatory portal") => {
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    let taskName = "Compliance Task";

    setComplianceTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        taskName = task.title;
        return {
          ...task,
          status: "COMPLETED",
          statusLabel: "Completed",
          completedAt: now
        };
      }
      return task;
    }));

    addActivityLog(`Completed compliance task: "${taskName}"`, "Compliance");
    showToast(
      "Compliance Task Completed",
      `"${taskName}" marked as completed on ${now}.`
    );
  };

  // Toggle Save Scheme
  const toggleSaveScheme = (schemeId) => {
    setSchemes(prev => prev.map(scheme => {
      if (scheme.id === schemeId) {
        const nextSaved = !scheme.saved;
        if (nextSaved) {
          showToast("Scheme Saved", `"${scheme.title}" added to your saved incentives.`, "info");
        }
        return { ...scheme, saved: nextSaved };
      }
      return scheme;
    }));
  };

  // Advance Application (Officer action or simulation)
  const advanceApplicationStage = (appId, targetStageNumber, statusOverride = null) => {
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const newStage = targetStageNumber;
        let newStatus = statusOverride || app.status;
        let newStatusLabel = app.statusLabel;

        if (newStage === 5) {
          newStatus = "APPROVED";
          newStatusLabel = "Approved";
        } else if (newStage === 4) {
          newStatus = "INSPECTION_SCHEDULED";
          newStatusLabel = "Inspection Scheduled";
        } else if (newStage === 3) {
          newStatus = "UNDER_REVIEW";
          newStatusLabel = "Department Review";
        }

        const updatedStages = app.stages.map(st => {
          if (st.id < newStage) return { ...st, status: "completed" };
          if (st.id === newStage) return { ...st, status: "in_progress", date: now };
          return { ...st, status: "pending" };
        });

        return {
          ...app,
          currentStage: newStage,
          status: newStatus,
          statusLabel: newStatusLabel,
          lastUpdatedAt: `${now}, Just now`,
          stages: updatedStages,
          activityLog: [
            {
              date: `${now}, Just now`,
              actor: currentUserRole === 'officer' ? "Scrutiny Officer" : "System Automated Tracker",
              text: `Application transitioned to Stage ${newStage} (${app.stages[newStage - 1]?.name || 'Progress'}).`
            },
            ...app.activityLog
          ]
        };
      }
      return app;
    }));

    addActivityLog(`Advanced Application ${appId} to Stage ${targetStageNumber}`, "Applications");
    showToast("Application Stage Updated", `Application progressed to next milestone.`);
  };

  // Mark notification read
  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All Notifications Read", "Your notification inbox is clean.", "info");
  };

  // Update business profile
  const updateCompanyProfile = (updatedFields) => {
    setCompany(prev => {
      const newInv = updatedFields.investment !== undefined ? parseFloat(updatedFields.investment) : prev.investment;
      return {
        ...prev,
        ...updatedFields,
        investment: newInv,
        investmentDisplay: `₹${newInv.toFixed(2)} Cr`
      };
    });
    addActivityLog("Business Profile updated", "Profile");
    showToast("Profile Updated", "Company profile parameters and statutory records saved.");
  };

  // Reset demo state
  const resetDemoState = () => {
    setCurrentUser(DEFAULT_USER);
    setCompany(INITIAL_COMPANY);
    setApplications(INITIAL_APPLICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setComplianceTasks(INITIAL_COMPLIANCE_TASKS);
    setSchemes(INITIAL_SCHEMES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setCurrentUserRole("business_admin");
    localStorage.clear();
    showToast("Demo State Reset", "Restored default Aarohan Precision Components data.", "info");
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        company,
        applications,
        documents,
        complianceTasks,
        schemes,
        notifications,
        activityLogs,
        currentUserRole,
        activeToast,
        unreadNotificationCount,
        setCurrentUserRole,
        registerNewUserAndCompany,
        loginUser,
        logoutUser,
        uploadDocument,
        completeComplianceTask,
        toggleSaveScheme,
        advanceApplicationStage,
        markNotificationRead,
        markAllNotificationsRead,
        updateCompanyProfile,
        resetDemoState,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
