# Fashion Swap — Product Requirements Document (PRD)

**Project title:** Clothing Exchange & Swap Marketplace  
**Product name:** Fashion Swap  
**Version:** 1.0 (Phase 1)  
**Stack:** React (Vite) + Node.js/Express + MongoDB + Tailwind CSS  

---

## 1. Context

Fast fashion has increased clothing consumption and textile waste. Many people own wearable clothes they no longer use, but selling or donating is inconvenient. Traditional e-commerce focuses on buying and selling.

**Fashion Swap** enables users to **swap clothes directly** (barter model) instead of purchasing new items. Users list clothes, browse items, send swap requests, negotiate via chat, and exchange locally or via courier preference. The platform supports **swap-value estimation** and **location-based matching**.

### Reference platforms
- Depop — community clothing marketplace  
- Poshmark — fashion resale/sharing  
- Swap.com — clothing exchange  

---

## 2. Problem Statement

- Unused clothes with no easy exchange option  
- E-commerce focused only on buy/sell  
- Resale platforms often involve complicated pricing  
- Few platforms dedicated to clothing swapping  
- Limited sustainable fashion options for everyday users  

---

## 3. Objectives

### Primary
- Dedicated clothing exchange marketplace  
- Direct swaps without monetary transactions  
- Encourage sustainable fashion  
- Location-based swap matching  

### Secondary
- Negotiation chat before finalizing swaps  
- Estimated swap value calculation  
- Filter by category and location  
- Courier preference for remote swaps  
- Community around sustainable fashion  

---

## 4. Scope

### In scope (Phase 1)
- User registration and login  
- Clothing listing system  
- Swap request system  
- Negotiation chat  
- Swap value calculator  
- Location-based swap suggestions  
- Admin management panel  

### Out of scope (Phase 1)
- Online payment system  
- AI fashion recommendations  
- AR virtual try-on  
- Native mobile applications  

---

## 5. Functional Requirements

### User module
- Register / login  
- Personal profile  
- Upload clothing listings  
- Clothing details (size, brand, condition)  
- Browse available items  
- Send swap requests  
- Manage swap history  

### Clothing listing module
- Upload clothing images  
- Details: type, size, brand, condition  
- Estimated swap value  
- Availability status  
- Edit / remove listings  

### Swap request module
- Send request to another user  
- View incoming requests  
- Accept / reject  
- Track status  

### Negotiation chat module
- Direct messaging between swap parties  
- Discuss details and negotiate  
- Confirm agreement  

### Swap value calculator
- Estimate value from brand, condition, category  
- Suggest fair swap matches  
- Display value comparison  

### Location-based matching
- Nearby listings based on user profile location  
- Filter listings by location  
- Nearby swap opportunities toggle  

### Admin module
- Manage users and listings  
- Monitor swap activities  
- Remove inappropriate listings  
- Resolve disputes  
- Platform analytics  

---

## 6. Non-Functional Requirements

- Secure JWT authentication  
- Mobile-responsive design  
- Fast search and listing performance  
- Secure data storage (MongoDB)  
- Scalable modular architecture  
- User privacy protection (token-based access)  

---

## 7. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Media | Local uploads (`/uploads`) / optional Cloudinary |
| Realtime-ready | Socket.io (server), chat via polling on client |
| Deployment targets | Render / Vercel / AWS |

---

## 8. User Flows

### User
1. Register / Login  
2. Create / update profile (including location)  
3. Upload clothing listings  
4. Browse marketplace (filters / nearby)  
5. Send swap request with offered item  
6. Negotiate in chat  
7. Accept and complete swap (local meetup or courier preference)  

### Admin
1. Monitor activity  
2. Manage users / listings  
3. Resolve swap disputes  
4. Review analytics  

---

## 9. Data Requirements

### Clothing
Item ID, type/category, brand, size, condition, estimated swap value, location, images, status  

### User
Name, contact details, location, swap history/count, role  

---

## 10. KPIs

- Number of clothing listings  
- Number of successful swaps  
- User engagement (messages / requests)  
- Swap request conversion rate  
- Active users  

---

## 11. Assumptions & Constraints

### Assumptions
- Users are willing to exchange clothing  
- Users upload accurate item information  
- Courier preference can be agreed between users  

### Constraints
- Item quality depends on users  
- Fairness depends on negotiation  
- Shipping costs may affect remote swaps  

---

## 12. Application Pages (Phase 1)

1. Login / Register  
2. Clothing Listings (Marketplace)  
3. Item Detail  
4. Swap Request  
5. Chat  
6. User Dashboard  
7. Admin Panel  
8. Profile / Add Item (supporting pages)  

---

## 13. Deliverables Checklist

| Deliverable | Status |
|---|---|
| Fully functional marketplace app | Implemented |
| Listing & browsing system | Implemented |
| Swap request & negotiation chat | Implemented |
| Location-based matching | Implemented (nearby API + UI toggle) |
| Admin management panel | Implemented |
| Complete PRD document | This document |
| Live deployed application link | Pending deployment |

---

## 14. Expected Impact

- Reduced textile waste  
- Promotion of sustainable fashion  
- Cost-effective clothing access  
- Community-driven exchange  
- Lower environmental impact of fast fashion  

---

## 15. Future Enhancements

- AI-based swap recommendations  
- Mobile application  
- Clothing condition verification  
- Sustainability impact tracker  
- Community fashion groups  

---

## 16. Demo Account (after seeding)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@swap.com` | `admin123` |

---

## 17. Local Run Notes

```bash
# Terminal 1 — API
cd server
npm install
# Ensure MongoDB is running, then:
npm run seed
npm run dev

# Terminal 2 — Client
cd client
npm install
npm run dev
```

Client: `http://localhost:5173`  
API: `http://localhost:5000/api`
