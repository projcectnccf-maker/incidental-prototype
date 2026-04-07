import { useMemo, useState } from 'react';
import './App.css';

const masterPages = [
  { id: 'particulars', label: 'Particulars' },
  { id: 'msp', label: 'MSP' },
  { id: 'incidental', label: 'Incidental Rate' },
];

const particularsRows = [
  { id: '01', particular: 'Gunny handling and stitching' },
  { id: '02', particular: 'Transportation to storage point' },
  { id: '03', particular: 'Weighment and quality certification' },
  { id: '04', particular: 'Loading and unloading support' },
  { id: '05', particular: 'Insurance and administrative overhead' },
];

const mspRows = [
  {
    commodity: 'Paddy (Common)',
    season: 'Kharif 2025-26',
    rate: 'Rs. 2,300 / Qtl',
  },
  { commodity: 'Wheat', season: 'Rabi 2025-26', rate: 'Rs. 2,425 / Qtl' },
  { commodity: 'Mustard', season: 'Rabi 2025-26', rate: 'Rs. 5,950 / Qtl' },
  { commodity: 'Chana', season: 'Rabi 2025-26', rate: 'Rs. 5,650 / Qtl' },
];

const incidentalRows = [
  {
    particular: 'Transportation',
    season: 'Kharif 2025-26',
    rate: 'Rs. 24.00 / Qtl',
  },
  {
    particular: 'Cleaning and drying',
    season: 'Kharif 2025-26',
    rate: 'Rs. 18.50 / Qtl',
  },
  {
    particular: 'Handling and stacking',
    season: 'Rabi 2025-26',
    rate: 'Rs. 16.75 / Qtl',
  },
  {
    particular: 'Watch and ward',
    season: 'Rabi 2025-26',
    rate: 'Rs. 11.20 / Qtl',
  },
];

const reportRows = [
  {
    particular: 'Transportation Labour Charges (Per Qtl)',
    rate: 55.89,
    approvedAmount: 158871963.9,
    claimedByBo: 79543658.15,
    paidByHo: 79543658.15,
    pending: 0,
    remark: '',
  },
  {
    particular: 'Packaging Material (Per Qtl) including GST',
    rate: 52.86,
    approvedAmount: 150258937.4,
    claimedByBo: 75316700.5,
    paidByHo: 75316700.5,
    pending: 0,
    remark: '',
  },
  {
    particular: 'Gunny Bags Transportation',
    rate: 107.59,
    approvedAmount: 305833505,
    claimedByBo: 155799682.6,
    paidByHo: 155799682.6,
    pending: 0,
    remark: '',
  },
  {
    particular: 'GST on MSP',
    rate: 244.6,
    approvedAmount: 695295801.8,
    claimedByBo: 116034969.6,
    paidByHo: 116034969.6,
    pending: 0,
    remark: '',
  },
  {
    particular: 'NCCF Service Charges',
    rate: 48.92,
    approvedAmount: 139059160.4,
    claimedByBo: 104435742.3,
    paidByHo: 104435742.3,
    pending: 0,
    remark: '',
  },
  {
    particular: 'SLA Services Charges',
    rate: 97.84,
    approvedAmount: 278118320.7,
    claimedByBo: 139247656.4,
    paidByHo: 139247656.4,
    pending: 0,
    remark: '',
  },
  {
    particular: 'Godown Insurance',
    rate: 7.34,
    approvedAmount: 20864559.22,
    claimedByBo: 0,
    paidByHo: 0,
    pending: 0,
    remark: '',
  },
  {
    particular: 'Godown Rent for 9 Months (Per Qtl)',
    rate: 153.3,
    approvedAmount: 435767973.9,
    claimedByBo: 261644410.7,
    paidByHo: 261644410.7,
    pending: 0,
    remark: '',
  },
  {
    particular: 'QR Tag',
    rate: 3.58,
    approvedAmount: 10176447.14,
    claimedByBo: 0,
    paidByHo: 0,
    pending: 0,
    remark: '',
  },
];

const options = {
  season: ['Kharif 2025-26', 'Rabi 2025-26'],
  commodity: ['Paddy (Common)', 'Wheat', 'Mustard'],
  state: ['Madhya Pradesh', 'Punjab', 'Haryana'],
  branch: ['Ahmedabad', 'Delhi', 'Mumbai'],
  particular: [
    'Bagging and stitching',
    'Cleaning and drying',
    'Handling and stacking',
  ],
};

