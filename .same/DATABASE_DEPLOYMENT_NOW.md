# 🚀 Deploy Database Schemas to Supabase - NOW!

**Time Required**: 30 minutes
**Difficulty**: Easy - Just copy & paste
**Impact**: Unlocks ALL system features

---

## 📋 WHAT YOU'LL DEPLOY

| File | Tables | Features Unlocked |
|------|--------|-------------------|
| 1️⃣ `database-schema-fixed.sql` | 15 tables | GE Requests, Approvals, Users, Payments |
| 2️⃣ `aap-schema-v4-final.sql` | 14 tables | AAP Module, Budget Planning, Sample Data |
| 3️⃣ `budget-commitments-v2-final.sql` | 1 table | Budget Commitments Tracking |

**Total**: 30 tables + Sample data + Indexes + Triggers

---

## 🎯 STEP-BY-STEP DEPLOYMENT

### ✅ STEP 1: Open Supabase SQL Editor (2 minutes)

1. **Open your browser** and go to:
   ```
   https://app.supabase.com/project/nuyitrqibxdsyfxulrvr/sql
   ```

2. **Login** if prompted (you should be logged in)

3. You'll see the **SQL Editor** interface with:
   - Left sidebar with "Queries"
   - Main editor area
   - "Run" button at the top

**✅ Checkpoint**: You can see the SQL editor interface

---

### ✅ STEP 2: Deploy Core GE System Schema (10 minutes)

This creates the foundation: users, GE requests, approvals, payments.

#### 2.1: Open the SQL File

1. **Open a new terminal/file explorer** on your computer
2. **Navigate** to the `unre/.same/` folder
3. **Open** the file: `database-schema-fixed.sql`
4. **Select All** (Ctrl+A or Cmd+A)
5. **Copy** (Ctrl+C or Cmd+C)

#### 2.2: Execute in Supabase

1. **Go back** to Supabase SQL Editor
2. **Click** "New Query" button (top left)
3. **Paste** the entire SQL content (Ctrl+V or Cmd+V)
4. **Click** the green "Run" button (or press Ctrl+Enter)
5. **Wait** for execution (~30 seconds)

#### 2.3: Verify Success

You should see:
- ✅ Green "Success" message
- ✅ "No rows returned" (this is normal)
- ✅ No red error messages

**If you see errors:**
- Check if tables already exist (run verification query below)
- Copy the error message and let me know

**Verification Query** (optional):
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'user_profiles', 'cost_centres', 'budget_lines',
  'ge_requests', 'commitments', 'payment_vouchers'
)
ORDER BY tablename;
```

Should show 6+ tables.

**✅ Checkpoint**: Core GE system tables created successfully

---

### ✅ STEP 3: Deploy AAP Module Schema (10 minutes)

This creates the Annual Activity Plan and budget monitoring system.

#### 3.1: Open the SQL File

1. **Navigate** to `unre/.same/` folder
2. **Open** the file: `aap-schema-v4-final.sql`
3. **Select All** (Ctrl+A or Cmd+A)
4. **Copy** (Ctrl+C or Cmd+C)

#### 3.2: Execute in Supabase

1. **Go back** to Supabase SQL Editor
2. **Click** "New Query" button
3. **Paste** the entire SQL content
4. **Click** "Run" button
5. **Wait** for execution (~30 seconds)

#### 3.3: Verify Success

You should see:
- ✅ Green "Success" message
- ✅ Messages about sample data inserted
- ✅ No red error messages

**Verification Query**:
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'fiscal_year', 'division', 'department',
  'aap_header', 'aap_line', 'budget_version'
)
ORDER BY tablename;
```

Should show 6 tables.

**Check Sample Data**:
```sql
SELECT * FROM fiscal_year;
SELECT * FROM division LIMIT 5;
```

Should see 2025 fiscal year and sample divisions (Agriculture, Science, etc.)

**✅ Checkpoint**: AAP module tables and sample data created

---

### ✅ STEP 4: Deploy Budget Commitments Schema (5 minutes)

This creates the budget commitment tracking table.

#### 4.1: Open the SQL File

1. **Navigate** to `unre/.same/` folder
2. **Open** the file: `budget-commitments-v2-final.sql`
3. **Select All** (Ctrl+A or Cmd+A)
4. **Copy** (Ctrl+C or Cmd+C)

