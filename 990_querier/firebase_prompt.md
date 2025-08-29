# EIN 990 Dashboard Prompt

## Goal
Create a secure, responsive web dashboard to explore EIN 990 filings since 2020. The app must support querying, filtering, summarizing, charting, and detecting patterns/outliers from the uploaded dataset.

## Data Source
CSV file with these exact columns (types inferred from schema):

- `EIN` (int)  
- `Name` (string)  
- `City` (string)  
- `State` (string)  
- `Tax Year` (int)  
- `Total Contributions` (float; may be null)  
- `Total Revenue` (int)  
- `Total Expenses` (int)  
- `Assets End` (int)  
- `Comp Current Officers` (float; may be null)  
- `Other Salary & Wages` (float; may be null)  
- `PDF URL` (string; may be null)

Primary key: **(`EIN`, `Tax Year`)**

Use attached schema + data dictionary to enforce types.

## Ingestion & Storage
- Import CSV as table `filings`.  
- Indexes: (`EIN, Tax Year`), (`State, Tax Year`), (`Tax Year`), (`Total Revenue`).  
- Support new CSV uploads to replace/append.

## Top-Level UI
### Header bar
- Global search across `EIN`, `Name`, `City`, `State`.  
- Quick stats (filter-aware):  
  - Distinct EINs, row count, latest year, median revenue, median expenses.  

### Filters panel
- Multi-select: `Tax Year`, `State`.  
- Range sliders: Revenue, Expenses, Contributions, Assets.  
- Boolean: Has PDF.  
- Reset filters button.  

### Main content (tabs)
- **Table**: Paginated, sortable, filter-aware. Columns:  
  `EIN, Name, City, State, Tax Year, Total Revenue, Total Expenses, Total Contributions, Assets End, Comp Current Officers, Other Salary & Wages, PDF URL`.  
  - Currency formatting.  
  - PDF URLs as links.  
  - Row click = Details drawer.  

- **Charts**:  
  - Line: Revenue over Tax Year per EIN (multi-series).  
  - Bar: Top 20 orgs by Revenue (filter-aware).  
  - Scatter: Revenue vs Expenses (size = Assets, color = State).  
  - Stacked bar: Compensation + Wages share of Expenses.  

- **Insights**:  
  - Outliers (see below).  
  - Biggest YoY ↑/↓ in revenue & expenses.  
  - Efficiency ratio = Expenses ÷ Revenue, highlight extremes.  

### Details drawer
- All fields formatted.  
- Mini line charts for EIN across years.  
- Buttons: open PDF, copy EIN.

## Computed Fields
- `has_pdf` = PDF URL not null.  
- `expense_ratio` = Expenses ÷ Revenue.  
- `comp_share_of_exp` = (Comp + Wages) ÷ Expenses.  
- `yoy_revenue_change`, `yoy_expenses_change` (per EIN).  

## Outlier Logic
Flag as outlier if:  
- |z-score| ≥ 2.25 on Revenue or Expenses (within scope).  
- `expense_ratio` > 1.2.  
- YoY Revenue change ≥ 50% **and** ≥ $1M.  
- `comp_share_of_exp` ≥ 0.4.  

Show "Outlier" tag in table and Insights list.

## Saved Views
- Named, shareable (URL state).  
- Prebuilt:  
  - Latest Year Only.  
  - High Growth Orgs.  
  - High Compensation Share.

## Interactions
- Compare up to 5 EINs in charts.  
- Export table to CSV.  
- Copy link to current view.  
- Column show/hide + reorder.

## Validation & Formatting
- Display EIN as 9-digit zero-padded string.  
- USD currency, thousands separators.  
- Tax Year = int.  
- Disabled link icon if PDF missing.  

## Security & Performance
- Read-only.  
- Table: 50 rows/page, virtual scroll >10k.  
- Filters executed server-side.  

## Acceptance Criteria
1. Filterable table.  
2. Charts (line, bar, scatter).  
3. Insights with outliers + YoY deltas.  
4. Details drawer with history charts.  
5. Saved views.  
6. Export + deep-linking.  

## Optional Enhancements
- Route per EIN (`/ein/XX-XXXXXXX`).  
- Table footer totals.  
- Light/dark mode toggle.