const reportOptions = {
  season: ['Kharif 2024-25', 'Rabi 2024-25', 'Kharif 2025-26'],
  commodity: ['Soyabean MSP 4892 per Qntl', 'Paddy MSP 2300 per Qntl'],
  state: ['Maharashtra', 'Madhya Pradesh', 'Rajasthan'],
  branch: ['BO Nagpur', 'BO Nashik', 'BO Amravati'],
};

function Sidebar({ activePage, setActivePage }) {
  const [mastersOpen, setMastersOpen] = useState(true);
  const [stockBlockingOpen, setStockBlockingOpen] = useState(true);

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-badge">E</div>
        <div>
          <p className="sidebar-kicker">eStock Desktop</p>
          <h1>Incidental Prototype</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          type="button"
          className="sidebar-group"
          onClick={() => setMastersOpen((value) => !value)}
        >
          <span>Masters</span>
          <span>{mastersOpen ? '▴' : '▾'}</span>
        </button>
        {mastersOpen ? (
          <div className="sidebar-links">
            {masterPages.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className="sidebar-group"
          onClick={() => setStockBlockingOpen((value) => !value)}
        >
          <span>Incidental</span>
          <span>{stockBlockingOpen ? '▴' : '▾'}</span>
        </button>
        {stockBlockingOpen ? (
          <div className="sidebar-links">
            <button
              type="button"
              className={`sidebar-link ${activePage === 'store-incidental' ? 'active' : ''}`}
              onClick={() => setActivePage('store-incidental')}
            >
              Store Incidental
            </button>
            <button
              type="button"
              className={`sidebar-link ${activePage === 'reports' ? 'active' : ''}`}
              onClick={() => setActivePage('reports')}
            >
              Reports
            </button>
          </div>
        ) : null}
      </nav>
    </aside>
  );
}

function MasterPage({
  title,
  subtitle,
  searchPlaceholder,
  addLabel,
  columns,
  rows,
}) {
  const [search, setSearch] = useState('');

  const filteredRows = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return rows;

    return rows.filter((row) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(value),
      ),
    );
  }, [rows, search]);

  return (
    <section className="page-shell master-shell">
      <div className="page-header">
        <div>
          <p className="page-kicker">Masters</p>
          <h2>{title} Management</h2>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        <div className="page-actions">
          <button type="button" className="page-button primary">
            {addLabel}
          </button>
          <button type="button" className="page-button success">
            Export Excel
          </button>
        </div>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="management-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function StoreIncidentalPage() {
  const [activeRole, setActiveRole] = useState('branch');
  const [formValues, setFormValues] = useState({
    season: '',
    commodity: '',
    state: '',
    branch: '',
    procurementQuality: '',
  });
  const [detailRows, setDetailRows] = useState([
    {
      id: 1,
      particular: '',
      claimedByBo: '',
      paidByHo: '',
      pendingAmount: '',
      remark: '',
      attachmentName: '',
    },
  ]);

  const isReadyForAmounts = Boolean(
    formValues.season &&
    formValues.commodity &&
    formValues.state &&
    formValues.branch &&
    formValues.procurementQuality.trim(),
  );
  const isBranchUser = activeRole === 'branch';
  const isHoUser = activeRole === 'ho';

  const parseRate = (rate) => {
    const matchedValue = rate.match(/(\d+(?:\.\d+)?)/);
    return matchedValue ? Number.parseFloat(matchedValue[1]) : 0;
  };

  const formatCurrency = (value) =>
    `Rs. ${value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const getApprovedRate = (particular) => {
    const matchedRow = incidentalRows.find(
      (row) => row.particular === particular,
    );
    return matchedRow?.rate ?? '--';
  };

  const getApprovalAmount = (particular) => {
    if (!particular) return 'Rs. 0.00';

    const procurementQuantity = Number.parseFloat(
      formValues.procurementQuality,
    );
    if (!Number.isFinite(procurementQuantity)) return 'Rs. 0.00';

    return formatCurrency(
      parseRate(getApprovedRate(particular)) * procurementQuantity,
    );
  };

  const handleChange = (key, value) => {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleRowChange = (id, key, value) => {
    setDetailRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  const handleAddRow = () => {
    setDetailRows((current) => [
      ...current,
      {
        id: current.length ? Math.max(...current.map((row) => row.id)) + 1 : 1,
        particular: '',
        claimedByBo: '',
        paidByHo: '',
        pendingAmount: '',
        remark: '',
        attachmentName: '',
      },
    ]);
  };

  const handleFileChange = (id, file) => {
    setDetailRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, attachmentName: file?.name ?? '' } : row,
      ),
    );
  };

  const handleRemoveRow = (id) => {
    setDetailRows((current) =>
      current.length === 1 ? current : current.filter((row) => row.id !== id),
    );
  };

  return (
    <section className="page-shell block-shell">
      <div className="page-header block-header">
        <div>
          <p className="page-kicker">Stock Blocking</p>
          <h2>Store Incidental</h2>
          <p className="page-subtitle">
            Fill the core selection fields first. Once complete, add one or more
            incidental detail rows with particulars and row-wise values.
          </p>
        </div>
        <div className="role-switcher" aria-label="User role switcher">
          <button
            type="button"
            className={`role-switch-button ${isBranchUser ? 'active' : ''}`}
            onClick={() => setActiveRole('branch')}
          >
            Branch View
          </button>
          <button
            type="button"
            className={`role-switch-button ${isHoUser ? 'active' : ''}`}
            onClick={() => setActiveRole('ho')}
          >
            HO View
          </button>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-item">
          <label htmlFor="season">Season</label>
          <select
            id="season"
            value={formValues.season}
            onChange={(event) => handleChange('season', event.target.value)}
          >
            <option value="">Select Season</option>
            {options.season.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="commodity">Commodity</label>
          <select
            id="commodity"
            value={formValues.commodity}
            onChange={(event) => handleChange('commodity', event.target.value)}
          >
            <option value="">Select Commodity</option>
            {options.commodity.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="state">State</label>
          <select
            id="state"
            value={formValues.state}
            onChange={(event) => handleChange('state', event.target.value)}
          >
            <option value="">Select State</option>
            {options.state.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="branch">Branch</label>
          <select
            id="branch"
            value={formValues.branch}
            onChange={(event) => handleChange('branch', event.target.value)}
          >
            <option value="">Select Branch</option>
            {options.branch.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="procurementQuality">Procurement Quantity</label>
          <input
            id="procurementQuality"
            type="text"
            value={formValues.procurementQuality}
            onChange={(event) =>
              handleChange('procurementQuality', event.target.value)
            }
            placeholder="Enter procurement quantity"
          />
        </div>
      </div>

      {isReadyForAmounts ? (
        <div className="results-card">
          <div className="results-header">
            <div>
              <h3>Incidental Details</h3>
              <p>
                {isBranchUser
                  ? 'Branch users can capture particulars, approved amount context, claim details, remarks, and attachments.'
                  : 'HO users can review the branch-submitted details and fill only the paid and pending amounts.'}
              </p>
            </div>
            <div className="results-actions-inline">
              <button
                type="button"
                className="page-button success"
                onClick={handleAddRow}
                disabled={isHoUser}
              >
                + Add Row
              </button>
            </div>
          </div>

          <div className="table-card details-table-card">
            <div className="table-scroll">
              <table className="management-table incidental-detail-table">
                <thead>
                  <tr>
                    <th>Particulars</th>
                    <th>Incidental Rate as approved by the DA & FW in qt.</th>
                    <th>Amount as per the Approval DA & FW</th>
                    <th>Incidental Amount Claimed by BO</th>
                    {isHoUser ? <th>Incidental Amount Paid by HO</th> : null}
                    {isHoUser ? <th>Incidental Amount Pending</th> : null}
                    <th>Remark</th>
                    <th>File Upload</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {detailRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <select
                          value={row.particular}
                          disabled={isHoUser}
                          onChange={(event) =>
                            handleRowChange(
                              row.id,
                              'particular',
                              event.target.value,
                            )
                          }
                        >
                          <option value="">Select Particulars</option>
                          {options.particular.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{getApprovedRate(row.particular)}</td>
                      <td>{getApprovalAmount(row.particular)}</td>
                      <td>
                        <input
                          value={row.claimedByBo}
                          readOnly={isHoUser}
                          onChange={(event) =>
                            handleRowChange(
                              row.id,
                              'claimedByBo',
                              event.target.value,
                            )
                          }
                          placeholder="Enter BO claimed amount"
                        />
                      </td>
                      {isHoUser ? (
                        <td>
                          <input
                            value={row.paidByHo}
                            onChange={(event) =>
                              handleRowChange(
                                row.id,
                                'paidByHo',
                                event.target.value,
                              )
                            }
                            placeholder="Enter HO paid amount"
                          />
                        </td>
                      ) : null}
                      {isHoUser ? (
                        <td>
                          <input
                            value={row.pendingAmount}
                            onChange={(event) =>
                              handleRowChange(
                                row.id,
                                'pendingAmount',
                                event.target.value,
                              )
                            }
                            placeholder="Enter pending amount"
                          />
                        </td>
                      ) : null}
                      <td>
                        <textarea
                          value={row.remark}
                          readOnly={isHoUser}
                          onChange={(event) =>
                            handleRowChange(
                              row.id,
                              'remark',
                              event.target.value,
                            )
                          }
                          placeholder="Add remark"
                          rows="3"
                        />
                      </td>
                      <td>
                        <div className="file-upload-cell">
                          <input
                            type="file"
                            id={`attachment-${row.id}`}
                            className="file-upload-input"
                            disabled={isHoUser}
                            onChange={(event) =>
                              handleFileChange(row.id, event.target.files?.[0])
                            }
                          />
                          <label
                            htmlFor={`attachment-${row.id}`}
                            className="file-upload-button"
                          >
                            Choose File
                          </label>
                          <span className="file-upload-name">
                            {row.attachmentName || 'No file chosen'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="table-action-button"
                          onClick={() => handleRemoveRow(row.id)}
                          disabled={isHoUser || detailRows.length === 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="results-actions">
            <button type="button" className="page-button primary">
              {isBranchUser ? 'Submit as Branch' : 'Submit as HO'}
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h3>Complete the top fields to continue</h3>
          <p>
            Select season, commodity, state, branch, and enter procurement
            quantity to reveal the incidental details table.
          </p>
        </div>
      )}
    </section>
  );
}

function ReportsPage() {
  const [filters, setFilters] = useState({
    season: '',
    commodity: '',
    state: '',
    branch: '',
  });

  const isReadyForReport = Boolean(
    filters.season && filters.commodity && filters.state && filters.branch,
  );

  const totals = reportRows.reduce(
    (summary, row) => ({
      rate: summary.rate + row.rate,
      approvedAmount: summary.approvedAmount + row.approvedAmount,
      claimedByBo: summary.claimedByBo + row.claimedByBo,
      paidByHo: summary.paidByHo + row.paidByHo,
      pending: summary.pending + row.pending,
    }),
    {
      rate: 0,
      approvedAmount: 0,
      claimedByBo: 0,
      paidByHo: 0,
      pending: 0,
    },
  );

  const formatNumber = (value) =>
    new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(value);

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleDownload = () => {
    const headerRows = [
      [`Season ${filters.season}`],
      [`Commodity- ${filters.commodity}`],
      [`State- ${filters.state}`],
      [`Procured Quantity by ${filters.branch} in qt- 2842583`],
      [],
    ];

    const columns = [
      'Particulars',
      'Incidental rate as approved by the DA & FW in qt.',
      'Amount as per the Approval DA & FW',
      'Incidental Amount Claimed by BO',
      'Incidental Amount Paid by HO',
      'Incidental Amount Pending',
      'Remark',
    ];

    const bodyRows = reportRows.map((row) => [
      row.particular,
      row.rate,
      row.approvedAmount,
      row.claimedByBo,
      row.paidByHo,
      row.pending,
      row.remark,
    ]);

    bodyRows.push([
      'Total',
      totals.rate,
      totals.approvedAmount,
      totals.claimedByBo,
      totals.paidByHo,
      totals.pending,
      '',
    ]);

    const csvRows = [...headerRows, columns, ...bodyRows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`)
          .join(','),
      )
      .join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'incidental-reports-prototype.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="page-shell reports-shell">
      <div className="page-header block-header">
        <div>
          <p className="page-kicker">Stock Blocking</p>
          <h2>Reports</h2>
          <p className="page-subtitle">
            Prototype report layout for incidental statements with filterable
            headers and an Excel-friendly download.
          </p>
        </div>
        <div className="page-actions">
          <button
            type="button"
            className="page-button success"
            onClick={handleDownload}
          >
            Download Excel
          </button>
        </div>
      </div>

      <div className="filter-row reports-filter-row">
        <div className="filter-item">
          <label htmlFor="report-season">Season</label>
          <select
            id="report-season"
            value={filters.season}
            onChange={(event) =>
              handleFilterChange('season', event.target.value)
            }
          >
            <option value="">Select Season</option>
            {reportOptions.season.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="report-commodity">Commodity</label>
          <select
            id="report-commodity"
            value={filters.commodity}
            onChange={(event) =>
              handleFilterChange('commodity', event.target.value)
            }
          >
            <option value="">Select Commodity</option>
            {reportOptions.commodity.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="report-branch">Branch</label>
          <select
            id="report-branch"
            value={filters.branch}
            onChange={(event) =>
              handleFilterChange('branch', event.target.value)
            }
          >
            <option value="">Select Branch</option>
            {reportOptions.branch.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="report-state">State</label>
          <select
            id="report-state"
            value={filters.state}
            onChange={(event) =>
              handleFilterChange('state', event.target.value)
            }
          >
            <option value="">Select State</option>
            {reportOptions.state.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isReadyForReport ? (
        <div className="results-card report-card">
          <div className="table-scroll">
            <table className="report-table">
              <tbody>
                <tr>
                  <th colSpan="7" className="report-meta">
                    Season {filters.season}
                  </th>
                </tr>
                <tr>
                  <th colSpan="7" className="report-meta">
                    Commodity- {filters.commodity}
                  </th>
                </tr>
                <tr>
                  <th colSpan="7" className="report-meta">
                    State- {filters.state}
                  </th>
                </tr>
                <tr>
                  <th colSpan="7" className="report-meta">
                    Procured Quantity by {filters.branch} in qt- 2842583
                  </th>
                </tr>
                <tr className="report-column-row">
                  <th>Particulars</th>
                  <th>Incidental rate as approved by the DA & FW in qt.</th>
                  <th>Amount as per the Approval DA & FW</th>
                  <th>Incidental Amount Claimed by BO</th>
                  <th>Incidental Amount Paid by HO</th>
                  <th>Incidental Amount Pending</th>
                  <th>Remark</th>
                </tr>
                {reportRows.map((row) => (
                  <tr key={row.particular}>
                    <th className="report-particular">{row.particular}</th>
                    <td>{formatNumber(row.rate)}</td>
                    <td>{formatNumber(row.approvedAmount)}</td>
                    <td>{formatNumber(row.claimedByBo)}</td>
                    <td>{formatNumber(row.paidByHo)}</td>
                    <td>{formatNumber(row.pending)}</td>
                    <td>{row.remark}</td>
                  </tr>
                ))}
                <tr className="report-total-row">
                  <th className="report-particular">Total</th>
                  <td>{formatNumber(totals.rate)}</td>
                  <td>{formatNumber(totals.approvedAmount)}</td>
                  <td>{formatNumber(totals.claimedByBo)}</td>
                  <td>{formatNumber(totals.paidByHo)}</td>
                  <td>{formatNumber(totals.pending)}</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h3>Select all report filters to continue</h3>
          <p>
            Choose season, commodity, branch, and state to reveal the incidental
            report table.
          </p>
        </div>
      )}
    </section>
  );
}

function App() {
  const [activePage, setActivePage] = useState('store-incidental');

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="content-area">
        {activePage === 'particulars' ? (
          <MasterPage
            title="Particulars"
            subtitle="Separate masters page for incidental particulars, following the eStock management page style."
            searchPlaceholder="Search particulars..."
            addLabel="+ Add New"
            columns={[
              { key: 'id', label: '#' },
              { key: 'particular', label: 'Particulars' },
            ]}
            rows={particularsRows}
          />
        ) : null}

        {activePage === 'msp' ? (
          <MasterPage
            title="MSP"
            subtitle="Commodity and season-wise MSP master displayed as its own management page."
            searchPlaceholder="Search MSP records..."
            addLabel="+ Add New"
            columns={[
              { key: 'commodity', label: 'Commodity' },
              { key: 'season', label: 'Season' },
              { key: 'rate', label: 'Rate' },
            ]}
            rows={mspRows}
          />
        ) : null}

        {activePage === 'incidental' ? (
          <MasterPage
            title="Incidental Rate"
            subtitle="Standalone incidental master page with particulars, season, and approved rate."
            searchPlaceholder="Search incidental records..."
            addLabel="+ Add New"
            columns={[
              { key: 'particular', label: 'Particulars' },
              { key: 'season', label: 'Season' },
              { key: 'rate', label: 'Rate' },
            ]}
            rows={incidentalRows}
          />
        ) : null}

        {activePage === 'store-incidental' ? <StoreIncidentalPage /> : null}
        {activePage === 'reports' ? <ReportsPage /> : null}
      </main>
    </div>
  );
}

export default App;