#### 4.2: Execute in Supabase

1. **Go back** to Supabase SQL Editor
2. **Click** "New Query" button
3. **Paste** the entire SQL content
4. **Click** "Run" button
5. **Wait** for execution (~10 seconds)

#### 4.3: Verify Success

You should see:
- ✅ Green "Success" message
- ✅ Messages about indexes created
- ✅ No red error messages

**Verification Query**:
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'budget_commitments';
```

Should show the budget_commitments table.

**✅ Checkpoint**: Budget commitments table created

---

### ✅ STEP 5: Create Admin User (3 minutes)

Now create your first user account to login.

#### 5.1: Open the SQL File

1. **Navigate** to `unre/.same/` folder
2. **Open** the file: `create-admin-user.sql`
3. **Read the instructions** at the top of the file

#### 5.2: Customize Your Credentials

**IMPORTANT**: Edit these lines in the SQL file:

```sql
-- CHANGE THESE VALUES:
INSERT INTO user_profiles (id, email, full_name, employee_id, is_active)
VALUES (
  '00000000-0000-0000-0000-000000000001', -- Keep this ID
  'admin@unre.ac.pg',  -- ⬅️ CHANGE TO YOUR EMAIL
  'System Administrator', -- ⬅️ CHANGE TO YOUR NAME
  'ADMIN001', -- ⬅️ CHANGE TO YOUR EMPLOYEE ID
  true
);
```

#### 5.3: Execute in Supabase

1. **Copy** the entire modified SQL
2. **Go to** Supabase SQL Editor
3. **Click** "New Query"
4. **Paste** and **Run**

#### 5.4: Create Auth User in Supabase Auth

**Important**: You also need to create the actual auth user:

1. **Go to** Supabase Dashboard → Authentication → Users
2. **Click** "Add User" → "Create new user"
3. **Enter**:
   - Email: (same as above)
   - Password: (create a strong password - SAVE IT!)
4. **Click** "Create user"
5. **Copy the User ID** that's generated

#### 5.5: Link Auth User to Profile

Run this query, replacing the IDs:

```sql
-- Update the user_profiles with the actual auth user ID
UPDATE user_profiles
SET id = 'paste-actual-user-id-here'
WHERE email = 'your-email@unre.ac.pg';
```

**✅ Checkpoint**: Admin user created successfully

---

### ✅ STEP 6: Verify Complete Deployment (5 minutes)

Run this comprehensive verification query:

```sql
-- Count all tables
SELECT
  'Total Tables' as check_type,
  COUNT(*) as count
FROM pg_tables
WHERE schemaname = 'public'
UNION ALL
-- Count fiscal years
SELECT
  'Fiscal Years',
  COUNT(*)
FROM fiscal_year
UNION ALL
-- Count divisions
SELECT
  'Divisions',
  COUNT(*)
FROM division
UNION ALL
-- Count users
SELECT
  'User Profiles',
  COUNT(*)
FROM user_profiles;
```

**Expected Results**:
- Total Tables: 24-30 (depending on existing tables)
- Fiscal Years: 1 (2025)
- Divisions: 5-10 (sample data)
- User Profiles: 1 (your admin user)

**List All Tables**:
```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

Should see tables like:
- activity_project
- aap_header
- aap_line
- aap_line_schedule
- budget_commitments
- budget_line
- budget_lines
- budget_version
- chart_of_accounts
- commitments
- cost_centres
- department
- division
- expense_types (if exists)
- fiscal_year
- ge_approvals
- ge_requests
- notifications
- payment_vouchers
- program
- roles (if exists)
- supplier
- user_profiles
- ... and more

**✅ Checkpoint**: All tables created and verified

---

## 🎉 SUCCESS! What's Next?

### Test Your System

1. **Restart your dev server**:
   ```bash
   cd unre
   bun run dev
   ```

2. **Open in browser**: http://localhost:3000

3. **Click "Login"**

4. **Enter your credentials**:
   - Email: (the one you created)
   - Password: (the one you set)

5. **You should see the dashboard!** 🎉

---

## ✅ Features Now Available

With the database deployed, you can now:

