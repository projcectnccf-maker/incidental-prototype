import { useMemo, useState } from 'react'
import './App.css'

const masterPages = [
  { id: 'particulars', label: 'Particulars' },
  { id: 'msp', label: 'MSP' },
  { id: 'incidental', label: 'Incidental Rate' },
]

const particularsRows = [
  { id: '01', particular: 'Gunny handling and stitching' },
  { id: '02', particular: 'Transportation to storage point' },
  { id: '03', particular: 'Weighment and quality certification' },
  { id: '04', particular: 'Loading and unloading support' },
  { id: '05', particular: 'Insurance and administrative overhead' },
]

const mspRows = [
  { commodity: 'Paddy (Common)', season: 'Kharif 2025-26', rate: 'Rs. 2,300 / Qtl' },
  { commodity: 'Wheat', season: 'Rabi 2025-26', rate: 'Rs. 2,425 / Qtl' },
  { commodity: 'Mustard', season: 'Rabi 2025-26', rate: 'Rs. 5,950 / Qtl' },
  { commodity: 'Chana', season: 'Rabi 2025-26', rate: 'Rs. 5,650 / Qtl' },
]

const incidentalRows = [
  { particular: 'Bagging and stitching', season: 'Kharif 2025-26', rate: 'Rs. 24.00 / Qtl' },
  { particular: 'Cleaning and drying', season: 'Kharif 2025-26', rate: 'Rs. 18.50 / Qtl' },
  { particular: 'Handling and stacking', season: 'Rabi 2025-26', rate: 'Rs. 16.75 / Qtl' },
  { particular: 'Watch and ward', season: 'Rabi 2025-26', rate: 'Rs. 11.20 / Qtl' },
]

const options = {
  season: ['Kharif 2025-26', 'Rabi 2025-26'],
  commodity: ['Paddy (Common)', 'Wheat', 'Mustard'],
  state: ['Madhya Pradesh', 'Punjab', 'Haryana'],
  particular: ['Bagging and stitching', 'Cleaning and drying', 'Handling and stacking'],
}

const derivedValues = {
  approvedRate: 'Rs. 24.00 / Qtl',
  approvalAmount: 'Rs. 31,200.00',
}

function Sidebar({ activePage, setActivePage }) {
  const [mastersOpen, setMastersOpen] = useState(true)
  const [stockBlockingOpen, setStockBlockingOpen] = useState(true)

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
          <span>Stock Blocking</span>
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
          </div>
        ) : null}
      </nav>
    </aside>
  )
}

function MasterPage({ title, subtitle, searchPlaceholder, addLabel, columns, rows }) {
  const [search, setSearch] = useState('')

  const filteredRows = useMemo(() => {
    const value = search.trim().toLowerCase()
    if (!value) return rows

    return rows.filter((row) =>
      Object.values(row).some((cell) => String(cell).toLowerCase().includes(value)),
    )
  }, [rows, search])

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
  )
}

function StoreIncidentalPage() {
  const [formValues, setFormValues] = useState({
    season: '',
    commodity: '',
    state: '',
    particular: '',
    procurementQuality: '',
    claimedByBo: '',
    paidByHo: '',
    pendingAmount: '',
    remark: '',
  })

  const isReadyForAmounts = Boolean(
    formValues.season &&
      formValues.commodity &&
      formValues.state &&
      formValues.particular &&
      formValues.procurementQuality.trim(),
  )

  const handleChange = (key, value) => {
    setFormValues((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <section className="page-shell block-shell">
      <div className="page-header block-header">
        <div>
          <p className="page-kicker">Stock Blocking</p>
          <h2>Store Incidental</h2>
          <p className="page-subtitle">
            Fill the core selection fields first. Once complete, the approved and user-entry
            incidental values appear below, following the stock blocking workflow style.
          </p>
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
          <label htmlFor="particular">Particulars</label>
          <select
            id="particular"
            value={formValues.particular}
            onChange={(event) => handleChange('particular', event.target.value)}
          >
            <option value="">Select Particulars</option>
            {options.particular.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="procurement-card">
        <label htmlFor="procurementQuality">Procurement Quality</label>
        <input
          id="procurementQuality"
          type="text"
          value={formValues.procurementQuality}
          onChange={(event) => handleChange('procurementQuality', event.target.value)}
          placeholder="Enter procurement quality"
        />
      </div>

      {isReadyForAmounts ? (
        <div className="results-card">
          <div className="results-header">
            <div>
              <h3>Incidental Details</h3>
              <p>Approved values are prefilled from the master setup, while the remaining fields are available for user input.</p>
            </div>
            <div className="results-chip">Selection Complete</div>
          </div>

          <div className="details-grid">
            <div className="detail-field prefilled">
              <label>Incidental Rate as approved by the DA & FW in qt.</label>
              <input value={derivedValues.approvedRate} readOnly />
            </div>

            <div className="detail-field prefilled">
              <label>Amount as per the Approval DA & FW</label>
              <input value={derivedValues.approvalAmount} readOnly />
              <small>Incidental rate x procurement quantity</small>
            </div>

            <div className="detail-field">
              <label>Incidental Amount Claimed by BO</label>
              <input
                value={formValues.claimedByBo}
                onChange={(event) => handleChange('claimedByBo', event.target.value)}
                placeholder="Enter BO claimed amount"
              />
            </div>

            <div className="detail-field">
              <label>Incidental Amount Paid by HO</label>
              <input
                value={formValues.paidByHo}
                onChange={(event) => handleChange('paidByHo', event.target.value)}
                placeholder="Enter HO paid amount"
              />
            </div>

            <div className="detail-field">
              <label>Incidental Amount Pending</label>
              <input
                value={formValues.pendingAmount}
                onChange={(event) => handleChange('pendingAmount', event.target.value)}
                placeholder="Enter pending amount"
              />
            </div>

            <div className="detail-field full-width">
              <label>Remark</label>
              <textarea
                value={formValues.remark}
                onChange={(event) => handleChange('remark', event.target.value)}
                placeholder="Add remark"
                rows="4"
              />
            </div>
          </div>

          <div className="results-actions">
            <button type="button" className="page-button primary">
              Save Draft
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h3>Complete the top fields to continue</h3>
          <p>
            Select season, commodity, state, particulars, and enter procurement quality to
            reveal the incidental detail section.
          </p>
        </div>
      )}
    </section>
  )
}

function App() {
  const [activePage, setActivePage] = useState('store-incidental')

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
      </main>
    </div>
  )
}

export default App
