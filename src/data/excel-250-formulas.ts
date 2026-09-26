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
    "name": "RANK",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=RANK(number, ref, [order])",
    "description": "Returns the rank of a number in a list of numbers; useful for ranking salespeople, branches by revenue, or highest balance debtors.",
    "id": 31
  },
  {
    "name": "RANK.EQ",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=RANK.EQ(number, ref, [order])",
    "description": "Modern equivalent of RANK giving tied values the same top rank; standard in executive performance league tables.",
    "id": 32
  },
  {
    "name": "RANK.AVG",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=RANK.AVG(number, ref, [order])",
    "description": "Returns the rank of a number, but if multiple values tie, returns the average rank (e.g., tie for 2nd and 3rd returns 2.5).",
    "id": 33
  },
  {
    "name": "GETPIVOTDATA",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=GETPIVOTDATA(data_field, pivot_table, [field1, item1], ...)",
    "description": "Extracts specific summary metrics from a Pivot Table report based on row/column labels; essential for building boardroom dashboards.",
    "id": 34
  },
  {
    "name": "HYPERLINK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HYPERLINK(link_location, [friendly_name])",
    "description": "Creates clickable navigation links to open local invoice PDFs, shared network drives, ERP portals, or workbook worksheets.",
    "id": 35
  },
  {
    "name": "CLEAN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CLEAN(text)",
    "description": "Removes non-printable ASCII characters (codes 0 to 31) imported from legacy software or mainframe ERP data dumps.",
    "id": 36
  },
  {
    "name": "MEDIAN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MEDIAN(number1, [number2], ...)",
    "description": "Returns the statistical middle value in a set of numbers; protects KPI analysis from abnormal extreme outliers.",
    "id": 37
  },
  {
    "name": "CONVERT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=CONVERT(number, from_unit, to_unit)",
    "description": "Converts a number from one measurement system to another (e.g. Metric tons to KG, Grams to Pounds, Gallons to Liters, Celsius to Fahrenheit).",
    "id": 38
  },
  {
    "name": "SUM",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUM(number1, [number2], ...)",
    "description": "Adds all numbers in a range of cells; the foundational bedrock of all balance sheets, trial balances, and financial ledgers.",
    "id": 39
  },
  {
    "name": "COUNT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNT(value1, [value2], ...)",
    "description": "Counts the number of cells that contain numbers; ignores empty cells, text labels, and boolean values.",
    "id": 40
  },
  {
    "name": "COUNTA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTA(value1, [value2], ...)",
    "description": "Counts the number of non-empty cells (numbers, text strings, dates, booleans, and error codes) in a dataset.",
    "id": 41
  },
  {
    "name": "COUNTBLANK",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTBLANK(range)",
    "description": "Counts empty or blank cells in a range; used for data audit checklists to catch missing PAN, GSTIN, or phone numbers.",
    "id": 42
  },
  {
    "name": "AVERAGE",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGE(number1, [number2], ...)",
    "description": "Calculates the arithmetic mean of arguments containing numbers (average billing value, average monthly purchase price).",
    "id": 43
  },
  {
    "name": "AVERAGEA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGEA(value1, [value2], ...)",
    "description": "Calculates average of values, evaluating text as 0, TRUE as 1, and FALSE as 0 for binary operational completion rates.",
    "id": 44
  },
  {
    "name": "DSUM",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DSUM(database, field, criteria)",
    "description": "Adds the numbers in a database column for records that match a specified criteria table; foundational for database-style MIS reporting.",
    "id": 45
  },
  {
    "name": "DCOUNT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DCOUNT(database, field, criteria)",
    "description": "Counts cells containing numbers in a database column that match specific multiple criteria conditions.",
    "id": 46
  },
  {
    "name": "DAVERAGE",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DAVERAGE(database, field, criteria)",
    "description": "Calculates the arithmetic average of values in a column of a list or database that match specified criteria conditions.",
    "id": 47
  },
  {
    "name": "DCOUNTA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DCOUNTA(database, field, criteria)",
    "description": "Counts non-blank cells across a specified database field that satisfy defined multi-column criteria parameters.",
    "id": 48
  },
  {
    "name": "DMAX",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DMAX(database, field, criteria)",
    "description": "Returns the maximum number in a column of records in a list or database that matches given criteria conditions.",
    "id": 49
  },
  {
    "name": "DMIN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DMIN(database, field, criteria)",
    "description": "Returns the smallest number in a database column for records meeting designated condition filters.",
    "id": 50
  },
  {
    "name": "SUMIF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMIF(range, criteria, [sum_range])",
    "description": "Adds the cells specified by a single given condition or criterion (e.g., total sales of a single brand or vendor ledger).",
    "id": 51
  },
  {
    "name": "SUMIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    "description": "Multi-condition summation across date windows, cost centers, branch codes, and GST slabs for corporate P&L reporting.",
    "id": 52
  },
  {
    "name": "COUNTIF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTIF(range, criteria)",
    "description": "Counts the number of cells within a range that meet a single specific criterion (e.g., overdue invoices > 90 days).",
    "id": 53
  },
  {
    "name": "COUNTIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    "description": "Counts rows meeting multiple simultaneous conditions across departments, status codes, and financial years.",
    "id": 54
  },
  {
    "name": "AVERAGEIF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGEIF(range, criteria, [average_range])",
    "description": "Computes the arithmetic mean of all cells in a range that meet a single specified condition.",
    "id": 55
  },
  {
    "name": "AVERAGEIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    "description": "Calculates the average of cells based on multiple criteria (e.g., average invoice value by region and sales rep).",
    "id": 56
  },
  {
    "name": "MAX",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MAX(number1, [number2], ...)",
    "description": "Returns the largest numeric value in a dataset; used to find peak vendor payments, highest monthly sales, or top credit limits.",
    "id": 57
  },
  {
    "name": "MAXA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MAXA(value1, [value2], ...)",
    "description": "Returns the maximum value in a list of arguments, evaluating text strings and FALSE as 0, and TRUE as 1.",
    "id": 58
  },
  {
    "name": "MIN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MIN(number1, [number2], ...)",
    "description": "Returns the minimum numeric value in a set; used for identifying lowest quotation prices, threshold balance, and re-order points.",
    "id": 59
  },
  {
    "name": "MINA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MINA(value1, [value2], ...)",
    "description": "Returns the smallest value in a dataset, including logical values (TRUE=1, FALSE=0) and text evaluated as 0.",
    "id": 60
  },
  {
    "name": "SQRT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SQRT(number)",
    "description": "Returns the positive square root of a number; widely used in statistical standard deviation, volatility metrics, and inventory EOQ calculations.",
    "id": 61
  },
  {
    "name": "SUBTOTAL",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUBTOTAL(function_num, ref1, [ref2], ...)",
    "description": "Returns a subtotal in a list or database, capable of dynamically ignoring rows hidden by manual filters (function codes 101-111).",
    "id": 62
  },
  {
    "name": "SUMPRODUCT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMPRODUCT(array1, [array2], ...)",
    "description": "Multiplies corresponding components in given arrays and returns the sum of those products; core for weighted average prices and multi-condition counts.",
    "id": 63
  },
  {
    "name": "SUMSQ",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=SUMSQ(number1, [number2], ...)",
    "description": "Returns the sum of the squares of the arguments; essential in variance, standard error of estimates, and regression analysis.",
    "id": 64
  },
  {
    "name": "PRODUCT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=PRODUCT(number1, [number2], ...)",
    "description": "Multiplies all numbers given as arguments; used for compounding growth factors, cumulative discount multipliers, and multi-tier tax rates.",
    "id": 65
  },
  {
    "name": "EVEN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=EVEN(number)",
    "description": "Rounds a positive number up and negative number down to the nearest even integer; used in batch packaging, palletizing, and dual-unit logistics.",
    "id": 66
  },
  {
    "name": "ODD",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ODD(number)",
    "description": "Rounds a positive number up and negative number down to the nearest odd integer; used in single-piece packaging and shift rotation logic.",
    "id": 67
  },
  {
    "name": "CONCATENATE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CONCATENATE(text1, [text2], ...)",
    "description": "Joins two or more text strings into one string; classic corporate formula for merging first/last names, invoice prefixes, and voucher codes.",
    "id": 68
  },
  {
    "name": "DOLLAR",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=DOLLAR(number, [decimals])",
    "description": "Converts a number to text using currency format with specified decimal places and thousands separator commas for executive reports.",
    "id": 69
  },
  {
    "name": "EXACT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=EXACT(text1, text2)",
    "description": "Compares two text strings and returns TRUE if they are exactly identical (case-sensitive); essential for verifying password strings, GSTIN cases, and hash tokens.",
    "id": 70
  },
  {
    "name": "ABS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ABS(number)",
    "description": "Returns the absolute value of a number (without sign); crucial for calculating ledger variance differences, bank reconciliation discrepancies, and budget deviations.",
    "id": 71
  },
  {
    "name": "ROMAN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=ROMAN(number, [form])",
    "description": "Converts an Arabic numeral to Roman text format (e.g., 2024 to MMXXIV); used in formal legal documents, audit chapter headings, and contractual clauses.",
    "id": 72
  },
  {
    "name": "POWER",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=POWER(number, power)",
    "description": "Returns the result of a number raised to a power; standard formula for compounding interest rate formulas (CAGR) and present value calculations.",
    "id": 73
  },
  {
    "name": "SMALL",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=SMALL(array, k)",
    "description": "Returns the k-th smallest value in a data set; used to determine lowest bidder quotations (L1, L2, L3) in procurement tenders.",
    "id": 74
  },
  {
    "name": "LARGE",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=LARGE(array, k)",
    "description": "Returns the k-th largest value in a data set; widely used to identify top 3 revenue generators, best-performing branches, or highest debtor balances.",
    "id": 75
  },
  {
    "name": "UPPER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UPPER(text)",
    "description": "Converts all letters in a text string to uppercase; standard for standardizing PAN numbers, GSTIN identifiers, and branch IFSC codes.",
    "id": 76
  },
  {
    "name": "LOWER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LOWER(text)",
    "description": "Converts all letters in a text string to lowercase; essential for normalizing corporate email IDs and web system URLs.",
    "id": 77
  },
  {
    "name": "PROPER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=PROPER(text)",
    "description": "Capitalizes the first letter of each word and converts all other letters to lowercase; used for standardizing customer and vendor names.",
    "id": 78
  },
  {
    "name": "RIGHT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=RIGHT(text, [num_chars])",
    "description": "Returns the specified number of characters from the end of a text string; extracts last digits of bank accounts, fiscal year suffixes, and bill serials.",
    "id": 79
  },
  {
    "name": "LEFT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LEFT(text, [num_chars])",
    "description": "Returns the specified number of characters from the beginning of a text string; extracts state codes from GST numbers, employee prefixes, and branch codes.",
    "id": 80
  },
  {
    "name": "MID",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=MID(text, start_num, num_chars)",
    "description": "Returns a specific number of characters from a text string starting at the specified position; extracts PAN entity types, IFSC bank codes, or invoice tokens.",
    "id": 81
  },
  {
    "name": "LEN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LEN(text)",
    "description": "Returns the number of characters in a text string; widely used to audit and validate length of PAN (10 chars), GSTIN (15 chars), and phone numbers (10 digits).",
    "id": 82
  },
  {
    "name": "TRIM",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TRIM(text)",
    "description": "Removes all leading, trailing, and excessive spaces from text, leaving only single spaces between words; essential after ERP data imports.",
    "id": 83
  },
  {
    "name": "DAY",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=DAY(serial_number)",
    "description": "Returns the day of the month, a number from 1 to 31; used in billing cycle cutoff analysis and payroll attendance tracking.",
    "id": 84
  },
  {
    "name": "MONTH",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=MONTH(serial_number)",
    "description": "Returns the month of a date, a number from 1 (January) to 12 (December); used for monthly sales aggregation and quarter determination.",
    "id": 85
  },
  {
    "name": "YEAR",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=YEAR(serial_number)",
    "description": "Returns the year of a date as a four-digit integer; used to group historical ledgers and calculate financial year spans.",
    "id": 86
  },
  {
    "name": "DATE",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=DATE(year, month, day)",
    "description": "Combines individual year, month, and day integers into a valid sequential Excel date serial number.",
    "id": 87
  },
  {
    "name": "TODAY",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=TODAY()",
    "description": "Returns the current date dynamically; foundational for real-time invoice aging buckets, statutory payment countdowns, and automated dashboards.",
    "id": 88
  },
  {
    "name": "SECOND",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=SECOND(serial_number)",
    "description": "Returns the seconds of a time value, a number from 0 to 59; used in transaction timestamp analysis and audit log parsing.",
    "id": 89
  },
  {
    "name": "MINUTE",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=MINUTE(serial_number)",
    "description": "Returns the minute of a time value, a number from 0 to 59; used for customer service ticket SLAs and shift duration logging.",
    "id": 90
  },
  {
    "name": "HOUR",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=HOUR(serial_number)",
    "description": "Returns the hour of a time value, a number from 0 (12:00 AM) to 23 (11:00 PM); used in hourly footfall and sales peak analysis.",
    "id": 91
  },
  {
    "name": "TIME",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=TIME(hour, minute, second)",
    "description": "Converts hours, minutes, and seconds into a decimal Excel time format; used in employee biometric punch calculation.",
    "id": 92
  },
  {
    "name": "NOW",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=NOW()",
    "description": "Returns the current system date and exact time; used for time-stamping transaction authorizations and audit trail snapshots.",
    "id": 93
  },
  {
    "name": "DAYS",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=DAYS(end_date, start_date)",
    "description": "Returns the exact number of calendar days between two dates; used to calculate debtor payment delays and overdue interest penalties.",
    "id": 94
  },
  {
    "name": "DAYS360",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=DAYS360(start_date, end_date, [method])",
    "description": "Calculates the number of days between two dates based on a 360-day year (twelve 30-day months); standard in corporate bond interest and commercial banking calculations.",
    "id": 95
  },
  {
    "name": "EDATE",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=EDATE(start_date, months)",
    "description": "Returns the serial date that is the specified number of months before or after a start date; ideal for loan EMI schedules and insurance policy renewal dates.",
    "id": 96
  },
  {
    "name": "EOMONTH",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=EOMONTH(start_date, months)",
    "description": "Returns the last calendar day of the month before or after a specified number of months; essential for monthly statutory GST, TDS, and PF filing deadlines.",
    "id": 97
  },
  {
    "name": "NETWORKDAYS",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=NETWORKDAYS(start_date, end_date, [holidays])",
    "description": "Returns the number of whole working days between two dates, automatically excluding weekends (Saturday/Sunday) and official public holidays.",
    "id": 98
  },
  {
    "name": "NETWORKDAYS.INTL",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])",
    "description": "Returns the number of whole workdays between two dates with customized weekend parameters (e.g., Sunday-only weekend or 6-day manufacturing workweeks).",
    "id": 99
  },
  {
    "name": "WORKDAY",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=WORKDAY(start_date, days, [holidays])",
    "description": "Returns a date that is the indicated number of working days before or after a starting date; used for project sprint milestones, vendor delivery lead times, and dispatch SLAs.",
    "id": 100
  },
  {
    "name": "WORKDAY.INTL",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=WORKDAY.INTL(start_date, days, [weekend], [holidays])",
    "description": "Returns the date before or after a specified number of workdays with custom weekend parameters (e.g., 6-day manufacturing workweeks or Friday-Saturday weekends).",
    "id": 101
  },
  {
    "name": "WEEKNUM",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=WEEKNUM(serial_number, [return_type])",
    "description": "Returns the week number of a specific date in the calendar year (1-54); standard for tracking FMCG weekly sales cycles and production batch schedules.",
    "id": 102
  },
  {
    "name": "WEEKDAY",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=WEEKDAY(serial_number, [return_type])",
    "description": "Returns the day of the week corresponding to a date (1 for Sunday to 7 for Saturday); used for weekend shift allowances and weekend sales surge analysis.",
    "id": 103
  },
  {
    "name": "DATEVALUE",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=DATEVALUE(date_text)",
    "description": "Converts a date stored as text into a serial number that Excel recognizes as a genuine date; fixes date formats imported from banking and portal CSV files.",
    "id": 104
  },
  {
    "name": "TIMEVALUE",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=TIMEVALUE(time_text)",
    "description": "Converts a time stored in text format to a serial decimal number (from 0 to 0.9999); critical for calculating night shift hours and login timestamps.",
    "id": 105
  },
  {
    "name": "YEARFRAC",
    "category": "Dates, Deadlines & Working Days",
    "syntax": "=YEARFRAC(start_date, end_date, [basis])",
    "description": "Calculates the fraction of the year represented by the number of whole days between two dates; core for employee gratuity tenure, bond accruals, and depreciation.",
    "id": 106
  },
  {
    "name": "ROUND",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ROUND(number, num_digits)",
    "description": "Rounds a number to a specified number of digits; standard in corporate invoicing, GST rounding off rules (Rule 54), and financial balance sheets.",
    "id": 107
  },
  {
    "name": "ROUNDDOWN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ROUNDDOWN(number, num_digits)",
    "description": "Rounds a number down towards zero; used in conservative tax provision estimations, completed tenure years for bonuses, and pack sizing.",
    "id": 108
  },
  {
    "name": "ROUNDUP",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=ROUNDUP(number, num_digits)",
    "description": "Rounds a number up away from zero; used for shipping freight carton counts, pallet allocation, and buffer cash reserve requirements.",
    "id": 109
  },
  {
    "name": "MROUND",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MROUND(number, multiple)",
    "description": "Rounds a number to the nearest specified multiple (e.g., nearest 5, 10, or 50 rupees); essential for retail cash payment rounding and currency demonetization.",
    "id": 110
  },
  {
    "name": "ISBLANK",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISBLANK(value)",
    "description": "Returns TRUE if a cell is completely empty; widely used in conditional audits to detect missing customer PAN, email IDs, or bank mandate forms.",
    "id": 111
  },
  {
    "name": "ISERR",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISERR(value)",
    "description": "Returns TRUE if a value refers to any error value except #N/A (#VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!); useful when #N/A is an acceptable missing lookup state.",
    "id": 112
  },
  {
    "name": "ISERROR",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISERROR(value)",
    "description": "Returns TRUE if a value refers to any error value (#N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!); used in robust legacy audit formulas.",
    "id": 113
  },
  {
    "name": "ISEVEN",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISEVEN(number)",
    "description": "Returns TRUE if a number is even, and FALSE if it is odd; used for alternating table row shading and even/odd production batch sequencing.",
    "id": 114
  },
  {
    "name": "ISLOGICAL",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISLOGICAL(value)",
    "description": "Returns TRUE if a cell contains a logical Boolean value (TRUE or FALSE); audits data validation rules and automated workflow triggers.",
    "id": 115
  },
  {
    "name": "ISNA",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISNA(value)",
    "description": "Returns TRUE if a value refers to the #N/A (value not available) error; specifically used to catch missing inventory master items or unmapped debtor accounts.",
    "id": 116
  },
  {
    "name": "ISNONTEXT",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISNONTEXT(value)",
    "description": "Returns TRUE if a value is not text (including numbers, blank cells, booleans, and dates); validates numerical input columns in ERP sheets.",
    "id": 117
  },
  {
    "name": "ISNUMBER",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISNUMBER(value)",
    "description": "Returns TRUE if a cell contains a genuine number; used in nested lookup validation formulas (e.g., ISNUMBER(SEARCH(...)) for partial text matching).",
    "id": 118
  },
  {
    "name": "ISODD",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISODD(number)",
    "description": "Returns TRUE if a number is odd, and FALSE if even; used for vehicle odd-even logistics schedules and shift rota patterns.",
    "id": 119
  },
  {
    "name": "ISREF",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISREF(value)",
    "description": "Returns TRUE if a value is a valid cell or range reference; guards complex dynamic INDIRECT and OFFSET financial model links from breaking.",
    "id": 120
  },
  {
    "id": 121,
    "name": "XLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    "description": "Modern replacement for VLOOKUP/HLOOKUP; performs two-way lookups and looks left without column counting."
  },
  {
    "id": 122,
    "name": "FILTER",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=FILTER(array, include, [if_empty])",
    "description": "Dynamically filters a range or array based on Boolean criteria; automatically spills matching records."
  },
  {
    "id": 123,
    "name": "UNIQUE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=UNIQUE(array, [by_col], [exactly_once])",
    "description": "Extracts unique distinct items from a range or list; eliminates duplicates dynamically."
  },
  {
    "id": 124,
    "name": "SORT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SORT(array, [sort_index], [sort_order], [by_col])",
    "description": "Sorts the contents of a range or array by specified column index in ascending or descending order."
  },
  {
    "id": 125,
    "name": "SORTBY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SORTBY(array, by_array1, [sort_order1], ...)",
    "description": "Sorts a table or range by values in a secondary independent helper array or criteria column."
  },
  {
    "id": 126,
    "name": "SEQUENCE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SEQUENCE(rows, [columns], [start], [step])",
    "description": "Generates a dynamic array of sequential numbers (e.g., automated serial numbering and date series)."
  },
  {
    "id": 127,
    "name": "RANDARRAY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=RANDARRAY([rows], [columns], [min], [max], [whole_number])",
    "description": "Returns an array of random numbers for simulation, Monte Carlo stress testing, and sample audits."
  },
  {
    "id": 128,
    "name": "INDEX",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=INDEX(array, row_num, [column_num])",
    "description": "Returns the value at a given row and column intersection within a matrix or table."
  },
  {
    "id": 129,
    "name": "MATCH",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=MATCH(lookup_value, lookup_array, [match_type])",
    "description": "Finds relative position (row/column index) of an item in a list or vector."
  },
  {
    "id": 130,
    "name": "XMATCH",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])",
    "description": "Next-generation MATCH supporting exact, wildcard, and reverse bottom-to-top position lookups."
  },
  {
    "id": 131,
    "name": "VLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    "description": "Standard vertical lookup searching the leftmost column for tax codes, party names, and item rates."
  },
  {
    "id": 132,
    "name": "HLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])",
    "description": "Horizontal lookup searching the top row of a table across monthly columnar budget templates."
  },
  {
    "id": 133,
    "name": "LOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=LOOKUP(lookup_value, lookup_vector, [result_vector])",
    "description": "Legacy vector lookup for graded tax slabs, commission brackets, and incentive tiers."
  },
  {
    "id": 134,
    "name": "CHOOSE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSE(index_num, value1, [value2], ...)",
    "description": "Selects a specific value or financial calculation scenario (Worst Case, Base Case, Best Case) from a list."
  },
  {
    "id": 135,
    "name": "CHOOSEROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    "description": "Extracts specific rows from an array or matrix dynamically without helper columns."
  },
  {
    "id": 136,
    "name": "CHOOSECOLS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    "description": "Extracts specific columns (e.g., Invoice No, Party, Net Taxable) from a broad ERP dump."
  },
  {
    "id": 137,
    "name": "DROP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=DROP(array, rows, [columns])",
    "description": "Excludes a specified number of header rows or summary columns from the start or end of an array."
  },
  {
    "id": 138,
    "name": "TAKE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TAKE(array, rows, [columns])",
    "description": "Returns a specified number of top rows (e.g., Top 10 Debtors) or columns from an array."
  },
  {
    "id": 139,
    "name": "EXPAND",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=EXPAND(array, rows, [columns], [pad_with])",
    "description": "Expands an array to specified dimensions, padding blank space with custom values like 'N/A' or 0."
  },
  {
    "id": 140,
    "name": "VSTACK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=VSTACK(array1, [array2], ...)",
    "description": "Vertically stacks multiple ledger sheets or quarterly sales reports into a single consolidated table."
  },
  {
    "id": 141,
    "name": "HSTACK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HSTACK(array1, [array2], ...)",
    "description": "Horizontally appends multiple adjacent columnar arrays together into one unified dataset."
  },
  {
    "id": 142,
    "name": "TOCOL",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TOCOL(array, [ignore], [scan_by_column])",
    "description": "Transforms a 2D multi-column table into a single continuous vertical column for pivot analysis."
  },
  {
    "id": 143,
    "name": "TOROW",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TOROW(array, [ignore], [scan_by_column])",
    "description": "Flattens a 2D matrix into a single horizontal row."
  },
  {
    "id": 144,
    "name": "WRAPROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=WRAPROWS(vector, wrap_count, [pad_with])",
    "description": "Wraps a 1D vertical list into a 2D table by row at specified item intervals."
  },
  {
    "id": 145,
    "name": "WRAPCOLS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=WRAPCOLS(vector, wrap_count, [pad_with])",
    "description": "Wraps a 1D horizontal vector into a 2D columnar matrix."
  },
  {
    "id": 146,
    "name": "OFFSET",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=OFFSET(reference, rows, cols, [height], [width])",
    "description": "Returns a dynamic reference range shifted by a specified number of rows and columns."
  },
  {
    "id": 147,
    "name": "INDIRECT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=INDIRECT(ref_text, [a1])",
    "description": "Converts a text string into an active cell reference for dynamic multi-sheet rollups."
  },
  {
    "id": 148,
    "name": "ADDRESS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])",
    "description": "Generates a cell address text string based on specified row and column coordinates."
  },
  {
    "id": 149,
    "name": "FORMULATEXT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=FORMULATEXT(reference)",
    "description": "Extracts formula syntax as readable plain text for audit verification and model documentation."
  },
  {
    "id": 150,
    "name": "PMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PMT(rate, nper, pv, [fv], [type])",
    "description": "Computes fixed monthly EMI installment for bank term loans, car loans, and machinery leases."
  },
  {
    "id": 151,
    "name": "IPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=IPMT(rate, per, nper, pv, [fv], [type])",
    "description": "Calculates interest portion of a loan installment for a specific period for tax deduction."
  },
  {
    "id": 152,
    "name": "PPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PPMT(rate, per, nper, pv, [fv], [type])",
    "description": "Calculates principal repayment component for a specific loan payment period."
  },
  {
    "id": 153,
    "name": "CUMIPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=CUMIPMT(rate, nper, pv, start_period, end_period, type)",
    "description": "Computes cumulative interest paid between two financial periods for yearly balance sheet notes."
  },
  {
    "id": 154,
    "name": "CUMPRINC",
    "category": "Corporate Finance & Banking",
    "syntax": "=CUMPRINC(rate, nper, pv, start_period, end_period, type)",
    "description": "Computes cumulative principal repaid across a financial year for loan liability reduction."
  },
  {
    "id": 155,
    "name": "NPER",
    "category": "Corporate Finance & Banking",
    "syntax": "=NPER(rate, pmt, pv, [fv], [type])",
    "description": "Returns number of repayment periods required to amortize a loan or reach an investment target."
  },
  {
    "id": 156,
    "name": "RATE",
    "category": "Corporate Finance & Banking",
    "syntax": "=RATE(nper, pmt, pv, [fv], [type], [guess])",
    "description": "Derives effective periodic interest rate of a loan or annuity investment."
  },
  {
    "id": 157,
    "name": "PV",
    "category": "Corporate Finance & Banking",
    "syntax": "=PV(rate, nper, pmt, [fv], [type])",
    "description": "Computes present discounted value of future cash flow streams or bond investments."
  },
  {
    "id": 158,
    "name": "FV",
    "category": "Corporate Finance & Banking",
    "syntax": "=FV(rate, nper, pmt, [pv], [type])",
    "description": "Computes future compounded value of recurring investments (sinking funds, gratuity reserves)."
  },
  {
    "id": 159,
    "name": "NPV",
    "category": "Corporate Finance & Banking",
    "syntax": "=NPV(rate, value1, [value2], ...)",
    "description": "Calculates Net Present Value of periodic investment cash flows at a specified discount hurdle rate."
  },
  {
    "id": 160,
    "name": "XNPV",
    "category": "Corporate Finance & Banking",
    "syntax": "=XNPV(rate, values, dates)",
    "description": "Computes Net Present Value for irregular, non-periodic project cash flows using exact calendar transaction dates."
  },
  {
    "id": 161,
    "name": "IRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=IRR(values, [guess])",
    "description": "Derives Internal Rate of Return for periodic cash flow projections."
  },
  {
    "id": 162,
    "name": "XIRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=XIRR(values, dates, [guess])",
    "description": "Gold standard for annualized return calculation across irregular investment dates and capital drawdowns."
  },
  {
    "id": 163,
    "name": "MIRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=MIRR(values, finance_rate, reinvest_rate)",
    "description": "Modified Internal Rate of Return assuming realistic reinvestment rates on positive cash flows."
  },
  {
    "id": 164,
    "name": "PRICE",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICE(settlement, maturity, rate, yld, redemption, frequency, [basis])",
    "description": "Computes price per ₹100 face value of coupon-paying corporate bonds or government securities."
  },
  {
    "id": 165,
    "name": "YIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])",
    "description": "Returns annual yield on fixed-income securities and treasury debt papers."
  },
  {
    "id": 166,
    "name": "DURATION",
    "category": "Corporate Finance & Banking",
    "syntax": "=DURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    "description": "Calculates Macaulay duration to measure debt portfolio sensitivity to interest rate shifts."
  },
  {
    "id": 167,
    "name": "MDURATION",
    "category": "Corporate Finance & Banking",
    "syntax": "=MDURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    "description": "Calculates Modified Duration measuring percentage price change for a 1% yield shift."
  },
  {
    "id": 168,
    "name": "ACCRINT",
    "category": "Corporate Finance & Banking",
    "syntax": "=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis])",
    "description": "Computes accrued interest on bonds from issue date to settlement date."
  },
  {
    "id": 169,
    "name": "NOMINAL",
    "category": "Corporate Finance & Banking",
    "syntax": "=NOMINAL(effect_rate, npery)",
    "description": "Converts effective annual yield into nominal APR for loan agreements and credit quotes."
  },
  {
    "id": 170,
    "name": "SLN",
    "category": "Corporate Finance & Banking",
    "syntax": "=SLN(cost, salvage, life)",
    "description": "Calculates straight-line depreciation per period for corporate fixed asset registers."
  },
  {
    "id": 171,
    "name": "DB",
    "category": "Corporate Finance & Banking",
    "syntax": "=DB(cost, salvage, life, period, [month])",
    "description": "Calculates declining balance depreciation using fixed-percentage method for statutory books."
  },
  {
    "id": 172,
    "name": "DDB",
    "category": "Corporate Finance & Banking",
    "syntax": "=DDB(cost, salvage, life, period, [factor])",
    "description": "Computes double-declining balance accelerated depreciation for rapid tech asset write-offs."
  },
  {
    "id": 173,
    "name": "SYD",
    "category": "Corporate Finance & Banking",
    "syntax": "=SYD(cost, salvage, life, per)",
    "description": "Sum-of-Years' Digits depreciation allocating higher wear-and-tear in initial operating years."
  },
  {
    "id": 174,
    "name": "VDB",
    "category": "Corporate Finance & Banking",
    "syntax": "=VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])",
    "description": "Variable declining balance depreciation for partial-year machinery capitalization."
  },
  {
    "id": 175,
    "name": "DISC",
    "category": "Corporate Finance & Banking",
    "syntax": "=DISC(settlement, maturity, pr, redemption, [basis])",
    "description": "Calculates discount rate for zero-coupon commercial papers and treasury bills."
  },
  {
    "id": 176,
    "name": "PRICEDISC",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICEDISC(settlement, maturity, discount, redemption, [basis])",
    "description": "Computes purchase price of a discounted debt instrument per ₹100 face value."
  },
  {
    "id": 177,
    "name": "RECEIVED",
    "category": "Corporate Finance & Banking",
    "syntax": "=RECEIVED(settlement, maturity, investment, discount, [basis])",
    "description": "Calculates total amount received at maturity for a fully discounted security."
  },
  {
    "id": 178,
    "name": "INTRATE",
    "category": "Corporate Finance & Banking",
    "syntax": "=INTRATE(settlement, maturity, investment, redemption, [basis])",
    "description": "Returns annualized interest rate for a fully invested fixed-income instrument."
  },
  {
    "id": 179,
    "name": "MODE.SNGL",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MODE.SNGL(number1, [number2], ...)",
    "description": "Identifies most frequently occurring order size, price point, or discount tier."
  },
  {
    "id": 180,
    "name": "CEILING.MATH",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=CEILING.MATH(number, [significance], [mode])",
    "description": "Rounds a number up to the nearest multiple of significance."
  },
  {
    "id": 181,
    "name": "FLOOR.MATH",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=FLOOR.MATH(number, [significance], [mode])",
    "description": "Rounds a number down to the nearest multiple of significance."
  },
  {
    "id": 182,
    "name": "INT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=INT(number)",
    "description": "Rounds a number down to the nearest whole integer, truncating decimal fractions."
  },
  {
    "id": 183,
    "name": "TRUNC",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=TRUNC(number, [num_digits])",
    "description": "Truncates a number to a specified precision without mathematical rounding."
  },
  {
    "id": 184,
    "name": "MOD",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MOD(number, divisor)",
    "description": "Returns the remainder after integer division (used for batch allocations and alternate row formatting)."
  },
  {
    "id": 185,
    "name": "QUOTIENT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=QUOTIENT(numerator, denominator)",
    "description": "Returns integer portion of division without fractional remainder."
  },
  {
    "id": 186,
    "name": "MAXIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MAXIFS(max_range, criteria_range1, criteria1, ...)",
    "description": "Returns maximum value meeting multiple criteria (highest single billing for client X)."
  },
  {
    "id": 187,
    "name": "MINIFS",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MINIFS(min_range, criteria_range1, criteria1, ...)",
    "description": "Returns minimum value satisfying multiple specific business constraints."
  },
  {
    "id": 188,
    "name": "TEXTSPLIT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])",
    "description": "Splits a text string across columns and rows using specified delimiters (e.g., splitting Address into City, State, PIN)."
  },
  {
    "id": 189,
    "name": "TEXTBEFORE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    "description": "Extracts all characters before a specified delimiter (extracting invoice prefix before slash)."
  },
  {
    "id": 190,
    "name": "TEXTAFTER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    "description": "Extracts all characters after a delimiter (extracting invoice serial number after slash)."
  },
  {
    "id": 191,
    "name": "TEXTJOIN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)",
    "description": "Combines multiple strings with a separator, skipping empty cells (concatenating item lists)."
  },
  {
    "id": 192,
    "name": "CONCAT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CONCAT(text1, [text2], ...)",
    "description": "Joins multiple text ranges and cell arrays together without delimiter."
  },
  {
    "id": 193,
    "name": "SUBSTITUTE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
    "description": "Replaces specific instances of target text with new text (replacing hyphens with slashes)."
  },
  {
    "id": 194,
    "name": "NUMBERVALUE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=NUMBERVALUE(text, [decimal_separator], [group_separator])",
    "description": "Converts text numbers with international comma/period decimal formats into Excel numbers."
  },
  {
    "id": 195,
    "name": "UNICHAR",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UNICHAR(number)",
    "description": "Returns Unicode character represented by numeric value (currency symbols, status icons)."
  },
  {
    "id": 196,
    "name": "UNICODE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UNICODE(text)",
    "description": "Returns Unicode code point corresponding to the first character of text."
  },
  {
    "id": 197,
    "name": "FIXED",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=FIXED(number, [decimals], [no_commas])",
    "description": "Formats number with fixed decimal places and optional thousand commas as text."
  },
  {
    "id": 198,
    "name": "ARRAYTOTEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=ARRAYTOTEXT(array, [format])",
    "description": "Converts an array of values into a single comma-separated text string."
  },
  {
    "id": 199,
    "name": "VALUETOTEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=VALUETOTEXT(value, [format])",
    "description": "Converts any cell value or formula result into readable text format."
  },
  {
    "id": 200,
    "name": "REPT_PAD",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=LEFT(text&REPT(' ', 20), 20)",
    "description": "Specialized string padding idiom used for fixed-width bank NEFT upload files."
  },
  {
    "id": 201,
    "name": "DATEDIF",
    "category": "Date & Time Intelligence",
    "syntax": "=DATEDIF(start_date, end_date, unit)",
    "description": "Calculates difference between two dates in completed years ('Y'), months ('M'), or days ('D')."
  },
  {
    "id": 202,
    "name": "ISOWEEKNUM",
    "category": "Date & Time Intelligence",
    "syntax": "=ISOWEEKNUM(date)",
    "description": "Returns ISO-8601 standard week number of the year for export logistics."
  },
  {
    "id": 203,
    "name": "DATE_TEXT_DDMMMYYYY",
    "category": "Date & Time Intelligence",
    "syntax": "=TEXT(date, 'dd-mmm-yyyy')",
    "description": "Standardizes invoice dates into non-ambiguous Indian business format ('15-Aug-2025')."
  },
  {
    "id": 204,
    "name": "DATE_TEXT_MONTHNAME",
    "category": "Date & Time Intelligence",
    "syntax": "=TEXT(date, 'mmmm')",
    "description": "Converts date into full spelled month name (e.g., 'September') for summary headers."
  },
  {
    "id": 205,
    "name": "DATE_TEXT_DAYNAME",
    "category": "Date & Time Intelligence",
    "syntax": "=TEXT(date, 'dddd')",
    "description": "Extracts day of the week text (e.g., 'Monday') to detect weekend transaction anomalies."
  },
  {
    "id": 206,
    "name": "FINANCIAL_YEAR",
    "category": "Date & Time Intelligence",
    "syntax": "=IF(MONTH(A2)>=4, YEAR(A2)&'-'&RIGHT(YEAR(A2)+1,2), YEAR(A2)-1&'-'&RIGHT(YEAR(A2),2))",
    "description": "Dynamically derives Indian Financial Year (e.g., '2025-26') from any transaction date."
  },
  {
    "id": 207,
    "name": "QUARTER_CALC",
    "category": "Date & Time Intelligence",
    "syntax": "='Q'&ROUNDUP(MONTH(EDATE(A2,-3))/3,0)",
    "description": "Computes Indian Financial Quarter (Q1: Apr-Jun, Q2: Jul-Sep, Q3: Oct-Dec, Q4: Jan-Mar)."
  },
  {
    "id": 208,
    "name": "IF",
    "category": "Logical & Decision Modeling",
    "syntax": "=IF(logical_test, value_if_true, [value_if_false])",
    "description": "Fundamental decision formula evaluating conditions and branching calculations accordingly."
  },
  {
    "id": 209,
    "name": "IFS",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFS(logical_test1, value_if_true1, ...)",
    "description": "Evaluates multiple sequential conditions without nesting multiple IF statements."
  },
  {
    "id": 210,
    "name": "SWITCH",
    "category": "Logical & Decision Modeling",
    "syntax": "=SWITCH(expression, value1, result1, [default])",
    "description": "Evaluates an expression against a list of exact matches and returns corresponding result."
  },
  {
    "id": 211,
    "name": "AND",
    "category": "Logical & Decision Modeling",
    "syntax": "=AND(logical1, [logical2], ...)",
    "description": "Returns TRUE only if all combined arguments evaluate to TRUE."
  },
  {
    "id": 212,
    "name": "OR",
    "category": "Logical & Decision Modeling",
    "syntax": "=OR(logical1, [logical2], ...)",
    "description": "Returns TRUE if at least one of the conditions evaluates to TRUE."
  },
  {
    "id": 213,
    "name": "NOT",
    "category": "Logical & Decision Modeling",
    "syntax": "=NOT(logical)",
    "description": "Reverses logical state: turns TRUE into FALSE and FALSE into TRUE."
  },
  {
    "id": 214,
    "name": "XOR",
    "category": "Logical & Decision Modeling",
    "syntax": "=XOR(logical1, [logical2], ...)",
    "description": "Logical exclusive OR: returns TRUE if an odd number of conditions are TRUE."
  },
  {
    "id": 215,
    "name": "IFERROR",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFERROR(value, value_if_error)",
    "description": "Traps calculation errors (#N/A, #DIV/0!, #VALUE!) and returns clean fallback (0 or 'Pending')."
  },
  {
    "id": 216,
    "name": "IFNA",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFNA(value, value_if_na)",
    "description": "Specifically traps lookup #N/A errors while allowing other critical syntax errors to surface."
  },
  {
    "id": 217,
    "name": "ISTEXT",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISTEXT(value)",
    "description": "Verifies if cell contains text string rather than numerical value."
  },
  {
    "id": 218,
    "name": "ISFORMULA",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISFORMULA(reference)",
    "description": "Audits spreadsheet cells to distinguish hardcoded entered values from dynamic formulas."
  },
  {
    "id": 219,
    "name": "TRUE",
    "category": "Logical & Decision Modeling",
    "syntax": "=TRUE()",
    "description": "Returns logical value TRUE for Boolean flags."
  },
  {
    "id": 220,
    "name": "FALSE",
    "category": "Logical & Decision Modeling",
    "syntax": "=FALSE()",
    "description": "Returns logical value FALSE."
  },
  {
    "id": 221,
    "name": "DELTA",
    "category": "Logical & Decision Modeling",
    "syntax": "=DELTA(number1, [number2])",
    "description": "Tests whether two values are strictly equal; returns 1 if equal and 0 otherwise."
  },
  {
    "id": 222,
    "name": "GESTEP",
    "category": "Logical & Decision Modeling",
    "syntax": "=GESTEP(number, [step])",
    "description": "Step function returning 1 if number is greater than or equal to step threshold, else 0."
  },
  {
    "id": 223,
    "name": "CHOOSE_NESTED",
    "category": "Logical & Decision Modeling",
    "syntax": "=CHOOSE(MATCH(status, {'Pending','Approved','Rejected'}, 0), 10, 20, 30)",
    "description": "Combined logical router returning distinct weights."
  },
  {
    "id": 224,
    "name": "MAP_CONDITION",
    "category": "Logical & Decision Modeling",
    "syntax": "=MAP(range, LAMBDA(x, IF(x>100000, 'High', 'Normal')))",
    "description": "Applies inline logical classification across entire column range."
  },
  {
    "id": 225,
    "name": "BOOLEAN_MULTIPLY",
    "category": "Logical & Decision Modeling",
    "syntax": "=SUM((status='Approved')*(amount>50000))",
    "description": "Modern Boolean array multiplication replacing legacy multi-IF formulas."
  },
  {
    "id": 226,
    "name": "COALESCE_EXCEL",
    "category": "Logical & Decision Modeling",
    "syntax": "=IF(A2<>'', A2, IF(B2<>'', B2, C2))",
    "description": "Excel implementation of SQL COALESCE returning first non-empty value."
  },
  {
    "id": 227,
    "name": "LET",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LET(name1, val1, [name2, val2], calculation)",
    "description": "Defines named variables inside a formula; dramatically speeds up calculation and simplifies complex logic."
  },
  {
    "id": 228,
    "name": "LAMBDA",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LAMBDA([param1, param2, ...], calculation)",
    "description": "Creates custom reusable functions without VBA or macros."
  },
  {
    "id": 229,
    "name": "MAP",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=MAP(array1, [array2], LAMBDA(x, [y], calculation))",
    "description": "Applies a LAMBDA function to every element in an array and returns an array of results."
  },
  {
    "id": 230,
    "name": "REDUCE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REDUCE([initial_value], array, LAMBDA(accumulator, current_val, calculation))",
    "description": "Accumulates values across an array using custom logic (custom running totals or string aggregations)."
  },
  {
    "id": 231,
    "name": "SCAN",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=SCAN([initial_value], array, LAMBDA(accumulator, current_val, calculation))",
    "description": "Generates a running intermediate array of accumulated values (e.g., running bank balance)."
  },
  {
    "id": 232,
    "name": "BYROW",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=BYROW(array, LAMBDA(row, calculation))",
    "description": "Applies calculation to each individual row of an array and returns vertical result column."
  },
  {
    "id": 233,
    "name": "BYCOL",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=BYCOL(array, LAMBDA(column, calculation))",
    "description": "Applies calculation to each column of an array and returns horizontal summary row."
  },
  {
    "id": 234,
    "name": "MAKEARRAY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=MAKEARRAY(rows, cols, LAMBDA(r, c, calculation))",
    "description": "Generates a calculated 2D array of specified rows and columns based on custom coordinates."
  },
  {
    "id": 235,
    "name": "ISOMITTED",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=ISOMITTED(parameter)",
    "description": "Checks if an optional argument was omitted in a custom LAMBDA function call."
  },
  {
    "id": 236,
    "name": "REGEXEXTRACT",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REGEXEXTRACT(text, pattern, [return_mode], [case_sensitivity])",
    "description": "Modern Excel 365 regular expression engine extracting PAN, GSTIN, and emails."
  },
  {
    "id": 237,
    "name": "REGEXREPLACE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REGEXREPLACE(text, pattern, replacement, [occurrence], [case_sensitivity])",
    "description": "Replaces patterns matching regular expressions in bulk data cleaning."
  },
  {
    "id": 238,
    "name": "REGEXMATCH",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REGEXMATCH(text, pattern, [case_sensitivity])",
    "description": "Validates text format compliance using regex patterns (verifying phone number formats)."
  },
  {
    "id": 239,
    "name": "GROUPBY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=GROUPBY(row_fields, values, function, [headers], [total_depth], [sort_order], [filter_array])",
    "description": "Modern formula-based pivot engine grouping rows and aggregating metrics without creating Pivot Tables."
  },
  {
    "id": 240,
    "name": "PIVOTBY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=PIVOTBY(row_fields, col_fields, values, function, [headers], [row_total_depth], ...)",
    "description": "Generates complete multi-dimensional cross-tabulated matrix purely via a dynamic formula."
  },
  {
    "id": 241,
    "name": "PERCENTOF",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=PERCENTOF(data_subset, all_data)",
    "description": "Calculates the percentage proportion of a subset relative to total sum."
  },
  {
    "id": 242,
    "name": "EVALUATE_LAMBDA",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LAMBDA(str, ...)",
    "description": "Dynamic execution engine pattern evaluating string expressions."
  },
  {
    "id": 243,
    "name": "SINGLE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=SINGLE(reference)",
    "description": "Implicit intersection operator returning a single cell value from a range."
  },
  {
    "id": 244,
    "name": "ANCHORARRAY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=A1#",
    "description": "Spill range reference operator targeting the entire dynamic spilled output of formula in A1."
  },
  {
    "id": 245,
    "name": "SPILL_TEST",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=IF(ISREF(A1#), 'Spilled', 'Single')",
    "description": "Verifies dynamic array spill behavior to prevent #SPILL! collision errors."
  },
  {
    "id": 246,
    "name": "CUBEVALUE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBEVALUE(connection, [member_expression1], ...)",
    "description": "Extracts consolidated KPI metrics directly from SQL Analysis Services or Power Pivot Data Model."
  },
  {
    "id": 247,
    "name": "CUBEMEMBER",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBEMEMBER(connection, member_expression, [caption])",
    "description": "Validates and extracts dimensional hierarchy members from an OLAP cube."
  },
  {
    "id": 248,
    "name": "CUBESET",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBESET(connection, set_expression, [caption], [sort_order], [sort_by])",
    "description": "Defines a calculated set of members from data model for high-speed executive dashboards."
  },
  {
    "id": 249,
    "name": "CUBEKPIMEMBER",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBEKPIMEMBER(connection, kpi_name, kpi_property, [caption])",
    "description": "Extracts KPI status indicators (Goal, Value, Status) from financial models."
  },
  {
    "id": 250,
    "name": "CUBERANKEDMEMBER",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=CUBERANKEDMEMBER(connection, set_expression, rank, [caption])",
    "description": "Returns top n-th ranked item from a multidimensional cube."
  }
];