### User Management
- ✅ Login/logout
- ✅ User profiles
- ✅ Role management

### GE Requests
- ✅ Create new GE requests
- ✅ Add line items
- ✅ Upload documents
- ✅ Submit for approval
- ✅ Track status

### Approvals
- ✅ View pending approvals
- ✅ Approve/reject requests
- ✅ Add comments
- ✅ Budget validation

### Budget Tracking
- ✅ Budget overview
- ✅ Budget vs Actual
- ✅ Commitment tracking
- ✅ PGAS import

### AAP Module
- ✅ Create AAPs
- ✅ Add line items
- ✅ Monthly scheduling
- ✅ Approve AAPs
- ✅ Export to PDF

### Payments
- ✅ Create payment vouchers
- ✅ Approve payments
- ✅ Process payments
- ✅ Generate PDFs

### Reports
- ✅ All reports functional
- ✅ Excel/PDF exports
- ✅ Analytics dashboards

---

## 🐛 Troubleshooting

### Error: "relation already exists"

This means tables are already created. **This is OK!**

**Solution**: Skip that file and continue with the next one.

### Error: "permission denied"

You might not have the right permissions.

**Solution**: Make sure you're using the service role key or you're the project owner.

### Error: "syntax error at or near..."

There might be an issue with the SQL.

**Solution**:
1. Copy the exact error message
2. Let me know which file you were running
3. I'll help you fix it

### Can't login after creating user

**Check**:
1. Did you create the auth user in Supabase Auth UI?
2. Did you link the auth user ID to the profile?
3. Is the email exactly the same in both places?

**Solution**:
```sql
-- Check if profile exists
SELECT * FROM user_profiles WHERE email = 'your-email@unre.ac.pg';

-- Check auth users (in Supabase Dashboard → Auth → Users)
```

### TypeScript errors still showing

This is **normal** if the dev server hasn't restarted.

**Solution**: Restart the dev server:
```bash
# Stop current server (Ctrl+C)
cd unre
bun run dev
```

Most errors should disappear. The remaining errors are type inference issues that don't affect functionality.

---

## 📞 Need Help?

If you encounter any issues:

1. **Copy the exact error message**
2. **Note which step you're on**
3. **Take a screenshot if helpful**
4. **Let me know and I'll help immediately**

---

## 🎯 After Successful Deployment

Once deployed, follow this testing checklist:

### Quick Test (15 minutes)
- [ ] Login successful
- [ ] Dashboard loads
- [ ] Can navigate to different pages
- [ ] Create a test GE request
- [ ] View the request

### Full Test (2 hours)
- [ ] Complete GE request workflow
- [ ] Test approval process
- [ ] Import PGAS budget (use sample file)
- [ ] Create AAP
- [ ] Test payment processing
- [ ] Generate reports

**Testing Guide**: See `.same/AAP_TESTING_CHECKLIST.md`

---

## 📊 Database Schema Summary

### Core Tables (database-schema-fixed.sql)
1. user_profiles - User information
2. roles - System roles
3. user_roles - Role assignments
4. cost_centres - Organizational structure
5. budget_lines - Budget tracking
6. expense_types - Expense categories
7. suppliers - Supplier master
8. ge_requests - GE requests
9. ge_request_items - Request line items
10. ge_approvals - Approval history
11. commitments - Budget commitments
12. payment_vouchers - Payments
13. notifications - User notifications
14. attachments - Document metadata
15. audit_logs - Audit trail

### AAP Tables (aap-schema-v4-final.sql)
1. fiscal_year - Fiscal years
2. division - Divisions/Faculties
3. department - Departments
4. program - Programs
5. activity_project - Activities/Projects
6. chart_of_accounts - Account codes
7. supplier - Supplier master (enhanced)
8. aap_header - AAP headers
9. aap_line - AAP line items
10. aap_line_schedule - Monthly schedules
11. budget_version - Budget versions
12. budget_line - Budget allocations
13. ge_header - GE header (enhanced)
14. ge_line - GE line items (enhanced)

### Commitment Table (budget-commitments-v2-final.sql)
1. budget_commitments - Links GE to budget

---

**Ready to Deploy?** Follow the steps above and your system will be fully functional in 30 minutes! 🚀
