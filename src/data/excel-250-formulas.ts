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
    "name": "ISFORMULA",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISFORMULA(reference)",
    "description": "Returns TRUE if a cell contains a formula; audits financial models for accidentally hardcoded numbers.",
    "id": 121
  },
  {
    "name": "ISTEXT",
    "category": "Logical & Decision Modeling",
    "syntax": "=ISTEXT(value)",
    "description": "Returns TRUE if a cell contains text; used in ERP reconciliation to separate customer notes from invoice numbers.",
    "id": 122
  },
  {
    "name": "IPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=IPMT(rate, per, nper, pv, [fv], [type])",
    "description": "Calculates the interest payment portion for a given period of an investment or term loan EMI schedule.",
    "id": 123
  },
  {
    "name": "PMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PMT(rate, nper, pv, [fv], [type])",
    "description": "Calculates the periodic equal payment (EMI) for a loan based on constant payments and a constant interest rate.",
    "id": 124
  },
  {
    "name": "PPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PPMT(rate, per, nper, pv, [fv], [type])",
    "description": "Calculates the principal payment portion for a specific period of an investment or loan repayment schedule.",
    "id": 125
  },
  {
    "name": "NPER",
    "category": "Corporate Finance & Banking",
    "syntax": "=NPER(rate, pmt, pv, [fv], [type])",
    "description": "Returns the number of payment periods for a loan or investment based on regular periodic payments and constant interest.",
    "id": 126
  },
  {
    "name": "PV",
    "category": "Corporate Finance & Banking",
    "syntax": "=PV(rate, nper, pmt, [fv], [type])",
    "description": "Calculates the present value of a loan or investment based on constant future payments and interest rate.",
    "id": 127
  },
  {
    "name": "RATE",
    "category": "Corporate Finance & Banking",
    "syntax": "=RATE(nper, pmt, pv, [fv], [type], [guess])",
    "description": "Returns the interest rate per period of an annuity or loan amortisation schedule.",
    "id": 128
  },
  {
    "name": "FV",
    "category": "Corporate Finance & Banking",
    "syntax": "=FV(rate, nper, pmt, [pv], [type])",
    "description": "Returns the future value of an investment based on periodic constant payments and a constant interest rate.",
    "id": 129
  },
  {
    "name": "FVSCHEDULE",
    "category": "Corporate Finance & Banking",
    "syntax": "=FVSCHEDULE(principal, schedule)",
    "description": "Calculates the future value of an initial principal after applying a series of compound interest rates.",
    "id": 130
  },
  {
    "name": "INTRATE",
    "category": "Corporate Finance & Banking",
    "syntax": "=INTRATE(settlement, maturity, investment, redemption, [basis])",
    "description": "Returns the interest rate for a fully invested commercial paper or Treasury bill security.",
    "id": 131
  },
  {
    "name": "ACCRINT",
    "category": "Corporate Finance & Banking",
    "syntax": "=ACCRINT(issue, first_interest, settlement, rate, par, frequency, [basis])",
    "description": "Returns the accrued interest for a security that pays periodic interest (e.g., Corporate debentures and bonds).",
    "id": 132
  },
  {
    "name": "ACCRINTM",
    "category": "Corporate Finance & Banking",
    "syntax": "=ACCRINTM(issue, settlement, rate, par, [basis])",
    "description": "Calculates accrued interest for a security that pays interest only at maturity (e.g., Cumulative fixed deposits).",
    "id": 133
  },
  {
    "name": "CUMIPMT",
    "category": "Corporate Finance & Banking",
    "syntax": "=CUMIPMT(rate, nper, pv, start_period, end_period, type)",
    "description": "Calculates cumulative interest paid on a loan between two periods; essential for annual financial statement disclosures.",
    "id": 134
  },
  {
    "name": "CUMPRINC",
    "category": "Corporate Finance & Banking",
    "syntax": "=CUMPRINC(rate, nper, pv, start_period, end_period, type)",
    "description": "Calculates cumulative principal paid on a loan between two periods; tracks balance sheet liability reduction.",
    "id": 135
  },
  {
    "name": "NPV",
    "category": "Corporate Finance & Banking",
    "syntax": "=NPV(rate, value1, [value2], ...)",
    "description": "Calculates the Net Present Value of an investment by using a discount rate and a series of future cash flows.",
    "id": 136
  },
  {
    "name": "IRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=IRR(values, [guess])",
    "description": "Returns the Internal Rate of Return for a series of periodic cash flows for capital budgeting decisions.",
    "id": 137
  },
  {
    "name": "XOR",
    "category": "Logical & Decision Modeling",
    "syntax": "=XOR(logical1, [logical2], ...)",
    "description": "Returns a logical Exclusive OR of all arguments; TRUE if an odd number of conditions evaluate to TRUE.",
    "id": 138
  },
  {
    "name": "MIRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=MIRR(values, finance_rate, reinvest_rate)",
    "description": "Returns Modified Internal Rate of Return where positive cash flows are reinvested at a realistic cost of capital.",
    "id": 139
  },
  {
    "name": "XIRR",
    "category": "Corporate Finance & Banking",
    "syntax": "=XIRR(values, dates, [guess])",
    "description": "Calculates the internal rate of return for non-periodic cash flows occurring on specific irregular calendar dates.",
    "id": 140
  },
  {
    "name": "XNPV",
    "category": "Corporate Finance & Banking",
    "syntax": "=XNPV(rate, values, dates)",
    "description": "Calculates the Net Present Value for a schedule of cash flows that occur on specific irregular calendar dates.",
    "id": 141
  },
  {
    "name": "MDURATION",
    "category": "Corporate Finance & Banking",
    "syntax": "=MDURATION(settlement, maturity, coupon, yld, frequency, [basis])",
    "description": "Returns the modified Macaulay duration for a security with an assumed par value of $100 for interest rate sensitivity.",
    "id": 142
  },
  {
    "name": "MODE",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=MODE(number1, [number2], ...)",
    "description": "Returns the most frequently occurring value in a data set; used to identify the most common invoice value or order size.",
    "id": 143
  },
  {
    "name": "PDURATION",
    "category": "Corporate Finance & Banking",
    "syntax": "=PDURATION(rate, pv, fv)",
    "description": "Returns the exact number of periods required by an investment to reach a specified target future value.",
    "id": 144
  },
  {
    "name": "VLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    "description": "Searches for a value in the first column of a table array and returns a value in the same row from another column.",
    "id": 145
  },
  {
    "name": "XLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    "description": "Modern bidirectional lookup formula that looks left and right, supports defaults, wildcards, and exact match.",
    "id": 146
  },
  {
    "name": "HLOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])",
    "description": "Searches for a value in the top row of a table or array of values and returns the value in the same column.",
    "id": 147
  },
  {
    "name": "LOOKUP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=LOOKUP(lookup_value, lookup_vector, [result_vector])",
    "description": "Looks up a value either from a one-row or one-column range or from an array for approximate matches.",
    "id": 148
  },
  {
    "name": "CHOOSE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSE(index_num, value1, [value2], ...)",
    "description": "Uses an index number to return a value from a list of up to 254 values; used in dynamic financial scenario modeling.",
    "id": 149
  },
  {
    "name": "MATCH",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=MATCH(lookup_value, lookup_array, [match_type])",
    "description": "Returns the relative position of an item in an array that matches a specified value in a specified order.",
    "id": 150
  },
  {
    "name": "INDEX",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=INDEX(array, row_num, [column_num])",
    "description": "Returns a value or reference of the cell at the intersection of a particular row and column in a given range.",
    "id": 151
  },
  {
    "name": "ADDRESS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])",
    "description": "Creates a cell reference as text, given specified row and column numbers for dynamic range references.",
    "id": 152
  },
  {
    "name": "INDIRECT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=INDIRECT(ref_text, [a1])",
    "description": "Returns the reference specified by a text string; allows dynamic switching of worksheet references and tabs.",
    "id": 153
  },
  {
    "name": "OFFSET",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=OFFSET(reference, rows, cols, [height], [width])",
    "description": "Returns a reference to a range that is a specified number of rows and columns from a starting cell.",
    "id": 154
  },
  {
    "name": "DGET",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=DGET(database, field, criteria)",
    "description": "Extracts a single matching record from a database list matching specified multi-column criteria conditions.",
    "id": 155
  },
  {
    "name": "DB",
    "category": "Corporate Finance & Banking",
    "syntax": "=DB(cost, salvage, life, period, [month])",
    "description": "Returns the depreciation of an asset for a specified period using the fixed-declining balance method for accounting.",
    "id": 156
  },
  {
    "name": "DDB",
    "category": "Corporate Finance & Banking",
    "syntax": "=DDB(cost, salvage, life, period, [factor])",
    "description": "Returns the depreciation of an asset for a specified period using the double-declining balance method.",
    "id": 157
  },
  {
    "name": "VDB",
    "category": "Corporate Finance & Banking",
    "syntax": "=VDB(cost, salvage, life, start_period, end_period, [factor], [no_switch])",
    "description": "Calculates depreciation of an asset for any specified period using variable declining balance method.",
    "id": 158
  },
  {
    "name": "SLN",
    "category": "Corporate Finance & Banking",
    "syntax": "=SLN(cost, salvage, life)",
    "description": "Returns the straight-line depreciation of an asset for one period; standard across corporate fixed asset registers.",
    "id": 159
  },
  {
    "name": "SYD",
    "category": "Corporate Finance & Banking",
    "syntax": "=SYD(cost, salvage, life, per)",
    "description": "Returns the sum-of-years' digits depreciation of an asset for a specified period.",
    "id": 160
  },
  {
    "name": "AMORLINC",
    "category": "Corporate Finance & Banking",
    "syntax": "=AMORLINC(cost, date_purchased, first_period, salvage, period, rate, [basis])",
    "description": "Returns the depreciation for each accounting period using French linear accounting rules.",
    "id": 161
  },
  {
    "name": "RRI",
    "category": "Corporate Finance & Banking",
    "syntax": "=RRI(nper, pv, fv)",
    "description": "Returns an equivalent interest rate for the growth of an investment over a specific period (CAGR).",
    "id": 162
  },
  {
    "name": "YIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=YIELD(settlement, maturity, rate, pr, redemption, frequency, [basis])",
    "description": "Returns the yield on a security that pays periodic interest (e.g. Government gilts and Treasury notes).",
    "id": 163
  },
  {
    "name": "YIELDDISC",
    "category": "Corporate Finance & Banking",
    "syntax": "=YIELDDISC(settlement, maturity, pr, redemption, [basis])",
    "description": "Returns the annual yield for a discounted security (e.g., Commercial paper and Treasury bills).",
    "id": 164
  },
  {
    "name": "YIELDMAT",
    "category": "Corporate Finance & Banking",
    "syntax": "=YIELDMAT(settlement, maturity, issue, rate, pr, [basis])",
    "description": "Returns the annual yield of a security that pays interest at maturity.",
    "id": 165
  },
  {
    "name": "ODDFPRICE",
    "category": "Corporate Finance & Banking",
    "syntax": "=ODDFPRICE(settlement, maturity, issue, first_coupon, rate, yld, redemption, frequency, [basis])",
    "description": "Returns the price per $100 face value of a security with an odd (short or long) first coupon period.",
    "id": 166
  },
  {
    "name": "ODDFYIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=ODDFYIELD(settlement, maturity, issue, first_coupon, rate, pr, redemption, frequency, [basis])",
    "description": "Returns the yield of a security that has an odd first period.",
    "id": 167
  },
  {
    "name": "ODDLYIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=ODDLYIELD(settlement, maturity, last_interest, rate, pr, redemption, frequency, [basis])",
    "description": "Returns the yield of a security that has an odd (short or long) last coupon period.",
    "id": 168
  },
  {
    "name": "PRICE",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICE(settlement, maturity, rate, yld, redemption, frequency, [basis])",
    "description": "Returns the price per $100 face value of a security that pays periodic coupon interest.",
    "id": 169
  },
  {
    "name": "PRICEMAT",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICEMAT(settlement, maturity, issue, rate, yld, [basis])",
    "description": "Returns the price per $100 face value of a security that pays interest only at maturity.",
    "id": 170
  },
  {
    "name": "PRICEYIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=PRICE(settlement, maturity, rate, yld, redemption, frequency, [basis])",
    "description": "Calculates security pricing curves across bond yields and secondary debt market trading sheets.",
    "id": 171
  },
  {
    "name": "TBILLEQ",
    "category": "Corporate Finance & Banking",
    "syntax": "=TBILLEQ(settlement, maturity, discount)",
    "description": "Returns the bond-equivalent yield for a Treasury bill; standard benchmark for liquid fund portfolios.",
    "id": 172
  },
  {
    "name": "TBILLPRICE",
    "category": "Corporate Finance & Banking",
    "syntax": "=TBILLPRICE(settlement, maturity, discount)",
    "description": "Returns the price per $100 face value for a Treasury bill based on discount rate.",
    "id": 173
  },
  {
    "name": "TBILLYIELD",
    "category": "Corporate Finance & Banking",
    "syntax": "=TBILLYIELD(settlement, maturity, pr)",
    "description": "Returns the yield for a Treasury bill based on purchase price.",
    "id": 174
  },
  {
    "name": "COUPDAYBS",
    "category": "Corporate Finance & Banking",
    "syntax": "=COUPDAYBS(settlement, maturity, frequency, [basis])",
    "description": "Returns the number of days from the beginning of a coupon period until its settlement date.",
    "id": 175
  },
  {
    "name": "COUPDAYS",
    "category": "Corporate Finance & Banking",
    "syntax": "=COUPDAYS(settlement, maturity, frequency, [basis])",
    "description": "Returns the number of days in the coupon period that contains the settlement date.",
    "id": 176
  },
  {
    "name": "COUPDAYSNC",
    "category": "Corporate Finance & Banking",
    "syntax": "=COUPDAYSNC(settlement, maturity, frequency, [basis])",
    "description": "Returns the number of days from the settlement date to the next coupon date.",
    "id": 177
  },
  {
    "name": "COUPNCD",
    "category": "Corporate Finance & Banking",
    "syntax": "=COUPNCD(settlement, maturity, frequency, [basis])",
    "description": "Returns the next coupon date after the settlement date for corporate debt portfolios.",
    "id": 178
  },
  {
    "name": "COUPNUM",
    "category": "Corporate Finance & Banking",
    "syntax": "=COUPNUM(settlement, maturity, frequency, [basis])",
    "description": "Returns the number of coupons payable between the settlement date and maturity date.",
    "id": 179
  },
  {
    "name": "COUPPCD",
    "category": "Corporate Finance & Banking",
    "syntax": "=COUPPCD(settlement, maturity, frequency, [basis])",
    "description": "Returns the previous coupon date before the settlement date.",
    "id": 180
  },
  {
    "name": "DISC",
    "category": "Corporate Finance & Banking",
    "syntax": "=DISC(settlement, maturity, pr, redemption, [basis])",
    "description": "Returns the discount rate for a security based on price and redemption value.",
    "id": 181
  },
  {
    "name": "RECEIVED",
    "category": "Corporate Finance & Banking",
    "syntax": "=RECEIVED(settlement, maturity, investment, discount, [basis])",
    "description": "Returns the amount received at maturity for a fully invested discounted security.",
    "id": 182
  },
  {
    "name": "AND",
    "category": "Logical & Decision Modeling",
    "syntax": "=AND(logical1, [logical2], ...)",
    "description": "Returns TRUE if all of its arguments evaluate to TRUE; core for multi-layered conditional business checks.",
    "id": 183
  },
  {
    "name": "OR",
    "category": "Logical & Decision Modeling",
    "syntax": "=OR(logical1, [logical2], ...)",
    "description": "Returns TRUE if any argument is TRUE; checks multiple alternate qualification criteria in business logic.",
    "id": 184
  },
  {
    "name": "NOT",
    "category": "Logical & Decision Modeling",
    "syntax": "=NOT(logical)",
    "description": "Reverses the logic of its argument; changes FALSE to TRUE, or TRUE to FALSE.",
    "id": 185
  },
  {
    "name": "TRUE",
    "category": "Logical & Decision Modeling",
    "syntax": "=TRUE()",
    "description": "Returns the logical value TRUE; used as an explicit Boolean flag in automated validation tables.",
    "id": 186
  },
  {
    "name": "FALSE",
    "category": "Logical & Decision Modeling",
    "syntax": "=FALSE()",
    "description": "Returns the logical value FALSE; used for toggle switches and status tracking.",
    "id": 187
  },
  {
    "name": "IF",
    "category": "Logical & Decision Modeling",
    "syntax": "=IF(logical_test, value_if_true, [value_if_false])",
    "description": "Specifies a logical test to perform; returns one value if TRUE, and another value if FALSE.",
    "id": 188
  },
  {
    "name": "IFS",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFS(logical_test1, value_if_true1, ...)",
    "description": "Checks whether one or more conditions are met and returns a value corresponding to the first TRUE condition without nesting.",
    "id": 189
  },
  {
    "name": "IFERROR",
    "category": "Logical & Decision Modeling",
    "syntax": "=IFERROR(value, value_if_error)",
    "description": "Returns a value you specify if a formula evaluates to an error; otherwise returns the result of the formula.",
    "id": 190
  },
  {
    "name": "FILTER",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=FILTER(array, include, [if_empty])",
    "description": "Filters a range of data based on supplied Boolean criteria and automatically spills the matching records.",
    "id": 191
  },
  {
    "name": "SORT",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SORT(array, [sort_index], [sort_order], [by_col])",
    "description": "Sorts the contents of a range or array dynamically in ascending or descending order.",
    "id": 192
  },
  {
    "name": "UNIQUE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=UNIQUE(array, [by_col], [exactly_once])",
    "description": "Returns a list of unique values from a list or range, eliminating duplicates dynamically.",
    "id": 193
  },
  {
    "name": "XMATCH",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])",
    "description": "Searches for a specified item in an array or range of cells and returns the item's relative position.",
    "id": 194
  },
  {
    "name": "SEQUENCE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SEQUENCE(rows, [columns], [start], [step])",
    "description": "Generates a dynamic array of sequential numbers such as serial indices, automated dates, or row counters.",
    "id": 195
  },
  {
    "name": "PIVOTBY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=PIVOTBY(row_fields, col_fields, values, function, ...)",
    "description": "Modern Excel 365 formula that dynamically builds a full multi-dimensional pivot summary grid with one formula.",
    "id": 196
  },
  {
    "name": "PERCENTOF",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=PERCENTOF(data_subset, data_all)",
    "description": "Returns the percentage that a subset represents of a total dataset; modern Excel 365 formula for contribution analysis.",
    "id": 197
  },
  {
    "name": "TEXTBEFORE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    "description": "Returns text that occurs before a given delimiter; cleanly extracts first names, invoice prefixes, or state codes.",
    "id": 198
  },
  {
    "name": "TEXTAFTER",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])",
    "description": "Returns text that occurs after a given delimiter; extracts domain names, order suffixes, and file extensions.",
    "id": 199
  },
  {
    "name": "TEXTSPLIT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])",
    "description": "Splits text strings into columns and rows across an array using custom column and row delimiters.",
    "id": 200
  },
  {
    "name": "CONCAT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=CONCAT(text1, [text2], ...)",
    "description": "Combines text from multiple ranges and/or strings, modern replacement for CONCATENATE supporting full ranges.",
    "id": 201
  },
  {
    "name": "SWITCH",
    "category": "Logical & Decision Modeling",
    "syntax": "=SWITCH(expression, val1, result1, [default or val2, result2], ...)",
    "description": "Evaluates an expression against a list of values and returns the result corresponding to the first matching value.",
    "id": 202
  },
  {
    "name": "NOMINAL",
    "category": "Corporate Finance & Banking",
    "syntax": "=NOMINAL(effect_rate, npery)",
    "description": "Returns the annual nominal interest rate given the effective rate and the number of compounding periods per year.",
    "id": 203
  },
  {
    "name": "EXPAND",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=EXPAND(array, rows, [columns], [pad_with])",
    "description": "Expands or pads an array with specified dimensions and filler values to normalize matrices.",
    "id": 204
  },
  {
    "name": "TOROW",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TOROW(array, [ignore], [scan_by_column])",
    "description": "Flattens a two-dimensional grid or matrix of cells into a single continuous horizontal row.",
    "id": 205
  },
  {
    "name": "TOCOL",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TOCOL(array, [ignore], [scan_by_column])",
    "description": "Transforms a multi-row and multi-column array or table into a single vertical column.",
    "id": 206
  },
  {
    "name": "WRAPROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=WRAPROWS(vector, wrap_count, [pad_with])",
    "description": "Wraps a 1D row or column vector into a 2D matrix after reaching a specified number of elements per row.",
    "id": 207
  },
  {
    "name": "SUBSTITUTE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=SUBSTITUTE(text, old_text, new_text, [instance_num])",
    "description": "Replaces existing text with new text in a text string; clean replacement for character typos and code formats.",
    "id": 208
  },
  {
    "name": "LAMBDA",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LAMBDA([parameter1, parameter2, ...], calculation)",
    "description": "Creates custom, reusable functions in Excel that can be called by name throughout the workbook.",
    "id": 209
  },
  {
    "name": "BYROW",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=BYROW(array, lambda)",
    "description": "Applies a LAMBDA function to each row of an array and returns an array of the results (e.g. row-level totals).",
    "id": 210
  },
  {
    "name": "BYCOL",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=BYCOL(array, lambda)",
    "description": "Applies a LAMBDA function to each column of an array and returns an array of the results (e.g. column-level metrics).",
    "id": 211
  },
  {
    "name": "WRAPCOLS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=WRAPCOLS(vector, wrap_count, [pad_with])",
    "description": "Wraps a 1D vector into columns of a 2D array after reaching a specified number of elements per column.",
    "id": 212
  },
  {
    "name": "MAKEARRAY",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=MAKEARRAY(rows, cols, LAMBDA(r, c, ...))",
    "description": "Returns a calculated array of a specified row and column size by applying a LAMBDA function.",
    "id": 213
  },
  {
    "name": "ARRAYTOTEXT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=ARRAYTOTEXT(array, [format])",
    "description": "Returns an array of text values as a single comma-delimited text string for documentation.",
    "id": 214
  },
  {
    "name": "TEXTJOIN",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)",
    "description": "Combines the text from multiple ranges and strings with a specified delimiter, ignoring blank cells.",
    "id": 215
  },
  {
    "name": "NUMBERVALUE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=NUMBERVALUE(text, [decimal_separator], [group_separator])",
    "description": "Converts text to a number in a locale-independent way, specifying decimal and thousands separators.",
    "id": 216
  },
  {
    "name": "REGEXEXTRACT",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=REGEXEXTRACT(text, pattern, [return_mode], [case_sensitivity])",
    "description": "Modern Excel 365 formula that extracts substrings matching a regular expression pattern (e.g., GST numbers, emails).",
    "id": 217
  },
  {
    "name": "REGEXREPLACE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=REGEXREPLACE(text, pattern, replacement, [occurrence], [case_sensitivity])",
    "description": "Replaces text matching a regular expression pattern with replacement text across records.",
    "id": 218
  },
  {
    "name": "REGEXTEST",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=REGEXTEST(text, pattern, [case_sensitivity])",
    "description": "Tests whether any part of a text string matches a regular expression pattern; returns TRUE or FALSE.",
    "id": 219
  },
  {
    "name": "FIELDVALUE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=FIELDVALUE(cell, field_name)",
    "description": "Extracts field values from linked data types (such as Stocks or Geography data types).",
    "id": 220
  },
  {
    "name": "FORMULATEXT",
    "category": "Logical & Decision Modeling",
    "syntax": "=FORMULATEXT(reference)",
    "description": "Returns the formula in a given reference as a text string; used for auditing, documentation, and compliance reviews.",
    "id": 221
  },
  {
    "name": "CHOOSECOLS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    "description": "Returns specified columns from an array or database table in the exact order requested.",
    "id": 222
  },
  {
    "name": "CHOOSEROWS",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    "description": "Returns specified rows from an array or database table in the exact order requested.",
    "id": 223
  },
  {
    "name": "HSTACK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=HSTACK(array1, [array2], ...)",
    "description": "Appends arrays horizontally side-by-side into a single combined larger array.",
    "id": 224
  },
  {
    "name": "VSTACK",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=VSTACK(array1, [array2], ...)",
    "description": "Appends arrays vertically on top of each other into a single combined larger data table.",
    "id": 225
  },
  {
    "name": "TAKE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TAKE(array, rows, [columns])",
    "description": "Returns a specified number of contiguous rows or columns from the start or end of an array.",
    "id": 226
  },
  {
    "name": "LET",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=LET(name1, name_value1, [name2, name_value2], calculation)",
    "description": "Assigns names to calculation results, enabling intermediate variables to be reused in a formula; drastically boosts calculation speed.",
    "id": 227
  },
  {
    "name": "SORTBY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=SORTBY(array, by_array1, [sort_order1], ...)",
    "description": "Sorts a range or array based on the values in a corresponding range or secondary helper array.",
    "id": 228
  },
  {
    "name": "TRIMRANGE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=TRIMRANGE(range, [trim_edges])",
    "description": "Modern Excel 365 formula that trims empty blank rows and columns from the edges of a dataset.",
    "id": 229
  },
  {
    "name": "TRIMMEAN",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=TRIMMEAN(array, percent)",
    "description": "Returns the mean of the interior of a data set, excluding a percentage of extreme top and bottom outlier data points.",
    "id": 230
  },
  {
    "name": "MUNIT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MUNIT(dimension)",
    "description": "Returns the unit matrix or an identity matrix of the specified dimension for linear algebra and matrix modeling.",
    "id": 231
  },
  {
    "name": "SHEET",
    "category": "Logical & Decision Modeling",
    "syntax": "=SHEET([value])",
    "description": "Returns the sheet number of the referenced worksheet; used in dynamic multi-sheet index navigation.",
    "id": 232
  },
  {
    "name": "SHEETS",
    "category": "Logical & Decision Modeling",
    "syntax": "=SHEETS([reference])",
    "description": "Returns the total count of sheets in a workbook reference; used for auditing multi-entity consolidation files.",
    "id": 233
  },
  {
    "name": "MOD",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=MOD(number, divisor)",
    "description": "Returns the remainder after a number is divided by a divisor; used in alternating row colors, shift cycles, and time calculations.",
    "id": 234
  },
  {
    "name": "GROUPBY",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=GROUPBY(row_fields, values, function, ...)",
    "description": "Modern Excel 365 formula that groups data by specified categories and aggregates metrics in a single spill formula.",
    "id": 235
  },
  {
    "name": "ODDLPRICE",
    "category": "Corporate Finance & Banking",
    "syntax": "=ODDLPRICE(settlement, maturity, last_interest, rate, yld, redemption, frequency, [basis])",
    "description": "Returns the price per $100 face value of a security with an odd (short or long) last coupon period.",
    "id": 236
  },
  {
    "name": "FIXED",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=FIXED(number, [decimals], [no_commas])",
    "description": "Formats a number as text with a fixed number of decimals, optionally suppressing thousands commas.",
    "id": 237
  },
  {
    "name": "TRANSLATE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=TRANSLATE(text, [source_language], [target_language])",
    "description": "Modern cloud-connected formula that translates text from one language to another directly in spreadsheet cells.",
    "id": 238
  },
  {
    "name": "TYPE",
    "category": "Logical & Decision Modeling",
    "syntax": "=TYPE(value)",
    "description": "Returns a number indicating the data type of a value (1 for Number, 2 for Text, 4 for Boolean, 16 for Error, 64 for Array).",
    "id": 239
  },
  {
    "name": "COMBIN",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COMBIN(number, number_chosen)",
    "description": "Returns the number of combinations for a given number of items without regard to order.",
    "id": 240
  },
  {
    "name": "COMBINA",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=COMBINA(number, number_chosen)",
    "description": "Returns the number of combinations with repetitions for a given number of items.",
    "id": 241
  },
  {
    "name": "DROP",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=DROP(array, rows, [columns])",
    "description": "Excludes a specified number of rows or columns from the start or end of an array.",
    "id": 242
  },
  {
    "name": "DPRODUCT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=DPRODUCT(database, field, criteria)",
    "description": "Multiplies the values in a column of a database that match specified multi-field criteria conditions.",
    "id": 243
  },
  {
    "name": "FORECAST",
    "category": "Statistical, Distribution & Forecasting",
    "syntax": "=FORECAST(x, known_y's, known_x's)",
    "description": "Calculates or predicts a future value along a linear trend based on existing historical data points.",
    "id": 244
  },
  {
    "name": "IMAGE",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=IMAGE(source, [alt_text], [sizing], [height], [width])",
    "description": "Inserts images directly into Excel cells from a URL source, enabling product catalogs and dynamic photo rosters.",
    "id": 245
  },
  {
    "name": "INT",
    "category": "Math, Rounding & Aggregations",
    "syntax": "=INT(number)",
    "description": "Rounds a number down to the nearest integer; used to separate date from time in timestamp serials.",
    "id": 246
  },
  {
    "name": "PRINTAREA",
    "category": "Dynamic Arrays & Modern Lookups",
    "syntax": "=PRINTAREA(range)",
    "description": "Defines dynamic automated print ranges for automated report batch export to PDF.",
    "id": 247
  },
  {
    "name": "UNICHAR",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UNICHAR(number)",
    "description": "Returns the Unicode character that is referenced by the given numeric value (e.g. checkmarks, arrows, symbols).",
    "id": 248
  },
  {
    "name": "UNICODE",
    "category": "Text Manipulation & Data Cleaning",
    "syntax": "=UNICODE(text)",
    "description": "Returns the number (code point) corresponding to the first character of the text.",
    "id": 249
  },
  {
    "name": "REDUCE",
    "category": "Calculation Speed (LET & LAMBDA)",
    "syntax": "=REDUCE(initial_value, array, LAMBDA(accumulator, value, calculation))",
    "description": "Applies a LAMBDA to reduce an array to an accumulated value, returning the final accumulator result.",
    "id": 250
  }
];
