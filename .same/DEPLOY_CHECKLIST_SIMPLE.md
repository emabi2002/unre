# ⚡ QUICK DEPLOY CHECKLIST

## 🎯 Your Mission: Deploy 3 SQL Files (30 min)

### Before You Start
- [ ] Open Supabase: https://app.supabase.com/project/nuyitrqibxdsyfxulrvr/sql
- [ ] Have files ready: `unre/.same/` folder

---

## ✅ DEPLOYMENT STEPS

### 1️⃣ Deploy Core GE System (10 min)

**File**: `database-schema-fixed.sql` (492 lines)

1. [ ] Open file in editor
2. [ ] Copy all content (Ctrl+A, Ctrl+C)
3. [ ] Supabase → New Query
4. [ ] Paste (Ctrl+V)
5. [ ] Click "Run"
6. [ ] See green "Success" ✅

**Creates**: 15 tables (users, GE requests, approvals, payments)

---

### 2️⃣ Deploy AAP Module (10 min)

**File**: `aap-schema-v4-final.sql` (557 lines)

1. [ ] Open file in editor
2. [ ] Copy all content
3. [ ] Supabase → New Query
4. [ ] Paste
5. [ ] Click "Run"
6. [ ] See green "Success" ✅

**Creates**: 14 tables + sample data (fiscal year 2025, divisions)

---

### 3️⃣ Deploy Budget Commitments (5 min)

**File**: `budget-commitments-v2-final.sql` (60 lines)

1. [ ] Open file in editor
2. [ ] Copy all content
3. [ ] Supabase → New Query
4. [ ] Paste
5. [ ] Click "Run"
6. [ ] See green "Success" ✅

**Creates**: 1 table (budget commitments)

---

### 4️⃣ Create Admin User (5 min)

**File**: `create-admin-user.sql`

1. [ ] Open file
2. [ ] **EDIT**: Change email, name, employee ID
3. [ ] Copy modified content
4. [ ] Supabase → New Query
5. [ ] Paste and Run

**Then in Supabase Dashboard**:
6. [ ] Go to Authentication → Users
7. [ ] Click "Add User"
8. [ ] Enter same email + password
9. [ ] Save the password!
10. [ ] Copy the generated User ID
11. [ ] Run UPDATE query to link IDs

---

### 5️⃣ Verify (2 min)

Run this query:
```sql
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

[ ] Should see 24-30 tables ✅

---

### 6️⃣ Test Login (3 min)

1. [ ] Restart dev server: `cd unre && bun run dev`
2. [ ] Open: http://localhost:3000
3. [ ] Click "Login"
4. [ ] Enter your email + password
5. [ ] See dashboard! 🎉

---

## ⚠️ Common Issues

**"relation already exists"** → OK! Skip that file
**"permission denied"** → Check you're project owner
**Can't login** → Did you create auth user in Supabase Auth UI?
**TypeScript errors** → Restart dev server

---

## 🎉 Success = All Features Unlocked!

After deployment you can:
- ✅ Create GE requests
- ✅ Approve workflows
- ✅ Track budgets
- ✅ Manage AAPs
- ✅ Process payments
- ✅ Generate reports

---

**Total Time**: ~30 minutes
**Difficulty**: Easy (just copy & paste)
**Impact**: 🚀 System goes from 0% to 100% functional

**Need help?** Read the detailed guide: `DATABASE_DEPLOYMENT_NOW.md`
