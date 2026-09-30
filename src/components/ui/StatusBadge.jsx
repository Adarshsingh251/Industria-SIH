import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  FileCheck, 
  Upload, 
  Search, 
  XCircle, 
  Calendar,
  Send
} from 'lucide-react';
import { Badge } from './Badge';

export function StatusBadge({ status, className = '' }) {
  const normStatus = (status || '').toUpperCase().replace(/\s+/g, '_');

  switch (normStatus) {
    // Application States
    case 'APPROVED':
      return <Badge variant="success" icon={CheckCircle2} className={className}>Approved</Badge>;
    case 'UNDER_REVIEW':
      return <Badge variant="brand" icon={Clock} className={className}>Under Review</Badge>;
    case 'DOCUMENTS_REQUIRED':
      return <Badge variant="warning" icon={AlertTriangle} className={className}>Documents Required</Badge>;
    case 'INSPECTION_SCHEDULED':
      return <Badge variant="info" icon={Calendar} className={className}>Inspection Scheduled</Badge>;
    case 'SUBMITTED':
      return <Badge variant="info" icon={Send} className={className}>Submitted</Badge>;
    case 'DRAFT':
      return <Badge variant="default" icon={Clock} className={className}>Draft</Badge>;
    case 'REJECTED':
      return <Badge variant="danger" icon={XCircle} className={className}>Rejected</Badge>;

    // Document States
    case 'VERIFIED':
      return <Badge variant="success" icon={CheckCircle2} className={className}>Verified</Badge>;
    case 'UPLOADED':
      return <Badge variant="info" icon={Upload} className={className}>Uploaded</Badge>;
    case 'UNDER_VERIFICATION':
      return <Badge variant="brand" icon={Search} className={className}>Under Verification</Badge>;
    case 'MISSING':
      return <Badge variant="danger" icon={AlertCircle} className={className}>Missing</Badge>;
    case 'EXPIRED':
      return <Badge variant="danger" icon={Clock} className={className}>Expired</Badge>;

    // Compliance States
    case 'ACTION_REQUIRED':
    case 'DUE_TODAY':
      return <Badge variant="danger" icon={AlertTriangle} className={className}>Action Required</Badge>;
    case 'DUE_SOON':
      return <Badge variant="warning" icon={Clock} className={className}>Due Soon</Badge>;
    case 'UPCOMING':
      return <Badge variant="brand" icon={Calendar} className={className}>Upcoming</Badge>;
    case 'SCHEDULED':
      return <Badge variant="default" icon={Calendar} className={className}>Scheduled</Badge>;
    case 'COMPLETED':
      return <Badge variant="success" icon={CheckCircle2} className={className}>Completed</Badge>;

    // Approval Categories
    case 'REQUIRED':
      return <Badge variant="dark" icon={AlertCircle} className={className}>Required</Badge>;
    case 'POTENTIALLY_REQUIRED':
      return <Badge variant="warning" icon={Clock} className={className}>Potentially Required</Badge>;
    case 'INFORMATION_NEEDED':
      return <Badge variant="info" icon={Search} className={className}>Information Needed</Badge>;

    default:
      return <Badge variant="default" className={className}>{status}</Badge>;
  }
}
