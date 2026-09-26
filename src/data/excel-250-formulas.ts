export interface ExcelFormulaItem {
  id: number;
  name: string;
  category: string;
  syntax: string;
  description: string;
}

export const EXCEL_FORMULAS_250: ExcelFormulaItem[] = [
  {
    "name": "TRANSPOSE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TRANSPOSE(array)",
    "description": "Rotates the orientation of an array or range dynamically, converting horizontal rows into vertical columns and vice-versa.",
    "id": 1
  },
  {
    "name": "AREAS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=AREAS(reference)",
    "description": "Returns the number of individual contiguous ranges contained within a multi-range reference (e.g., union ranges like (A1:B5, C1:D5)).",
    "id": 2
  },
  {
    "name": "ROW",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=ROW([reference])",
    "description": "Returns the row number of a specified cell reference; widely used for automated sequential numbering and matrix calculations.",
    "id": 3
  },
  {
    "name": "ROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=ROWS(array)",
    "description": "Returns the total count of rows in a given range or array; essential for dynamic table bounds and array sizing.",
    "id": 4
  },
  {
    "name": "COLUMN",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=COLUMN([reference])",
    "description": "Returns the column number of a given cell reference; used in horizontal indexing and dynamic offset formulas.",
    "id": 5
  },
  {
    "name": "COLUMNS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=COLUMNS(array)",
    "description": "Returns the total number of columns contained within an array or range; commonly used in dynamic matrix lookups.",
    "id": 6
  },
  {
    "name": "VALUE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=VALUE(text)",
    "description": "Converts numbers stored as text strings (e.g., imported from banking portals or ERP billing dumps) into true calculable numbers.",
    "id": 7
  },
  {
    "name": "N",
    "category": "Logical & Decision Modeling",
    "syntax": "=N(value)",
    "description": "Converts non-number values to numbers: numbers return as-is, dates become serial numbers, TRUE becomes 1, and text returns 0.",
    "id": 8
  },
  {
    "name": "NA",
    "category": "Logical & Decision Modeling",
    "syntax": "=NA()",
    "description": "Explicitly generates the #N/A (Not Available) error; widely used in financial charts to prevent lines from dipping to zero on missing data.",
    "id": 9
  },
  {
    "name": "REPT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=REPT(text, number_times)",
    "description": "Repeats a text string a specified number of times; used for creating in-cell mini bar charts (sparklines) and fixed-width file padding.",
    "id": 10
  },
  {
    "name": "T",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=T(value)",
    "description": "Returns the text if the value is text; returns an empty text string (\"\") if the value is a number or boolean, filtering text cleanly.",
    "id": 11
  },
  {
    "name": "BAHTTEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=BAHTTEXT(number)",
    "description": "Converts numbers into spelled Thai Baht currency text; standard in multinational ERP auditing, regional testing, and localization checks.",
    "id": 12
  },
  {
    "name": "TEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXT(value, format_text)",
    "description": "Formats numbers and dates into custom formatted text strings (e.g., '₹#,##,##0.00', 'dd-mmm-yyyy', or 'mmmm') for executive reports.",
    "id": 13
  },
  {
    "name": "CEILING",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=CEILING(number, significance)",
    "description": "Rounds a number upward to the nearest multiple of significance; critical for packaging carton sizing and freight billable weights.",
    "id": 14
  },
  {
    "name": "EFFECT",
    "category": "Corporate Finance & Banking",
    "syntax": "=EFFECT(nominal_rate, npery)",
    "description": "Computes effective annual interest rate from nominal APR compounded multiple times per year (bank CC/OD limits & loan appraisal).",
    "id": 15
  },
  {
    "name": "FLOOR",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=FLOOR(number, significance)",
    "description": "Rounds a number down to the nearest multiple of significance; used in payroll cash denominations and downward inventory unit brackets.",
    "id": 16
  },
  {
    "name": "CODE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CODE(text)",
    "description": "Returns the numeric ASCII code for the first character in a text string; essential for isolating hidden line breaks (10) and non-breaking spaces (160).",
    "id": 17
  },
  {
    "name": "CHAR",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CHAR(number)",
    "description": "Returns the character specified by ASCII code number (e.g., CHAR(10) for in-cell multi-line addresses and CHAR(34) for quotes).",
    "id": 18
  },
  {
    "name": "FIND",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=FIND(find_text, within_text, [start_num])",
    "description": "Locates the exact starting position of a substring with strict case sensitivity; widely used in extracting structured voucher codes and SKU segments.",
    "id": 19
  },
  {
    "name": "SEARCH",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=SEARCH(find_text, within_text, [start_num])",
    "description": "Locates position of a text substring, case-insensitive and supporting wildcards (*, ?); perfect for loose keyword matching in description fields.",
    "id": 20
  },
  {
    "name": "REPLACE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=REPLACE(old_text, start_num, num_chars, new_text)",
    "description": "Replaces a specific portion of text with a new string based on character coordinates (e.g., masking middle digits of bank account or Aadhaar numbers).",
    "id": 21
  },
  {
    "name": "RAND",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=RAND()",
    "description": "Returns an evenly distributed random real number greater than or equal to 0 and less than 1; used for random sampling and simulation modeling.",
    "id": 22
  },
  {
    "name": "RANDBETWEEN",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=RANDBETWEEN(bottom, top)",
    "description": "Generates a random integer between specified lower and upper bounds; standard for test voucher datasets and internal audit sampling.",
    "id": 23
  },
  {
    "name": "FACT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=FACT(number)",
    "description": "Calculates factorial of a number (n!); used in probability permutations, multi-route logistical permutations, and risk modeling.",
    "id": 24
  },
  {
    "name": "FACTDOUBLE",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=FACTDOUBLE(number)",
    "description": "Computes double factorial (n!!) of an integer; used in advanced mathematical series, quantitative finance, and statistical distributions.",
    "id": 25
  },
  {
    "name": "CELL",
    "category": "Logical & Decision Modeling",
    "syntax": "=CELL(info_type, [reference])",
    "description": "Returns metadata about formatting, location, or contents of a cell (e.g., extracting active workbook filepath via 'filename' or number formatting).",
    "id": 26
  },
  {
    "name": "INFO",
    "category": "Logical & Decision Modeling",
    "syntax": "=INFO(type_text)",
    "description": "Returns current operating environment information, Excel version, active recalculation mode, and available memory for spreadsheet diagnostics.",
    "id": 27
  },
  {
    "name": "AGGREGATE",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AGGREGATE(function_num, options, ref1, ...)",
    "description": "Calculates sums, averages, medians, or ranks while automatically ignoring error values (#N/A, #VALUE!) and hidden/filtered rows.",
    "id": 28
  },
  {
    "name": "ERROR.TYPE",
    "category": "Logical & Decision Modeling",
    "syntax": "=ERROR.TYPE(error_val)",
    "description": "Returns a number (1-8) identifying the exact type of Excel error (#NULL!, #DIV/0!, #VALUE!, #REF!, #NAME?, #NUM!, #N/A, #GETTING_DATA).",
    "id": 29
  },
  {
    "name": "GROWTH",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=GROWTH(known_y's, [known_x's], [new_x's], [const])",
    "description": "Calculates predicted exponential growth trend based on existing time-series revenue and customer acquisition history.",
    "id": 30
  },
  {
    "id": 31,
    "name": "XLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    "description": "Modern replacement for VLOOKUP/HLOOKUP; performs two-way lookups and looks left without column counting."
  },
  {
    "id": 32,
    "name": "FILTER",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=FILTER(array, include, [if_empty])",
    "description": "Dynamically filters a range or array based on Boolean criteria; automatically spills matching records."
  },
  {
    "id": 33,
    "name": "UNIQUE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=UNIQUE(array, [by_col], [exactly_once])",
    "description": "Extracts unique distinct items from a range or list; eliminates duplicates dynamically."
  },
  {
    "id": 34,
    "name": "SORT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SORT(array, [sort_index], [sort_order], [by_col])",
    "description": "Sorts the contents of a range or array by specified column index in ascending or descending order."
  },
  {
    "id": 35,
    "name": "SORTBY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SORTBY(array, by_array1, [sort_order1], ...)",
    "description": "Sorts a table or range by values in a secondary independent helper array or criteria column."
  },
  {
    "id": 36,
    "name": "SEQUENCE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SEQUENCE(rows, [columns], [start], [step])",
    "description": "Generates a dynamic array of sequential numbers (e.g., automated serial numbering and date series)."
  },
  {
    "id": 37,
    "name": "RANDARRAY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=RANDARRAY([rows], [columns], [min], [max], [whole_number])",
    "description": "Returns an array of random numbers for simulation, Monte Carlo stress testing, and sample audits."
  },
  {
    "id": 38,
    "name": "INDEX",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=INDEX(array, row_num, [column_num])",
    "description": "Returns the value at a given row and column intersection within a matrix or table."
  },
  {
    "id": 39,
    "name": "MATCH",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=MATCH(lookup_value, lookup_array, [match_type])",
    "description": "Finds relative position (row/column index) of an item in a list or vector."
  },
  {
    "id": 40,
    "name": "XMATCH",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])",
    "description": "Next-generation MATCH supporting exact, wildcard, and reverse bottom-to-top position lookups."
  },
  {
    "id": 41,
    "name": "VLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    "description": "Standard vertical lookup searching the leftmost column for tax codes, party names, and item rates."
  },
  {
    "id": 42,
    "name": "HLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])",
    "description": "Horizontal lookup searching the top row of a table across monthly columnar budget templates."
  },
  {
    "id": 43,
    "name": "LOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=LOOKUP(lookup_value, lookup_vector, [result_vector])",
    "description": "Legacy vector lookup for graded tax slabs, commission brackets, and incentive tiers."
  },
  {
    "id": 44,
    "name": "CHOOSE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSE(index_num, value1, [value2], ...)",
    "description": "Selects a specific value or financial calculation scenario (Worst Case, Base Case, Best Case) from a list."
  },
  {
    "id": 45,
    "name": "CHOOSEROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    "description": "Extracts specific rows from an array or matrix dynamically without helper columns."
  },
  {
    "id": 46,
    "name": "CHOOSECOLS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    "description": "Extracts specific columns (e.g., Invoice No, Party, Net Taxable) from a broad ERP dump."
  },
  {
    "id": 47,
    "name": "DROP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=DROP(array, rows, [columns])",
    "description": "Excludes a specified number of header rows or summary columns from the start or end of an array."
  },
  {
    "id": 48,
    "name": "TAKE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TAKE(array, rows, [columns])",
    "description": "Returns a specified number of top rows (e.g., Top 10 Debtors) or columns from an array."
  },
  {
    "id": 49,
    "name": "EXPAND",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=EXPAND(array, rows, [columns], [pad_with])",
    "description": "Expands an array to specified dimensions, padding blank space with custom values like 'N/A' or 0."
  },
  {
    "id": 50,
    "name": "VSTACK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=VSTACK(array1, [array2], ...)",
    "description": "Vertically stacks multiple ledger sheets or quarterly sales reports into a single consolidated table."
  },
  {
    "id": 51,
    "name": "HSTACK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HSTACK(array1, [array2], ...)",
    "description": "Horizontally appends multiple adjacent columnar arrays together into one unified dataset."
  },
  {
    "id": 52,
    "name": "TOCOL",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TOCOL(array, [ignore], [scan_by_column])",
    "description": "Transforms a 2D multi-column table into a single continuous vertical column for pivot analysis."
  },
  {
    "id": 53,
    "name": "TOROW",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TOROW(array, [ignore], [scan_by_column])",
    "description": "Flattens a 2D matrix into a single horizontal row."
  },
  {
    "id": 54,
    "name": "WRAPROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=WRAPROWS(vector, wrap_count, [pad_with])",
    "description": "Wraps a 1D vertical list into a 2D table by row at specified item intervals."
  },
  {
    "id": 55,
    "name": "WRAPCOLS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=WRAPCOLS(vector, wrap_count, [pad_with])",
    "description": "Wraps a 1D horizontal vector into a 2D columnar matrix."
  },
  {
    "id": 56,
    "name": "OFFSET",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=OFFSET(reference, rows, cols, [height], [width])",
    "description": "Returns a dynamic reference range shifted by a specified number of rows and columns."
  },
  {
    "id": 57,
    "name": "INDIRECT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=INDIRECT(ref_text, [a1])",
    "description": "Converts a text string into an active cell reference for dynamic multi-sheet rollups."
  },
  {
    "id": 58,
    "name": "ADDRESS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])",
    "description": "Generates a cell address text string based on specified row and column coordinates."
  },
  {
    "id": 59,
    "name": "HYPERLINK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HYPERLINK(link_location, [friendly_name])",
    "description": "Creates clickable navigation shortcuts to invoice PDF folders, portal URLs, and sheet tabs."
  },
  {
    "id": 60,
    "name": "FORMULATEXT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=FORMULATEXT(reference)",
    "description": "Extracts formula syntax as readable plain text for audit verification and model documentation."
  },
  {
    "id": 61,
    "name": "PMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PMT(rate, nper, pv, [fv], [type])",
    "description": "Computes fixed monthly EMI installment for bank term loans, car loans, and machinery leases."
  },
  {
    "id": 62,
    "name": "IPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=IPMT(rate, per, nper, pv, [fv], [type])",
    "description": "Calculates interest portion of a loan installment for a specific period for tax deduction."
  },
  {
    "id": 63,
    "name": "PPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PPMT(rate, per, nper, pv, [fv], [type])",
    "description": "Calculates principal repayment component for a specific loan payment period."
  },
  {
    "id": 64,
    "name": "CUMIPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=CUMIPMT(rate, nper, pv, start_period, end_period, type)",
    "description": "Computes cumulative interest paid between two financial periods for yearly balance sheet notes."
  },
  {
    "id": 65,
    "name": "CUMPRINC",
    "category": "Corporate Finance & Banking",
    "syntax": "=CUMPRINC(rate, nper, pv, start_period, end_period, type)",
    "description": "Computes cumulative principal repaid across a financial year for loan liability reduction."
  },
  {
    "id": 66,
    "name": "NPER",
    "category": "Corporate Finance & Banking",
    "syntax": "=NPER(rate, pmt, pv, [fv], [type])",
    "description": "Returns number of repayment periods required to amortize a loan or reach an investment target."
  },
  {
    "id": 67,
    "name": "RATE",
    "category": "Corporate Finance & Banking",
    "syntax": "=RATE(nper, pmt, pv, [fv], [type], [guess])",
    "description": "Derives effective periodic interest rate of a loan or annuity investment."
  },
  {
    "id": 68,
    "name": "PV",
    "category": "Corporate Finance & Banking",
    "syntax": "=PV(rate, nper, pmt, [fv], [type])",
    "description": "Computes present discounted value of future cash flow streams or bond investments."
  },
  {
    "id": 69,
    "name": "FV",
    "category": "Corporate Finance & Banking",
    "syntax": "=FV(rate, nper, pmt, [pv], [type])",
    "description": "Computes future compounded value of recurring investments (sinking funds, gratuity reserves)."
  },
  {
    "id": 70,
    "name": "NPV",
    "category": "Corporate Finance & Banking",
    "syntax": "=NPV(rate, value1, [value2], ...)",
    "description": "Calculates Net Present Value of periodic investment cash flows at a specified discount hurdle rate."
  },
  {
    "id": 71,
    "name": "XNPV",
    "category": "Corporate Finance & Banking",
    "syntax": "=XNPV(rate, values, dates)",
    "description": "Computes Net Present Value for irregular, non-periodic project cash flows using exact calendar transaction dates."
  },
  {
    "id": 72,
    "name": "IRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=IRR(values, [guess])",
    "description": "Derives Internal Rate of Return for periodic cash flow projections."
  },
  {
    "id": 73,
    "name": "XIRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=XIRR(values, dates, [guess])",
    "description": "Gold standard for annualized return calculation across irregular investment dates and capital drawdowns."
  },
  {
    "id": 74,
    "name": "MIRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=MIRR(values, finance_rate, reinvest_rate)",
    "description": "Modified Internal Rate of Return assuming realistic reinvestment rates on positive cash flows."
  },
  {
    "id": 75,
    "name": "PRICE",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICE(settlement, maturity, rate, yld, redemption, frequency, [basis])",
    "description": "Computes price per ₹100 face value of coupon-paying corporate bonds or government securities."
  },
  {
    "id": 76,
    "name": "YIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])",
    "description": "Returns annual yield on fixed-income securities and treasury debt papers."
  },
  {
    "id": 77,
    "name": "DURATION",
    "category": "Corporate Finance & Banking",
    "syntax": "=DURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    "description": "Calculates Macaulay duration to measure debt portfolio sensitivity to interest rate shifts."
  },
  {
    "id": 78,
    "name": "MDURATION",
    "category": "Corporate Finance & Banking",
    "syntax": "=MDURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    "description": "Calculates Modified Duration measuring percentage price change for a 1% yield shift."
  },
  {
    "id": 79,
    "name": "ACCRINT",
    "category": "Corporate Finance & Banking",
    "syntax": "=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis])",
    "description": "Computes accrued interest on bonds from issue date to settlement date."
  },
  {
    "id": 80,
    "name": "NOMINAL",
    "category": "Corporate Finance & Banking",
    "syntax": "=NOMINAL(effect_rate, npery)",
    "description": "Converts effective annual yield into nominal APR for loan agreements and credit quotes."
  },
  {
    "id": 81,
    "name": "SLN",
    "category": "Corporate Finance & Banking",
    "syntax": "=SLN(cost, salvage, life)",
    "description": "Calculates straight-line depreciation per period for corporate fixed asset registers."
  },
  {
    "id": 82,
    "name": "DB",
    "category": "Corporate Finance & Banking",
    "syntax": "=DB(cost, salvage, life, period, [month])",
    "description": "Calculates declining balance depreciation using fixed-percentage method for statutory books."
  },
  {
    "id": 83,
    "name": "DDB",
    "category": "Corporate Finance & Banking",
    "syntax": "=DDB(cost, salvage, life, period, [factor])",
    "description": "Computes double-declining balance accelerated depreciation for rapid tech asset write-offs."
  },
  {
    "id": 84,
    "name": "SYD",
    "category": "Corporate Finance & Banking",
    "syntax": "=SYD(cost, salvage, life, per)",
    "description": "Sum-of-Years' Digits depreciation allocating higher wear-and-tear in initial operating years."
  },
  {
    "id": 85,
    "name": "VDB",
    "category": "Corporate Finance & Banking",
    "syntax": "=VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])",
    "description": "Variable declining balance depreciation for partial-year machinery capitalization."
  },
  {
    "id": 86,
    "name": "DISC",
    "category": "Corporate Finance & Banking",
    "syntax": "=DISC(settlement, maturity, pr, redemption, [basis])",
    "description": "Calculates discount rate for zero-coupon commercial papers and treasury bills."
  },
  {
    "id": 87,
    "name": "PRICEDISC",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICEDISC(settlement, maturity, discount, redemption, [basis])",
    "description": "Computes purchase price of a discounted debt instrument per ₹100 face value."
  },
  {
    "id": 88,
    "name": "RECEIVED",
    "category": "Corporate Finance & Banking",
    "syntax": "=RECEIVED(settlement, maturity, investment, discount, [basis])",
    "description": "Calculates total amount received at maturity for a fully discounted security."
  },
  {
    "id": 89,
    "name": "INTRATE",
    "category": "Corporate Finance & Banking",
    "syntax": "=INTRATE(settlement, maturity, investment, redemption, [basis])",
    "description": "Returns annualized interest rate for a fully invested fixed-income instrument."
  },
  {
    "id": 90,
    "name": "SUM",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUM(number1, [number2], ...)",
    "description": "Basic summation of numerical ranges, sales ledgers, and debit/credit columns."
  },
  {
    "id": 91,
    "name": "SUMIF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMIF(range, criteria, [sum_range])",
    "description": "Sums cell values meeting a single condition (e.g., total sales of a single brand)."
  },
  {
    "id": 92,
    "name": "SUMIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
    "description": "Sums values meeting multiple criteria (Branch = Jaipur, Month = May, Rate > 18%)."
  },
  {
    "id": 93,
    "name": "SUMPRODUCT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMPRODUCT(array1, [array2], ...)",
    "description": "Multiplies corresponding arrays and sums results (Unit Price × Quantity across items)."
  },
  {
    "id": 94,
    "name": "SUBTOTAL",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUBTOTAL(function_num, ref1, ...)",
    "description": "Calculates summary metrics (Sum, Average, Count) exclusively on visible rows in filtered tables."
  },
  {
    "id": 95,
    "name": "COUNT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNT(value1, [value2], ...)",
    "description": "Counts total cells containing numerical values within a ledger range."
  },
  {
    "id": 96,
    "name": "COUNTA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTA(value1, [value2], ...)",
    "description": "Counts all non-blank cells containing numbers, text, dates, or error codes."
  },
  {
    "id": 97,
    "name": "COUNTBLANK",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTBLANK(range)",
    "description": "Counts blank cells in mandatory compliance fields (Missing GSTINs or PAN numbers)."
  },
  {
    "id": 98,
    "name": "COUNTIF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTIF(range, criteria)",
    "description": "Counts instances meeting a condition (number of invoices exceeding ₹1,00,000)."
  },
  {
    "id": 99,
    "name": "COUNTIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTIFS(criteria_range1, criteria1, ...)",
    "description": "Counts records satisfying multiple simultaneous business conditions."
  },
  {
    "id": 100,
    "name": "AVERAGE",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGE(number1, [number2], ...)",
    "description": "Computes arithmetic mean of a series of financial values or unit purchase rates."
  },
  {
    "id": 101,
    "name": "AVERAGEIF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGEIF(range, criteria, [average_range])",
    "description": "Calculates average value for entries matching a single condition."
  },
  {
    "id": 102,
    "name": "AVERAGEIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)",
    "description": "Calculates average for rows satisfying multiple simultaneous filters."
  },
  {
    "id": 103,
    "name": "MEDIAN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MEDIAN(number1, [number2], ...)",
    "description": "Returns statistical median value, resilient against abnormal extreme transaction outliers."
  },
  {
    "id": 104,
    "name": "MODE.SNGL",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MODE.SNGL(number1, [number2], ...)",
    "description": "Identifies most frequently occurring order size, price point, or discount tier."
  },
  {
    "id": 105,
    "name": "ROUND",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ROUND(number, num_digits)",
    "description": "Rounds a financial number to a specified number of decimal digits."
  },
  {
    "id": 106,
    "name": "ROUNDUP",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ROUNDUP(number, num_digits)",
    "description": "Rounds numbers upward away from zero (used for packaging cartons and freight billable weights)."
  },
  {
    "id": 107,
    "name": "ROUNDDOWN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ROUNDDOWN(number, num_digits)",
    "description": "Rounds numbers downward toward zero (used for conservative accrual provisioning)."
  },
  {
    "id": 108,
    "name": "MROUND",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MROUND(number, multiple)",
    "description": "Rounds a number to nearest specified multiple (e.g., nearest ₹10 or ₹50 denomination)."
  },
  {
    "id": 109,
    "name": "CEILING.MATH",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=CEILING.MATH(number, [significance], [mode])",
    "description": "Rounds a number up to the nearest multiple of significance."
  },
  {
    "id": 110,
    "name": "FLOOR.MATH",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=FLOOR.MATH(number, [significance], [mode])",
    "description": "Rounds a number down to the nearest multiple of significance."
  },
  {
    "id": 111,
    "name": "INT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=INT(number)",
    "description": "Rounds a number down to the nearest whole integer, truncating decimal fractions."
  },
  {
    "id": 112,
    "name": "TRUNC",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=TRUNC(number, [num_digits])",
    "description": "Truncates a number to a specified precision without mathematical rounding."
  },
  {
    "id": 113,
    "name": "ABS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ABS(number)",
    "description": "Returns absolute positive magnitude of a number, stripping negative signs for variance analysis."
  },
  {
    "id": 114,
    "name": "MOD",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MOD(number, divisor)",
    "description": "Returns the remainder after integer division (used for batch allocations and alternate row formatting)."
  },
  {
    "id": 115,
    "name": "POWER",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=POWER(number, power)",
    "description": "Raises a base number to a specified exponential power for CAGR compounding calculations."
  },
  {
    "id": 116,
    "name": "SQRT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SQRT(number)",
    "description": "Calculates square root (Economic Order Quantity EOQ and safety stock modeling)."
  },
  {
    "id": 117,
    "name": "PRODUCT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=PRODUCT(number1, [number2], ...)",
    "description": "Multiplies all numbers given as arguments."
  },
  {
    "id": 118,
    "name": "QUOTIENT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=QUOTIENT(numerator, denominator)",
    "description": "Returns integer portion of division without fractional remainder."
  },
  {
    "id": 119,
    "name": "LARGE",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=LARGE(array, k)",
    "description": "Returns k-th largest value (Top 3 largest sales invoices or Top 5 overdue balances)."
  },
  {
    "id": 120,
    "name": "SMALL",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SMALL(array, k)",
    "description": "Returns k-th smallest value (lowest vendor quotation or minimum order quantity)."
  },
  {
    "id": 121,
    "name": "RANK.EQ",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=RANK.EQ(number, ref, [order])",
    "description": "Assigns numerical rank to a value within a comparative dataset."
  },
  {
    "id": 122,
    "name": "MAXIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MAXIFS(max_range, criteria_range1, criteria1, ...)",
    "description": "Returns maximum value meeting multiple criteria (highest single billing for client X)."
  },
  {
    "id": 123,
    "name": "MINIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MINIFS(min_range, criteria_range1, criteria1, ...)",
    "description": "Returns minimum value satisfying multiple specific business constraints."
  },
  {
    "id": 124,
    "name": "TEXTSPLIT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])",
    "description": "Splits a text string across columns and rows using specified delimiters (e.g., splitting Address into City, State, PIN)."
  },
  {
    "id": 125,
    "name": "TEXTBEFORE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    "description": "Extracts all characters before a specified delimiter (extracting invoice prefix before slash)."
  },
  {
    "id": 126,
    "name": "TEXTAFTER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    "description": "Extracts all characters after a delimiter (extracting invoice serial number after slash)."
  },
  {
    "id": 127,
    "name": "TEXTJOIN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)",
    "description": "Combines multiple strings with a separator, skipping empty cells (concatenating item lists)."
  },
  {
    "id": 128,
    "name": "CONCAT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CONCAT(text1, [text2], ...)",
    "description": "Joins multiple text ranges and cell arrays together without delimiter."
  },
  {
    "id": 129,
    "name": "CONCATENATE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CONCATENATE(text1, [text2], ...)",
    "description": "Legacy string joining function used to construct composite primary keys."
  },
  {
    "id": 130,
    "name": "TRIM",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TRIM(text)",
    "description": "Strips leading, trailing, and excessive internal spaces from messy ERP text dumps."
  },
  {
    "id": 131,
    "name": "CLEAN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CLEAN(text)",
    "description": "Removes non-printable ASCII control characters (0-31) imported from legacy software exports."
  },
  {
    "id": 132,
    "name": "EXACT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=EXACT(text1, text2)",
    "description": "Tests exact case-sensitive equality between two text strings for secure code matching."
  },
  {
    "id": 133,
    "name": "LEN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LEN(text)",
    "description": "Returns total character count of a text string (validates 15-digit GSTINs and 10-digit PANs)."
  },
  {
    "id": 134,
    "name": "LEFT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LEFT(text, [num_chars])",
    "description": "Extracts a specified number of characters starting from the far left of a string."
  },
  {
    "id": 135,
    "name": "RIGHT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=RIGHT(text, [num_chars])",
    "description": "Extracts characters from the far right end of a text string (last 4 digits of bank account)."
  },
  {
    "id": 136,
    "name": "MID",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=MID(text, start_num, num_chars)",
    "description": "Extracts a substring of characters from any position inside a text string."
  },
  {
    "id": 137,
    "name": "SUBSTITUTE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
    "description": "Replaces specific instances of target text with new text (replacing hyphens with slashes)."
  },
  {
    "id": 138,
    "name": "LOWER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LOWER(text)",
    "description": "Converts text to all lowercase characters for standardized email and code matching."
  },
  {
    "id": 139,
    "name": "UPPER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UPPER(text)",
    "description": "Converts text to all uppercase characters for statutory tax filings (PAN, GSTIN, TAN)."
  },
  {
    "id": 140,
    "name": "PROPER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=PROPER(text)",
    "description": "Capitalizes first letter of every word for professional party name formatting."
  },
  {
    "id": 141,
    "name": "NUMBERVALUE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=NUMBERVALUE(text, [decimal_separator], [group_separator])",
    "description": "Converts text numbers with international comma/period decimal formats into Excel numbers."
  },
  {
    "id": 142,
    "name": "UNICHAR",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UNICHAR(number)",
    "description": "Returns Unicode character represented by numeric value (currency symbols, status icons)."
  },
  {
    "id": 143,
    "name": "UNICODE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UNICODE(text)",
    "description": "Returns Unicode code point corresponding to the first character of text."
  },
  {
    "id": 144,
    "name": "FIXED",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=FIXED(number, [decimals], [no_commas])",
    "description": "Formats number with fixed decimal places and optional thousand commas as text."
  },
  {
    "id": 145,
    "name": "DOLLAR",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=DOLLAR(number, [decimals])",
    "description": "Formats number as currency text string with currency formatting."
  },
  {
    "id": 146,
    "name": "ARRAYTOTEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=ARRAYTOTEXT(array, [format])",
    "description": "Converts an array of values into a single comma-separated text string."
  },
  {
    "id": 147,
    "name": "VALUETOTEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=VALUETOTEXT(value, [format])",
    "description": "Converts any cell value or formula result into readable text format."
  },
  {
    "id": 148,
    "name": "REPT_PAD",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LEFT(text&REPT(' ', 20), 20)",
    "description": "Specialized string padding idiom used for fixed-width bank NEFT upload files."
  },
  {
    "id": 149,
    "name": "TODAY",
    "category": "Date & Time Intelligence",
    "syntax": "=TODAY()",
    "description": "Returns current system date; dynamically updates every time spreadsheet recalculates."
  },
  {
    "id": 150,
    "name": "NOW",
    "category": "Date & Time Intelligence",
    "syntax": "=NOW()",
    "description": "Returns current system date and exact clock time; used for timestamping voucher audit logs."
  },
  {
    "id": 151,
    "name": "DATE",
    "category": "Date & Time Intelligence",
    "syntax": "=DATE(year, month, day)",
    "description": "Constructs a valid Excel calendar date serial from independent year, month, and day integers."
  },
  {
    "id": 152,
    "name": "DATEVALUE",
    "category": "Date & Time Intelligence",
    "syntax": "=DATEVALUE(date_text)",
    "description": "Converts date entered as text (e.g., '25/12/2025') into valid Excel date serial."
  },
  {
    "id": 153,
    "name": "DAY",
    "category": "Date & Time Intelligence",
    "syntax": "=DAY(serial_number)",
    "description": "Extracts day of the month (1-31) from a date serial."
  },
  {
    "id": 154,
    "name": "MONTH",
    "category": "Date & Time Intelligence",
    "syntax": "=MONTH(serial_number)",
    "description": "Extracts month number (1-12) from a date for monthly MIS grouping."
  },
  {
    "id": 155,
    "name": "YEAR",
    "category": "Date & Time Intelligence",
    "syntax": "=YEAR(serial_number)",
    "description": "Extracts 4-digit calendar year from a date."
  },
  {
    "id": 156,
    "name": "EDATE",
    "category": "Date & Time Intelligence",
    "syntax": "=EDATE(start_date, months)",
    "description": "Adds or subtracts an exact number of calendar months (loan maturity and warranty expiry)."
  },
  {
    "id": 157,
    "name": "EOMONTH",
    "category": "Date & Time Intelligence",
    "syntax": "=EOMONTH(start_date, months)",
    "description": "Returns exact final day of the month n months in past or future (GST/TDS statutory due dates)."
  },
  {
    "id": 158,
    "name": "NETWORKDAYS",
    "category": "Date & Time Intelligence",
    "syntax": "=NETWORKDAYS(start_date, end_date, [holidays])",
    "description": "Computes total working days between two dates, automatically excluding weekends and listed holidays."
  },
  {
    "id": 159,
    "name": "NETWORKDAYS.INTL",
    "category": "Date & Time Intelligence",
    "syntax": "=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])",
    "description": "Computes working days with custom weekend patterns (e.g., 6-day corporate work weeks)."
  },
  {
    "id": 160,
    "name": "WORKDAY",
    "category": "Date & Time Intelligence",
    "syntax": "=WORKDAY(start_date, days, [holidays])",
    "description": "Returns calendar completion date after adding a given number of working business days."
  },
  {
    "id": 161,
    "name": "WORKDAY.INTL",
    "category": "Date & Time Intelligence",
    "syntax": "=WORKDAY.INTL(start_date, days, [weekend], [holidays])",
    "description": "Calculates delivery target date considering customized organizational holidays."
  },
  {
    "id": 162,
    "name": "DAYS",
    "category": "Date & Time Intelligence",
    "syntax": "=DAYS(end_date, start_date)",
    "description": "Returns total count of days between two dates for debtor credit period tracking."
  },
  {
    "id": 163,
    "name": "DAYS360",
    "category": "Date & Time Intelligence",
    "syntax": "=DAYS360(start_date, end_date, [method])",
    "description": "Computes day count based on standard 360-day commercial accounting year (12 × 30-day months)."
  },
  {
    "id": 164,
    "name": "DATEDIF",
    "category": "Date & Time Intelligence",
    "syntax": "=DATEDIF(start_date, end_date, unit)",
    "description": "Calculates difference between two dates in completed years ('Y'), months ('M'), or days ('D')."
  },
  {
    "id": 165,
    "name": "YEARFRAC",
    "category": "Date & Time Intelligence",
    "syntax": "=YEARFRAC(start_date, end_date, [basis])",
    "description": "Returns fractional portion of year elapsed between two dates for pro-rata interest and depreciation."
  },
  {
    "id": 166,
    "name": "TIME",
    "category": "Date & Time Intelligence",
    "syntax": "=TIME(hour, minute, second)",
    "description": "Constructs a valid Excel time value from independent hour, minute, and second numbers."
  },
  {
    "id": 167,
    "name": "TIMEVALUE",
    "category": "Date & Time Intelligence",
    "syntax": "=TIMEVALUE(time_text)",
    "description": "Converts time stored as text string (e.g., '09:30 AM') into decimal fraction of day."
  },
  {
    "id": 168,
    "name": "HOUR",
    "category": "Date & Time Intelligence",
    "syntax": "=HOUR(serial_number)",
    "description": "Extracts hour (0-23) from time serial for factory machine shift analysis."
  },
  {
    "id": 169,
    "name": "MINUTE",
    "category": "Date & Time Intelligence",
    "syntax": "=MINUTE(serial_number)",
    "description": "Extracts minute (0-59) from time stamp."
  },
  {
    "id": 170,
    "name": "SECOND",
    "category": "Date & Time Intelligence",
    "syntax": "=SECOND(serial_number)",
    "description": "Extracts second (0-59) from time stamp."
  },
  {
    "id": 171,
    "name": "WEEKNUM",
    "category": "Date & Time Intelligence",
    "syntax": "=WEEKNUM(serial_number, [return_type])",
    "description": "Returns calendar week number of the year (1-53) for weekly sales velocity reports."
  },
  {
    "id": 172,
    "name": "ISOWEEKNUM",
    "category": "Date & Time Intelligence",
    "syntax": "=ISOWEEKNUM(date)",
    "description": "Returns ISO-8601 standard week number of the year for export logistics."
  },
  {
    "id": 173,
    "name": "WEEKDAY",
    "category": "Date & Time Intelligence",
    "syntax": "=WEEKDAY(serial_number, [return_type])",
    "description": "Returns day of the week (1 for Sunday to 7 for Saturday) for retail footfall patterns."
  },
  {
    "id": 174,
    "name": "DATE_TEXT_DDMMMYYYY",
    "category": "Date & Time Intelligence",
    "syntax": "=TEXT(date, 'dd-mmm-yyyy')",
    "description": "Standardizes invoice dates into non-ambiguous Indian business format ('15-Aug-2025')."
  },
  {
    "id": 175,
    "name": "DATE_TEXT_MONTHNAME",
    "category": "Date & Time Intelligence",
    "syntax": "=TEXT(date, 'mmmm')",
    "description": "Converts date into full spelled month name (e.g., 'September') for summary headers."
  },
  {
    "id": 176,
    "name": "DATE_TEXT_DAYNAME",
    "category": "Date & Time Intelligence",
    "syntax": "=TEXT(date, 'dddd')",
    "description": "Extracts day of the week text (e.g., 'Monday') to detect weekend transaction anomalies."
  },
  {
    "id": 177,
    "name": "FINANCIAL_YEAR",
    "category": "Date & Time Intelligence",
    "syntax": "=IF(MONTH(A2)>=4, YEAR(A2)&'-'&RIGHT(YEAR(A2)+1,2), YEAR(A2)-1&'-'&RIGHT(YEAR(A2),2))",
    "description": "Dynamically derives Indian Financial Year (e.g., '2025-26') from any transaction date."
  },
  {
    "id": 178,
    "name": "QUARTER_CALC",
    "category": "Date & Time Intelligence",
    "syntax": "='Q'&ROUNDUP(MONTH(EDATE(A2,-3))/3,0)",
    "description": "Computes Indian Financial Quarter (Q1: Apr-Jun, Q2: Jul-Sep, Q3: Oct-Dec, Q4: Jan-Mar)."
  },
  {
    "id": 179,
    "name": "IF",
    "category": "Logical & Decision Modeling",
    "syntax": "=IF(logical_test, value_if_true, [value_if_false])",
    "description": "Fundamental decision formula evaluating conditions and branching calculations accordingly."
  },
  {
    "id": 180,
    "name": "IFS",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFS(logical_test1, value_if_true1, ...)",
    "description": "Evaluates multiple sequential conditions without nesting multiple IF statements."
  },
  {
    "id": 181,
    "name": "SWITCH",
    "category": "Logical & Decision Modeling",
    "syntax": "=SWITCH(expression, value1, result1, [default])",
    "description": "Evaluates an expression against a list of exact matches and returns corresponding result."
  },
  {
    "id": 182,
    "name": "AND",
    "category": "Logical & Decision Modeling",
    "syntax": "=AND(logical1, [logical2], ...)",
    "description": "Returns TRUE only if all combined arguments evaluate to TRUE."
  },
  {
    "id": 183,
    "name": "OR",
    "category": "Logical & Decision Modeling",
    "syntax": "=OR(logical1, [logical2], ...)",
    "description": "Returns TRUE if at least one of the conditions evaluates to TRUE."
  },
  {
    "id": 184,
    "name": "NOT",
    "category": "Logical & Decision Modeling",
    "syntax": "=NOT(logical)",
    "description": "Reverses logical state: turns TRUE into FALSE and FALSE into TRUE."
  },
  {
    "id": 185,
    "name": "XOR",
    "category": "Logical & Decision Modeling",
    "syntax": "=XOR(logical1, [logical2], ...)",
    "description": "Logical exclusive OR: returns TRUE if an odd number of conditions are TRUE."
  },
  {
    "id": 186,
    "name": "IFERROR",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFERROR(value, value_if_error)",
    "description": "Traps calculation errors (#N/A, #DIV/0!, #VALUE!) and returns clean fallback (0 or 'Pending')."
  },
  {
    "id": 187,
    "name": "IFNA",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFNA(value, value_if_na)",
    "description": "Specifically traps lookup #N/A errors while allowing other critical syntax errors to surface."
  },
  {
    "id": 188,
    "name": "ISBLANK",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISBLANK(value)",
    "description": "Checks if cell is completely empty; returns TRUE/FALSE for data audit checklists."
  },
  {
    "id": 189,
    "name": "ISNUMBER",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISNUMBER(value)",
    "description": "Verifies if cell contents are valid numbers before performing mathematical operations."
  },
  {
    "id": 190,
    "name": "ISTEXT",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISTEXT(value)",
    "description": "Verifies if cell contains text string rather than numerical value."
  },
  {
    "id": 191,
    "name": "ISNONTEXT",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISNONTEXT(value)",
    "description": "Returns TRUE if cell does not contain text (numbers, blanks, or booleans)."
  },
  {
    "id": 192,
    "name": "ISERROR",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISERROR(value)",
    "description": "Tests if cell contains any Excel error code (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!)."
  },
  {
    "id": 193,
    "name": "ISERR",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISERR(value)",
    "description": "Tests for any error excluding #N/A."
  },
  {
    "id": 194,
    "name": "ISNA",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISNA(value)",
    "description": "Checks specifically for missing lookup #N/A error."
  },
  {
    "id": 195,
    "name": "ISREF",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISREF(value)",
    "description": "Tests whether an argument is a valid cell reference rather than a literal value."
  },
  {
    "id": 196,
    "name": "ISLOGICAL",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISLOGICAL(value)",
    "description": "Tests if cell contains Boolean TRUE or FALSE value."
  },
  {
    "id": 197,
    "name": "ISEVEN",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISEVEN(number)",
    "description": "Returns TRUE if integer number is even (used for split alternating reconciliations)."
  },
  {
    "id": 198,
    "name": "ISODD",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISODD(number)",
    "description": "Returns TRUE if integer number is odd."
  },
  {
    "id": 199,
    "name": "ISFORMULA",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISFORMULA(reference)",
    "description": "Audits spreadsheet cells to distinguish hardcoded entered values from dynamic formulas."
  },
  {
    "id": 200,
    "name": "TRUE",
    "category": "Logical & Decision Modeling",
    "syntax": "=TRUE()",
    "description": "Returns logical value TRUE for Boolean flags."
  },
  {
    "id": 201,
    "name": "FALSE",
    "category": "Logical & Decision Modeling",
    "syntax": "=FALSE()",
    "description": "Returns logical value FALSE."
  },
  {
    "id": 202,
    "name": "DELTA",
    "category": "Logical & Decision Modeling",
    "syntax": "=DELTA(number1, [number2])",
    "description": "Tests whether two values are strictly equal; returns 1 if equal and 0 otherwise."
  },
  {
    "id": 203,
    "name": "GESTEP",
    "category": "Logical & Decision Modeling",
    "syntax": "=GESTEP(number, [step])",
    "description": "Step function returning 1 if number is greater than or equal to step threshold, else 0."
  },
  {
    "id": 204,
    "name": "CHOOSE_NESTED",
    "category": "Logical & Decision Modeling",
    "syntax": "=CHOOSE(MATCH(status, {'Pending','Approved','Rejected'}, 0), 10, 20, 30)",
    "description": "Combined logical router returning distinct weights."
  },
  {
    "id": 205,
    "name": "MAP_CONDITION",
    "category": "Logical & Decision Modeling",
    "syntax": "=MAP(range, LAMBDA(x, IF(x>100000, 'High', 'Normal')))",
    "description": "Applies inline logical classification across entire column range."
  },
  {
    "id": 206,
    "name": "BOOLEAN_MULTIPLY",
    "category": "Logical & Decision Modeling",
    "syntax": "=SUM((status='Approved')*(amount>50000))",
    "description": "Modern Boolean array multiplication replacing legacy multi-IF formulas."
  },
  {
    "id": 207,
    "name": "COALESCE_EXCEL",
    "category": "Logical & Decision Modeling",
    "syntax": "=IF(A2<>'', A2, IF(B2<>'', B2, C2))",
    "description": "Excel implementation of SQL COALESCE returning first non-empty value."
  },
  {
    "id": 208,
    "name": "LET",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LET(name1, val1, [name2, val2], calculation)",
    "description": "Defines named variables inside a formula; dramatically speeds up calculation and simplifies complex logic."
  },
  {
    "id": 209,
    "name": "LAMBDA",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LAMBDA([param1, param2, ...], calculation)",
    "description": "Creates custom reusable functions without VBA or macros."
  },
  {
    "id": 210,
    "name": "MAP",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=MAP(array1, [array2], LAMBDA(x, [y], calculation))",
    "description": "Applies a LAMBDA function to every element in an array and returns an array of results."
  },
  {
    "id": 211,
    "name": "REDUCE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REDUCE([initial_value], array, LAMBDA(accumulator, current_val, calculation))",
    "description": "Accumulates values across an array using custom logic (custom running totals or string aggregations)."
  },
  {
    "id": 212,
    "name": "SCAN",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=SCAN([initial_value], array, LAMBDA(accumulator, current_val, calculation))",
    "description": "Generates a running intermediate array of accumulated values (e.g., running bank balance)."
  },
  {
    "id": 213,
    "name": "BYROW",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=BYROW(array, LAMBDA(row, calculation))",
    "description": "Applies calculation to each individual row of an array and returns vertical result column."
  },
  {
    "id": 214,
    "name": "BYCOL",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=BYCOL(array, LAMBDA(column, calculation))",
    "description": "Applies calculation to each column of an array and returns horizontal summary row."
  },
  {
    "id": 215,
    "name": "MAKEARRAY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=MAKEARRAY(rows, cols, LAMBDA(r, c, calculation))",
    "description": "Generates a calculated 2D array of specified rows and columns based on custom coordinates."
  },
  {
    "id": 216,
    "name": "ISOMITTED",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=ISOMITTED(parameter)",
    "description": "Checks if an optional argument was omitted in a custom LAMBDA function call."
  },
  {
    "id": 217,
    "name": "REGEXEXTRACT",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REGEXEXTRACT(text, pattern, [return_mode], [case_sensitivity])",
    "description": "Modern Excel 365 regular expression engine extracting PAN, GSTIN, and emails."
  },
  {
    "id": 218,
    "name": "REGEXREPLACE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REGEXREPLACE(text, pattern, replacement, [occurrence], [case_sensitivity])",
    "description": "Replaces patterns matching regular expressions in bulk data cleaning."
  },
  {
    "id": 219,
    "name": "REGEXMATCH",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REGEXMATCH(text, pattern, [case_sensitivity])",
    "description": "Validates text format compliance using regex patterns (verifying phone number formats)."
  },
  {
    "id": 220,
    "name": "GROUPBY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=GROUPBY(row_fields, values, function, [headers], [total_depth], [sort_order], [filter_array])",
    "description": "Modern formula-based pivot engine grouping rows and aggregating metrics without creating Pivot Tables."
  },
  {
    "id": 221,
    "name": "PIVOTBY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=PIVOTBY(row_fields, col_fields, values, function, [headers], [row_total_depth], ...)",
    "description": "Generates complete multi-dimensional cross-tabulated matrix purely via a dynamic formula."
  },
  {
    "id": 222,
    "name": "PERCENTOF",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=PERCENTOF(data_subset, all_data)",
    "description": "Calculates the percentage proportion of a subset relative to total sum."
  },
  {
    "id": 223,
    "name": "EVALUATE_LAMBDA",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LAMBDA(str, ...)",
    "description": "Dynamic execution engine pattern evaluating string expressions."
  },
  {
    "id": 224,
    "name": "SINGLE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=SINGLE(reference)",
    "description": "Implicit intersection operator returning a single cell value from a range."
  },
  {
    "id": 225,
    "name": "ANCHORARRAY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=A1#",
    "description": "Spill range reference operator targeting the entire dynamic spilled output of formula in A1."
  },
  {
    "id": 226,
    "name": "SPILL_TEST",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=IF(ISREF(A1#), 'Spilled', 'Single')",
    "description": "Verifies dynamic array spill behavior to prevent #SPILL! collision errors."
  },
  {
    "id": 227,
    "name": "CUBEVALUE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBEVALUE(connection, [member_expression1], ...)",
    "description": "Extracts consolidated KPI metrics directly from SQL Analysis Services or Power Pivot Data Model."
  },
  {
    "id": 228,
    "name": "CUBEMEMBER",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBEMEMBER(connection, member_expression, [caption])",
    "description": "Validates and extracts dimensional hierarchy members from an OLAP cube."
  },
  {
    "id": 229,
    "name": "CUBESET",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBESET(connection, set_expression, [caption], [sort_order], [sort_by])",
    "description": "Defines a calculated set of members from data model for high-speed executive dashboards."
  },
  {
    "id": 230,
    "name": "CUBEKPIMEMBER",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBEKPIMEMBER(connection, kpi_name, kpi_property, [caption])",
    "description": "Extracts KPI status indicators (Goal, Value, Status) from financial models."
  },
  {
    "id": 231,
    "name": "CUBERANKEDMEMBER",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBERANKEDMEMBER(connection, set_expression, rank, [caption])",
    "description": "Returns top n-th ranked item from a multidimensional cube."
  },
  {
    "id": 232,
    "name": "PYTHON_IN_EXCEL",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=PY(python_code)",
    "description": "Modern Microsoft 365 Python integration for machine learning, clustering, and data science directly inside cells."
  },
  {
    "id": 233,
    "name": "STDEV.S",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=STDEV.S(number1, [number2], ...)",
    "description": "Calculates sample standard deviation measuring volatility in monthly revenue or operational costs."
  },
  {
    "id": 234,
    "name": "STDEV.P",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=STDEV.P(number1, [number2], ...)",
    "description": "Computes population standard deviation across an entire complete dataset."
  },
  {
    "id": 235,
    "name": "VAR.S",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=VAR.S(number1, [number2], ...)",
    "description": "Estimates sample variance for risk management portfolios."
  },
  {
    "id": 236,
    "name": "VAR.P",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=VAR.P(number1, [number2], ...)",
    "description": "Calculates population variance."
  },
  {
    "id": 237,
    "name": "COVARIANCE.S",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=COVARIANCE.S(array1, array2)",
    "description": "Computes sample covariance determining joint directional movement between two financial variables."
  },
  {
    "id": 238,
    "name": "CORREL",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=CORREL(array1, array2)",
    "description": "Calculates Pearson correlation coefficient (-1.0 to +1.0) between marketing spend and realized sales revenues."
  },
  {
    "id": 239,
    "name": "FORECAST.LINEAR",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=FORECAST.LINEAR(x, known_y's, known_x's)",
    "description": "Predicts future financial value along a linear trendline."
  },
  {
    "id": 240,
    "name": "FORECAST.ETS",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=FORECAST.ETS(target_date, values, timeline, [seasonality], [data_completion], [aggregation])",
    "description": "Advanced triple exponential smoothing predicting seasonal sales spikes."
  },
  {
    "id": 241,
    "name": "FORECAST.ETS.SEASONALITY",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=FORECAST.ETS.SEASONALITY(values, timeline, ...)",
    "description": "Automatically detects length of recurring seasonal cycle in monthly sales data."
  },
  {
    "id": 242,
    "name": "FORECAST.ETS.CONFINT",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=FORECAST.ETS.CONFINT(target_date, values, timeline, [confidence_level])",
    "description": "Calculates confidence interval bounds (e.g., 95% certainty margin) for future revenue projections."
  },
  {
    "id": 243,
    "name": "TREND",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=TREND(known_y's, [known_x's], [new_x's], [const])",
    "description": "Computes multiple future values along a linear trend line."
  },
  {
    "id": 244,
    "name": "SLOPE",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=SLOPE(known_y's, known_x's)",
    "description": "Calculates the slope of linear regression line (variable cost per unit produced)."
  },
  {
    "id": 245,
    "name": "INTERCEPT",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=INTERCEPT(known_y's, known_x's)",
    "description": "Calculates regression intercept representing fixed factory overhead costs."
  },
  {
    "id": 246,
    "name": "RSQ",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=RSQ(known_y's, known_x's)",
    "description": "Returns coefficient of determination (R²) measuring predictive accuracy of a forecasting model."
  },
  {
    "id": 247,
    "name": "LINEST",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=LINEST(known_y's, [known_x's], [const], [stats])",
    "description": "Advanced multi-variable linear regression statistics array."
  },
  {
    "id": 248,
    "name": "LOGEST",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=LOGEST(known_y's, [known_x's], [const], [stats])",
    "description": "Multi-variable exponential curve fitting for non-linear growth analysis."
  },
  {
    "id": 249,
    "name": "NORMDIST",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=NORMDIST(x, mean, standard_dev, cumulative)",
    "description": "Computes normal distribution probability for operational tolerance analysis."
  },
  {
    "id": 250,
    "name": "NORMINV",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=NORMINV(probability, mean, standard_dev)",
    "description": "Computes inverse of normal cumulative distribution for Value-at-Risk (VaR) modeling."
  }
];
