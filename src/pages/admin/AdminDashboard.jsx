import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Mail, Phone, Calendar, Search, Filter,
  Download, LogOut, CheckCircle2, Clock, MessageSquare,
  AlertCircle, RefreshCw, ChevronRight, Eye, X
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  // Fetch session & enquiries
  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured || !supabase) {
        // Mock data when not connected yet for preview
        setEnquiries([
          {
            id: 'mock-1',
            full_name: 'Alex Johnson',
            company: 'Apex Logistics',
            email: 'alex@apexlogistics.com',
            phone: '+91 98765 43210',
            service: 'Custom Software Development',
            details: 'Looking for a custom ERP and fleet tracking management system for 50+ vehicles.',
            budget: '₹3,00,000 – ₹5,00,000',
            contact_method: 'WhatsApp',
            status: 'new',
            created_at: new Date().toISOString(),
          },
          {
            id: 'mock-2',
            full_name: 'Priya Sharma',
            company: 'EduLearn Academy',
            email: 'priya@edulearn.org',
            phone: '+91 98123 45678',
            service: 'AI & Intelligent Solutions',
            details: 'We want an AI chatbot for student inquiries and course admissions on our portal.',
            budget: '₹1,00,000 – ₹3,00,000',
            contact_method: 'Email',
            status: 'in_review',
            created_at: new Date(Date.now() - 86400000).toISOString(),
          }
        ]);
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      setUser(session.user);

      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    document.title = 'Admin Dashboard | Zentavix';
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate('/admin/login');
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('enquiries')
          .update({ status: newStatus })
          .eq('id', id);

        if (error) throw error;
      }

      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );

      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Error updating status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered list
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch =
        item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  // Export CSV
  const handleExportCSV = () => {
    if (filteredEnquiries.length === 0) return;

    const headers = ['Date', 'Name', 'Company', 'Email', 'Phone', 'Service', 'Budget', 'Method', 'Status', 'Details'];
    const rows = filteredEnquiries.map((e) => [
      new Date(e.created_at).toLocaleDateString(),
      `"${e.full_name || ''}"`,
      `"${e.company || ''}"`,
      `"${e.email || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.service || ''}"`,
      `"${e.budget || ''}"`,
      `"${e.contact_method || ''}"`,
      `"${e.status || ''}"`,
      `"${(e.details || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `zentavix_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const stats = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === 'new').length,
      inReview: enquiries.filter((e) => e.status === 'in_review').length,
      converted: enquiries.filter((e) => e.status === 'converted').length,
    };
  }, [enquiries]);

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div>
            <span className="badge">Zentavix Admin Portal</span>
            <h1 className="admin-title">Client Enquiries & Leads</h1>
          </div>
          <div className="admin-actions">
            <button className="btn btn-secondary btn-sm" onClick={fetchEnquiries} title="Refresh">
              <RefreshCw size={15} />
              Refresh
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleExportCSV}>
              <Download size={15} />
              Export CSV
            </button>
            <button className="btn btn-outline-white btn-sm" onClick={handleLogout}>
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(22, 139, 255, 0.12)', color: '#168BFF' }}>
              <Users size={22} />
            </div>
            <div>
              <p className="stat-label">Total Leads</p>
              <h3 className="stat-value">{stats.total}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(234, 179, 8, 0.12)', color: '#eab308' }}>
              <Clock size={22} />
            </div>
            <div>
              <p className="stat-label">New Enquiries</p>
              <h3 className="stat-value">{stats.new}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}>
              <MessageSquare size={22} />
            </div>
            <div>
              <p className="stat-label">In Review</p>
              <h3 className="stat-value">{stats.inReview}</h3>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="stat-label">Converted / Won</p>
              <h3 className="stat-value">{stats.converted}</h3>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="admin-controls-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, company, email, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select
              className="status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_review">In Review</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="enquiries-table-wrap">
          {loading ? (
            <div className="admin-loading-state">
              <RefreshCw size={24} className="spin" />
              <p>Loading enquiries...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="admin-empty-state">
              <AlertCircle size={36} color="#64748b" />
              <h3>No enquiries found</h3>
              <p>No client requests match your current filters.</p>
            </div>
          ) : (
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Contact Info</th>
                  <th>Budget</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>
                      <div className="client-cell">
                        <strong>{enquiry.full_name}</strong>
                        {enquiry.company && <span className="client-company">{enquiry.company}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="service-tag">{enquiry.service}</span>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <a href={`mailto:${enquiry.email}`} className="contact-link">
                          <Mail size={13} /> {enquiry.email}
                        </a>
                        <a href={`tel:${enquiry.phone}`} className="contact-link">
                          <Phone size={13} /> {enquiry.phone}
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className="budget-tag">{enquiry.budget || 'Not specified'}</span>
                    </td>
                    <td>
                      <span className="date-cell">
                        <Calendar size={13} />
                        {new Date(enquiry.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <select
                        className={`status-badge status-${enquiry.status}`}
                        value={enquiry.status}
                        disabled={updatingId === enquiry.id}
                        onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn-view-details"
                        onClick={() => setSelectedEnquiry(enquiry)}
                        title="View Full Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal for Details */}
        {selectedEnquiry && (
          <div className="modal-backdrop" onClick={() => setSelectedEnquiry(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="badge">Enquiry Details</span>
                  <h3 className="modal-title">{selectedEnquiry.full_name}</h3>
                  {selectedEnquiry.company && <p className="modal-subtitle">{selectedEnquiry.company}</p>}
                </div>
                <button className="modal-close-btn" onClick={() => setSelectedEnquiry(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-grid">
                  <div className="modal-item">
                    <span className="modal-item-label">Email</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="modal-item-value link">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  <div className="modal-item">
                    <span className="modal-item-label">Phone</span>
                    <a href={`tel:${selectedEnquiry.phone}`} className="modal-item-value link">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                  <div className="modal-item">
                    <span className="modal-item-label">Service Required</span>
                    <span className="modal-item-value">{selectedEnquiry.service}</span>
                  </div>
                  <div className="modal-item">
                    <span className="modal-item-label">Budget</span>
                    <span className="modal-item-value">{selectedEnquiry.budget || 'Not specified'}</span>
                  </div>
                  <div className="modal-item">
                    <span className="modal-item-label">Preferred Contact</span>
                    <span className="modal-item-value">{selectedEnquiry.contact_method || 'Email'}</span>
                  </div>
                  <div className="modal-item">
                    <span className="modal-item-label">Date Submitted</span>
                    <span className="modal-item-value">{new Date(selectedEnquiry.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div className="modal-details-box">
                  <h4>Project Description / Message:</h4>
                  <p>{selectedEnquiry.details}</p>
                </div>

                <div className="modal-status-update">
                  <label>Change Status:</label>
                  <select
                    className={`status-badge status-${selectedEnquiry.status}`}
                    value={selectedEnquiry.status}
                    onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Regarding your enquiry with Zentavix`}
                  className="btn btn-primary btn-sm"
                >
                  <Mail size={15} />
                  Reply via Email
                </a>
                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <MessageSquare size={15} />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
