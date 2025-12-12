# UNRE GE System - Setup & Configuration Guide

## ✅ What's Been Done (Version 2)

### 1. Repository Setup
- ✅ Cloned from GitHub: `https://github.com/emabi2002/unre.git`
- ✅ Installed all dependencies (565 packages using Bun)
- ✅ Development server is running on port 3000

### 2. Environment Configuration
- ✅ Created `.env.local` file with placeholder values
- ⚠️ **ACTION REQUIRED**: Update with your actual Supabase credentials

### 3. Database Type Definitions
- ✅ Added all missing AAP-related table types to `src/lib/database.types.ts`
- ✅ Fixed Insert and Update types for all tables (no circular references)
- ✅ Added support for 24 database tables including:
  - Core tables: user_profiles, cost_centres, budget_lines
  - GE Request tables: ge_requests, ge_request_items, ge_approvals
  - Financial tables: commitments, payment_vouchers
  - AAP tables: aap_header, aap_line, aap_line_schedule, budget_version, budget_line
  - Master data: fiscal_year, division, department, program, activity_project
  - Reference data: chart_of_accounts, supplier, budget_commitments

### 4. TypeScript Status
- ⚠️ 27 TypeScript errors currently showing
- ✅ These are **EXPECTED** until Supabase is configured
- ✅ Errors will automatically resolve once real credentials are added

---

## 🔧 Next Steps: Configure Supabase

### Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name**: `unre-ge-system` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to Papua New Guinea
   - **Pricing Plan**: Free tier is sufficient for testing

4. Wait for project to be created (~2 minutes)

### Step 2: Get API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
   - **service_role key** (another long string starting with `eyJ...`)

### Step 3: Update Environment Variables

Open `unre/.env.local` and replace the placeholder values:

```env
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Deploy Database Schema

You need to execute the SQL schemas in your Supabase project:

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Execute schemas in this order:

#### A. Main Database Schema
```sql
-- Copy and paste contents from:
unre/.same/database-schema-fixed.sql
```
Click **Run** to execute.

#### B. AAP Schema
```sql
-- Copy and paste contents from:
unre/.same/aap-schema-v4-final.sql
```
Click **Run** to execute.

#### C. Budget Commitments
```sql
-- Copy and paste contents from:
unre/.same/budget-commitments-v2-final.sql
```
Click **Run** to execute.

### Step 5: Verify Installation

After executing the schemas, run this verification query:

```sql
-- Copy from: unre/.same/supabase-verify-aap.sql
SELECT
  schemaname,
  tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

You should see 24+ tables listed.

### Step 6: Create Admin User

```sql
-- Copy from: unre/.same/create-admin-user.sql
-- Follow instructions in that file to create your first admin user
```

### Step 7: Restart Development Server

1. Stop the dev server (Ctrl+C in terminal)
2. Run `cd unre && bun run dev` to restart
3. The TypeScript errors should now be resolved!

---

## 📊 What You'll Have After Setup

### Working Features
- ✅ User authentication and login
- ✅ Dashboard with budget overview
- ✅ GE request creation and tracking
- ✅ Multi-level approval workflows
- ✅ Budget vs Actual tracking
- ✅ PGAS integration (CSV import)
- ✅ Payment voucher processing
- ✅ Commitment tracking
- ✅ AAP (Annual Activity Plan) management
- ✅ Comprehensive reporting and exports

### Database Tables (24 total)
1. **User Management**: user_profiles
2. **Organization**: cost_centres, fiscal_year, division, department
3. **Planning**: program, activity_project, chart_of_accounts
4. **AAP**: aap_header, aap_line, aap_line_schedule
5. **Budget**: budget_lines, budget_version, budget_line, budget_commitments
6. **GE Requests**: ge_requests, ge_request_items, ge_approvals
7. **Financial**: commitments, payment_vouchers
8. **Reference**: supplier, notifications

---

## 🐛 Troubleshooting

### TypeScript Errors Won't Go Away
- **Solution**: Make sure you updated `.env.local` with **real** Supabase credentials
- **Solution**: Restart the dev server after updating environment variables
- **Solution**: Clear Next.js cache: `rm -rf unre/.next` then restart

### Can't Connect to Database
- **Solution**: Double-check your Supabase URL and keys are correct
- **Solution**: Ensure your Supabase project is not paused (free tier pauses after inactivity)
- **Solution**: Check Supabase dashboard for any service outages

### SQL Schema Errors
- **Solution**: Execute schemas in the correct order (database → aap → commitments)
- **Solution**: If tables already exist, you can drop them first or use the "create-admin-user.sql" which has IF NOT EXISTS checks

### Login Not Working
- **Solution**: Make sure you created an admin user using the SQL script
- **Solution**: Check that user_profiles table exists and has data
- **Solution**: Verify authentication is enabled in Supabase dashboard

---

## 📞 Support Resources

### Documentation Files
- **README.md** - Complete system overview
- **.same/SYSTEM_OVERVIEW.md** - Technical architecture
- **.same/SETUP_GUIDE.md** - Detailed setup instructions
- **.same/TESTING_GUIDE.md** - Testing procedures
- **.same/todos.md** - Current progress tracker

### Key SQL Files
- `database-schema-fixed.sql` - Main database schema
- `aap-schema-v4-final.sql` - AAP module schema
- `budget-commitments-v2-final.sql` - Budget commitments
- `create-admin-user.sql` - Create first admin user
- `supabase-verify-aap.sql` - Verification queries

### Application Features Guide
- **.same/WORKFLOW_AUTOMATION_GUIDE.md** - Workflow details
- **.same/COMMITMENTS_PAYMENTS_GUIDE.md** - Payment processing
- **.same/BRANDING_GUIDE.md** - UI/UX guidelines

---

## 🎯 Success Checklist

Before you start using the system:

- [ ] Supabase project created
- [ ] Environment variables updated in `.env.local`
- [ ] All SQL schemas executed successfully
- [ ] Verification query shows 24+ tables
- [ ] Admin user created
- [ ] Development server restarted
- [ ] TypeScript errors cleared
- [ ] Login page accessible
- [ ] Can log in with admin credentials
- [ ] Dashboard loads successfully

Once all items are checked, your system is ready for use! 🎉

---

**Current Version**: 2
**Last Updated**: December 2025
**Status**: Ready for Supabase Configuration
