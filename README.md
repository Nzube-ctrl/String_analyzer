# 🧩 String Analyzer Service

A RESTful API built with **NestJS** and **MongoDB** that analyzes strings and stores their computed properties.  
For each submitted string, it calculates the length, palindrome status, unique characters, word count, SHA-256 hash, and character frequency map.  
It also supports advanced filtering and natural language queries.

---

## 🚀 Features

- Analyze and store string properties:
  - Length
  - Palindrome detection (case-insensitive)
  - Unique character count
  - Word count
  - SHA-256 hash (unique identifier)
  - Character frequency map
- Retrieve specific string analysis
- Filter all stored strings by:
  - Palindrome status
  - Length range
  - Word count
  - Specific contained characters
- Natural Language Query (e.g., `"all single word palindromic strings"`)
- Delete string data
- Fully validated with `class-validator` and `class-transformer`

---

## 🧱 Tech Stack

- **Framework:** NestJS
- **Database:** MongoDB with Mongoose
- **Validation:** class-validator / class-transformer
- **Hashing:** crypto-js
- **Environment:** Node.js + TypeScript

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/Nzube-ctrl/String_analyzer.git
cd into project

### 2 Install dependencies
npm install

### 3 Create .env file in the root of the project folder
MONGODB_URI=<your_mongo_connection_string>
PORT=PORTNUMBER

### Run the application
Development mode
npm run start:dev 

Production mode
npm run build
npm run start:prod

🧪 API Endpoints
1️⃣ Create / Analyze String
POST /strings
Request Body:
{
  "value": "A man a plan a canal Panama"
}

2️⃣ Get Specific String
GET /strings/{string_value}

3️⃣ Get All Strings (with Filtering)
GET /strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a

4️⃣ Natural Language Filtering
GET /strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings

5️⃣ Delete String

DELETE /strings/{string_value}

🧑‍💻 Author

Nzube Uwakwe